/* ============================================================
   Findit — admin dashboard
   ============================================================ */
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  const STORAGE_KEY = 'findit.admin.token.v1';
  const STATUS_LABELS = { pending: 'მოლოდინში', published: 'გამოქვეყნებული', rejected: 'დამალული' };

  let token = '';
  let listings = [];
  let requests = [];
  let codes = [];
  let activeFilter = 'all';
  let searchQuery = '';
  let pendingDelete = null;
  let toastTimer;
  let busy = false;

  try { token = sessionStorage.getItem(STORAGE_KEY) || ''; } catch { token = ''; }
  if (token) $('#tokenInput').value = token;

  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
  }

  function showMessage(text, isError = false) {
    const el = $('#adminMessage');
    if (!text) { el.hidden = true; el.textContent = ''; return; }
    el.hidden = false;
    el.textContent = text;
    el.classList.toggle('is-error', isError);
  }

  function loginMessage(text) {
    $('#loginMessage').textContent = text || '';
  }

  function setBusy(value) {
    busy = value;
    $('#connectButton').disabled = value;
    $('#refreshButton').disabled = value;
    $('#refreshIcon').disabled = value;
    $('#refreshIcon').classList.toggle('spinning', value);
    $$('button[data-action]').forEach(button => { button.disabled = value; });
  }

  function saveToken(value) {
    token = value;
    try {
      if (value) sessionStorage.setItem(STORAGE_KEY, value);
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch { /* storage may be blocked */ }
  }

  function showLogin(message) {
    $('#loginView').hidden = false;
    $('#dashboard').hidden = true;
    loginMessage(message || '');
  }

  function showDashboard() {
    $('#loginView').hidden = true;
    $('#dashboard').hidden = false;
    loginMessage('');
  }

  async function api(path, options = {}) {
    const headers = { Accept: 'application/json', ...(options.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    if (options.body) headers['Content-Type'] = 'application/json';
    const response = await fetch(path, { ...options, headers });
    let body = {};
    try { body = await response.json(); } catch { body = {}; }
    if (!response.ok) {
      const error = new Error(body.error || `HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return body;
  }

  async function fetchAll() {
    const [listingData, requestData, codeData] = await Promise.all([
      api('/api/admin/listings'),
      api('/api/admin/placements').catch(() => ({ requests: [] })),
      api('/api/admin/codes').catch(() => ({ codes: [] }))
    ]);
    listings = Array.isArray(listingData.listings) ? listingData.listings : [];
    requests = Array.isArray(requestData.requests) ? requestData.requests : [];
    codes = Array.isArray(codeData.codes) ? codeData.codes : [];
    renderAll();
  }

  function handleAuthError(error) {
    if (error.status === 401) {
      saveToken('');
      showLogin('ტოკენი არასწორია ან ვადა გაუვიდა. სცადე ხელახლა.');
      return true;
    }
    if (error.status === 503) {
      showLogin('მონაცემთა ბაზა არ არის მიერთებული. Cloudflare Pages-ში დააკავშირე D1 ბაზა სახელით DB.');
      return true;
    }
    return false;
  }

  async function connect(value) {
    const nextToken = String(value || '').trim();
    if (!nextToken) { loginMessage('შეიყვანე მართვის ტოკენი.'); $('#tokenInput').focus(); return; }
    if (busy) return;
    saveToken(nextToken);
    setBusy(true);
    loginMessage('მოწმდება…');
    try {
      await fetchAll();
      showDashboard();
      showMessage('');
      toast(`${listings.length} ჩანაწერი ჩაიტვირთა.`);
    } catch (error) {
      if (!handleAuthError(error)) {
        showLogin(error.status
          ? `სერვერის შეცდომა (${error.status}). სცადე ხელახლა.`
          : 'სერვერთან დაკავშირება ვერ მოხდა. გახსენი საიტი Cloudflare-ზე ან გაუშვი ლოკალური სერვერი.');
      }
      if (error.status === 401 || error.status === 503) saveToken('');
    } finally {
      setBusy(false);
    }
  }

  async function refresh(options = {}) {
    if (busy) return;
    setBusy(true);
    if (!options.quiet) showMessage('იტვირთება…');
    try {
      await fetchAll();
      showMessage('');
    } catch (error) {
      if (!handleAuthError(error)) {
        showMessage(error.status ? `განახლება ვერ მოხერხდა (${error.status}).` : 'სერვერთან დაკავშირება ვერ მოხდა.', true);
      }
    } finally {
      setBusy(false);
    }
  }

  function formatDate(value) {
    const raw = String(value || '');
    if (!raw) return '';
    const date = new Date(raw.includes('T') ? raw : raw.replace(' ', 'T') + 'Z');
    if (Number.isNaN(date.getTime())) return raw;
    return date.toLocaleDateString('ka-GE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function counts() {
    const result = { all: listings.length, pending: 0, published: 0, rejected: 0 };
    listings.forEach(listing => { if (result[listing.status] !== undefined) result[listing.status] += 1; });
    return result;
  }

  function matchesSearch(listing) {
    if (!searchQuery) return true;
    const hay = [listing.name, listing.city, listing.neighborhood, listing.phone, listing.email, listing.category]
      .join(' ').toLocaleLowerCase('ka');
    return searchQuery.split(/\s+/).every(word => hay.includes(word));
  }

  function visibleListings() {
    return listings
      .filter(listing => activeFilter === 'all' || listing.status === activeFilter)
      .filter(matchesSearch)
      .sort((a, b) => {
        const rank = status => status === 'pending' ? 0 : status === 'published' ? 1 : 2;
        return rank(a.status) - rank(b.status) || String(b.created_at || '').localeCompare(String(a.created_at || ''));
      });
  }

  function renderStats() {
    const value = counts();
    $('#statTotal').textContent = value.all;
    $('#statPending').textContent = value.pending;
    $('#statPublished').textContent = value.published;
    $('#statRejected').textContent = value.rejected;
    $('#tabAll').textContent = value.all;
    $('#tabPending').textContent = value.pending;
    $('#tabPublished').textContent = value.published;
    $('#tabRejected').textContent = value.rejected;
    $('#tabRequests').textContent = requests.filter(item => item.status === 'new').length;
    $('#tabCodes').textContent = codes.filter(item => !item.used_at).length;
    $('#adminSubtitle').textContent = `${value.all} ჩანაწერი · ${value.pending} მოლოდინში · ${requests.filter(item => item.status === 'new').length} მოთხოვნა`;
  }

  function row(listing) {
    const status = listing.status || 'pending';
    const website = listing.website
      ? `<a href="${esc(listing.website)}" target="_blank" rel="noopener noreferrer">${esc(String(listing.website).replace(/^https?:\/\//i, ''))}</a>`
      : '';
    const email = listing.email ? `<span>${esc(listing.email)}</span>` : '';

    const actions = [];
    if (status !== 'published') actions.push(`<button class="icon-button publish" type="button" data-action="publish">${icon('check')}გამოქვეყნება</button>`);
    if (status !== 'rejected') actions.push(`<button class="icon-button" type="button" data-action="reject">${icon('eye-off')}${status === 'pending' ? 'უარყოფა' : 'დამალვა'}</button>`);
    actions.push(`<button class="icon-button ${listing.sponsored ? 'starred' : ''}" type="button" data-action="sponsor">${icon('star')}${listing.sponsored ? 'მოხსნა' : 'გამორჩეული'}</button>`);
    actions.push(`<button class="icon-button danger" type="button" data-action="delete">${icon('trash')}წაშლა</button>`);

    return `
      <article class="admin-row" data-id="${Number(listing.id)}">
        <div class="admin-name">
          <b>${esc(listing.name)}</b>
          <p>${esc(listing.description || '')}</p>
          <small>#${Number(listing.id)} · ${esc(formatDate(listing.created_at))}</small>
        </div>
        <div class="admin-place">
          ${esc(listing.city || '—')} · ${esc(listing.neighborhood || '')}
          <small>${esc(listing.category || '')}</small>
        </div>
        <div class="admin-contact">
          <span>${esc(listing.phone || '')}</span>
          ${email}
          ${website}
        </div>
        <div class="admin-status-cell">
          <span class="status-pill ${esc(status)}">${esc(STATUS_LABELS[status] || status)}</span>
          ${listing.sponsored ? '<span class="status-pill sponsored">გამორჩეული</span>' : ''}
          ${listing.sponsored && listing.expires_at ? `<span class="admin-expiry">ვადა: ${esc(formatDate(listing.expires_at))}</span>` : ''}
          <div class="admin-actions">${actions.join('')}</div>
        </div>
      </article>`;
  }

  const REQUEST_LABELS = { new: 'ახალი', approved: 'დამტკიცებული', rejected: 'უარყოფილი' };
  const digits = value => String(value || '').replace(/\D/g, '');

  function requestRow(request) {
    const status = request.status || 'new';
    const linked = listings.find(item => Number(item.id) === Number(request.listing_id));
    const options = listings.map(item => {
      const selected = digits(item.phone) === digits(request.phone) ? ' selected' : '';
      return `<option value="${Number(item.id)}"${selected}>${esc(item.name)} — ${esc(item.city || '')}</option>`;
    }).join('');
    const monthsOptions = [1, 3, 12].map(months => {
      const price = months === 1 ? 7 : months === 3 ? 19 : 59;
      return `<option value="${months}"${Number(request.months) === months ? ' selected' : ''}>${months} თვე · ${price} ₾</option>`;
    }).join('');

    const actions = status === 'new'
      ? `<div class="request-actions">
           <select class="request-select" data-role="listing" aria-label="ბიზნესი">
             ${options || '<option value="">— ბიზნესი არ არის —</option>'}
           </select>
           <select class="request-select" data-role="months" aria-label="ვადა">${monthsOptions}</select>
           <button class="icon-button publish" type="button" data-action="approve-request">${icon('check')}გააქტიურება</button>
           <button class="icon-button" type="button" data-action="reject-request">${icon('eye-off')}უარყოფა</button>
         </div>`
      : '';

    return `
      <article class="admin-row request-row" data-request-id="${Number(request.id)}">
        <div class="admin-name">
          <b>${esc(request.business_name)}</b>
          <p>${esc(request.note || '—')}</p>
          <small>#${Number(request.id)} · ${esc(formatDate(request.created_at))}</small>
        </div>
        <div class="admin-place">
          ${Number(request.months)} თვე · ${Number(request.price)} ₾
          <small>${linked ? 'დაკავშირებულია: ' + esc(linked.name) : 'ბიზნესი ჯერ არ არის დაკავშირებული'}</small>
        </div>
        <div class="admin-contact">
          <span>${esc(request.phone || '')}</span>
          ${request.email ? `<span>${esc(request.email)}</span>` : ''}
        </div>
        <div class="admin-status-cell">
          <span class="status-pill ${status === 'approved' ? 'published' : status === 'rejected' ? 'rejected' : 'pending'}">${esc(REQUEST_LABELS[status] || status)}</span>
          ${actions}
        </div>
      </article>`;
  }

  function renderRequests() {
    const found = requests.filter(request => {
      if (!searchQuery) return true;
      const hay = [request.business_name, request.phone, request.email, request.note]
        .join(' ').toLocaleLowerCase('ka');
      return searchQuery.split(/\s+/).every(word => hay.includes(word));
    });
    $('#adminList').innerHTML = found.map(requestRow).join('');
    $('#adminList').hidden = found.length === 0;
    $('#adminEmpty').hidden = found.length !== 0;

    if (!found.length) {
      $('#adminEmptyTitle').textContent = 'მოთხოვნები ჯერ არ არის';
      $('#adminEmptyDesc').textContent = 'როცა ბიზნესი გამორჩეულ განთავსებას მოითხოვს, მოთხოვნა აქ გამოჩნდება.';
    }
  }

  function codeRow(item) {
    const used = Boolean(item.used_at);
    return `
      <article class="admin-row code-row" data-code-id="${Number(item.id)}">
        <div class="admin-name">
          <b class="code-value">${esc(item.display || item.code)}</b>
          <p class="code-sub">#${Number(item.id)} · ${esc(formatDate(item.created_at))}</p>
        </div>
        <div class="admin-place">
          ${Number(item.months)} თვე · ${Number(item.price)} ₾
          <small>${used ? 'გამოყენებული' : 'გამოსაყენებელი'}</small>
        </div>
        <div class="admin-contact">
          <span class="code-used">${used ? esc(item.used_by_email || '—') : 'ჯერ არავის გამოუყენებია'}</span>
          ${item.listing_name ? `<span class="code-used">${esc(item.listing_name)}</span>` : ''}
        </div>
        <div class="admin-status-cell">
          <span class="status-pill ${used ? 'published' : 'pending'}">${used ? 'გამოყენებული' : 'აქტიური'}</span>
          <div class="code-actions">
            ${used ? '' : `<button class="icon-button" type="button" data-action="copy-code" data-code="${esc(item.display || item.code)}">${icon('check')}კოპირება</button>`}
            ${used ? '' : `<button class="icon-button danger" type="button" data-action="delete-code">${icon('trash')}წაშლა</button>`}
          </div>
        </div>
      </article>`;
  }

  function renderCodes() {
    const found = codes.filter(item => {
      if (!searchQuery) return true;
      const hay = [item.display, item.code, item.used_by_email, item.listing_name, item.months]
        .join(' ').toLocaleLowerCase('ka');
      return searchQuery.split(/\s+/).every(word => hay.includes(word));
    });

    const panel = `
      <div class="codes-panel">
        <div class="codes-toolbar">
          <div>
            <b>ერთჯერადი კოდების გენერაცია</b>
            <p>აირჩიე ვადა — კოდი გამოჩნდება სიაში. გაუგზავნე კლიენტს WhatsApp-ზე გადახდის შემდეგ. თითო კოდი მხოლოდ ერთხელ მუშაობს და თავად განსაზღვრავს ვადას.</p>
          </div>
          <div class="codes-generate">
            <button type="button" data-action="generate-code" data-months="1">${icon('plus')}1 თვე · 7 ₾</button>
            <button type="button" class="alt" data-action="generate-code" data-months="3">${icon('plus')}3 თვე · 19 ₾</button>
            <button type="button" data-action="generate-code" data-months="12">${icon('plus')}12 თვე · 59 ₾</button>
          </div>
        </div>
      </div>`;

    $('#adminList').innerHTML = panel + found.map(codeRow).join('');
    $('#adminList').hidden = false;
    $('#adminEmpty').hidden = found.length !== 0;
    if (!found.length) {
      $('#adminEmptyTitle').textContent = 'კოდები ჯერ არ არის';
      $('#adminEmptyDesc').textContent = 'ზემოთ აირჩიე ვადა და დააგენერირე პირველი კოდი.';
    }
  }

  function renderList() {
    if (activeFilter === 'codes') { renderCodes(); return; }
    if (activeFilter === 'requests') { renderRequests(); return; }
    const found = visibleListings();
    $('#adminList').innerHTML = found.map(row).join('');
    $('#adminList').hidden = found.length === 0;
    $('#adminEmpty').hidden = found.length !== 0;

    if (!found.length) {
      if (listings.length === 0) {
        $('#adminEmptyTitle').textContent = 'ჩანაწერები ჯერ არ არის';
        $('#adminEmptyDesc').textContent = 'როცა ბიზნესი დამატების მოთხოვნას გამოგზავნის, ის აქ გამოჩნდება.';
      } else {
        $('#adminEmptyTitle').textContent = 'შედეგი ვერ მოიძებნა';
        $('#adminEmptyDesc').textContent = 'შეცვალე ძიება ან აირჩიე სხვა სტატუსი.';
      }
    }
  }

  function renderTabs() {
    $$('#tabs button').forEach(button => {
      const active = button.dataset.filter === activeFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
  }

  function renderAll() {
    renderStats();
    renderTabs();
    renderList();
  }

  async function updateListing(id, changes) {
    if (busy) return;
    setBusy(true);
    try {
      await api('/api/admin/listings', { method: 'PATCH', body: JSON.stringify({ id, ...changes }) });
      const listing = listings.find(item => Number(item.id) === Number(id));
      if (listing) Object.assign(listing, changes);
      renderAll();
      if (changes.status) toast(changes.status === 'published' ? 'ბიზნესი გამოქვეყნდა.' : 'ბიზნესი დამალულია.');
      else if (typeof changes.sponsored === 'boolean') toast(changes.sponsored ? 'ბიზნესი გამორჩეულად მოინიშნა.' : 'გამორჩეულობა მოიხსნა.');
      showMessage('');
    } catch (error) {
      if (!handleAuthError(error)) showMessage(error.status ? `მოქმედება ვერ შესრულდა (${error.status}).` : 'სერვერთან დაკავშირება ვერ მოხდა.', true);
    } finally {
      setBusy(false);
    }
  }

  async function decideRequest(id, payload) {
    if (busy) return;
    setBusy(true);
    try {
      await api('/api/admin/placements', { method: 'PATCH', body: JSON.stringify({ id, ...payload }) });
      await fetchAll();
      toast(payload.action === 'approve' ? 'განთავსება გააქტიურდა.' : 'მოთხოვნა უარყოფილია.');
      showMessage('');
    } catch (error) {
      if (!handleAuthError(error)) {
        showMessage(error.status ? `მოქმედება ვერ შესრულდა (${error.status}).` : 'სერვერთან დაკავშირება ვერ მოხდა.', true);
      }
    } finally {
      setBusy(false);
    }
  }

  async function generateCode(months) {
    if (busy) return;
    setBusy(true);
    try {
      const data = await api('/api/admin/codes', { method: 'POST', body: JSON.stringify({ months }) });
      codes.unshift({ ...data.code, used_by_email: null, listing_name: null });
      activeFilter = 'codes';
      showMessage('');
      toast(`კოდი შეიქმნა: ${data.code.display}`);
    } catch (error) {
      if (!handleAuthError(error)) {
        showMessage(error.status ? `კოდის შექმნა ვერ მოხერხდა (${error.status}).` : 'სერვერთან დაკავშირება ვერ მოხდა.', true);
      }
    } finally {
      setBusy(false);
      renderAll();
    }
  }

  async function deleteCode(id) {
    if (busy) return;
    setBusy(true);
    try {
      await api('/api/admin/codes', { method: 'DELETE', body: JSON.stringify({ id }) });
      codes = codes.filter(item => Number(item.id) !== Number(id));
      showMessage('');
    } catch (error) {
      if (!handleAuthError(error)) {
        showMessage(error.status ? `კოდის წაშლა ვერ მოხერხდა (${error.status}).` : 'სერვერთან დაკავშირება ვერ მოხდა.', true);
      }
    } finally {
      setBusy(false);
      renderAll();
    }
  }

  async function copyCode(code) {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      toast(`დაკოპირებულია: ${code}`);
      return;
    } catch { /* fall through to legacy copy */ }
    try {
      const area = document.createElement('textarea');
      area.value = code;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-1000px';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand('copy');
      area.remove();
      if (!copied) throw new Error('copy failed');
      toast(`დაკოპირებულია: ${code}`);
    } catch {
      showMessage(`კოპირება ვერ მოხდა. კოდი: ${code}`, true);
    }
  }

  function openDelete(listing) {
    pendingDelete = listing;
    $('#deleteName').textContent = `„${listing.name}“`;
    $('#deleteDialog').showModal();
  }

  function closeDelete() {
    pendingDelete = null;
    $('#deleteDialog').close();
  }

  async function confirmDelete() {
    if (!pendingDelete || busy) return;
    const id = Number(pendingDelete.id);
    const name = pendingDelete.name;
    setBusy(true);
    try {
      await api('/api/admin/listings', { method: 'DELETE', body: JSON.stringify({ id }) });
      listings = listings.filter(item => Number(item.id) !== id);
      closeDelete();
      renderAll();
      toast(`„${name}“ წაიშალა.`);
      showMessage('');
    } catch (error) {
      closeDelete();
      if (!handleAuthError(error)) showMessage(error.status ? `წაშლა ვერ მოხერხდა (${error.status}).` : 'სერვერთან დაკავშირება ვერ მოხდა.', true);
    } finally {
      setBusy(false);
    }
  }

  /* ---------- events ---------- */
  $('#loginForm').addEventListener('submit', event => {
    event.preventDefault();
    connect($('#tokenInput').value);
  });

  $('#logoutButton').addEventListener('click', () => {
    saveToken('');
    listings = [];
    $('#tokenInput').value = '';
    $('#adminList').innerHTML = '';
    showLogin('სესიიდან გამოხვედი.');
  });

  $('#refreshButton').addEventListener('click', () => refresh());
  $('#refreshIcon').addEventListener('click', () => refresh());

  $('#adminSearch').addEventListener('input', event => {
    searchQuery = event.target.value.trim().toLocaleLowerCase('ka');
    renderList();
  });

  $('#tabs').addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    activeFilter = button.dataset.filter;
    renderTabs();
    renderList();
  });

  $('#adminList').addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const codeAction = button.dataset.action;
    if (codeAction === 'generate-code') {
      generateCode(Number(button.dataset.months));
      return;
    }
    if (codeAction === 'copy-code') {
      copyCode(button.dataset.code || '');
      return;
    }
    const codeRow = button.closest('[data-code-id]');
    if (codeRow) {
      if (codeAction === 'delete-code') deleteCode(Number(codeRow.dataset.codeId));
      return;
    }

    const requestRow = button.closest('.request-row');
    if (requestRow) {
      const requestId = Number(requestRow.dataset.requestId);
      const request = requests.find(item => Number(item.id) === requestId);
      if (!request) return;

      if (button.dataset.action === 'approve-request') {
        const listingId = Number(requestRow.querySelector('[data-role="listing"]')?.value);
        const months = Number(requestRow.querySelector('[data-role="months"]')?.value);
        if (!listingId) {
          showMessage('აირჩიე ბიზნესი, რომელსაც განთავსება გააქტიურდება.', true);
          return;
        }
        decideRequest(requestId, { action: 'approve', listing_id: listingId, months });
      } else if (button.dataset.action === 'reject-request') {
        decideRequest(requestId, { action: 'reject' });
      }
      return;
    }

    const row = button.closest('[data-id]');
    const id = Number(row?.dataset.id);
    const listing = listings.find(item => Number(item.id) === id);
    if (!listing) return;

    const action = button.dataset.action;
    if (action === 'publish') updateListing(id, { status: 'published' });
    else if (action === 'reject') updateListing(id, { status: 'rejected' });
    else if (action === 'sponsor') updateListing(id, { sponsored: !listing.sponsored });
    else if (action === 'delete') openDelete(listing);
  });

  $('#cancelDelete').addEventListener('click', closeDelete);
  $('#confirmDelete').addEventListener('click', confirmDelete);
  $('#deleteDialog').addEventListener('click', event => {
    if (event.target === $('#deleteDialog')) closeDelete();
  });

  /* ---------- boot ---------- */
  if (token) {
    connect(token);
  } else {
    showLogin('');
  }
})();
