/* Ipove — business account page */
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const field = (form, name) => form.querySelector(`[name="${name}"]`);

  const I18N = {
    en: {
      back: 'Back to site',
      pricing: 'Plans',
      kicker: 'Business account',
      title: 'Manage your business<br><em>and your placement.</em>',
      lead: 'Create a profile, get your first month free, and keep your placement active with a one-time code.',
      loginTab: 'Sign in',
      registerTab: 'Register',
      continueWithGoogle: 'Continue with Google',
      or: 'or',
      email: 'Email',
      password: 'Password',
      passwordHint: 'At least 8 characters.',
      continue: 'Continue',
      createAccount: 'Create account',
      signedIn: 'Signed in as',
      logout: 'Sign out',
      businessTitle: 'Your business',
      businessDesc: 'Reviewed by the admin before it goes live.',
      name: 'Business name',
      category: 'Category',
      city: 'City',
      address: 'Neighborhood / address',
      phone: 'Phone',
      emailOptional: 'Email (optional)',
      website: 'Website or social link',
      linkLocked: 'Available after payment',
      linkUnlocked: 'Link unlocked',
      description: 'What do you offer?',
      saveBusiness: 'Save business',
      placementTitle: 'Placement',
      placementDesc: 'Your current status and expiry date.',
      month: 'month',
      months: 'months',
      orderPlans: 'See plans and order',
      orderViaWhatsapp: 'Order code via WhatsApp',
      viewOnSite: 'View business on site',
      trialSuccessRedirect: '1 month free activated! Redirecting to site...',
      trialCta: '1 month free',
      trialUsed: 'Free month already used',
      codeTitle: 'Activation code',
      codeDesc: 'After payment you receive a one-time code. Enter it here.',
      codeLabel: 'Code',
      activate: 'Activate',
      codeHint: 'Each code works once and automatically activates the duration it was issued for (1, 3 or 12 months).',
      noBusiness: 'No business yet',
      noPlacement: 'No active placement',
      active: 'Active',
      trial: 'Free trial',
      paidPlan: 'Paid placement (Featured)',
      until: 'until',
      expired: 'Expired — enter a new code',
      pending: 'Pending review',
      published: 'Published',
      rejected: 'Hidden',
      notActive: 'Not active yet',
      statusLabel: 'Status',
      planLabel: 'Plan',
      expiryLabel: 'Valid until',
      trialHintNoBusiness: 'Create your business first.',
      trialHintPending: 'Claimed: your free month will be visible once approved.',
      trialHintRejected: 'Your business is hidden — fix the details and save it again.',
      trialHintActive: 'A placement is already active.',
      trialHintUsed: 'The free month has already been used on this account.',
      trialHintReady: 'No card needed — your first month is free.',
      saveFirst: 'Save your business first.',
      reviewNote: 'It will be published after admin approval. The free month starts after approval.',
      saved: 'Saved. The admin will review it.',
      updated: 'Updated.',
      activatedMonths: 'Activated for {n} months.',
      codeNeedsBusiness: 'Save your business before activating a code.',
      loginFailed: 'Could not sign in.',
      registerFailed: 'Could not create the account.',
      wrongCredentials: 'Wrong email or password.',
      emailTaken: 'This email is already registered.',
      genericError: 'Something went wrong. Please try again.',
      passwordShort: 'Password must be at least 8 characters.',
      invalidEmail: 'Enter a valid email address.',
      googleNotConfigured: 'Google Sign-In is not configured yet. Please use email and password in the meantime.',
      googleAuthFailed: 'Google sign in failed. Please try again.',
      expiredBannerTitle: 'Your placement has expired',
      choosePlans: 'Choose a plan',
      tabPlans: 'Plans & code',
      tabBusiness: 'My business',
      addBusinessFirst: 'Add your business first',
      expiredBannerText: 'Your business is hidden from the catalog and nobody can see it until you activate a plan. Buy a plan and enter the activation code below.',
      dateLocale: 'en-GB'
    },
    ka: {
      back: 'საიტზე დაბრუნება',
      pricing: 'პაკეტები',
      kicker: 'ბიზნეს ანგარიში',
      title: 'მართე შენი ბიზნესი<br><em>და განთავსება.</em>',
      lead: 'შექმენი პროფილი, მიიღე პირველი თვე უფასოდ და შეინარჩუნე განთავსება ერთჯერადი კოდით.',
      loginTab: 'შესვლა',
      registerTab: 'რეგისტრაცია',
      continueWithGoogle: 'Google-ით გაგრძელება',
      or: 'ან',
      email: 'ელფოსტა',
      password: 'პაროლი',
      passwordHint: 'მინიმუმ 8 სიმბოლო.',
      continue: 'გაგრძელება',
      createAccount: 'ანგარიშის შექმნა',
      signedIn: 'შესული ხარ როგორც',
      logout: 'გასვლა',
      businessTitle: 'შენი ბიზნესი',
      businessDesc: 'გამოქვეყნებამდე ადმინი ამოწმებს.',
      name: 'ბიზნესის სახელი',
      category: 'კატეგორია',
      city: 'ქალაქი',
      address: 'უბანი / მისამართი',
      phone: 'ტელეფონი',
      emailOptional: 'ელფოსტა (არასავალდებულო)',
      website: 'ვებსაიტი ან სოციალური ლინკი',
      linkLocked: 'გაიხსნება გადახდის შემდეგ',
      linkUnlocked: 'ლინკი გახსნილია',
      description: 'რას სთავაზობ კლიენტებს?',
      saveBusiness: 'ბიზნესის შენახვა',
      placementTitle: 'განთავსება',
      placementDesc: 'მიმდინარე სტატუსი და ვადა.',
      month: 'თვე',
      months: 'თვე',
      orderPlans: 'პაკეტების ნახვა და შეკვეთა',
      orderViaWhatsapp: 'პაკეტის შეძენა WhatsApp-ზე',
      viewOnSite: 'ბიზნესის საიტზე ნახვა',
      trialSuccessRedirect: '1 თვე უფასოდ გააქტიურდა! გადავდივართ საიტზე...',
      trialCta: '1 თვე უფასოდ',
      trialUsed: 'უფასო თვე უკვე გამოყენებულია',
      codeTitle: 'გააქტიურების კოდი',
      codeDesc: 'გადახდის შემდეგ მიიღებ ერთჯერად კოდს. ჩაწერე აქ.',
      codeLabel: 'კოდი',
      activate: 'გააქტიურება',
      codeHint: 'თითო კოდი მხოლოდ ერთხელ მუშაობს და ავტომატურად ააქტიურებს შესაბამის ვადას (1, 3 ან 12 თვე).',
      noBusiness: 'ბიზნესი ჯერ არ გაქვს',
      noPlacement: 'აქტიური განთავსება არ არის',
      active: 'აქტიური',
      trial: 'უფასო საცდელი',
      paidPlan: 'ფასიანი განთავსება (გამორჩეული)',
      until: 'ვადა',
      expired: 'ვადა ამოიწურა — შეიყვანე ახალი კოდი',
      pending: 'მოლოდინში',
      published: 'გამოქვეყნებული',
      rejected: 'დამალული',
      notActive: 'ჯერ არააქტიურია',
      statusLabel: 'სტატუსი',
      planLabel: 'პაკეტი',
      expiryLabel: 'მოქმედებს',
      trialHintNoBusiness: 'ჯერ შექმენი ბიზნესი.',
      trialHintPending: 'უფასო თვე გააქტიურებულია — საიტზე გამოჩნდება ადმინის დადასტურების შემდეგ.',
      trialHintRejected: 'ბიზნესი დამალულია — შეასწორე და ხელახლა შეინახე.',
      trialHintActive: 'განთავსება უკვე აქტიურია.',
      trialHintUsed: 'უფასო თვე ამ ანგარიშზე უკვე გამოყენებულია.',
      trialHintReady: 'ბარათი არ სჭირდება — პირველი თვე უფასოა.',
      saveFirst: 'ჯერ შეინახე ბიზნესი.',
      reviewNote: 'გამოქვეყნდება ადმინის დადასტურების შემდეგ. უფასო თვე დაიწყება დადასტურების შემდეგ.',
      saved: 'შენახულია. ადმინი გადაამოწმებს.',
      updated: 'განახლებულია.',
      activatedMonths: 'გააქტიურდა {n} თვით.',
      codeNeedsBusiness: 'კოდის გააქტიურებამდე შეინახე ბიზნესი.',
      loginFailed: 'შესვლა ვერ მოხდა.',
      registerFailed: 'ანგარიშის შექმნა ვერ მოხდა.',
      wrongCredentials: 'ელფოსტა ან პაროლი არასწორია.',
      emailTaken: 'ეს ელფოსტა უკვე რეგისტრირებულია.',
      genericError: 'რაღაც ვერ გამოვიდა. სცადე ხელახლა.',
      passwordShort: 'პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო.',
      invalidEmail: 'შეიყვანე სწორი ელფოსტა.',
      googleNotConfigured: 'Google-ით შესვლის გასააქტიურებლად Cloudflare-ში დაამატეთ GOOGLE_CLIENT_ID. მანამდე შეგიძლიათ გამოიყენოთ ელფოსტა და პაროლი.',
      googleAuthFailed: 'Google-ით შესვლა ვერ მოხერხდა. სცადეთ ხელახლა.',
      expiredBannerTitle: 'თქვენი განთავსების ვადა ამოიწურა',
      choosePlans: 'აირჩიე პაკეტი',
      tabPlans: 'პაკეტები და კოდი',
      tabBusiness: 'ჩემი ბიზნესი',
      addBusinessFirst: 'ჯერ დაამატე ბიზნესი',
      expiredBannerText: 'თქვენი ბიზნესი დამალულია კატალოგიდან და არავის უჩანს, სანამ პაკეტს არ გაააქტიურებთ. შეიძინეთ პაკეტი და ჩაწერეთ აქტივაციის კოდი ქვემოთ.',
      dateLocale: 'ka-GE'
    }
  };

  const CATEGORIES = [
    { value: 'კვება', en: 'Food & drink', ka: 'კვება' },
    { value: 'სილამაზე', en: 'Beauty', ka: 'სილამაზე' },
    { value: 'რემონტი', en: 'Repairs', ka: 'რემონტი' },
    { value: 'ჯანმრთელობა', en: 'Health', ka: 'ჯანმრთელობა' },
    { value: 'სწავლა', en: 'Education', ka: 'სწავლა' },
    { value: 'მაღაზია', en: 'Shop', ka: 'მაღაზია' },
    { value: 'სხვა სერვისი', en: 'Other services', ka: 'სხვა სერვისი' }
  ];

  const CITIES = [
    { value: 'თბილისი', en: 'Tbilisi', ka: 'თბილისი' },
    { value: 'ბათუმი', en: 'Batumi', ka: 'ბათუმი' },
    { value: 'ქუთაისი', en: 'Kutaisi', ka: 'ქუთაისი' },
    { value: 'რუსთავი', en: 'Rustavi', ka: 'რუსთავი' },
    { value: 'ზუგდიდი', en: 'Zugdidi', ka: 'ზუგდიდი' },
    { value: 'სხვა', en: 'Other', ka: 'სხვა' }
  ];

  let lang = 'en';
  try { lang = localStorage.getItem('ipove-lang') === 'ka' ? 'ka' : 'en'; } catch { lang = 'en'; }

  const dict = () => I18N[lang];

  // Georgian -> GEL, English -> USD
  const PRICES_GEL = { 1: 7, 3: 19, 12: 59 };
  const PRICES_USD = { 1: 2.5, 3: 7, 12: 22 };
  const WHATSAPP_NUMBER = '995574144835';
  const priceText = months => {
    const value = (lang === 'ka' ? PRICES_GEL : PRICES_USD)[months];
    const n = Number.isInteger(value) ? String(value) : value.toFixed(2);
    return lang === 'ka' ? `${n} ₾` : `$${n}`;
  };
  const intentGet = () => { try { return sessionStorage.getItem('ipove-intent'); } catch { return null; } };
  const intentSet = value => { try { sessionStorage.setItem('ipove-intent', value); } catch { /* ignore */ } };
  const intentClear = () => { try { sessionStorage.removeItem('ipove-intent'); } catch { /* ignore */ } };
  const state = {
    user: null,
    listings: [],
    listing: null,
    mode: 'login',
    dirty: false,
    googleClientId: '',
    selectedMonths: 3
  };
  let toastTimer;

  function toast(message) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  function setMessage(el, text, tone = '') {
    if (!el) return;
    el.textContent = text || '';
    el.classList.toggle('is-error', tone === 'error');
    el.classList.toggle('is-ok', tone === 'ok');
    el.classList.toggle('is-info', tone === 'info');
  }

  function formatDate(value) {
    if (!value) return '';
    const raw = String(value);
    const date = new Date(raw.includes('T') ? raw : raw.replace(' ', 'T') + 'Z');
    if (Number.isNaN(date.getTime())) return raw;
    return date.toLocaleDateString(dict().dateLocale, { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  async function api(path, options = {}) {
    const headers = { Accept: 'application/json', ...(options.headers || {}) };
    if (options.body) headers['Content-Type'] = 'application/json';
    const response = await fetch(path, { ...options, headers, credentials: 'same-origin' });
    let body = {};
    try { body = await response.json(); } catch { body = {}; }
    if (!response.ok) {
      const error = new Error(body.error || `HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return body;
  }

  /* ---------- language ---------- */
  function applyLanguage() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      const text = dict()[el.dataset.i18n];
      if (text !== undefined) el.textContent = text;
    });
    $$('[data-i18n-html]').forEach(el => {
      const html = dict()[el.dataset.i18nHtml];
      if (html !== undefined) el.innerHTML = html;
    });
    $$('.lang-toggle button').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    renderSelects();
    $$('[data-acc-price]').forEach(el => { el.textContent = priceText(Number(el.dataset.accPrice)); });
    if (state.user) {
      $('#userEmail').textContent = state.user.email;
      renderBusinessForm(!state.dirty);
      renderPlacement();
      setMode(state.mode);
    }
    updateWhatsappLinks();
  }

  $$('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      lang = btn.dataset.lang === 'ka' ? 'ka' : 'en';
      try { localStorage.setItem('ipove-lang', lang); } catch { /* ignore */ }
      applyLanguage();
    });
  });

  function renderSelects() {
    const form = $('#businessForm');
    if (!form) return;
    const catSelect = field(form, 'category');
    const citySelect = field(form, 'city');
    const catVal = catSelect.value;
    const cityVal = citySelect.value;

    catSelect.innerHTML = CATEGORIES.map(c => `<option value="${c.value}">${c[lang] || c.value}</option>`).join('');
    citySelect.innerHTML = CITIES.map(c => `<option value="${c.value}">${c[lang] || c.value}</option>`).join('');

    if (catVal) catSelect.value = catVal;
    if (cityVal) citySelect.value = cityVal;
  }

  /* ---------- auth & tabs ---------- */
  function setMode(mode) {
    state.mode = mode;
    $$('.acc-tabs button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    const submit = $('#authSubmit span');
    if (submit) {
      submit.textContent = mode === 'login' ? dict().continue : dict().createAccount;
    }
    setMessage($('#authMessage'), '');
  }

  $$('.acc-tabs button').forEach(btn => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  function showAuth() {
    $('#authView').hidden = false;
    $('#dashboardView').hidden = true;
  }

  // #business -> only the business form; otherwise only plans / free month / code
  function applyView() {
    const business = window.location.hash === '#business';
    const card = $('#businessCard');
    const side = $('#accSide');
    if (card) card.hidden = !business;
    if (side) side.hidden = business;
    $('#tabBusiness')?.classList.toggle('active', business);
    $('#tabPlans')?.classList.toggle('active', !business);
  }
  window.addEventListener('hashchange', applyView);

  function showDashboard() {
    $('#authView').hidden = true;
    $('#dashboardView').hidden = false;
    applyView();
  }

  /* ---------- Google Sign-In ---------- */
  let tokenClient = null;

  function waitForGoogle(timeout = 6000) {
    return new Promise(resolve => {
      if (window.google?.accounts?.id || window.google?.accounts?.oauth2) return resolve(true);
      const start = Date.now();
      const timer = setInterval(() => {
        if (window.google?.accounts?.id || window.google?.accounts?.oauth2) {
          clearInterval(timer);
          resolve(true);
        } else if (Date.now() - start > timeout) {
          clearInterval(timer);
          resolve(false);
        }
      }, 50);
    });
  }

  async function setupGoogleAuth() {
    try {
      const cfg = await api('/api/auth/config').catch(() => ({ googleClientId: '' }));
      state.googleClientId = cfg.googleClientId || '';
    } catch {
      state.googleClientId = '';
    }

    const customBtn = $('#googleCustomBtn');
    const container = $('#googleGsiContainer');

    if (!state.googleClientId) {
      if (customBtn) {
        customBtn.addEventListener('click', () => {
          setMessage($('#authMessage'), dict().googleNotConfigured, 'info');
        });
      }
      return;
    }

    // Wait until Google's client library finishes loading
    await waitForGoogle(6000);

    // Use only tokenClient (oauth2 implicit flow) — always shows full account picker
    // We do NOT use renderButton / GIS id flow to avoid Error 400 on "Use another account"
    if (window.google?.accounts?.oauth2) {
      try {
        tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: state.googleClientId,
          scope: 'email profile openid',
          prompt: 'select_account',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              setMessage($('#authMessage'), dict().googleAuthFailed, 'error');
              return;
            }
            if (tokenResponse.access_token) {
              await handleGoogleAccessToken(tokenResponse.access_token);
            }
          }
        });
      } catch (err) {
        console.warn('initTokenClient:', err);
      }
    }

    if (customBtn) {
      customBtn.addEventListener('click', () => {
        if (tokenClient) {
          tokenClient.requestAccessToken({ prompt: 'select_account' });
        } else {
          setMessage($('#authMessage'), dict().googleNotConfigured, 'info');
        }
      });
    }
  }

  async function handleGoogleAccessToken(accessToken) {
    const message = $('#authMessage');
    setMessage(message, '');
    try {
      const result = await api('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ access_token: accessToken })
      });
      await afterAuth(Boolean(result?.created || result?.isNew || result?.new));
    } catch (error) {
      setMessage(message, error.message || dict().googleAuthFailed, 'error');
    }
  }

  async function handleGoogleCredential(response) {
    const message = $('#authMessage');
    setMessage(message, '');
    try {
      const result = await api('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential: response.credential })
      });
      await afterAuth(Boolean(result?.created || result?.isNew || result?.new));
    } catch (error) {
      setMessage(message, error.message || dict().googleAuthFailed, 'error');
    }
  }

  /* After a successful sign-in/registration:
     - brand-new account  -> straight to the payment page (premium.html), no business form
     - existing account   -> stay signed in (cookie) and continue where the user left off */
  async function afterAuth(isNewAccount) {
    await loadAccount();
    if (intentGet() === 'trial') {
      if (!state.listing) window.location.hash = '#business';
      return;
    }
    if (isNewAccount || (!state.listings.length && !state.user?.freeTrialUsed && state.mode === 'register')) {
      window.location.assign('premium.html');
    }
  }

  async function runTrial(listing) {
    if (!listing) return;
    const button = $('#trialButton');
    if (button) button.disabled = true;
    intentClear();
    try {
      await api('/api/account/trial', { method: 'POST', body: JSON.stringify({ id: listing.id }) });
      toast(dict().trialSuccessRedirect);
      await loadAccount();
      setTimeout(() => { window.location.assign('index.html'); }, 1200);
    } catch (error) {
      toast(error.message || dict().genericError);
      if (button) button.disabled = false;
      renderPlacement();
    }
  }

  /* ---------- Email/Password Auth Form ---------- */
  $('#authForm').addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;
    const message = $('#authMessage');
    const submit = $('#authSubmit');

    if (!email || !email.includes('@')) {
      setMessage(message, dict().invalidEmail, 'error');
      form.email.focus();
      return;
    }
    if (password.length < 8) {
      setMessage(message, dict().passwordShort, 'error');
      form.password.focus();
      return;
    }

    submit.disabled = true;
    setMessage(message, '');
    const endpoint = state.mode === 'login' ? '/api/auth/login' : '/api/auth/register';

    try {
      await api(endpoint, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      form.reset();
      await afterAuth(state.mode === 'register');
    } catch (error) {
      const text = error.status === 401 ? dict().wrongCredentials
        : error.status === 409 ? dict().emailTaken
        : (error.message || dict().genericError);
      setMessage(message, text, 'error');
    } finally {
      submit.disabled = false;
    }
  });

  $('#logoutButton').addEventListener('click', async () => {
    try { await api('/api/auth/logout', { method: 'POST' }); } catch { /* ignore */ }
    state.user = null;
    state.listings = [];
    state.listing = null;
    showAuth();
    setMode('login');
  });

  /* ---------- business form ---------- */
  function renderBusinessForm(syncValues = true) {
    const form = $('#businessForm');
    const listing = state.listing;

    if (syncValues) {
      form.id.value = listing?.id || '';
      field(form, 'name').value = listing?.name || '';
      field(form, 'phone').value = listing?.phone || '';
      field(form, 'email').value = listing?.email || '';
      field(form, 'neighborhood').value = listing?.neighborhood || '';
      field(form, 'description').value = listing?.description || '';
      field(form, 'website').value = listing?.website || '';
    }

    const category = field(form, 'category');
    if (listing?.category) category.value = listing.category;
    else if (!category.value && CATEGORIES[0]) category.value = CATEGORIES[0].value;

    const city = field(form, 'city');
    if (listing?.city) city.value = listing.city;
    else if (!city.value && CITIES[0]) city.value = CITIES[0].value;

    const unlocked = Boolean(listing?.linkUnlocked);
    form.website.disabled = !unlocked;
    $('#websiteField').classList.toggle('is-locked', !unlocked);
    const lock = $('#websiteLock');
    lock.innerHTML = unlocked
      ? `<span data-i18n="linkUnlocked">${dict().linkUnlocked}</span>`
      : `<svg class="icon"><use href="#i-lock"/></svg><span data-i18n="linkLocked">${dict().linkLocked}</span>`;
    lock.classList.toggle('is-unlocked', unlocked);

    const statusEl = $('#businessStatus');
    if (!listing) {
      statusEl.textContent = '';
    } else {
      const label = dict()[listing.status] || listing.status;
      statusEl.innerHTML = `${dict().statusLabel}: <span class="pill ${listing.status}">${label}</span>`;
    }
  }

  $('#businessForm').addEventListener('input', () => { state.dirty = true; });

  $('#businessForm').addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = $('#businessMessage');
    const submit = $('#businessSubmit');
    const currentId = form.id.value;
    const isEdit = Boolean(currentId);

    const payload = {
      name: field(form, 'name').value.trim(),
      category: field(form, 'category').value,
      city: field(form, 'city').value,
      neighborhood: field(form, 'neighborhood').value.trim(),
      phone: field(form, 'phone').value.trim(),
      email: field(form, 'email').value.trim(),
      website: field(form, 'website').disabled ? '' : field(form, 'website').value.trim(),
      description: field(form, 'description').value.trim()
    };
    if (!payload.name || payload.name.length < 2) {
      setMessage(message, dict().genericError, 'error');
      return;
    }
    if (isEdit) payload.id = Number(currentId);
    submit.disabled = true;
    setMessage(message, '');
    try {
      await api('/api/account/listings', { method: 'POST', body: JSON.stringify(payload) });
      state.dirty = false;
      await loadAccount();
      setMessage($('#businessMessage'), isEdit ? dict().updated : dict().saved, 'ok');
      toast(isEdit ? dict().updated : dict().saved);
      if (!isEdit && intentGet() === 'trial' && state.listing && !state.user?.freeTrialUsed) {
        await runTrial(state.listing);
      }
    } catch (error) {
      if (error.status === 401) { showAuth(); setMode('login'); }
      setMessage(message, error.message || dict().genericError, 'error');
    } finally {
      submit.disabled = false;
    }
  });

  /* ---------- placement & expiration ---------- */
  function updateWhatsappLinks() {
    const listingName = state.listing?.name || '';
    const months = state.selectedMonths || 3;
    const price = priceText(months);
    const quote = listingName ? `"${listingName}"` : '';
    const msg = lang === 'ka'
      ? `გამარჯობა, მსურს იპოვე-ზე ${months}-თვიანი პაკეტის შეძენა (${price})${quote ? ` ჩემი ბიზნესისთვის ${quote}` : ''}.`
      : `Hello, I would like to buy a ${months}-month activation code (${price}) on Ipove${quote ? ` for my business ${quote}` : ''}.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    const planBtn = $('#planWhatsappBtn');
    if (planBtn) planBtn.href = url;

    const expiredBtn = $('#expiredWhatsappBtn');
    if (expiredBtn) expiredBtn.href = url;
  }

  function renderPlacement() {
    const listing = state.listing;
    const summary = $('#placementSummary');
    const trial = $('#trialButton');
    const hint = $('#trialHint');
    const expiredBanner = $('#expiredBanner');

    if (!listing) {
      summary.innerHTML = `<div class="acc-placement-row"><span>${dict().statusLabel}</span><b>${dict().noBusiness}</b></div>
        <p class="acc-placement-note"><a href="account.html#business">${dict().addBusinessFirst} →</a></p>`;
      trial.disabled = true;
      hint.textContent = dict().trialHintNoBusiness;
      if (expiredBanner) expiredBanner.hidden = true;
      return;
    }

    const isExpired = Boolean(listing.expires_at && !listing.active);
    if (expiredBanner) {
      expiredBanner.hidden = !isExpired;
    }

    const rows = [];
    rows.push(`<div class="acc-placement-row"><span>${dict().statusLabel}</span><b><span class="pill ${listing.status}">${dict()[listing.status] || listing.status}</span></b></div>`);

    if (listing.active) {
      const plan = listing.paid
        ? `${dict().paidPlan} · ${listing.plan_months} ${dict().months}`
        : `${dict().trial} · 1 ${dict().month}`;
      rows.push(`<div class="acc-placement-row"><span>${dict().planLabel}</span><b>${plan}</b></div>`);
      if (listing.expires_at) {
        rows.push(`<div class="acc-placement-row"><span>${dict().expiryLabel}</span><b>${formatDate(listing.expires_at)}</b></div>`);
      }
    } else if (isExpired) {
      rows.push(`<div class="acc-placement-row"><span>${dict().statusLabel}</span><b><span class="pill expired">${dict().expired}</span></b></div>`);
      if (listing.expires_at) {
        rows.push(`<div class="acc-placement-row"><span>${dict().expiryLabel}</span><b>${formatDate(listing.expires_at)} (${dict().expired})</b></div>`);
      }
    } else {
      rows.push(`<div class="acc-placement-row"><span>${dict().statusLabel}</span><b>${dict().notActive}</b></div>`);
    }

    summary.innerHTML = rows.join('');

    const trialUsed = Boolean(state.user?.freeTrialUsed);
    const active = Boolean(listing.active);

    trial.disabled = trialUsed || active;
    const label = active ? dict().active : trialUsed ? dict().trialUsed : dict().trialCta;
    trial.querySelector('span').textContent = label;

    const viewSiteBtn = $('#viewSiteBtn');
    if (viewSiteBtn) {
      viewSiteBtn.style.display = active ? 'inline-flex' : 'none';
    }

    if (active) hint.textContent = dict().trialHintActive;
    else if (trialUsed) hint.textContent = dict().trialHintUsed;
    else if (listing.status !== 'published') hint.textContent = dict().trialHintPending;
    else hint.textContent = dict().trialHintReady;

    updateWhatsappLinks();
  }

  /* Plan cards click handler */
  $$('.acc-plan').forEach(plan => {
    plan.addEventListener('click', () => {
      $$('.acc-plan').forEach(p => p.classList.remove('active-select'));
      plan.classList.add('active-select');
      state.selectedMonths = Number(plan.dataset.months) || 3;
      updateWhatsappLinks();
      const planBtn = $('#planWhatsappBtn');
      if (planBtn) {
        planBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  function renderDashboard() {
    if (!state.user) return;
    $('#userEmail').textContent = state.user.email;
    renderBusinessForm();
    renderPlacement();
    setMode(state.mode);
  }

  $('#trialButton').addEventListener('click', () => runTrial(state.listing));

  $('#codeForm').addEventListener('submit', async event => {
    event.preventDefault();
    const listing = state.listing;
    if (!listing) {
      setMessage($('#codeMessage'), dict().codeNeedsBusiness, 'info');
      return;
    }
    const input = $('#codeInput');
    const code = input.value.trim();
    if (!code) return;
    const button = $('#codeSubmit');
    button.disabled = true;
    setMessage($('#codeMessage'), '');
    try {
      const data = await api('/api/account/redeem', {
        method: 'POST',
        body: JSON.stringify({ code, id: listing.id })
      });
      input.value = '';
      const text = dict().activatedMonths.replace('{n}', data.months);
      await loadAccount();
      setMessage($('#codeMessage'), text, 'ok');
      toast(text + (lang === 'ka' ? ' გადავდივართ საიტზე...' : ' Redirecting to site...'));
      setTimeout(() => {
        window.location.assign('index.html');
      }, 1400);
    } catch (error) {
      setMessage($('#codeMessage'), error.message || dict().genericError, 'error');
    } finally {
      button.disabled = false;
    }
  });

  /* ---------- boot ---------- */
  async function loadAccount() {
    const data = await api('/api/auth/me');
    state.user = data.user;
    state.listings = Array.isArray(data.listings) ? data.listings : [];
    state.listing = state.listings[0] || null;
    state.dirty = false;
    showDashboard();
    applyLanguage();
    renderDashboard();
  }

  async function boot() {
    applyLanguage();
    setMode('login');
    renderSelects();
    setupGoogleAuth();
    try {
      await loadAccount();
      if (intentGet() === 'trial') {
        if (state.listing && !state.user?.freeTrialUsed) await runTrial(state.listing);
        else if (!state.listing) window.location.hash = '#business';
      }
    } catch (error) {
      if (error.status && error.status !== 401) {
        showAuth();
        setMessage($('#authMessage'), error.status === 503 ? 'Database is not configured.' : dict().genericError, 'error');
      } else {
        showAuth();
      }
    }
  }

  boot();
})();
