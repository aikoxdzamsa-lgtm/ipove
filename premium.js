/* იპოვე — paid placement page logic */
(() => {
  'use strict';

  // Keep in sync with functions/api/placement.js and admin.js.
  // Georgian language -> GEL (₾), English language -> USD ($).
  const PRICES_GEL = { 1: 7, 3: 19, 12: 59 };
  const PRICES_USD = { 1: 2.5, 3: 7, 12: 22 };
  const money = (value, cur) => {
    const n = Number.isInteger(value) ? String(value) : value.toFixed(2);
    return cur === 'ka' ? `${n} ₾` : `$${n}`;
  };
  const priceOf = (months, language) => (language === 'ka' ? PRICES_GEL : PRICES_USD)[months];
  const perMonth = (months, language) => {
    const per = priceOf(months, language) / months;
    const text = money(Number.isInteger(per) ? per : Math.round(per * 10) / 10, language);
    const approx = months === 1 ? '' : '≈ ';
    return language === 'ka' ? `${approx}${text} თვეში` : `${approx}${text} per month`;
  };
  const WHATSAPP_NUMBER = '995574144835';

  const I18N = {
    en: {
      back: 'Back to site',
      account: 'Account',
      kicker: 'For business owners',
      title: 'Be the first<br><em>they find.</em>',
      lead: 'A featured placement puts your business at the top of its category — exactly where customers look first.',
      trust1: 'Top of the category',
      trust2: '“Featured” badge',
      trust3: 'Reviewed before publishing',
      plan1: '1 month', plan3: '3 months', plan12: '12 months',
      trialTitle: '1 month free',
      trialDesc: 'Start for free: your business appears normally in the catalog for 31 days. After that it is hidden until you activate a plan.',
      trialBtn: '1 month free',
      trialNeedsLogin: 'Please sign in first.',
      trialUsed: 'The free month has already been used on this account.',
      trialStarted: '1 month free activated! Redirecting to the site…',
      plan1d: 'Try it and see the difference, with no long commitment.',
      plan3d: 'Enough time for customers to notice you.',
      plan12d: 'A full year at the top — the lowest monthly price.',
      popular: 'Popular', best: 'Best value',
      hasCodeTitle: 'Already have an activation code?',
      hasCodeDesc: 'Enter your code below. The system automatically detects the duration (1, 3, or 12 months) and activates your placement immediately.',
      activateCode: 'Activate',
      codeNeedsLogin: 'Please sign in to your account first.',
      codeNeedsBusiness: 'Please create your business profile before activating a code.',
      codeActivated: '🎉 Successfully activated for {n} months!',
      goToAccount: 'Go to Account',
      inclTitle: 'What you get',
      incl1: 'First position in your category and city',
      incl2: '“Featured” badge on your business card',
      incl3: 'Priority in search results',
      incl4: 'The period starts on the day your payment is confirmed',
      incl5: 'Cancel anytime — it stays active until the paid period ends',
      howTitle: 'How it works',
      step1: 'You send a request', step1d: 'The form takes about 30 seconds.',
      step2: 'We confirm and send an invoice', step2d: 'Bank transfer or business account.',
      step3: 'Live within 1 business day', step3d: 'You get confirmation by phone or email.',
      formKicker: 'Request',
      formTitle: 'Leave a request',
      formDesc: 'Fill in the form — we will contact you during business hours and confirm the details.',
      payNote: 'No card details are collected on this site. Payment is made by invoice, via bank transfer.',
      labelName: 'Business name', labelPhone: 'Phone', labelEmail: 'Email (optional)',
      labelPlan: 'Choose a period', labelNote: 'Note (optional)',
      notePlaceholder: 'E.g. I would also like extra photos or a precise map pin.',
      consent: 'I agree to be contacted to confirm this request.',
      submit: 'Send request', formHint: 'Payment only after confirmation.',
      successTitle: 'Request received',
      successDesc: 'We will contact you during business hours and confirm the details.',
      waCta: 'Continue in WhatsApp',
      waHint: 'Opening WhatsApp automatically…',
      again: 'Send another request',
      faqTitle: 'Frequently asked questions',
      q1: 'When will my business appear at the top?', a1: 'Within 1 business day after the payment is confirmed. The period starts from that day.',
      q2: 'Can I cancel?', a2: 'Yes. On cancellation the placement stays active until the end of the paid period and then switches off automatically.',
      q3: 'What happens when the period ends?', a3: 'Your business stays in the directory for free, but loses the “Featured” badge and the top position.',
      q4: 'Do I need an existing profile?', a4: 'If you do not have one yet, we will add it for free — just include the name and phone in the request.',
      footerTagline: 'Local businesses, all in one place.',
      footerNote: 'Made for local businesses in Georgia.',
      errName: 'Please enter the business name (at least 2 characters).',
      errPhone: 'Please enter a valid phone number.',
      errEmail: 'Please enter a valid email address.',
      errConsent: 'Please confirm that we may contact you.',
      sending: 'Sending…',
      errServer: 'Something went wrong. Please try again.',
      errOffline: 'Could not connect. Please try again in a moment.',
      duplicate: 'You already have a pending request — we will contact you shortly.'
    },
    ka: {
      back: 'საიტზე დაბრუნება',
      account: 'ანგარიში',
      kicker: 'ბიზნესის მფლობელებისთვის',
      title: 'იყავი პირველი,<br><em>ვისაც იპოვიან.</em>',
      lead: 'გამორჩეული განთავსება ბიზნესს კატეგორიის თავში აყენებს — ზუსტად იქ, სადაც კლიენტი პირველად იყურება.',
      trust1: 'პირველი ადგილი კატეგორიაში',
      trust2: '„გამორჩეული“ ნიშანი',
      trust3: 'გამოქვეყნებამდე შემოწმება',
      plan1: '1 თვე', plan3: '3 თვე', plan12: '12 თვე',
      trialTitle: '1 თვე უფასოდ',
      trialDesc: 'დაიწყე უფასოდ: ბიზნესი 31 დღე ჩვეულებრივად გამოჩნდება კატალოგში. ამის შემდეგ დაიმალება, სანამ პაკეტს არ გაააქტიურებ.',
      trialBtn: '1 თვე უფასოდ',
      trialNeedsLogin: 'ჯერ შედი ანგარიშში.',
      trialUsed: 'უფასო თვე ამ ანგარიშზე უკვე გამოყენებულია.',
      trialStarted: '1 თვე უფასოდ გააქტიურდა! გადავდივართ საიტზე…',
      plan1d: 'სცადე და ნახე შედეგი ზეწოლის გარეშე.',
      plan3d: 'საკმარისი დრო, რომ კლიენტებმა შეგამჩნიონ.',
      plan12d: 'მთელი წელი პირველ ადგილზე — ყველაზე დაბალი თვიური ფასი.',
      popular: 'პოპულარული', best: 'საუკეთესო ფასი',
      hasCodeTitle: 'გაქვთ აქტივაციის კოდი?',
      hasCodeDesc: 'ჩაწერეთ მიღებული კოდი — საიტი თავად ამოიცნობს პაკეტს (1, 3 ან 12 თვე) და მაშინვე გაააქტიურებს თქვენს ბიზნესს.',
      activateCode: 'გააქტიურება',
      codeNeedsLogin: 'კოდის გასააქტიურებლად ჯერ შედით ანგარიშში.',
      codeNeedsBusiness: 'კოდის გასააქტიურებლად ჯერ შექმენით ბიზნესის პროფილი თქვენს ანგარიშში.',
      codeActivated: '🎉 წარმატებით გააქტიურდა {n} თვით!',
      goToAccount: 'ანგარიშზე გადასვლა',
      inclTitle: 'რას მიიღებ',
      incl1: 'პირველი ადგილი შენს კატეგორიასა და ქალაქში',
      incl2: '„გამორჩეული“ ნიშანი ბიზნესის ბარათზე',
      incl3: 'პრიორიტეტი ძიების შედეგებში',
      incl4: 'ვადა იწყება გადახდის დადასტურების დღიდან',
      incl5: 'გაუქმება ნებისმიერ დროს — ვადის ბოლომდე აქტიური რჩება',
      howTitle: 'როგორ მუშაობს',
      step1: 'აგზავნი მოთხოვნას', step1d: 'ფორმა 30 წამს იკავებს.',
      step2: 'გიდასტურებთ და გიგზავნით ინვოისს', step2d: 'ბანკის გადარიცხვა ან ბიზნესის ანგარიშიდან.',
      step3: 'გააქტიურდება 1 სამუშაო დღეში', step3d: 'მიიღებ დადასტურებას ტელეფონით ან ელფოსტით.',
      formKicker: 'მოთხოვნა',
      formTitle: 'დატოვე განაცხადი',
      formDesc: 'შეავსე ფორმა — დაგიკავშირდებით სამუშაო საათებში და დაგიდასტურებთ დეტალებს.',
      payNote: 'საიტზე ბარათის მონაცემები არ მიიღება. გადახდა ხდება ინვოისით, ბანკის გადარიცხვით.',
      labelName: 'ბიზნესის სახელი', labelPhone: 'ტელეფონი', labelEmail: 'ელფოსტა (არასავალდებულო)',
      labelPlan: 'აირჩიე ვადა', labelNote: 'შენიშვნა (არასავალდებულო)',
      notePlaceholder: 'მაგ.: მინდა დამატებით ფოტოები ან რუკაზე ზუსტი მისამართი.',
      consent: 'ვეთანხმები, რომ დამიკავშირდეთ განაცხადის დასადასტურებლად.',
      submit: 'მოთხოვნის გაგზავნა', formHint: 'გადახდა მხოლოდ დადასტურების შემდეგ.',
      successTitle: 'მოთხოვნა მიღებულია',
      successDesc: 'დაგიკავშირდებით სამუშაო საათებში და დაგიდასტურებთ დეტალებს.',
      waCta: 'WhatsApp-ში გაგრძელება',
      waHint: 'WhatsApp იხსნება ავტომატურად…',
      again: 'კიდევ ერთი მოთხოვნა',
      faqTitle: 'ხშირი კითხვები',
      q1: 'როდის გამოჩნდება ბიზნესი პირველ ადგილზე?', a1: 'გადახდის დადასტურებიდან 1 სამუშაო დღეში. ვადა ითვლება ამ დღიდან.',
      q2: 'შეიძლება გაუქმება?', a2: 'დიახ. გაუქმებისას განთავსება რჩება აქტიური უკვე გადახდილი ვადის ბოლომდე და ავტომატურად იხსნება.',
      q3: 'რა ხდება ვადის გასვლის შემდეგ?', a3: 'ბიზნესი რჩება კატალოგში უფასოდ, მაგრამ კარგავს „გამორჩეულის“ ნიშანსა და პირველ ადგილს.',
      q4: 'სჭირდება ბიზნესს უკვე დამატებული პროფილი?', a4: 'თუ ჯერ არ არის, უფასოდ დავამატებთ — მოთხოვნის ფორმაში მიუთითე სახელი და ტელეფონი.',
      footerTagline: 'ადგილობრივი ბიზნესები — ერთ სივრცეში.',
      footerNote: 'შექმნილია საქართველოს ადგილობრივი ბიზნესებისთვის.',
      errName: 'გთხოვთ, შეიყვანოთ ბიზნესის სახელი (მინიმუმ 2 სიმბოლო).',
      errPhone: 'გთხოვთ, შეიყვანოთ სწორი ტელეფონის ნომერი.',
      errEmail: 'გთხოვთ, შეიყვანოთ სწორი ელფოსტა.',
      errConsent: 'გთხოვთ, დაადასტუროთ, რომ შეგვიძლია დაგიკავშირდეთ.',
      sending: 'იგზავნება…',
      errServer: 'რაღაც შეცდომა მოხდა. სცადე ხელახლა.',
      errOffline: 'კავშირი ვერ დამყარდა. სცადე ცოტა ხანში.',
      duplicate: 'თქვენ უკვე გაქვთ მოლოდინში მყოფი მოთხოვნა — მალე დაგიკავშირდებით.'
    }
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  let lang = 'ka';
  try {
    const saved = localStorage.getItem('ipove-lang');
    if (saved === 'ka' || saved === 'en') lang = saved;
  } catch { /* storage unavailable */ }

  function applyLanguage() {
    const dict = I18N[lang];
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      const value = dict[el.dataset.i18n];
      if (value !== undefined) el.textContent = value;
    });
    $$('[data-i18n-html]').forEach(el => {
      const value = dict[el.dataset.i18nHtml];
      if (value !== undefined) el.innerHTML = value;
    });
    $$('[data-i18n-placeholder]').forEach(el => {
      const value = dict[el.dataset.i18nPlaceholder];
      if (value !== undefined) el.placeholder = value;
    });
    $$('.lang-toggle button').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    renderPrices();
  }

  function renderPrices() {
    $$('[data-price]').forEach(el => {
      const value = priceOf(Number(el.dataset.price), lang);
      el.textContent = Number.isInteger(value) ? String(value) : value.toFixed(2);
    });
    $$('[data-cur]').forEach(el => { el.textContent = lang === 'ka' ? '₾' : '$'; });
    $$('[data-per]').forEach(el => { el.textContent = perMonth(Number(el.dataset.per), lang); });
    $$('[data-price-label]').forEach(el => {
      el.textContent = money(priceOf(Number(el.dataset.priceLabel), lang), lang);
    });
  }

  $$('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      lang = btn.dataset.lang;
      try { localStorage.setItem('ipove-lang', lang); } catch { /* ignore */ }
      applyLanguage();
    });
  });

  // Plan cards mirror the radio inputs in the form.
  const form = $('#placementForm');
  const plans = $$('.plan');

  function selectPlan(months) {
    plans.forEach(card => card.classList.toggle('is-selected', Number(card.dataset.months) === months));
    const radio = form?.querySelector(`input[name="months"][value="${months}"]`);
    if (radio) radio.checked = true;
  }

  plans.forEach(card => {
    card.addEventListener('click', () => {
      selectPlan(Number(card.dataset.months));
      $('#request')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'radio');
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  });

  const initial = form?.querySelector('input[name="months"]:checked');
  if (initial) selectPlan(Number(initial.value));

  // Form submission.
  const message = $('#placementMessage');
  const submitButton = $('#placementSubmit');
  const successPanel = $('#placementSuccess');
  const whatsappButton = $('#whatsappButton');
  const grid = $('.p-form-grid', form);
  const foot = $('.p-form-foot', form);
  let whatsappTimer = null;

  function whatsappLink(name, months, phone) {
    const price = money(priceOf(months, lang), lang);
    const text = lang === 'ka'
      ? `გამარჯობა! მინდა „გამორჩეული განთავსების“ შეძენა Ipove-ზე.\nბიზნესი: ${name}\nვადა: ${months} თვე\nფასი: ${price}\nტელეფონი: ${phone}`
      : `Hello! I would like to buy a "Featured placement" on Ipove.\nBusiness: ${name}\nDuration: ${months} ${months === 1 ? 'month' : 'months'}\nPrice: ${price}\nPhone: ${phone}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  function openWhatsapp(link) {
    if (!whatsappButton) return;
    whatsappButton.href = link;
    whatsappButton.hidden = false;
    clearTimeout(whatsappTimer);
    // Auto-continue to WhatsApp, but keep the button visible as a fallback.
    whatsappTimer = setTimeout(() => {
      window.location.assign(link);
    }, 1200);
  }

  function stopWhatsappRedirect() {
    clearTimeout(whatsappTimer);
    whatsappTimer = null;
    if (whatsappButton) whatsappButton.hidden = true;
  }

  function setMessage(text, kind = '') {
    if (!message) return;
    message.textContent = text || '';
    message.classList.toggle('is-error', kind === 'error');
    message.classList.toggle('is-info', kind === 'info');
  }

  function fieldValue(name) {
    return (form.querySelector(`[name="${name}"]`)?.value || '').trim();
  }

  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const dict = I18N[lang];
    const name = fieldValue('business_name');
    const phone = fieldValue('phone');
    const email = fieldValue('email');

    if (name.length < 2) return setMessage(dict.errName, 'error');
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 6 || phoneDigits.length > 15) return setMessage(dict.errPhone, 'error');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMessage(dict.errEmail, 'error');
    if (!form.querySelector('[name="consent"]').checked) return setMessage(dict.errConsent, 'error');

    const months = Number(form.querySelector('input[name="months"]:checked')?.value || 1);

    submitButton.disabled = true;
    const originalLabel = submitButton.querySelector('span').textContent;
    submitButton.querySelector('span').textContent = dict.sending;
    setMessage('');

    try {
      const response = await fetch('/api/placement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: name,
          phone,
          email,
          note: fieldValue('note'),
          months,
          companyFax: fieldValue('companyFax')
        })
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        if (data.duplicate) setMessage(dict.duplicate, 'info');
        grid.hidden = true;
        foot.hidden = true;
        successPanel.hidden = false;
        setMessage('');
        openWhatsapp(whatsappLink(name, months, phone));
        successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setMessage(dict.errServer, 'error');
      }
    } catch {
      setMessage(dict.errOffline, 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.querySelector('span').textContent = originalLabel;
    }
  });

  $('#againButton')?.addEventListener('click', () => {
    stopWhatsappRedirect();
    form.reset();
    grid.hidden = false;
    foot.hidden = false;
    successPanel.hidden = true;
    setMessage('');
    selectPlan(1);
  });

  /* ---------- code activation from premium.html ---------- */
  const codeForm = $('#premiumCodeForm');
  const codeInput = $('#premiumCodeInput');
  const codeMessage = $('#premiumCodeMessage');
  const codeBtn = $('#premiumCodeBtn');

  function setCodeMessage(html, kind = '') {
    if (!codeMessage) return;
    codeMessage.innerHTML = html || '';
    codeMessage.classList.toggle('is-error', kind === 'error');
    codeMessage.classList.toggle('is-ok', kind === 'ok');
    codeMessage.classList.toggle('is-info', kind === 'info');
  }

  codeForm?.addEventListener('submit', async event => {
    event.preventDefault();
    const dict = I18N[lang];
    const code = (codeInput?.value || '').trim().toUpperCase();
    if (!code) return;

    codeBtn.disabled = true;
    setCodeMessage('');

    try {
      // 1. Check logged in user status
      const authRes = await fetch('/api/auth/me', {
        headers: { Accept: 'application/json' },
        credentials: 'same-origin'
      });

      if (!authRes.ok) {
        setCodeMessage(`${dict.codeNeedsLogin} <a href="account.html">${dict.goToAccount} →</a>`, 'info');
        return;
      }

      const authData = await authRes.json();
      const listings = Array.isArray(authData.listings) ? authData.listings : [];
      if (!listings.length) {
        setCodeMessage(`${dict.codeNeedsBusiness} <a href="account.html">${dict.goToAccount} →</a>`, 'info');
        return;
      }

      const listing = listings[0];

      // 2. Redeem the code
      const redeemRes = await fetch('/api/account/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ code, id: listing.id })
      });

      const redeemData = await redeemRes.json().catch(() => ({}));
      if (!redeemRes.ok) {
        throw new Error(redeemData.error || dict.errServer);
      }

      codeInput.value = '';
      const text = dict.codeActivated.replace('{n}', redeemData.months);
      setCodeMessage(`${text} (${redeemData.listing?.name || listing.name}) <a href="account.html">${dict.goToAccount} →</a>`, 'ok');
    } catch (error) {
      setCodeMessage(error.message || dict.errServer, 'error');
    } finally {
      codeBtn.disabled = false;
    }
  });


  /* ---------- free month ---------- */
  const trialBtn = $('#freeTrialBtn');
  const trialMessage = $('#trialMessage');
  function setTrialMessage(html, kind = '') {
    if (!trialMessage) return;
    trialMessage.innerHTML = html || '';
    trialMessage.classList.toggle('is-error', kind === 'error');
    trialMessage.classList.toggle('is-ok', kind === 'ok');
    trialMessage.classList.toggle('is-info', kind === 'info');
  }

  trialBtn?.addEventListener('click', async () => {
    const dict = I18N[lang];
    trialBtn.disabled = true;
    setTrialMessage('');
    try {
      const authRes = await fetch('/api/auth/me', { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      if (!authRes.ok) {
        try { sessionStorage.setItem('ipove-intent', 'trial'); } catch { /* ignore */ }
        window.location.assign('account.html');
        return;
      }
      const authData = await authRes.json();
      const listings = Array.isArray(authData.listings) ? authData.listings : [];
      if (!listings.length) {
        // The business has to exist first. The account page continues the free month after saving.
        try { sessionStorage.setItem('ipove-intent', 'trial'); } catch { /* ignore */ }
        window.location.assign('account.html#business');
        return;
      }
      if (authData.user?.freeTrialUsed) {
        setTrialMessage(dict.trialUsed, 'info');
        return;
      }
      const res = await fetch('/api/account/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ id: listings[0].id })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || dict.errServer);
      setTrialMessage(dict.trialStarted, 'ok');
      setTimeout(() => window.location.assign('index.html'), 1200);
    } catch (error) {
      setTrialMessage(error.message || dict.errServer, 'error');
    } finally {
      trialBtn.disabled = false;
    }
  });

  const year = $('#footerYear');
  if (year) year.textContent = String(new Date().getFullYear());

  applyLanguage();
})();
