/* JupitoSecure SiteLink — static curated directory UI */
(() => {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const DATA_BASE = new URL("../sitelink/api/v1/categories/", document.baseURI);
  const PAGE_SIZE = 12;

  const copy = {
    en: {
      chooseLanguage: "Choose your language",
      languageIntro: "Verification status does not 100% guarantee a website can never be compromised.Select a language to continue. You can change it later.",
      continue: "Continue",
      home: "Home",
      directoryNoteTitle: "Curated directory",
      directoryNote:
        "JupitoSecure SiteLink helps you find public website destinations. External sites are operated independently.",
      findTitle: "Find a website",
      findSubtitle: "Search websites, services or things you want to do.",
      search: "Search",
      category: "Category",
      labels: "Labels",
      popularWebsites: "Popular websites",
      clearAll: "Clear all",
      noResults: "No websites found",
      tryAgain: "Try another search or remove a filter.",
      clearFilters: "Clear filters",
      loadMore: "Load more",
      selectCategory: "Select category",
      categoryHint: "Choose one category.",
      selectLabels: "Select labels",
      labelsHint: "Choose one or more labels.",
      reset: "Reset",
      apply: "Apply",
      websiteInformation: "WEBSITE INFORMATION",
      usefulFor: "Useful for",
      destination: "Destination",
      externalNotice:
        "This is an external website operated by its respective owner. SiteLink does not control its content, services or privacy practices.",
      cancel: "Cancel",
      launchWebsite: "Launch website ↗",
      footerDisclaimer:
        "SiteLink is an independent directory, not the operator of listed websites.",
      allCategories: "All categories",
      searchResults: "Search results",
      websitesFound: "websites found",
      websiteFound: "website found",
      global: "Global",
      launch: "Launch",
      info: "Info",
      noCategories: "No categories found.",
      noLabels: "No labels found.",
      noLabelsSelected: "No labels",
      noCatalogue: "Unable to load the selected language catalogue.",
      popupsBlocked:
        "Your browser blocked the new tab. Allow pop-ups to open this destination.",
      openedTab: "Opened in a new browser tab.",
      copied: "Website address copied.",
      clipboardUnavailable: "Clipboard access is unavailable in this browser.",
      searchPlaceholder: "Search websites, services or tasks",
      categorySearchPlaceholder: "Search categories",
      labelsSearchPlaceholder: "Search labels",
    },

    hi: {
      chooseLanguage: "अपनी भाषा चुनें",
      languageIntro:
        "सत्यापन की स्थिति इस बात की 100% गारंटी नहीं देती कि वेबसाइट कभी भी हैक नहीं हो सकती। जारी रखने के लिए भाषा चुनें। आप इसे बाद में बदल सकते हैं।",
      continue: "जारी रखें",
      home: "होम",
      directoryNoteTitle: "चयनित निर्देशिका",
      directoryNote:
        "SiteLink सार्वजनिक वेबसाइटों के पते खोजने में मदद करता है। बाहरी वेबसाइटें स्वतंत्र रूप से संचालित होती हैं।",
      findTitle: "वेबसाइट खोजें",
      findSubtitle: "वेबसाइट, सेवा या अपने काम के अनुसार खोजें।",
      search: "खोजें",
      category: "श्रेणी",
      labels: "लेबल",
      popularWebsites: "लोकप्रिय वेबसाइटें",
      clearAll: "सभी हटाएँ",
      noResults: "कोई वेबसाइट नहीं मिली",
      tryAgain: "दूसरी खोज करें या फ़िल्टर हटाएँ।",
      clearFilters: "फ़िल्टर हटाएँ",
      loadMore: "और देखें",
      selectCategory: "श्रेणी चुनें",
      categoryHint: "एक श्रेणी चुनें।",
      selectLabels: "लेबल चुनें",
      labelsHint: "एक या अधिक लेबल चुनें।",
      reset: "रीसेट",
      apply: "लागू करें",
      websiteInformation: "वेबसाइट की जानकारी",
      usefulFor: "उपयोग",
      destination: "वेबसाइट पता",
      externalNotice:
        "यह संबंधित स्वामी द्वारा संचालित बाहरी वेबसाइट है। SiteLink इसकी सामग्री, सेवाओं या गोपनीयता नीतियों को नियंत्रित नहीं करता।",
      cancel: "रद्द करें",
      launchWebsite: "वेबसाइट खोलें ↗",
      footerDisclaimer:
        "SiteLink एक स्वतंत्र निर्देशिका है; सूचीबद्ध वेबसाइटों का संचालक नहीं है।",
      allCategories: "सभी श्रेणियाँ",
      searchResults: "खोज परिणाम",
      websitesFound: "वेबसाइटें मिलीं",
      websiteFound: "वेबसाइट मिली",
      global: "वैश्विक",
      launch: "खोलें",
      info: "जानकारी",
      noCategories: "कोई श्रेणी नहीं मिली।",
      noLabels: "कोई लेबल नहीं मिला।",
      noLabelsSelected: "कोई लेबल नहीं",
      noCatalogue: "चयनित भाषा की निर्देशिका लोड नहीं हो सकी।",
      popupsBlocked: "ब्राउज़र ने नया टैब खोलने से रोक दिया।",
      openedTab: "वेबसाइट नए ब्राउज़र टैब में खोली गई।",
      copied: "वेबसाइट का पता कॉपी किया गया।",
      clipboardUnavailable: "इस ब्राउज़र में क्लिपबोर्ड उपलब्ध नहीं है।",
      searchPlaceholder: "वेबसाइट, सेवाएँ या काम खोजें",
      categorySearchPlaceholder: "श्रेणियाँ खोजें",
      labelsSearchPlaceholder: "लेबल खोजें",
    },

    mr: {
      chooseLanguage: "तुमची भाषा निवडा",
      languageIntro: "सत्यापन स्थितीमुळे वेबसाइट कधीही हॅक होऊ शकत नाही याची १००% हमी मिळत नाही. पुढे जाण्यासाठी भाषा निवडा. तुम्ही ती नंतर बदलू शकता.",
      continue: "पुढे चला",
      home: "मुख्यपृष्ठ",
      directoryNoteTitle: "निवडक निर्देशिका",
      directoryNote:
        "SiteLink सार्वजनिक वेबसाइटचे पत्ते शोधण्यास मदत करते. बाह्य वेबसाइट स्वतंत्रपणे चालवल्या जातात.",
      findTitle: "वेबसाइट शोधा",
      findSubtitle: "वेबसाइट, सेवा किंवा तुमच्या कामानुसार शोधा.",
      search: "शोधा",
      category: "वर्ग",
      labels: "लेबल",
      popularWebsites: "लोकप्रिय वेबसाइट",
      clearAll: "सर्व काढा",
      noResults: "वेबसाइट सापडली नाही",
      tryAgain: "दुसरा शोध वापरा किंवा फिल्टर काढा.",
      clearFilters: "फिल्टर काढा",
      loadMore: "आणखी दाखवा",
      selectCategory: "वर्ग निवडा",
      categoryHint: "एक वर्ग निवडा.",
      selectLabels: "लेबल निवडा",
      labelsHint: "एक किंवा अधिक लेबल निवडा.",
      reset: "रीसेट",
      apply: "लागू करा",
      websiteInformation: "वेबसाइटची माहिती",
      usefulFor: "उपयोग",
      destination: "वेबसाइट पत्ता",
      externalNotice:
        "ही संबंधित मालकाद्वारे चालवली जाणारी बाह्य वेबसाइट आहे. SiteLink तिची सामग्री, सेवा किंवा गोपनीयता पद्धती नियंत्रित करत नाही.",
      cancel: "रद्द करा",
      launchWebsite: "वेबसाइट उघडा ↗",
      footerDisclaimer:
        "SiteLink ही स्वतंत्र निर्देशिका आहे; सूचीबद्ध वेबसाइटची संचालक नाही.",
      allCategories: "सर्व श्रेणी",
      searchResults: "शोध परिणाम",
      websitesFound: "वेबसाइट सापडल्या",
      websiteFound: "वेबसाइट सापडली",
      global: "जागतिक",
      launch: "उघडा",
      info: "माहिती",
      noCategories: "कोणतीही श्रेणी सापडली नाही.",
      noLabels: "कोणतेही लेबल सापडले नाही.",
      noLabelsSelected: "लेबल नाहीत",
      noCatalogue: "निवडलेल्या भाषेची निर्देशिका लोड होऊ शकली नाही.",
      popupsBlocked: "ब्राउझरने नवीन टॅब उघडण्यास प्रतिबंध केला.",
      openedTab: "वेबसाइट नवीन ब्राउझर टॅबमध्ये उघडली.",
      copied: "वेबसाइटचा पत्ता कॉपी केला.",
      clipboardUnavailable: "या ब्राउझरमध्ये क्लिपबोर्ड उपलब्ध नाही.",
      searchPlaceholder: "वेबसाइट, सेवा किंवा काम शोधा",
      categorySearchPlaceholder: "श्रेणी शोधा",
      labelsSearchPlaceholder: "लेबल शोधा",
    },

    gu: {
      chooseLanguage: "તમારી ભાષા પસંદ કરો",
      languageIntro: "ચકાસણી સ્થિતિ 100% ગેરંટી આપતી નથી કે વેબસાઇટ સાથે ક્યારેય ચેડા થઈ શકશે નહીં. આગળ વધવા માટે ભાષા પસંદ કરો. તમે તેને પછીથી બદલી શકો છો.",
      continue: "આગળ વધો",
      home: "મુખ્ય પૃષ્ઠ",
      directoryNoteTitle: "પસંદ કરેલી ડિરેક્ટરી",
      directoryNote:
        "SiteLink જાહેર વેબસાઇટના સરનામાં શોધવામાં મદદ કરે છે. બાહ્ય વેબસાઇટ્સ સ્વતંત્ર રીતે સંચાલિત થાય છે.",
      findTitle: "વેબસાઇટ શોધો",
      findSubtitle: "વેબસાઇટ, સેવા અથવા તમારા કામના આધારે શોધો.",
      search: "શોધો",
      category: "શ્રેણી",
      labels: "લેબલ",
      popularWebsites: "લોકપ્રિય વેબસાઇટ્સ",
      clearAll: "બધું સાફ કરો",
      noResults: "કોઈ વેબસાઇટ મળી નથી",
      tryAgain: "બીજી શોધ અજમાવો અથવા ફિલ્ટર દૂર કરો.",
      clearFilters: "ફિલ્ટર સાફ કરો",
      loadMore: "વધુ બતાવો",
      selectCategory: "શ્રેણી પસંદ કરો",
      categoryHint: "એક શ્રેણી પસંદ કરો.",
      selectLabels: "લેબલ પસંદ કરો",
      labelsHint: "એક અથવા વધુ લેબલ પસંદ કરો.",
      reset: "રીસેટ કરો",
      apply: "લાગુ કરો",
      websiteInformation: "વેબસાઇટની માહિતી",
      usefulFor: "ઉપયોગીતા",
      destination: "વેબસાઇટનું સરનામું",
      externalNotice:
        "આ સંબંધિત માલિક દ્વારા સંચાલિત બાહ્ય વેબસાઇટ છે. SiteLink તેની સામગ્રી, સેવાઓ અથવા ગોપનીયતા પદ્ધતિઓને નિયંત્રિત કરતું નથી.",
      cancel: "રદ કરો",
      launchWebsite: "વેબસાઇટ ખોલો ↗",
      footerDisclaimer:
        "SiteLink એક સ્વતંત્ર ડિરેક્ટરી છે; તે સૂચિબદ્ધ વેબસાઇટ્સનું સંચાલન કરતું નથી.",
      allCategories: "બધી શ્રેણીઓ",
      searchResults: "શોધનાં પરિણામો",
      websitesFound: "વેબસાઇટ્સ મળી",
      websiteFound: "વેબસાઇટ મળી",
      global: "વૈશ્વિક",
      launch: "ખોલો",
      info: "માહિતી",
      noCategories: "કોઈ શ્રેણી મળી નથી.",
      noLabels: "કોઈ લેબલ મળ્યાં નથી.",
      noLabelsSelected: "કોઈ લેબલ નથી",
      noCatalogue: "પસંદ કરેલી ભાષાની ડિરેક્ટરી લોડ થઈ શકી નથી.",
      popupsBlocked: "બ્રાઉઝરે નવી ટૅબ ખોલવા પર પ્રતિબંધ મૂક્યો.",
      openedTab: "વેબસાઇટ નવી બ્રાઉઝર ટૅબમાં ખોલવામાં આવી.",
      copied: "વેબસાઇટનું સરનામું કૉપી કરવામાં આવ્યું.",
      clipboardUnavailable: "આ બ્રાઉઝરમાં ક્લિપબોર્ડ ઉપલબ્ધ નથી.",
      searchPlaceholder: "વેબસાઇટ, સેવા અથવા કામ શોધો",
      categorySearchPlaceholder: "શ્રેણી શોધો",
      labelsSearchPlaceholder: "લેબલ શોધો",
    },
  };

  const languageNames = {
    en: "English",
    hi: "हिंदी",
    mr: "मराठी",
    gu: "ગુજરાતી",
  };

  const categoryIcons = {
    ai: '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 9h6M9 12h6M9 15h3M12 2v3M12 19v3M2 12h3M19 12h3"/>',

    "banking-finance-india":
      '<path d="M3 9h18L12 4 3 9Zm2 2v7m4-7v7m6-7v7m4-7v7M3 20h18"/>',

    business:
      '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2"/>',

    "education-india":
      '<path d="m2 9 10-5 10 5-10 5L2 9Zm4 3v5c4 3 8 3 12 0v-5M22 9v6"/>',

    "government-india":
      '<path d="M3 9h18L12 4 3 9Zm2 2v7m4-7v7m6-7v7m4-7v7M3 20h18"/>',

    legal:
      '<path d="M12 3v17M5 6h14M7 6l-4 8h8L7 6Zm10 0-4 8h8l-4-8ZM8 21h8"/>',

    "health-india":
      '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>',

    "jobs-india":
      '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5h8v2M3 12h18m-11 0v2h4v-2"/>',

    popular:
      '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',

    "shopping-india": '<path d="M4 8h16l-1 12H5L4 8Zm4 0a4 4 0 0 1 8 0"/>',

    "social-media":
      '<path d="M4 5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path d="M7 11h.01M12 11h.01M17 11h.01"/>',

    "telecom-india":
      '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 5h4M10 18h4"/>',

    "travel-india": '<path d="m3 14 18-9-7 17-3-7-8-1Z"/>',

    "utilities-india": '<path d="M14 2 5 13h6l-1 9 9-12h-6l1-8Z"/>',

    creative:
      '<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.5 1.5 0 0 1 1-2.8H17a4 4 0 0 0 4-4c0-4.1-4-7.5-9-7.5Z"/><path d="M7.5 10h.01M10 7h.01M15 8h.01"/>',
  };

  const state = {
    language: localStorage.getItem("sitelink.language") || "en",

    theme:
      localStorage.getItem("sitelink.theme") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"),

    query: "",
    category: "popular",
    labels: [],
    pendingCategory: null,
    pendingLabels: [],
    sort: "relevance",
    websites: [],
    categories: [],
    visible: PAGE_SIZE,
    activeSite: null,
    catalogueLoadId: 0,
  };

  const safe = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  // Resolve interface strings only from the active language.
  // No English dictionary fallback is permitted.
  const t = (key) => {
    const dictionary = copy[state.language];
    return dictionary && dictionary[key] != null ? dictionary[key] : key;
  };

  const normalize = (v) =>
    String(v ?? "")
      .normalize("NFKD")
      .toLocaleLowerCase(state.language || "en")
      .trim();

  const arr = (v) =>
    Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : [];

  const categoryName = (category) =>
    String(category?.category_name || category?.name || category?.id || "");

  function applyLanguage() {
    document.documentElement.lang = state.language || "en";

    $$("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });

    const currentLanguage = $("#currentLanguage");

    if (currentLanguage) {
      currentLanguage.textContent =
        languageNames[state.language] || state.language;
    }

    [
      ["#searchInput", "searchPlaceholder"],
      ["#categorySearch", "categorySearchPlaceholder"],
      ["#labelsSearch", "labelsSearchPlaceholder"],
    ].forEach(([selector, key]) => {
      const input = $(selector);
      if (input) input.placeholder = t(key);
    });

    [
      ["#categoryReset", "reset"],
      ["#categoryApply", "apply"],
      ["#labelsReset", "reset"],
      ["#labelsApply", "apply"],
    ].forEach(([selector, key]) => {
      const button = $(selector);
      if (button) button.textContent = t(key);
    });
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;

    $("#themeToggle").setAttribute(
      "aria-label",
      state.theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );

    localStorage.setItem("sitelink.theme", state.theme);
  }

  function openApp() {
    $("#languageScreen").classList.add("is-hidden");
    $("#appShell").classList.remove("is-hidden");

    applyLanguage();
    applyTheme();
    render();
  }

  function showLanguage() {
    state.pendingLanguage = state.language;

    $$(".language-option").forEach((b) =>
      b.classList.toggle("selected", b.dataset.language === state.language),
    );

    $("#languageScreen").classList.remove("is-hidden");
    $("#languageScreen").classList.add("language-settings-open");
  }

  function iconSVG(id) {
    const path =
      categoryIcons[id] ||
      '<circle cx="12" cy="12" r="8"/><path d="M12 8v8m-4-4h8"/>';

    return `<span class="category-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${path}</svg></span>`;
  }

  async function fetchJSON(url) {
    const r = await fetch(url, { cache: "no-store" });

    if (!r.ok) {
      throw new Error(`Unable to load ${url} (${r.status})`);
    }

    return r.json();
  }

  function normalizeRecord(raw, category) {
    // Catalogue values are already translated in the language-specific JSON.
    // Read those values directly; never inspect English translation properties.

    const name = String(raw.name || raw.title || "").trim();
    const candidate = String(raw.canonical_url || raw.url || "").trim();

    let parsed;

    try {
      parsed = new URL(candidate);
    } catch {
      return null;
    }

    if (
      !name ||
      parsed.protocol !== "https:" ||
      parsed.username ||
      parsed.password
    ) {
      return null;
    }

    const domain = String(raw.domain || parsed.hostname).toLowerCase();

    if (domain !== parsed.hostname.toLowerCase()) {
      return null;
    }

    const status = String(
      raw.status || raw.verification?.status || "",
    ).toLowerCase();

    if (!["verified", "active", "published"].includes(status)) {
      return null;
    }

    return {
      id: String(raw.id || domain),
      name,
      domain,
      url: parsed.href,
      category: String(raw.category || category.id),

      categoryLabel: String(
        raw.category_name ||
          category.category_name ||
          category.name ||
          category.id,
      ),

      region:
        String(raw.region || "global")
          .trim()
          .toLowerCase() || "global",
      description: String(raw.description || ""),
      labels: arr(raw.labels),
      keywords: arr(raw.keywords),
      use_cases: arr(raw.use_cases),

      added: String(raw.added || raw.updated_at || raw.verified_at || ""),

      status,
      reviewRequired: Boolean(raw.review_required),
      verificationMethod: String(raw.verification?.method || ""),
    };
  }

  async function loadDirectory() {
    const language = state.language;
    const loadId = ++state.catalogueLoadId;

    const isCurrentLoad = () =>
      loadId === state.catalogueLoadId && language === state.language;

    // Clear the previous language before making any network request.
    state.websites = [];
    state.categories = [];
    state.labels = [];
    state.pendingLabels = [];
    $("#labelsSearch").value = "";
    $("#labelChoices").replaceChildren();

    render();

    try {
      const index = await fetchJSON(new URL("index.json", DATA_BASE));

      if (!isCurrentLoad()) return;

      if (!Array.isArray(index.categories)) {
        throw new Error("index.json must contain a categories array");
      }

      // Use only the filename explicitly mapped for the selected language.
      // Categories without that language are omitted; they never fall back
      // to English or to another language.

      const definitions = index.categories
        .map((item) => ({
          id: String(item.id || "").trim(),

          filename:
            item.files && typeof item.files[language] === "string"
              ? item.files[language].trim()
              : "",
        }))
        .filter((item) => item.id && item.filename);

      if (!definitions.length) {
        throw new Error(
          `No category JSON files are configured for language: ${language}`,
        );
      }

      const loaded = await Promise.all(
        definitions.map(async ({ id, filename }) => {
          const payload = await fetchJSON(new URL(filename, DATA_BASE));

          if (!isCurrentLoad()) return null;

          if (payload.language && payload.language !== language) {
            throw new Error(
              `${filename} declares language "${payload.language}", expected "${language}"`,
            );
          }

          if (payload.category && payload.category !== id) {
            throw new Error(
              `${filename} declares category "${payload.category}", expected "${id}"`,
            );
          }

          const records = Array.isArray(payload)
            ? payload
            : payload.urls || payload.data || payload.listings;

          if (!Array.isArray(records)) {
            throw new Error(`${filename} must contain an array of records`);
          }

          const displayName =
            payload.category_name ||
            records.find((record) => record.category_name)?.category_name ||
            id;

          const category = {
            id,
            name: String(displayName),
            category_name: String(displayName),
          };

          return {
            category,

            websites: records
              .map((raw) => normalizeRecord(raw, category))
              .filter(Boolean),
          };
        }),
      );

      if (!isCurrentLoad()) return;

      // Replace the catalogue atomically.
      // No bundled English Popular data.
      // No partial fallback.
      // No merging records from another language.

      const result = loaded.filter(Boolean);

      state.categories = result.map((item) => item.category);

      state.websites = result.flatMap((item) => item.websites);

      state.visible = PAGE_SIZE;

      state.category = state.categories.some((item) => item.id === "popular")
        ? "popular"
        : state.categories[0]?.id || null;

      render();

      if (
        $("#categoryDialog") &&
        !$("#categoryDialog").classList.contains("is-hidden")
      ) {
        renderCategoryChoices();
      }

      if (
        $("#labelsDialog") &&
        !$("#labelsDialog").classList.contains("is-hidden")
      ) {
        renderLabelChoices();
      }
    } catch (error) {
      if (!isCurrentLoad()) return;

      console.error(`Failed to load ${language} catalogue:`, error);

      // Fail closed: missing Hindi JSON must never expose English content.
      state.websites = [];
      state.categories = [];
      state.labels = [];
      state.pendingLabels = [];

      render();

      toast(`${t("noCatalogue")} (${language})`);
    }
  }

  function searchableText(site) {
    return [
      site.name,
      site.domain,
      site.url,
      site.category,
      site.categoryLabel,
      site.region,
      site.description,
      ...site.labels,
      ...site.keywords,
      ...site.use_cases,
    ].join(" ");
  }

  function filtered() {
    const q = normalize(state.query);

    let list = state.websites.filter((site) => {
      const queryMatch = !q || normalize(searchableText(site)).includes(q);

      const categoryMatch = !state.category || site.category === state.category;

      const labelMatch =
        !state.labels.length ||
        state.labels.some((label) =>
          site.labels.some((x) => normalize(x) === normalize(label)),
        );

      return queryMatch && categoryMatch && labelMatch;
    });

    if (state.sort === "az") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.sort === "recent") {
      list.sort((a, b) => b.added.localeCompare(a.added));
    } else if (state.sort === "relevance" && q) {
      list.sort((a, b) => score(b, q) - score(a, q));
    }

    return list;
  }

  function score(site, q) {
    let n = 0;

    if (normalize(site.name).includes(q)) n += 8;
    if (normalize(site.domain).includes(q)) n += 6;

    if (site.labels.some((x) => normalize(x).includes(q))) {
      n += 4;
    }

    if (site.keywords.some((x) => normalize(x).includes(q))) {
      n += 3;
    }

    if (normalize(site.description).includes(q)) n += 1;

    return n;
  }

  function render() {
    applyLanguage();

    const list = filtered();
    const shown = list.slice(0, state.visible);

    $("#resultsTitle").textContent =
      state.query || state.category !== "popular" || state.labels.length
        ? t("searchResults")
        : t("popularWebsites");

    $("#resultSummary").textContent = `${list.length.toLocaleString()} ${
      list.length === 1 ? t("websiteFound") : t("websitesFound")
    }`;

    $("#labelCount").textContent = state.labels.length
      ? String(state.labels.length)
      : "";

    const selectedCategory = state.categories.find(
      (c) => c.id === state.category,
    );

    const selectedCategoryName =
      selectedCategory?.name ||
      (state.category === "popular"
        ? t("popularWebsites")
        : state.category || t("allCategories"));

    $("#selectedCategoryName").textContent = selectedCategoryName;

    $("#selectedCategoryIcon").innerHTML = iconSVG(state.category || "popular");

    $("#activeChips").innerHTML = [
      ...state.labels.map(
        (label) =>
          `<span class="active-chip">${safe(label)} <button data-remove-label="${safe(label)}" aria-label="Remove ${safe(label)}">×</button></span>`,
      ),

      ...(state.query
        ? [
            `<span class="active-chip">${safe(state.query)} <button data-remove-query aria-label="Clear search">×</button></span>`,
          ]
        : []),
    ].join("");

    $("#websiteResults").innerHTML = shown
      .map(
        (site) =>
          `<article class="website-card">
            ${iconSVG(site.category)}
            <div class="site-heading">
              <h3>${safe(site.name)}</h3>
              <div class="site-meta">
                <span class="site-domain" title="${safe(site.url)}">${safe(site.domain)}</span>
                <span class="site-region">${safe(site.region === "global" ? t("global") : site.region.toUpperCase())}</span>
              </div>
            </div>
            <p class="site-description">${safe(site.description)}</p>
            <div class="card-labels">
              ${site.labels
                .slice(0, 4)
                .map((x) => `<span class="label-pill">${safe(x)}</span>`)
                .join("")}
            </div>
            <div class="card-actions">
              <button class="btn btn-primary launch-card-btn" data-info="${safe(site.id)}">${safe(t("launch"))} <span aria-hidden="true">↗</span></button>
              <button class="btn btn-secondary info-card-btn" data-info="${safe(site.id)}"><span aria-hidden="true">ⓘ</span> ${safe(t("info"))}</button>
            </div>
          </article>`,
      )
      .join("");

    $("#emptyState").classList.toggle("is-hidden", list.length !== 0);

    $("#websiteResults").classList.toggle("is-hidden", list.length === 0);

    $("#loadMore").classList.toggle("is-hidden", shown.length >= list.length);
  }

  // Labels are scoped to the currently selected category and language.
  // state.websites contains only the active language catalogue.
  function allLabels() {
    const sites = state.category
      ? state.websites.filter((site) => site.category === state.category)
      : state.websites;

    const unique = new Map();
    for (const site of sites) {
      for (const label of site.labels) {
        const key = normalize(label);
        if (key && !unique.has(key)) unique.set(key, label);
      }
    }
    return [...unique.values()].sort((a, b) =>
      a.localeCompare(b, state.language),
    );
  }

  function resetCategoryLabels() {
    state.labels = [];
    state.pendingLabels = [];
    $("#labelsSearch").value = "";
    $("#labelChoices").replaceChildren();
  }

  function renderCategoryChoices() {
    const q = normalize($("#categorySearch").value);

    const choices = [
      { id: "", name: t("allCategories") },
      ...state.categories,
    ].filter((c) => normalize(c.name).includes(q));

    $("#categoryChoices").innerHTML =
      choices
        .map(
          (c) =>
            `<label class="choice-row category-choice-row">
              ${iconSVG(c.id || "popular")}
              <input type="radio" name="categoryChoice" value="${safe(c.id)}" ${
                state.pendingCategory === c.id ? "checked" : ""
              }>
              <span>${safe(c.name)}</span>
            </label>`,
        )
        .join("") ||
      `<p class="muted" style="padding:14px">${safe(t("noCategories"))}</p>`;
  }

  function renderLabelChoices() {
    const q = normalize($("#labelsSearch").value);

    const available = allLabels();
    const allowed = new Set(available.map(normalize));
    state.pendingLabels = state.pendingLabels.filter((label) =>
      allowed.has(normalize(label)),
    );
    const choices = available.filter((x) => normalize(x).includes(q));

    $("#labelChoices").innerHTML =
      choices
        .map(
          (label) =>
            `<label class="choice-row">
              <input type="checkbox" value="${safe(label)}" ${
                state.pendingLabels.includes(label) ? "checked" : ""
              }>
              <span>${safe(label)}</span>
            </label>`,
        )
        .join("") ||
      `<p class="muted" style="padding:14px">${safe(t("noLabels"))}</p>`;
  }

  function openDialog(id) {
    $(id).classList.remove("is-hidden");

    const focus = $(id + " input");
    focus?.focus();
  }

  function closeDialogs() {
    $$(".overlay").forEach((el) => el.classList.add("is-hidden"));
  }

  function showInfo(id) {
    const site = state.websites.find((x) => x.id === id);

    if (!site) return;

    state.activeSite = site;

    $("#infoTitle").textContent = site.name;
    $("#infoCategory").textContent = site.categoryLabel;
    $("#infoDescription").textContent = site.description;

    $("#infoLabels").innerHTML =
      site.labels
        .map((x) => `<span class="label-pill">${safe(x)}</span>`)
        .join("") ||
      `<span class="muted">${safe(t("noLabelsSelected"))}</span>`;

    $("#infoUrl").textContent = site.url;
    $("#infoUrl").href = site.url;

    openDialog("#infoDialog");
  }

  async function launch() {
    if (!state.activeSite) return;

    const site = state.activeSite;

    const w = window.open(site.url, "_blank", "noopener,noreferrer");

    if (!w) {
      toast(t("popupsBlocked"));
    } else {
      toast(t("openedTab"));
    }

    closeDialogs();
  }

  let toastTimer;

  function toast(msg) {
    const el = $("#toast");

    el.textContent = msg;
    el.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  function clearAll() {
    state.query = "";
    state.labels = [];
    state.visible = PAGE_SIZE;

    $("#searchInput").value = "";

    render();
  }

  // First-entry language selection, persisted locally.
  // Language can be changed from the header.

  $$(".language-option").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$(".language-option").forEach((x) =>
        x.classList.toggle("selected", x === btn),
      );

      state.pendingLanguage = btn.dataset.language;
    }),
  );

  $("#continueButton").addEventListener("click", async () => {
    const next = state.pendingLanguage || state.language || "en";

    if (!copy[next]) {
      toast(`Unsupported language: ${next}`);
      return;
    }

    const changed = next !== state.language;

    state.language = next;

    localStorage.setItem("sitelink.language", state.language);

    $("#languageScreen").classList.add("is-hidden");
    $("#languageScreen").classList.remove("language-settings-open");
    $("#appShell").classList.remove("is-hidden");

    applyLanguage();

    if (changed) {
      state.query = "";
      state.labels = [];
      state.pendingLabels = [];
      state.pendingCategory = null;
      state.category = "popular";
      state.visible = PAGE_SIZE;

      $("#searchInput").value = "";
    }

    await loadDirectory();
  });

  $("#headerLanguage").addEventListener("click", showLanguage);

  $("#themeToggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";

    applyTheme();
  });

  $("#searchInput").addEventListener("input", (e) => {
    state.query = e.target.value;
    state.visible = PAGE_SIZE;
    render();
  });

  $("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();

    state.query = $("#searchInput").value.trim();
    state.visible = PAGE_SIZE;

    render();
  });

  $("#categoryButton").addEventListener("click", () => {
    state.pendingCategory = state.category;

    $("#categorySearch").value = "";

    renderCategoryChoices();
    openDialog("#categoryDialog");
  });

  $("#labelsButton").addEventListener("click", () => {
    state.pendingLabels = [...state.labels];

    $("#labelsSearch").value = "";

    renderLabelChoices();
    openDialog("#labelsDialog");
  });

  $("#categorySearch").addEventListener("input", renderCategoryChoices);

  $("#labelsSearch").addEventListener("input", renderLabelChoices);

  $("#categoryChoices").addEventListener("change", (e) => {
    if (e.target.name === "categoryChoice") {
      state.pendingCategory = e.target.value;
    }
  });

  $("#labelChoices").addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const v = e.target.value;

      state.pendingLabels = e.target.checked
        ? [...new Set([...state.pendingLabels, v])]
        : state.pendingLabels.filter((x) => x !== v);
    }
  });

  $("#categoryReset").addEventListener("click", () => {
    state.pendingCategory = null;
    renderCategoryChoices();
  });

  $("#categoryApply").addEventListener("click", () => {
    const nextCategory = state.pendingCategory || null;
    if (nextCategory !== state.category) {
      state.category = nextCategory;
      resetCategoryLabels();
    }
    state.visible = PAGE_SIZE;

    closeDialogs();
    render();
    // Rebuild from scratch so reopening never shows previous-category labels.
    renderLabelChoices();
  });

  $("#labelsReset").addEventListener("click", () => {
    state.pendingLabels = [];
    renderLabelChoices();
  });

  $("#labelsApply").addEventListener("click", () => {
    const allowed = new Set(allLabels().map(normalize));
    state.labels = state.pendingLabels.filter((label) =>
      allowed.has(normalize(label)),
    );
    state.visible = PAGE_SIZE;

    closeDialogs();
    render();
  });

  $("#sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  $("#clearFilters").addEventListener("click", clearAll);

  $("#emptyClear").addEventListener("click", clearAll);

  $("#loadMore").addEventListener("click", () => {
    state.visible += PAGE_SIZE;
    render();
  });

  $("#websiteResults").addEventListener("click", (e) => {
    const info = e.target.closest("[data-info]");

    if (info) {
      showInfo(info.dataset.info);
    }
  });

  $("#activeChips").addEventListener("click", (e) => {
    const label = e.target.closest("[data-remove-label]");

    if (label) {
      state.labels = state.labels.filter(
        (x) => x !== label.dataset.removeLabel,
      );
    }

    if (e.target.closest("[data-remove-query]")) {
      state.query = "";
      $("#searchInput").value = "";
    }

    render();
  });

  $("#copyUrl").addEventListener("click", async () => {
    if (!state.activeSite) return;

    try {
      await navigator.clipboard.writeText(state.activeSite.url);

      toast(t("copied"));
    } catch {
      toast(t("clipboardUnavailable"));
    }
  });

  $("#launchWebsite").addEventListener("click", launch);

  $$("[data-close-dialog]").forEach((b) =>
    b.addEventListener("click", closeDialogs),
  );

  $$(".overlay").forEach((o) =>
    o.addEventListener("click", (e) => {
      if (e.target === o) {
        closeDialogs();
      }
    }),
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDialogs();

      $("#sidebar").classList.remove("is-open");
      $("#sidebarScrim").classList.remove("is-visible");
    }
  });

  $("#menuButton").addEventListener("click", () => {
    $("#sidebar").classList.add("is-open");
    $("#sidebarScrim").classList.add("is-visible");
  });

  $("#sidebarScrim").addEventListener("click", () => {
    $("#sidebar").classList.remove("is-open");
    $("#sidebarScrim").classList.remove("is-visible");
  });

  if (!copy[state.language]) {
    state.language = "en";
  }

  // Show the language chooser on first visit.
  // If a language was saved earlier, open the application directly
  // and load only that language catalogue.

  const savedLanguage = localStorage.getItem("sitelink.language");

  if (savedLanguage && copy[savedLanguage]) {
    state.language = savedLanguage;

    openApp();
    loadDirectory();
  } else {
    state.pendingLanguage = "en";

    applyLanguage();
    applyTheme();

    $("#languageScreen").classList.remove("is-hidden");
    $("#appShell").classList.add("is-hidden");
  }
})();
