/* ============================================================
   Findit — front-end application
   ============================================================ */
(() => {
  'use strict';

  /* ---------- static data ---------- */
  const CATEGORIES = [
    { ka: 'ყველა', en: 'All', icon: 'grid', tone: '#8aa79a' },
    { ka: 'კვება', en: 'Food & drink', icon: 'coffee', tone: '#c9834f' },
    { ka: 'სილამაზე', en: 'Beauty', icon: 'scissors', tone: '#c97d86' },
    { ka: 'რემონტი', en: 'Repairs', icon: 'wrench', tone: '#5f7fa8' },
    { ka: 'ჯანმრთელობა', en: 'Health', icon: 'pulse', tone: '#5f947f' },
    { ka: 'სწავლა', en: 'Education', icon: 'book', tone: '#8a74ab' },
    { ka: 'მაღაზია', en: 'Shopping', icon: 'bag', tone: '#b8903f' },
    { ka: 'სხვა სერვისი', en: 'Other services', icon: 'sparkle', tone: '#7d8b84' }
  ];

  const CITIES = [
    { ka: 'ყველა ქალაქი', en: 'All cities' },
    { ka: 'თბილისი', en: 'Tbilisi' },
    { ka: 'ბათუმი', en: 'Batumi' },
    { ka: 'ქუთაისი', en: 'Kutaisi' },
    { ka: 'რუსთავი', en: 'Rustavi' },
    { ka: 'ზუგდიდი', en: 'Zugdidi' },
    { ka: 'სხვა', en: 'Other' }
  ];

  const COPY = {
    en: {
      brand: 'Findit',
      skipToResults: 'Skip to results',
      navDiscover: 'Discover',
      navSearch: 'Search',
      navSaved: 'Saved',
      navAdd: 'Add a business',
      addBusiness: 'Add a business',
      navCategories: 'Categories',
      ownerQuestion: 'Own a business?',
      ownerDesc: 'Add a free profile so local customers can find you.',
      ownerCta: 'Add your business',
      admin: 'Admin',
      account: 'Account',
      statusOnline: 'Shared directory',
      statusPreview: 'Preview mode',
      home: 'Home',
      crumbSearch: 'Search',
      crumbSaved: 'Saved',
      city: 'City',
      heroEyebrow: 'Your local guide',
      heroTitle: 'Find what you need<br><em>right around you.</em>',
      heroDesc: 'Search local shops and services across Georgia, then contact them directly — no middleman.',
      searchPlaceholder: 'Try “cafe”, “plumber” or “vet”',
      searchBtn: 'Search',
      browse: 'Popular:',
      artFood: 'Food',
      artServices: 'Services',
      artNearby: 'Nearby',
      artDirect: 'Direct contact',
      artDirectSub: 'No middleman',
      statOne: 'Free to browse',
      statTwo: 'Direct contact',
      statThree: 'Locally listed',
      sectionKicker: 'Explore the directory',
      resultsNearby: 'Businesses near you',
      resultsSaved: 'Saved businesses',
      resultsSearch: 'Search results',
      resultsSub: 'Real profiles published on Findit',
      resultsSubSaved: 'Your shortlist, stored on this device',
      sort: 'Sort',
      sortRecommended: 'Recommended',
      sortNewest: 'Newest first',
      sortName: 'Name A–Z',
      clear: 'Clear filters',
      countOne: 'business',
      countMany: 'businesses',
      loading: 'Loading businesses…',
      emptyNoResultsTitle: 'No matches found',
      emptyNoResultsDesc: 'Try a different keyword, city or category.',
      emptyNoResultsAction: 'Clear filters',
      emptyNoListingsTitle: 'No businesses yet',
      emptyNoListingsDesc: 'The directory is ready. Be the first to add your business.',
      emptyNoListingsAction: 'Add your business',
      emptySavedTitle: 'Nothing saved yet',
      emptySavedDesc: 'Tap the heart on any business to keep it here.',
      emptySavedAction: 'Browse businesses',
      previewTitle: 'Preview mode',
      previewDesc: 'The shared directory is not connected yet, so listings cannot be loaded or submitted.',
      previewSetup: 'Setup guide',
      retry: 'Try again',
      railKicker: 'For local businesses',
      railTitle: 'Help people<br>find your business.',
      railDesc: 'Create a free profile with your services, location and contact details.',
      railCta: 'Add your business',
      railFeatureLabel: 'Featured placement',
      railFeatureTitle: 'Stand out at the top.',
      railFeatureDesc: 'Put your business above the rest with a featured listing. Contact us to arrange it.',
      railFeatureCta: 'Start with a free profile',
      railTrust: 'Every profile is reviewed before it appears publicly.',
      howKicker: 'Simple and direct',
      howTitle: 'How Findit works',
      howSub: 'Three steps from search to a real conversation.',
      step1: 'Search', step1d: 'Pick a category, city or keyword.',
      step2: 'Compare', step2d: 'Read profiles, contact details and websites.',
      step3: 'Connect', step3d: 'Call, email or visit the business directly.',
      bandKicker: 'For business owners',
      bandTitle: 'Put your business on the map.',
      bandDesc: 'Create a free profile in minutes and get discovered by local customers.',
      bandPoint1: 'Free profile',
      bandPoint2: 'Manual review',
      bandPoint3: 'Optional featured placement',
      bandCta: 'Add your business',
      bandPremiumCta: 'Featured placement — from $2.50',
      bandNote: 'Featured placement is paid; the request is reviewed and activated after payment.',
      footerTagline: 'Local businesses, all in one place.',
      footerProject: 'Project info',
      footerAdmin: 'Admin',
      footerNote: 'Made for local businesses in Georgia.',
      modalKicker: 'Local directory',
      modalTitle: 'Add your business',
      modalDesc: 'Your listing is reviewed before it goes live.',
      labelName: 'Business name',
      labelCategory: 'Category',
      labelCity: 'City',
      labelAddress: 'Neighborhood / address',
      labelPhone: 'Phone',
      labelEmail: 'Email (optional)',
      labelWebsite: 'Website or social link (optional)',
      labelDescription: 'What do you offer?',
      labelDescriptionHint: '10–500 characters',
      consent: 'I agree that this information can be shown publicly.',
      modalFoot: 'Reviewed before publishing.',
      submit: 'Submit for review',
      sending: 'Sending…',
      choose: 'Choose',
      close: 'Close',
      errName: 'Please enter the business name (at least 2 characters).',
      errPhone: 'Please enter a valid phone number.',
      errDescription: 'Please write at least 10 characters about your business.',
      errOffline: 'This page is not connected to the shared directory, so your listing was not sent. Nothing was saved.',
      errServer: 'Something went wrong. Please try again.',
      errTooMany: 'Please wait a moment and try again.',
      successTitle: 'Thanks — your listing is in.',
      successDesc: "We'll review it and publish it shortly.",
      successAnother: 'Add another business',
      successClose: 'Done',
      featured: 'Featured',
      detailDetails: 'Details',
      detailContact: 'Contact',
      detailCall: 'Call',
      detailMap: 'Open in Maps',
      detailShare: 'Share',
      detailShareCopied: 'Link copied.',
      detailShareFailed: 'Could not copy the link.',
      detailContactTitle: 'Contact & location',
      demoContact: 'Contact details are not available yet.',
      saveLabel: 'Save',
      savedLabel: 'Remove from saved',
      savedToast: 'Saved to your list.',
      removedToast: 'Removed from saved.',
      filtersCleared: 'Filters cleared.'
    },
    ka: {
      brand: 'იპოვე',
      skipToResults: 'შედეგებზე გადასვლა',
      navDiscover: 'აღმოაჩინე',
      navSearch: 'ძიება',
      navSaved: 'შენახული',
      navAdd: 'ბიზნესის დამატება',
      addBusiness: 'ბიზნესის დამატება',
      navCategories: 'კატეგორიები',
      ownerQuestion: 'შენი ბიზნესია?',
      ownerDesc: 'დაამატე უფასო პროფილი, რომ ადგილობრივმა მომხმარებლებმა გიპოვონ.',
      ownerCta: 'ბიზნესის დამატება',
      admin: 'ადმინი',
      account: 'ანგარიში',
      statusOnline: 'საერთო კატალოგი',
      statusPreview: 'გადახედვის რეჟიმი',
      home: 'მთავარი',
      crumbSearch: 'ძიება',
      crumbSaved: 'შენახული',
      city: 'ქალაქი',
      heroEyebrow: 'შენი ადგილობრივი გზამკვლევი',
      heroTitle: 'იპოვე რაც გჭირდება<br><em>შენს მახლობლად.</em>',
      heroDesc: 'მოძებნე ადგილობრივი მაღაზიები და სერვისები საქართველოში და დაუკავშირდი პირდაპირ — შუამავლის გარეშე.',
      searchPlaceholder: 'სცადე „კაფე“, „სანტექნიკოსი“ ან „ვეტერინარი“',
      searchBtn: 'მოძებნა',
      browse: 'პოპულარული:',
      artFood: 'კვება',
      artServices: 'სერვისები',
      artNearby: 'ახლომახლო',
      artDirect: 'პირდაპირი კონტაქტი',
      artDirectSub: 'შუამავლის გარეშე',
      statOne: 'უფასო დათვალიერება',
      statTwo: 'პირდაპირი კონტაქტი',
      statThree: 'ადგილობრივი ბიზნესი',
      sectionKicker: 'დაათვალიერე კატალოგი',
      resultsNearby: 'ბიზნესები შენთან ახლოს',
      resultsSaved: 'შენახული ბიზნესები',
      resultsSearch: 'ძიების შედეგები',
      resultsSub: 'რეალური პროფილები, გამოქვეყნებული იპოვეზე',
      resultsSubSaved: 'შენი სია, შენახული ამ მოწყობილობაზე',
      sort: 'დალაგება',
      sortRecommended: 'რეკომენდებული',
      sortNewest: 'უახლესი',
      sortName: 'სახელით A–Z',
      clear: 'ფილტრების გასუფთავება',
      countOne: 'ბიზნესი',
      countMany: 'ბიზნესი',
      loading: 'ბიზნესები იტვირთება…',
      emptyNoResultsTitle: 'შედეგი ვერ მოიძებნა',
      emptyNoResultsDesc: 'სცადე სხვა სიტყვა, ქალაქი ან კატეგორია.',
      emptyNoResultsAction: 'ფილტრების გასუფთავება',
      emptyNoListingsTitle: 'ბიზნესები ჯერ არ არის',
      emptyNoListingsDesc: 'კატალოგი მზადაა. იყავი პირველი და დაამატე შენი ბიზნესი.',
      emptyNoListingsAction: 'ბიზნესის დამატება',
      emptySavedTitle: 'შენახული ჯერ არაფერია',
      emptySavedDesc: 'დააჭირე გულს ნებისმიერ ბიზნესს და შეინახე აქ.',
      emptySavedAction: 'ბიზნესების დათვალიერება',
      previewTitle: 'გადახედვის რეჟიმი',
      previewDesc: 'საერთო კატალოგი ჯერ არ არის მიერთებული — ბიზნესების ჩატვირთვა და გაგზავნა არ მუშაობს.',
      previewSetup: 'ინსტრუქცია',
      retry: 'ხელახლა ცდა',
      railKicker: 'ადგილობრივი ბიზნესებისთვის',
      railTitle: 'დაეხმარე ხალხს<br>შენს პოვნაში.',
      railDesc: 'შექმენი უფასო პროფილი სერვისებით, მისამართითა და საკონტაქტო ინფორმაციით.',
      railCta: 'ბიზნესის დამატება',
      railFeatureLabel: 'გამორჩეული განთავსება',
      railFeatureTitle: 'იყავი პირველი სიაში.',
      railFeatureDesc: 'გამორჩეული პროფილი შენს ბიზნესს სხვებზე მაღლა აჩვენებს. მოგვწერე დეტალებისთვის.',
      railFeatureCta: 'დაიწყე უფასო პროფილით',
      railTrust: 'ყველა პროფილი საჯაროდ გამოქვეყნებამდე მოწმდება.',
      howKicker: 'მარტივად და პირდაპირ',
      howTitle: 'როგორ მუშაობს იპოვე',
      howSub: 'სამი ნაბიჯი ძიებიდან რეალურ საუბრამდე.',
      step1: 'მოძებნე', step1d: 'აირჩიე კატეგორია, ქალაქი ან საკვანძო სიტყვა.',
      step2: 'შეადარე', step2d: 'გაეცანი პროფილებს, კონტაქტებსა და ვებსაიტებს.',
      step3: 'დაუკავშირდი', step3d: 'დარეკე, მოგვწერე ან ეწვიე ბიზნესს პირდაპირ.',
      bandKicker: 'ბიზნესის მფლობელებისთვის',
      bandTitle: 'დადე შენი ბიზნესი რუკაზე.',
      bandDesc: 'შექმენი უფასო პროფილი რამდენიმე წუთში და გახდი ხილული ადგილობრივი მომხმარებლებისთვის.',
      bandPoint1: 'უფასო პროფილი',
      bandPoint2: 'ხელით გადამოწმება',
      bandPoint3: 'სურვილისამებრ გამორჩეული განთავსება',
      bandCta: 'ბიზნესის დამატება',
      bandPremiumCta: 'გამორჩეული განთავსება — 7 ₾-დან',
      bandNote: 'გამორჩეული განთავსება ფასიანია; მოთხოვნა მოწმდება და აქტიურდება გადახდის შემდეგ.',
      footerTagline: 'ადგილობრივი ბიზნესები — ერთ სივრცეში.',
      footerProject: 'პროექტის შესახებ',
      footerAdmin: 'ადმინი',
      footerNote: 'შექმნილია საქართველოს ადგილობრივი ბიზნესებისთვის.',
      modalKicker: 'ადგილობრივი კატალოგი',
      modalTitle: 'დაამატე ბიზნესი',
      modalDesc: 'გამოქვეყნებამდე ჩანაწერს გადავამოწმებთ.',
      labelName: 'ბიზნესის სახელი',
      labelCategory: 'კატეგორია',
      labelCity: 'ქალაქი',
      labelAddress: 'უბანი / მისამართი',
      labelPhone: 'ტელეფონი',
      labelEmail: 'ელფოსტა (არასავალდებულო)',
      labelWebsite: 'ვებსაიტი ან სოციალური ბმული (არასავალდებულო)',
      labelDescription: 'რას სთავაზობ მომხმარებელს?',
      labelDescriptionHint: '10–500 სიმბოლო',
      consent: 'ვეთანხმები, რომ ეს ინფორმაცია საჯაროდ გამოქვეყნდეს.',
      modalFoot: 'გამოქვეყნებამდე მოწმდება.',
      submit: 'გაგზავნა გადამოწმებაზე',
      sending: 'იგზავნება…',
      choose: 'აირჩიე',
      close: 'დახურვა',
      errName: 'გთხოვთ, შეიყვანოთ ბიზნესის სახელი (მინიმუმ 2 სიმბოლო).',
      errPhone: 'გთხოვთ, შეიყვანოთ სწორი ტელეფონის ნომერი.',
      errDescription: 'გთხოვთ, დაწეროთ მინიმუმ 10 სიმბოლო ბიზნესის შესახებ.',
      errOffline: 'ეს გვერდი საერთო კატალოგს არ უკავშირდება, ამიტომ ბიზნესი არ გაიგზავნა. არაფერი შენახულა.',
      errServer: 'რაღაც შეცდომა მოხდა. სცადე ხელახლა.',
      errTooMany: 'ცოტა ხანს დაელოდე და სცადე ხელახლა.',
      successTitle: 'მადლობა — შენი ბიზნესი მიღებულია.',
      successDesc: 'გადავამოწმებთ და მალე გამოვაქვეყნებთ.',
      successAnother: 'კიდევ ერთი ბიზნესის დამატება',
      successClose: 'დასრულება',
      featured: 'გამორჩეული',
      detailDetails: 'დეტალები',
      detailContact: 'კონტაქტი',
      detailCall: 'დარეკვა',
      detailMap: 'რუკაზე ნახვა',
      detailShare: 'გაზიარება',
      detailShareCopied: 'ბმული დაკოპირებულია.',
      detailShareFailed: 'ბმულის დაკოპირება ვერ მოხერხდა.',
      detailContactTitle: 'კონტაქტი და მდებარეობა',
      demoContact: 'საკონტაქტო ინფორმაცია ჯერ არ არის ხელმისაწვდომი.',
      saveLabel: 'შენახვა',
      savedLabel: 'შენახულიდან ამოღება',
      savedToast: 'შენახულია შენს სიაში.',
      removedToast: 'ამოღებულია შენახულიდან.',
      filtersCleared: 'ფილტრები გასუფთავდა.'
    }
  };

  /* ---------- helpers ---------- */
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const catByKa = new Map(CATEGORIES.map(c => [c.ka, c]));
  const cityByKa = new Map(CITIES.map(c => [c.ka, c]));
  const categoryOf = value => catByKa.get(value) || { ka: value || '', en: value || '', icon: 'sparkle', tone: '#7d8b84' };
  const cityOf = value => cityByKa.get(value) || { ka: value || '', en: value || '' };
  const ALL_CATEGORY = 'ყველა';
  const ALL_CITIES = 'ყველა ქალაქი';

  const storageKeys = { saved: 'findit.saved.v2', language: 'findit.language.v2' };

  const state = {
    lang: 'en',
    view: 'discover',
    category: ALL_CATEGORY,
    city: ALL_CITIES,
    query: '',
    sort: 'recommended',
    listings: [],
    status: 'loading',
    saved: new Set()
  };

  let toastTimer;
  let savedRaw = [];
  try { savedRaw = JSON.parse(localStorage.getItem(storageKeys.saved) || '[]'); } catch { savedRaw = []; }
  if (Array.isArray(savedRaw)) state.saved = new Set(savedRaw.map(String));

  const t = key => COPY[state.lang][key] ?? COPY.en[key] ?? key;

  function readLanguage() {
    try { return localStorage.getItem(storageKeys.language) === 'ka' ? 'ka' : 'en'; } catch { return 'en'; }
  }
  state.lang = readLanguage();

  function saveLanguage() {
    try { localStorage.setItem(storageKeys.language, state.lang); } catch { /* storage may be blocked */ }
  }
  function persistSaved() {
    try { localStorage.setItem(storageKeys.saved, JSON.stringify([...state.saved])); } catch { /* ignore */ }
  }
  function toast(message) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  /* ---------- search synonyms ---------- */
  const SYNONYMS = {
    food: ['კვება', 'საკვები', 'restaurant', 'cafe', 'coffee'],
    cafe: ['კაფე', 'coffee', 'coffee shop'],
    coffee: ['კაფე'],
    restaurant: ['რესტორანი', 'food'],
    beauty: ['სილამაზე', 'salon', 'hair', 'haircut'],
    salon: ['სალონი', 'hair', 'beauty'],
    barber: ['დალაქი', 'haircut', 'hair'],
    repair: ['რემონტი', 'fix', 'plumbing'],
    repairs: ['რემონტი', 'fix', 'plumbing'],
    plumber: ['სანტექნიკოსი', 'plumbing', 'plumb'],
    electrician: ['ელექტრიკოსი', 'electrical', 'electric'],
    health: ['ჯანმრთელობა', 'medical', 'clinic'],
    doctor: ['ექიმი', 'medical', 'clinic'],
    dentist: ['სტომატოლოგი', 'dental'],
    vet: ['ვეტერინარი', 'veterinarian', 'veterinary'],
    education: ['სწავლა', 'school', 'tutoring'],
    school: ['სკოლა', 'tutoring'],
    tutor: ['რეპეტიტორი', 'მასწავლებელი', 'tutoring', 'teacher'],
    shop: ['მაღაზია', 'store', 'shopping', 'bike', 'bicycle'],
    store: ['მაღაზია', 'shop'],
    services: ['სერვისი', 'მომსახურება'],
    service: ['სერვისი'],
    tbilisi: ['თბილისი'],
    batumi: ['ბათუმი'],
    kutaisi: ['ქუთაისი'],
    rustavi: ['რუსთავი'],
    zugdidi: ['ზუგდიდი']
  };
  const synonymGroups = new Map();
  Object.entries(SYNONYMS).forEach(([word, list]) => {
    const group = [word, ...list];
    group.forEach(item => {
      const key = item.toLocaleLowerCase('en');
      if (!synonymGroups.has(key)) synonymGroups.set(key, new Set());
      group.forEach(other => synonymGroups.get(key).add(other.toLocaleLowerCase('en')));
    });
  });

  function haystack(listing) {
    if (listing.__hay) return listing.__hay;
    const category = categoryOf(listing.category);
    const city = cityOf(listing.city);
    const phone = String(listing.phone || '');
    listing.__hay = [
      listing.name, listing.description, listing.neighborhood,
      phone, phone.replace(/\D/g, ''),
      category.ka, category.en, city.ka, city.en
    ].join(' ').toLocaleLowerCase('en');
    return listing.__hay;
  }

  function normalizeQuery(value) {
    return String(value || '').toLocaleLowerCase('en').replace(/[’']/g, '').trim();
  }

  function queryTokens() {
    const q = normalizeQuery(state.query);
    if (!q) return [];
    return q.split(/[\s,.;:!?()"“”«»]+/).filter(Boolean);
  }

  function listingMatchesQuery(listing, tokens) {
    if (!tokens.length) return true;
    const hay = haystack(listing);
    return tokens.every(token => {
      const variants = synonymGroups.get(token) || [token];
      return [...variants].some(variant => hay.includes(variant));
    });
  }

  /* ---------- filtering / sorting ---------- */
  function listingTime(listing) {
    const value = String(listing.created_at || '');
    const parsed = Date.parse(value.includes('T') ? value : value.replace(' ', 'T') + 'Z');
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function filteredListings() {
    const tokens = queryTokens();
    let data = state.listings.slice();

    if (state.view === 'saved') data = data.filter(listing => state.saved.has(String(listing.id)));
    data = data.filter(listing => {
      const cityOk = state.city === ALL_CITIES || listing.city === state.city;
      const categoryOk = state.category === ALL_CATEGORY || listing.category === state.category;
      return cityOk && categoryOk && listingMatchesQuery(listing, tokens);
    });

    const byName = (a, b) => String(a.name).localeCompare(String(b.name), state.lang === 'ka' ? 'ka' : 'en', { sensitivity: 'base' });
    if (state.sort === 'name') data.sort(byName);
    else if (state.sort === 'newest') data.sort((a, b) => listingTime(b) - listingTime(a) || byName(a, b));
    else data.sort((a, b) => Number(Boolean(b.sponsored)) - Number(Boolean(a.sponsored)) || listingTime(b) - listingTime(a) || byName(a, b));

    return data;
  }

  /* ---------- rendering ---------- */
  function countText(count) {
    const word = state.lang === 'en' && count === 1 ? t('countOne') : t('countMany');
    return `${count} ${word}`;
  }

  function categoryLabel(category) {
    const value = categoryOf(category);
    return state.lang === 'en' ? value.en : value.ka;
  }
  function cityLabel(city) {
    const value = cityOf(city);
    return state.lang === 'en' ? value.en : value.ka;
  }

  function renderCategories() {
    $('#categoryPills').innerHTML = CATEGORIES.map(category => `
      <button type="button" class="category-pill ${state.category === category.ka ? 'active' : ''}"
        data-category="${esc(category.ka)}" style="--tone:${category.tone}"
        aria-pressed="${state.category === category.ka}">
        ${icon(category.icon)}<span>${esc(state.lang === 'en' ? category.en : category.ka)}</span>
      </button>`).join('');

    $('#sideCategories').innerHTML = CATEGORIES.slice(1).map(category => `
      <button type="button" class="category-item ${state.category === category.ka ? 'active' : ''}"
        data-category="${esc(category.ka)}" aria-pressed="${state.category === category.ka}">
        <i class="category-dot" style="--dot:${category.tone}"></i>
        <span>${esc(state.lang === 'en' ? category.en : category.ka)}</span>
      </button>`).join('');

    const popular = CATEGORIES.slice(1, 5);
    $('#popularChips').innerHTML = popular.map(category => `
      <button type="button" data-search="${esc(category.ka)}">${esc(state.lang === 'en' ? category.en : category.ka)}</button>`).join('');
  }

  function placeText(listing) {
    return [cityLabel(listing.city), listing.neighborhood].filter(Boolean).join(' · ');
  }

  function card(listing) {
    const category = categoryOf(listing.category);
    const saved = state.saved.has(String(listing.id));
    const place = placeText(listing);
    const label = saved ? t('savedLabel') : t('saveLabel');
    return `
      <article class="listing-card" data-id="${esc(listing.id)}">
        <div class="listing-cover" style="--tone:${category.tone}">
          <span class="cover-ring"></span><span class="cover-ring ring-2"></span>
          <span class="cover-icon">${icon(category.icon)}</span>
          ${listing.sponsored ? `<span class="badge-featured">${icon('star')}<span>${esc(t('featured'))}</span></span>` : ''}
          <button class="save-button ${saved ? 'is-saved' : ''}" type="button" data-save="${esc(listing.id)}"
            aria-pressed="${saved}" aria-label="${esc(label)}" title="${esc(label)}">
            ${icon(saved ? 'heart-filled' : 'heart')}
          </button>
        </div>
        <div class="listing-body">
          <span class="listing-cat" style="--tone:${category.tone}">${icon(category.icon)}<span>${esc(categoryLabel(listing.category))}</span></span>
          <button class="listing-title" type="button" data-details="${esc(listing.id)}">${esc(listing.name)}</button>
          <p class="listing-desc">${esc(listing.description || '')}</p>
          <div class="listing-loc">${icon('pin')}<span>${esc(place)}</span></div>
          <div class="listing-actions">
            <button class="link-button" type="button" data-details="${esc(listing.id)}">${esc(t('detailDetails'))}${icon('arrow-right')}</button>
            <button class="soft-button" type="button" data-contact="${esc(listing.id)}">${esc(t('detailContact'))}</button>
          </div>
        </div>
      </article>`;
  }

  function emptyStateFor(found) {
    if (state.view === 'saved') {
      return { title: t('emptySavedTitle'), desc: t('emptySavedDesc'), action: t('emptySavedAction'), mode: 'browse' };
    }
    if (state.listings.length === 0) {
      return { title: t('emptyNoListingsTitle'), desc: t('emptyNoListingsDesc'), action: t('emptyNoListingsAction'), mode: 'add' };
    }
    if (found.length === 0) {
      return { title: t('emptyNoResultsTitle'), desc: t('emptyNoResultsDesc'), action: t('emptyNoResultsAction'), mode: 'clear' };
    }
    return null;
  }

  function renderResults() {
    const grid = $('#listingGrid');
    const skeleton = $('#skeletonGrid');
    const empty = $('#emptyState');
    const count = $('#resultCount');

    if (state.status === 'loading') {
      grid.hidden = true;
      grid.innerHTML = '';
      skeleton.hidden = false;
      empty.hidden = true;
      count.textContent = t('loading');
      return;
    }

    skeleton.hidden = true;
    const found = filteredListings();
    count.textContent = state.status === 'offline' && state.listings.length === 0 ? '—' : countText(found.length);

    grid.innerHTML = found.map(card).join('');
    grid.hidden = found.length === 0;

    const emptyState = emptyStateFor(found);
    if (emptyState) {
      empty.hidden = false;
      $('#emptyTitle').textContent = emptyState.title;
      $('#emptyDesc').textContent = emptyState.desc;
      const action = $('#emptyAction');
      action.textContent = emptyState.action;
      action.dataset.mode = emptyState.mode;
    } else {
      empty.hidden = true;
      $('#emptyAction').dataset.mode = '';
    }

    $('#savedCount').textContent = state.saved.size;
    const filtersActive = Boolean(state.query.trim()) || state.city !== ALL_CITIES || state.category !== ALL_CATEGORY;
    $('#clearFilters').hidden = !filtersActive;
  }

  function updateChrome() {
    const savedView = state.view === 'saved';
    $('#crumbTitle').textContent = savedView ? t('crumbSaved') : t('crumbSearch');
    $('#resultsTitle').textContent = savedView ? t('resultsSaved') : (state.query.trim() ? t('resultsSearch') : t('resultsNearby'));
    $('#resultsSub').textContent = savedView ? t('resultsSubSaved') : t('resultsSub');
    $$('.nav-item[data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === state.view));

    const ready = state.status === 'ready';
    $('#dataMode').textContent = ready ? t('statusOnline') : t('statusPreview');
    const dot = $('#statusDot');
    dot.classList.toggle('is-online', ready);
    dot.classList.toggle('is-offline', !ready);
    $('#previewBanner').hidden = ready || state.status === 'loading';
    $('#sortSelect').value = state.sort;
    $('#savedCount').textContent = state.saved.size;
  }

  function render() {
    renderCategories();
    renderResults();
    updateChrome();
  }

  /* ---------- language / selects ---------- */
  function fillCitySelect(select) {
    if (!select) return;
    const previous = select.value;
    select.innerHTML = CITIES.map(city => `<option value="${esc(city.ka)}">${esc(state.lang === 'en' ? city.en : city.ka)}</option>`).join('');
    const preferred = CITIES.some(city => city.ka === state.city) ? state.city : (CITIES.some(city => city.ka === previous) ? previous : ALL_CITIES);
    select.value = preferred;
  }

  function fillFormSelects() {
    const form = $('#businessForm');
    const categorySelect = form.elements.category;
    const citySelect = form.elements.city;
    const selectedCategory = categorySelect.value;
    const selectedCity = citySelect.value;

    categorySelect.innerHTML = `<option value="">${esc(t('choose'))}</option>` + CATEGORIES.slice(1)
      .map(category => `<option value="${esc(category.ka)}">${esc(state.lang === 'en' ? category.en : category.ka)}</option>`).join('');
    citySelect.innerHTML = `<option value="">${esc(t('choose'))}</option>` + CITIES.slice(1)
      .map(city => `<option value="${esc(city.ka)}">${esc(state.lang === 'en' ? city.en : city.ka)}</option>`).join('');

    categorySelect.value = selectedCategory || '';
    citySelect.value = selectedCity || '';
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.title = state.lang === 'en' ? 'Findit — Local businesses near you' : 'იპოვე — ადგილობრივი ბიზნესები შენთან ახლოს';

    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $$('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
    $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });

    $$('.lang-toggle button').forEach(button => {
      const active = button.dataset.lang === state.lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $$('[data-close-modal]').forEach(el => el.setAttribute('aria-label', t('close')));

    fillCitySelect($('#citySelect'));
    fillCitySelect($('#heroCity'));
    fillFormSelects();

    const form = $('#businessForm');
    const placeholders = {
      name: state.lang === 'en' ? 'e.g. Your workshop' : 'მაგ. შენი სახელოსნო',
      neighborhood: state.lang === 'en' ? 'e.g. Vera, Chavchavadze St. 12' : 'მაგ. ვერა, ჭავჭავაძის 12',
      description: state.lang === 'en' ? 'Briefly describe your service' : 'მოკლედ აღწერე მომსახურება'
    };
    Object.entries(placeholders).forEach(([name, value]) => { form.elements[name].placeholder = value; });

    $('#sortSelect').value = state.sort;
    render();
  }

  /* ---------- details ---------- */
  function byId(id) {
    return state.listings.find(listing => String(listing.id) === String(id));
  }

  function saveButtonMarkup(listing) {
    const saved = state.saved.has(String(listing.id));
    const label = saved ? t('savedLabel') : t('saveLabel');
    return `<button class="save-button detail-save ${saved ? 'is-saved' : ''}" id="detailSave" type="button"
      data-save="${esc(listing.id)}" aria-pressed="${saved}" aria-label="${esc(label)}" title="${esc(label)}">
      ${icon(saved ? 'heart-filled' : 'heart')}</button>`;
  }

  function detailMarkup(listing) {
    const category = categoryOf(listing.category);
    const place = [cityLabel(listing.city), listing.neighborhood].filter(Boolean).join(', ');
    const phone = String(listing.phone || '');
    const phoneHref = phone.replace(/[^\d+]/g, '');
    const mapQuery = [listing.name, cityLabel(listing.city), listing.neighborhood].filter(Boolean).join(' ');
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
    const rows = [];

    if (place) rows.push(`<div>${icon('pin')}<span>${esc(place)}</span></div>`);
    if (phone) rows.push(`<div>${icon('phone')}<a href="tel:${esc(phoneHref)}">${esc(phone)}</a></div>`);
    if (listing.email) rows.push(`<div>${icon('mail')}<a href="mailto:${esc(listing.email)}">${esc(listing.email)}</a></div>`);
    if (listing.website) rows.push(`<div>${icon('globe')}<a href="${esc(listing.website)}" target="_blank" rel="noopener noreferrer">${esc(String(listing.website).replace(/^https?:\/\//i, ''))}</a></div>`);

    return `
      <div class="detail-cover" style="--tone:${category.tone}">
        <span class="detail-cover-icon">${icon(category.icon)}</span>
        <button type="button" class="modal-close" data-close-modal aria-label="${esc(t('close'))}">${icon('close')}</button>
        ${saveButtonMarkup(listing)}
      </div>
      <div class="detail-body">
        <div class="detail-topline">
          <span class="listing-cat" style="--tone:${category.tone}">${icon(category.icon)}<span>${esc(categoryLabel(listing.category))}</span></span>
          ${listing.sponsored ? `<span class="badge-featured">${icon('star')}<span>${esc(t('featured'))}</span></span>` : ''}
        </div>
        <h2>${esc(listing.name)}</h2>
        <p class="detail-desc">${esc(listing.description || '')}</p>
        <div class="detail-section">
          <h3>${esc(t('detailContactTitle'))}</h3>
          <div class="detail-rows">${rows.join('') || `<p class="detail-empty">${esc(t('demoContact'))}</p>`}</div>
        </div>
        <div class="detail-actions">
          ${phone ? `<a class="primary-button" href="tel:${esc(phoneHref)}">${icon('phone')}<span>${esc(t('detailCall'))}</span></a>` : ''}
          <a class="soft-button" href="${mapUrl}" target="_blank" rel="noopener noreferrer">${icon('map')}<span>${esc(t('detailMap'))}</span></a>
          <button class="soft-button" type="button" data-share="${esc(listing.id)}">${icon('share')}<span>${esc(t('detailShare'))}</span></button>
        </div>
      </div>`;
  }

  function setHash(id) {
    try { history.replaceState(null, '', `#b=${encodeURIComponent(id)}`); } catch { /* ignore */ }
  }
  function clearHash() {
    try {
      if (/^#b=/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
    } catch { /* ignore */ }
  }

  function openDetails(id, options = {}) {
    const listing = byId(id);
    if (!listing) return;
    const dialog = $('#detailModal');
    $('#detailContent').innerHTML = detailMarkup(listing);
    if (!dialog.open) dialog.showModal();
    if (options.hash !== false) setHash(id);
    $('#detailContent .detail-body h2')?.focus?.();
  }

  function refreshDetailSave(id) {
    const button = $('#detailSave');
    if (!button || String(button.dataset.save) !== String(id)) return;
    const saved = state.saved.has(String(id));
    const label = saved ? t('savedLabel') : t('saveLabel');
    button.classList.toggle('is-saved', saved);
    button.setAttribute('aria-pressed', String(saved));
    button.setAttribute('aria-label', label);
    button.title = label;
    button.innerHTML = icon(saved ? 'heart-filled' : 'heart');
  }

  function openFromHash() {
    const match = /^#b=(.+)$/.exec(location.hash);
    if (!match) return;
    const id = decodeURIComponent(match[1]);
    if (byId(id)) openDetails(id, { hash: false });
  }

  /* ---------- saved ---------- */
  function toggleSave(id) {
    const key = String(id);
    if (state.saved.has(key)) {
      state.saved.delete(key);
      toast(t('removedToast'));
    } else {
      state.saved.add(key);
      toast(t('savedToast'));
    }
    persistSaved();
    render();
    refreshDetailSave(key);
  }

  /* ---------- add business ---------- */
  function showBusinessSuccess() {
    const form = $('#businessForm');
    form.classList.add('sent');
    $('#businessSuccess').hidden = false;
    $('#businessSubmit').disabled = false;
    $('#businessSubmit').querySelector('[data-i18n="submit"]').textContent = t('submit');
    const panel = $('#businessSuccess');
    panel.setAttribute('tabindex', '-1');
    panel.focus();
  }

  function resetBusinessForm() {
    const form = $('#businessForm');
    form.reset();
    form.classList.remove('sent');
    $('#businessSuccess').hidden = true;
    const message = $('#businessMessage');
    message.textContent = '';
    message.className = 'form-message';
    $$('input,select,textarea', form).forEach(field => field.setCustomValidity(''));
    const submit = $('#businessSubmit');
    submit.disabled = false;
    submit.querySelector('[data-i18n="submit"]').textContent = t('submit');
  }

  function openAdd() {
    resetBusinessForm();
    const dialog = $('#businessModal');
    if (!dialog.open) dialog.showModal();
    setTimeout(() => $('#businessForm').elements.name?.focus(), 40);
  }

  function closeDrawer() {
    $('#sidebar').classList.remove('open');
    $('#drawerBackdrop').hidden = true;
    $('#mobileMenu').setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  function collectBusiness() {
    const form = $('#businessForm');
    const fields = form.elements;
    const value = name => String(fields[name].value || '').trim();

    fields.name.setCustomValidity('');
    fields.phone.setCustomValidity('');
    fields.description.setCustomValidity('');
    fields.website.setCustomValidity('');
    fields.email.setCustomValidity('');

    if (value('name').length < 2) fields.name.setCustomValidity(t('errName'));
    if (value('phone').replace(/\D/g, '').length < 6) fields.phone.setCustomValidity(t('errPhone'));
    if (value('description').length < 10) fields.description.setCustomValidity(t('errDescription'));

    if (!form.checkValidity()) {
      form.reportValidity();
      return null;
    }

    return {
      companyFax: value('companyFax'),
      name: value('name'),
      category: fields.category.value,
      city: fields.city.value,
      neighborhood: value('neighborhood'),
      phone: value('phone'),
      email: value('email'),
      website: value('website'),
      description: value('description')
    };
  }

  async function submitBusiness(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.classList.contains('sent')) return;

    const payload = collectBusiness();
    if (!payload) return;

    const message = $('#businessMessage');
    message.className = 'form-message';
    message.textContent = '';

    if (payload.companyFax) {
      showBusinessSuccess();
      return;
    }

    const submit = $('#businessSubmit');
    submit.disabled = true;
    submit.querySelector('[data-i18n="submit"]').textContent = t('sending');

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      let body = {};
      try { body = await response.json(); } catch { body = {}; }
      if (!response.ok) {
        const error = new Error(body.error || 'request failed');
        error.status = response.status;
        throw error;
      }
      form.reset();
      showBusinessSuccess();
    } catch (error) {
      submit.disabled = false;
      submit.querySelector('[data-i18n="submit"]').textContent = t('submit');
      const offline = location.protocol === 'file:' || error.status === 503 || typeof error.status === 'undefined';
      message.className = 'form-message is-error';
      message.textContent = offline ? t('errOffline') : (error.status === 429 ? t('errTooMany') : t('errServer'));
    }
  }

  /* ---------- data loading ---------- */
  async function loadListings() {
    state.status = 'loading';
    render();
    try {
      const response = await fetch('/api/listings', { headers: { Accept: 'application/json' }, cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      state.listings = Array.isArray(data.listings) ? data.listings : [];
      state.status = 'ready';
    } catch {
      state.listings = [];
      state.status = 'offline';
    }
    render();
    openFromHash();
  }

  /* ---------- share ---------- */
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch { /* fall through */ }
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch { return false; }
  }

  async function shareListing(id) {
    const url = location.href.split('#')[0] + `#b=${encodeURIComponent(id)}`;
    const copied = await copyText(url);
    toast(copied ? t('detailShareCopied') : t('detailShareFailed'));
  }

  /* ---------- filter helpers ---------- */
  function resetFilters(showToast) {
    state.query = '';
    state.city = ALL_CITIES;
    state.category = ALL_CATEGORY;
    state.sort = 'recommended';
    $('#searchInput').value = '';
    fillCitySelect($('#citySelect'));
    fillCitySelect($('#heroCity'));
    $('#sortSelect').value = state.sort;
    if (showToast) toast(t('filtersCleared'));
    render();
  }

  function setView(view) {
    if (view === 'add') { openAdd(); return; }
    if (view === 'saved' || view === 'discover') {
      state.view = view;
      state.query = '';
      state.city = ALL_CITIES;
      state.category = ALL_CATEGORY;
      $('#searchInput').value = '';
      fillCitySelect($('#citySelect'));
      fillCitySelect($('#heroCity'));
    }
    render();
  }

  /* ---------- events ---------- */
  function handleClick(event) {
    const target = event.target;

    const language = target.closest('[data-lang]');
    if (language) {
      state.lang = language.dataset.lang === 'ka' ? 'ka' : 'en';
      saveLanguage();
      applyLanguage();
      return;
    }

    const viewButton = target.closest('[data-view]');
    if (viewButton) {
      setView(viewButton.dataset.view);
      if (viewButton.dataset.view === 'saved') {
        $('#directorySection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeDrawer();
      }
      if (viewButton.dataset.view === 'discover') {
        $('#hero').scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeDrawer();
      }
      return;
    }

    if (target.closest('[data-open-add]')) {
      openAdd();
      closeDrawer();
      return;
    }

    const closeTrigger = target.closest('[data-close-modal]');
    if (closeTrigger) {
      const dialog = closeTrigger.closest('dialog');
      dialog?.close();
      if (dialog?.id === 'detailModal') clearHash();
      return;
    }

    const categoryButton = target.closest('[data-category]');
    if (categoryButton) {
      state.category = categoryButton.dataset.category || ALL_CATEGORY;
      state.view = 'discover';
      render();
      if (categoryButton.closest('.sidebar')) {
        $('#directorySection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeDrawer();
      }
      return;
    }

    const popular = target.closest('[data-search]');
    if (popular) {
      state.query = '';
      state.category = popular.dataset.search;
      state.view = 'discover';
      $('#searchInput').value = '';
      render();
      $('#directorySection').scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeDrawer();
      return;
    }

    const save = target.closest('[data-save]');
    if (save) {
      event.preventDefault();
      toggleSave(save.dataset.save);
      return;
    }

    const details = target.closest('[data-details]');
    if (details) {
      openDetails(details.dataset.details);
      return;
    }

    const contact = target.closest('[data-contact]');
    if (contact) {
      openDetails(contact.dataset.contact);
      return;
    }

    const share = target.closest('[data-share]');
    if (share) {
      shareListing(share.dataset.share);
      return;
    }

    if (target.closest('#clearFilters')) {
      resetFilters(true);
      return;
    }

    if (target.closest('#retryButton')) {
      loadListings();
      return;
    }

    const emptyAction = target.closest('#emptyAction');
    if (emptyAction) {
      const mode = emptyAction.dataset.mode;
      if (mode === 'add') openAdd();
      else if (mode === 'browse') { setView('discover'); resetFilters(false); $('#directorySection').scrollIntoView({ behavior: 'smooth' }); }
      else resetFilters(true);
      return;
    }

    if (target.closest('#mobileMenu')) {
      const sidebar = $('#sidebar');
      const open = !sidebar.classList.contains('open');
      sidebar.classList.toggle('open', open);
      $('#drawerBackdrop').hidden = !open;
      $('#mobileMenu').setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('no-scroll', open);
      return;
    }

    if (target.closest('#drawerBackdrop')) {
      closeDrawer();
      return;
    }

    if (target.closest('#addAnother')) {
      resetBusinessForm();
      setTimeout(() => $('#businessForm').elements.name?.focus(), 40);
    }
  }

  function init() {
    $('#footerYear').textContent = String(new Date().getFullYear());

    $('#languageSelectOld')?.remove?.();
    $$('.lang-toggle button').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.lang === state.lang)); });

    $('#searchInput').addEventListener('input', event => {
      state.query = event.target.value;
      state.view = 'discover';
      render();
    });

    $('#searchForm').addEventListener('submit', event => {
      event.preventDefault();
      state.view = 'discover';
      render();
      $('#directorySection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $('#sortSelect').addEventListener('change', event => {
      state.sort = event.target.value;
      render();
    });

    $('#citySelect').addEventListener('change', event => {
      state.city = event.target.value;
      $('#heroCity').value = state.city;
      render();
    });
    $('#heroCity').addEventListener('change', event => {
      state.city = event.target.value;
      $('#citySelect').value = state.city;
      render();
    });

    $('#businessForm').addEventListener('submit', submitBusiness);
    $$('#businessForm input, #businessForm select, #businessForm textarea').forEach(field => {
      field.addEventListener('input', () => field.setCustomValidity(''));
      field.addEventListener('change', () => field.setCustomValidity(''));
    });

    document.addEventListener('click', handleClick);

    $$('dialog.modal').forEach(dialog => {
      dialog.addEventListener('click', event => {
        if (event.target === dialog) {
          dialog.close();
          if (dialog.id === 'detailModal') clearHash();
        }
      });
    });
    $('#detailModal').addEventListener('close', clearHash);

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        const detail = $('#detailModal');
        if (detail?.open) { detail.close(); clearHash(); }
        closeDrawer();
      }
      if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) {
        event.preventDefault();
        $('#searchInput').focus();
        $('#searchInput').scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    window.addEventListener('hashchange', openFromHash);
    window.addEventListener('resize', () => { if (window.innerWidth > 960) closeDrawer(); });

    applyLanguage();
    loadListings();
  }

  init();
})();
