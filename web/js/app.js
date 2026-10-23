/* JupitoSecure Verified URLs Directory */
(() => {
  "use strict";

  const originalCategoryPalette = [
    { id: "Banking & Finance", label: "Banking & Finance", icon: "♜", color: "#0870ed", bg: "#e8f2ff" },
    { id: "Government", label: "Government", icon: "♙", color: "#813cf0", bg: "#f2eaff" },
    { id: "Shopping", label: "Shopping", icon: "🛒", color: "#f16b16", bg: "#fff1e7" },
    { id: "Legal", label: "Legal", icon: "⚖️", color: "#315b91", bg: "#edf3fb" },
    { id: "Travel", label: "Travel", icon: "✈", color: "#f43f58", bg: "#fff0f2" },
    { id: "Education", label: "Education", icon: "◇", color: "#8746e8", bg: "#f1eaff" },
    { id: "Jobs", label: "Jobs", icon: "▣", color: "#0b9b9b", bg: "#e5f8f6" },
    { id: "Telecom", label: "Telecom", icon: "◉", color: "#2385e9", bg: "#e9f3ff" },
    { id: "Health", label: "Health", icon: "♡", color: "#e74759", bg: "#fff0f2" },
    { id: "Utilities", label: "Utilities", icon: "⚒", color: "#315b91", bg: "#edf3fb" },
    { id: "AI", label: "AI & Artificial Intelligence", icon: "🤖", color: "#7c3aed", bg: "#f1eaff" },
    { id: "Creative", label: "Creative & Design", icon: "🎨", color: "#db2777", bg: "#fce7f3" }
  ];

  // Category JSON files are served from api/v1/categories/ beside index.html.
  const BASE_LOCAL = window.location.origin || "./";
  const API_V1_BASE = new URL("web/api/v1/categories/", new URL(BASE_LOCAL, document.baseURI)).href;
  const CATEGORY_INDEX_URL = new URL("index.json", API_V1_BASE).href;
  let websites = [];
  let categories = [];

  const CATEGORY_DETAILS = {
    "banking-finance-india": { label: "Banking & Finance", icon: "🏦", color: "#0870ed", bg: "#e8f2ff" },
    "business": { label: "Business", icon: "💼", color: "#813cf0", bg: "#f2eaff" },
    "education-india": { label: "Education", icon: "🎓", color: "#8746e8", bg: "#f1eaff" },
    "government-india": { label: "Government", icon: "🏛️", color: "#813cf0", bg: "#f2eaff" },
    "health-india": { label: "Health", icon: "🏥", color: "#e74759", bg: "#fff0f2" },
    "jobs-india": { label: "Jobs & Careers", icon: "💼", color: "#0b9b9b", bg: "#e5f8f6" },
    /*"news": { label: "News & Media", icon: "📰", color: "#315b91", bg: "#edf3fb" },*/
    "legal": { label: "Legal", icon: "⚖️", color: "#315b91", bg: "#edf3fb" },
    "ai": { label: "AI & Artificial Intelligence", icon: "🤖", color: "#7c3aed", bg: "#f1eaff"},
    "creative": { label: "Creative & Design", icon: "🎨", color: "#db2777", bg: "#fce7f3"},
    "popular": { label: "Popular Websites", icon: "⭐", color: "#f16b16", bg: "#fff1e7" },
    "shopping-india": { label: "Shopping", icon: "🛍️", color: "#f16b16", bg: "#fff1e7" },
    "social-media": { label: "Social Media", icon: "💬", color: "#2385e9", bg: "#e9f3ff" },
    /*"technology": { label: "Technology", icon: "💻", color: "#0b9d75", bg: "#e6f8f1" },*/
    "telecom-india": { label: "Telecom", icon: "📱", color: "#2385e9", bg: "#e9f3ff" },
    "travel-india": { label: "Travel & Food", icon: "✈️", color: "#f43f58", bg: "#fff0f2" },
    "utilities-india": { label: "Utilities & Services", icon: "🔧", color: "#315b91", bg: "#edf3fb" }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = {
    authenticated: true,
    loading: true,
    loadError: "",
    authMode: "login",
    query: "",
    category: null,
    view: "home",
    sort: "popular",
    favourites: new Set(),
    recent: [],
    activeWebsite: null,
    toastTimer: null
  };

  const els = {
    loginView: $("#loginView"), directoryView: $("#directoryView"),
    authForm: $("#authForm"), email: $("#emailInput"), password: $("#passwordInput"),
    authMessage: $("#authMessage"), formHeading: $("#formHeading"), formIntro: $("#formIntro"),
    submitLabel: $("#submitLabel"), loginTab: $("#loginTab"), createTab: $("#createTab"),
    searchInput: $("#searchInput"), websiteGrid: $("#websiteGrid"),
    categoryGrid: $("#categoryGrid"), listingTitle: $("#listingTitle"),
    listingSubtitle: $("#listingSubtitle"), activeFilters: $("#activeFilters"),
    emptyState: $("#emptyState"), infoModal: $("#infoModal"), launchModal: $("#launchModal"),
    toast: $("#toast")
  };

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2800);
  }

  function switchAuthMode(mode) {
    state.authMode = mode;
    const login = mode === "login";
    els.loginTab.classList.toggle("active", login);
    els.createTab.classList.toggle("active", !login);
    els.loginTab.setAttribute("aria-selected", String(login));
    els.createTab.setAttribute("aria-selected", String(!login));
    els.formHeading.textContent = login ? "Welcome Back" : "Create your account";
    els.formIntro.textContent = login ? "Login to access Verified URLs Directory" : "Create a demo account to preview the directory";
    els.submitLabel.textContent = login ? "Login" : "Create Account";
    els.password.autocomplete = login ? "current-password" : "new-password";
    els.authMessage.textContent = "";
  }

  function showDirectory(email) {
    state.authenticated = true;
    els.loginView.classList.add("is-hidden");
    els.directoryView.classList.remove("is-hidden");
    renderCategories();
    renderListings();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function signOut() {
    state.authenticated = false;
    els.directoryView.classList.add("is-hidden");
    els.loginView.classList.remove("is-hidden");
    els.password.value = "";
    els.authMessage.textContent = "";
    toast("Signed out of the demo directory.");
  }

  function renderCategories() {
    const all = categories.map(category => {
      const active = state.category === category.id;
      return `<button type="button" class="category-tile ${active ? "active" : ""}"
        data-category="${escapeHTML(category.id)}" aria-pressed="${active}"
        style="--tile-color:${category.color};--tile-bg:${category.bg}">
        <span class="category-symbol" aria-hidden="true">${category.icon}</span>
        <span class="category-label">${escapeHTML(category.label)}</span>
      </button>`;
    }).join("");
    els.categoryGrid.innerHTML = all;
  }

  function getFilteredWebsites() {
    let items = websites.filter(site => {
      const query = state.query.toLowerCase().trim();
      const matchesQuery = !query || [site.name, site.url, site.domain, site.category, site.description]
        .some(value => value.toLowerCase().includes(query));
      const matchesCategory = !state.category || site.category === state.category;
      const matchesView = state.view !== "favourites" || state.favourites.has(site.id);
      const matchesRecent = state.view !== "recent" || state.recent.includes(site.id);
      return matchesQuery && matchesCategory && matchesView && matchesRecent;
    });
    if (state.sort === "az") items.sort((a,b) => a.name.localeCompare(b.name));
    else if (state.sort === "recent") items.sort((a,b) => b.added.localeCompare(a.added));
    else items.sort((a,b) => b.popularity - a.popularity);
    return items;
  }

  function renderListings() {
    let title = "Websites for Daily Life";
    if (state.view === "favourites") title = "My Favourites";
    else if (state.view === "recent") title = "Recently Launched";
    else if (state.view === "categories") title = state.category || "All Categories";
    else if (state.view === "settings") title = "Settings";
    else if (state.view === "help") title = "Help & Support";
    if (state.category) {
      const selectedCategory = categories.find(category => category.id === state.category);
      title = selectedCategory ? selectedCategory.label : state.category;
    }
    els.listingTitle.textContent = title;
    els.listingSubtitle.textContent = state.loading
      ? "Loading the verified directory…"
      : state.loadError
        ? "Directory data could not be loaded. Check the service connection and try again."
        : state.view === "favourites"
          ? "Your saved official destinations"
          : state.view === "recent" ? "Websites you recently opened from this directory"
          : "Official destinations published in the verified URL directory";

    const chips = [];
    if (state.category) chips.push(`<span class="filter-chip">${escapeHTML(state.category)} <button data-clear-category aria-label="Clear category">×</button></span>`);
    if (state.query) chips.push(`<span class="filter-chip">Search: ${escapeHTML(state.query)} <button data-clear-query aria-label="Clear search">×</button></span>`);
    els.activeFilters.innerHTML = chips.join("");

    const items = getFilteredWebsites();
    if (state.loading || state.loadError) {
      els.websiteGrid.innerHTML = "";
      els.websiteGrid.classList.add("is-hidden");
      els.emptyState.classList.remove("is-hidden");
      $(".empty-state h3", els.emptyState).textContent = state.loading ? "Loading verified websites…" : "Unable to load directory";
      $(".empty-state p", els.emptyState).textContent = state.loading
        ? "Connecting to the JupitoSecure directory service."
        : state.loadError;
      if (state.loadError) {
        const retry = document.createElement("button");
        retry.className = "secondary-button";
        retry.textContent = "Retry";
        retry.addEventListener("click", loadDirectory);
        const oldRetry = $("#retryDirectoryButton");
        if (oldRetry) oldRetry.remove();
        retry.id = "retryDirectoryButton";
        els.emptyState.appendChild(retry);
      }
      renderCategories();
      return;
    }
    const oldRetry = $("#retryDirectoryButton");
    if (oldRetry) oldRetry.remove();
    els.websiteGrid.classList.remove("is-hidden");
    const categoryById = new Map(categories.map(c => [c.id, c]));
    els.websiteGrid.innerHTML = items.map(site => {
      const favorite = state.favourites.has(site.id);
      const category = categoryById.get(site.category) || { icon: "✓", color: "#0870ed", bg: "#e8f2ff" };
      return `<article class="website-card" data-site-id="${site.id}">
        <div class="card-top">
          <div class="site-symbol" aria-hidden="true" style="--site-color:${site.color};--site-bg:${site.bg}">${site.icon}</div>
          <button type="button" class="favorite-button ${favorite ? "is-favorite" : ""}" data-favorite="${site.id}"
            aria-label="${favorite ? "Remove from" : "Add to"} favourites" aria-pressed="${favorite}" title="${favorite ? "Remove favourite" : "Add to favourites"}">${favorite ? "★" : "☆"}</button>
        </div>
        <h3 class="site-name">${escapeHTML(site.name)}</h3>
        <a class="site-url" href="${escapeHTML(site.url)}" tabindex="-1" aria-label="Domain for ${escapeHTML(site.name)}">${escapeHTML(site.domain)}</a>
        <p class="site-category">${escapeHTML(site.categoryLabel || site.category)}</p>
        <div class="card-actions">
          <button type="button" class="launch-button" data-launch="${site.id}">Launch</button>
          <button type="button" class="info-button" data-info="${site.id}"><span aria-hidden="true">ⓘ</span> Info</button>
        </div>
      </article>`;
    }).join("");

    const noResults = items.length === 0;
    els.emptyState.classList.toggle("is-hidden", !noResults);
    els.websiteGrid.classList.toggle("is-hidden", noResults);
    if (state.view === "settings" || state.view === "help") {
      els.websiteGrid.classList.add("is-hidden");
      els.emptyState.classList.remove("is-hidden");
      $(".empty-state h3", els.emptyState).textContent = state.view === "settings" ? "Directory preferences" : "Help & Support";
      $(".empty-state p", els.emptyState).textContent = state.view === "settings"
        ? "This standalone preview has no server-backed account or browser settings."
        : "For production, connect this page to your support and reporting workflow.";
    } else {
      $(".empty-state h3", els.emptyState).textContent = websites.length === 0 ? "No published verified URLs yet" : "No verified websites found";
      $(".empty-state p", els.emptyState).textContent = websites.length === 0
        ? "Category files loaded, but their entries are pending verification."
        : "Try a different search or choose another category.";
    }
    $$(".sort-button").forEach(button => button.classList.toggle("active", button.dataset.sort === state.sort));
    renderCategories();
  }

  function getWebsite(id) { return websites.find(site => site.id === id); }

  function showInfo(id) {
    const site = getWebsite(id);
    if (!site) return;
    state.activeWebsite = id;
    $("#modalIcon").textContent = site.icon;
    $("#modalIcon").style.color = site.color;
    $("#modalIcon").style.background = site.bg;
    $("#modalTitle").textContent = site.name;
    $("#modalCategory").textContent = site.categoryLabel || site.category;
    $("#modalUrl").textContent = site.url;
    $("#modalDescription").textContent = site.description;
    $("#modalDate").textContent = site.verifiedAt
      ? new Date(site.verifiedAt).toLocaleDateString()
      : (site.added ? new Date(site.added).toLocaleDateString() : "Verification metadata unavailable");
    els.infoModal.classList.remove("is-hidden");
    $("#modalLaunchButton").focus();
  }

  function hideModal(modal) {
    modal.classList.add("is-hidden");
    if (modal === els.launchModal) $("#launchAcknowledgement").checked = false;
  }

  function showLaunch(id) {
    const site = getWebsite(id);
    if (!site) return;
    state.activeWebsite = id;
    $("#launchSiteName").textContent = site.name;
    $("#launchSiteUrl").textContent = site.url;
    $("#launchAcknowledgement").checked = false;
    $("#confirmLaunchButton").disabled = true;
    els.launchModal.classList.remove("is-hidden");
    $("#launchAcknowledgement").focus();
  }

  function confirmLaunch() {
    const site = getWebsite(state.activeWebsite);
    if (!site || !$("#launchAcknowledgement").checked) return;
    state.recent = [site.id, ...state.recent.filter(id => id !== site.id)].slice(0, 12);
    hideModal(els.launchModal);
    renderListings();
    const opened = window.open(site.url, "_blank", "noopener,noreferrer");
    if (!opened) toast("Popup blocked. Allow popups or open the destination manually: " + site.domain);
    else toast("Opened in a normal browser tab. Use the Enterprise Browser runtime for isolated browsing.");
  }

 

  els.searchInput.addEventListener("input", event => {
    state.query = event.target.value;
    if (state.query) state.view = "home";
    renderListings();
  });
  $("#searchForm").addEventListener("submit", event => event.preventDefault());
  $("#clearSearch").addEventListener("click", () => {
    state.query = "";
    els.searchInput.value = "";
    renderListings();
    els.searchInput.focus();
  });
  $("#viewAllCategories").addEventListener("click", () => {
    state.category = null;
    state.view = "categories";
    renderListings();
    $("#categoriesSection").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#resetFilters").addEventListener("click", () => {
    state.query = "";
    state.category = null;
    state.view = "home";
    els.searchInput.value = "";
    renderListings();
  });
  $$(".nav-item").forEach(button => button.addEventListener("click", () => {
    state.view = button.dataset.view;
    state.category = null;
    $$(".nav-item").forEach(item => item.classList.toggle("active", item === button));
    if (state.view === "categories") $("#categoriesSection").scrollIntoView({ behavior: "smooth", block: "start" });
    renderListings();
  }));
  $$(".sort-button").forEach(button => button.addEventListener("click", () => {
    state.sort = button.dataset.sort;
    renderListings();
  }));

  document.addEventListener("click", async event => {
    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      state.category = state.category === categoryButton.dataset.category ? null : categoryButton.dataset.category;
      state.view = "categories";
      renderListings();
      $("#listingTitle").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) {
      const id = favoriteButton.dataset.favorite;
      if (state.favourites.has(id)) state.favourites.delete(id);
      else state.favourites.add(id);
      renderListings();
      toast(state.favourites.has(id) ? "Added to favourites." : "Removed from favourites.");
      return;
    }
    const infoButton = event.target.closest("[data-info]");
    if (infoButton) { showInfo(infoButton.dataset.info); return; }
    const launchButton = event.target.closest("[data-launch]");
    if (launchButton) { showLaunch(launchButton.dataset.launch); return; }
    if (event.target.closest("[data-clear-category]")) { state.category = null; renderListings(); return; }
    if (event.target.closest("[data-clear-query]")) {
      state.query = ""; els.searchInput.value = ""; renderListings(); return;
    }
    if (event.target.closest("[data-close-modal]")) {
      hideModal(event.target.closest(".modal-backdrop")); return;
    }
  });

  $("#copyUrlButton").addEventListener("click", async () => {
    const text = $("#modalUrl").textContent;
    try {
      await navigator.clipboard.writeText(text);
      toast("URL copied.");
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      toast("URL copied if clipboard access is permitted.");
    }
  });
  $("#modalLaunchButton").addEventListener("click", () => {
    const id = state.activeWebsite;
    hideModal(els.infoModal);
    showLaunch(id);
  });
  $("#launchAcknowledgement").addEventListener("change", event => {
    $("#confirmLaunchButton").disabled = !event.target.checked;
  });
  $("#confirmLaunchButton").addEventListener("click", confirmLaunch);

  [els.infoModal, els.launchModal].forEach(modal => {
    modal.addEventListener("click", event => {
      if (event.target === modal) hideModal(modal);
    });
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      [els.infoModal, els.launchModal].forEach(modal => {
        if (!modal.classList.contains("is-hidden")) hideModal(modal);
      });
    }
  });


  function normalizeURLRecord(raw, index, categoryMeta) {
    const name = String(raw.name || raw.organization_name || raw.organization || raw.title || "").trim();
    const candidateURL = String(raw.canonical_url || raw.url || raw.website_url || raw.destination_url || "").trim();
    let parsed;
    try { parsed = new URL(candidateURL); } catch { return null; }
    if (parsed.protocol !== "https:" || !name) return null;
    const status = String(raw.status || raw.verification_status || raw.verification?.status || "").toLowerCase();
    if (!["verified", "active", "published"].includes(status)) return null;
    const categoryRaw = raw.category;
    const category = categoryMeta?.id || (typeof categoryRaw === "string"
      ? categoryRaw
      : String(categoryRaw?.name || raw.category_name || raw.category_id || "Other"));
    const categoryLabel = categoryMeta?.label || (typeof categoryRaw === "object" ? categoryRaw?.name : null) || raw.category_name || category;
    const domain = String(raw.domain || parsed.hostname).toLowerCase();
    const id = String(raw.id || raw.listing_id || domain || `url-${index}`);
    return {
      id, name, url: parsed.href, domain, category, categoryLabel,
      icon: String(raw.icon || categoryMeta.icon || "🌐"),
      color: String(raw.color || categoryMeta.color || "#0870ed"),
      bg: String(raw.bg || categoryMeta.bg || "#e8f2ff"),
      popularity: Number(raw.popularity || raw.launch_count || 0),
      added: String(raw.added || raw.verified_at || raw.verification?.verified_at || raw.updated_at || ""),
      verifiedAt: raw.verified_at || raw.verification?.verified_at || "",
      description: String(raw.description || raw.verification?.summary || "Published in the JupitoSecure Verified URLs Directory.")
    };
  }

  
async function fetchJSON(url) {
    console.log("Loading JSON:", url);
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("HTTP " + response.status + ": " + url);
    }

    return response.json();
  }

  async function loadDirectory() {
    state.loading = true;
    state.loadError = "";
    renderListings();

    try {
      const index = await fetchJSON(CATEGORY_INDEX_URL);

      if (!Array.isArray(index.categories) || index.categories.length === 0) {
        throw new Error("index.json has no categories array");
      }

      categories = [];
      websites = [];

      for (const item of index.categories) {
        const filename = item.filename || item.file;
        if (!filename) {
          throw new Error("Missing filename for category " + (item.id || "unknown"));
        }
        if (filename.includes("/") || filename.includes("\\\\") || filename.includes("..")) {
          throw new Error("Invalid category filename: " + filename);
        }

        const id = item.id || filename.replace(/\.json$/i, "");
        const details = CATEGORY_DETAILS[id] || {
          label: item.name || id,
          icon: "🌐",
          color: "#0870ed",
          bg: "#e8f2ff"
        };

        const category = {
          id: id,
          label: details.label,
          filename: filename,
          icon: details.icon,
          color: details.color,
          bg: details.bg
        };

        const payload = await fetchJSON(new URL(filename, API_V1_BASE).href);
        const records = Array.isArray(payload) ? payload :
          (payload.urls || payload.data || payload.listings);

        if (!Array.isArray(records)) {
          throw new Error(filename + " must contain a urls, data, or listings array");
        }

        let published = 0;
        records.forEach((record, i) => {
          const site = normalizeURLRecord(record, i, category);
          if (site) {
            websites.push(site);
            published++;
          }
        });

        categories.push({
          id: category.id,
          label: category.label,
          icon: category.icon,
          color: category.color,
          bg: category.bg
        });

        console.log("Loaded " + filename + ": " + records.length +
          " records; " + published + " approved");
      }

      state.loading = false;
      state.loadError = "";
      renderCategories();
      renderListings();

      const subtitle = document.querySelector(".hero-heading p");
      if (subtitle) {
        subtitle.textContent = websites.length + " published verified destinations across " +
          categories.length + " categories";
      }

      if (websites.length === 0) {
        const heading = $(".empty-state h3", els.emptyState);
        const description = $(".empty-state p", els.emptyState);
        if (heading) heading.textContent = "No published verified URLs yet";
        if (description) {
          description.textContent =
            "Category files loaded successfully, but entries are pending verification. Approved entries appear after their status is set to verified.";
        }
      }

      console.log("Directory loaded. Categories:", categories.length,
        "Published websites:", websites.length);
    } catch (error) {
      state.loading = false;
      state.loadError = error.message;
      console.error("Directory loading failed:", error);
      renderListings();
    }
  }

  // Public directory starts without user login and loads the static catalogue.
  showDirectory("Community");
  loadDirectory();

  // Mobile left navigation drawer.
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileSidebar = document.querySelector(".sidebar");
  const sidebarScrim = document.getElementById("sidebarScrim");
  function closeMobileMenu() {
    if (!mobileSidebar || !sidebarScrim || !mobileMenuToggle) return;
    mobileSidebar.classList.remove("is-open");
    sidebarScrim.classList.remove("is-visible");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("sidebar-menu-open");
  }
  function openMobileMenu() {
    if (!mobileSidebar || !sidebarScrim || !mobileMenuToggle) return;
    mobileSidebar.classList.add("is-open");
    sidebarScrim.classList.add("is-visible");
    mobileMenuToggle.setAttribute("aria-expanded", "true");
    mobileMenuToggle.setAttribute("aria-label", "Close navigation menu");
    document.body.classList.add("sidebar-menu-open");
  }
  if (mobileMenuToggle) mobileMenuToggle.addEventListener("click", () => {
    mobileSidebar && mobileSidebar.classList.contains("is-open") ? closeMobileMenu() : openMobileMenu();
  });
  if (sidebarScrim) sidebarScrim.addEventListener("click", closeMobileMenu);
  document.querySelectorAll(".side-nav .nav-item").forEach(item => item.addEventListener("click", closeMobileMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMobileMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMobileMenu(); });

})();