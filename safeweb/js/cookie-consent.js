
(() => {
  "use strict";

  const GA_ID = "G-F2E1YSQ1E1";
  const COOKIE = "jupito_cookie_consent";
  const MAX_AGE = 180 * 24 * 60 * 60;
  const POLICY_URL = "/privacy-policy.html";

  const readChoice = () => {
    const item = document.cookie.split("; ").find(
      (entry) => entry.startsWith(COOKIE + "=")
    );

    if (!item) return null;

    try {
      const value = JSON.parse(
        decodeURIComponent(item.substring(COOKIE.length + 1))
      );

      return typeof value.analytics === "boolean" ? value : null;
    } catch {
      return null;
    }
  };

  const saveChoice = (analytics) => {
    const value = {
      analytics,
      version: 1,
      updatedAt: new Date().toISOString()
    };

    document.cookie =
      COOKIE + "=" + encodeURIComponent(JSON.stringify(value)) +
      "; Max-Age=" + MAX_AGE +
      "; Path=/; SameSite=Lax; Secure";
  };

  let analyticsLoaded = false;

  function loadAnalytics() {
    if (analyticsLoaded || !GA_ID.startsWith("G-")) return;

    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(GA_ID);

    document.head.appendChild(script);
  }

  const css = document.createElement("style");
  css.textContent = `
    #jsw-consent {
      position: fixed;
      z-index: 99999;
      left: 16px;
      right: 16px;
      bottom: 16px;
      width: min(720px, calc(100% - 32px));
      margin: auto;
      padding: 20px;
      background: #fff;
      color: #172b4d;
      border: 1px solid #dce6f2;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(16,43,85,.18);
      font: 15px/1.6 system-ui, sans-serif;
    }

    #jsw-consent h2 {
      margin: 0 0 8px;
      font-size: 20px;
      line-height: 1.35;
    }

    #jsw-consent p { margin: 0 0 14px; }

    #jsw-consent a {
      color: #0878f9;
      text-decoration: underline;
    }

    #jsw-consent .jsw-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    #jsw-consent button,
    #jsw-settings {
      min-height: 42px;
      padding: 10px 16px;
      border: 1px solid #0878f9;
      border-radius: 7px;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    #jsw-consent .jsw-primary {
      background: #0878f9;
      color: #fff;
    }

    #jsw-consent .jsw-secondary,
    #jsw-settings {
      background: #fff;
      color: #17406e;
    }

    #jsw-consent button:focus-visible,
    #jsw-settings:focus-visible {
      outline: 3px solid #70b5ff;
      outline-offset: 3px;
    }

    #jsw-settings {
      position: fixed;
      z-index: 9998;
      right: 12px;
      bottom: 12px;
      min-height: auto;
      padding: 8px 12px;
      font-size: 13px;
      box-shadow: 0 2px 10px rgba(16,43,85,.12);
    }

    @media (max-width: 520px) {
      #jsw-consent {
        left: 8px;
        right: 8px;
        bottom: 8px;
        width: auto;
        padding: 16px;
      }

      #jsw-consent .jsw-actions {
        display: grid;
        grid-template-columns: 1fr;
      }

      #jsw-consent button { width: 100%; }

      #jsw-settings {
        right: 8px;
        bottom: 8px;
      }
    }
  `;
  document.head.appendChild(css);

  function init() {
    const settings = document.createElement("button");
    settings.id = "jsw-settings";
    settings.type = "button";
    settings.textContent = "Privacy Settings";
    settings.hidden = true;
    settings.addEventListener("click", showBanner);
    document.body.appendChild(settings);

    const saved = readChoice();

    if (saved) {
      settings.hidden = false;
      if (saved.analytics) loadAnalytics();
    } else {
      showBanner();
    }

    function showBanner() {
      if (document.getElementById("jsw-consent")) return;

      settings.hidden = true;

      const panel = document.createElement("section");
      panel.id = "jsw-consent";
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", "jsw-title");

      panel.innerHTML = `
        <h2 id="jsw-title">Your Privacy Matters</h2>
        <p>
          Essential technologies help this website function.
          With your permission, Google Analytics measures website usage
          so we can improve our services.
          Read our <a href="${POLICY_URL}">Privacy Policy</a>.
        </p>
        <div class="jsw-actions">
          <button class="jsw-primary" data-action="accept">
            Accept Analytics
          </button>
          <button class="jsw-secondary" data-action="reject">
            Reject Optional
          </button>
          <button class="jsw-secondary" data-action="preferences">
            Preferences
          </button>
        </div>
      `;

      panel.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");
        if (!button) return;

        if (button.dataset.action === "accept") {
          choose(true);
        } else if (button.dataset.action === "reject") {
          choose(false);
        } else {
          showPreferences(panel);
        }
      });

      document.body.appendChild(panel);
    }

    function showPreferences(panel) {
      panel.innerHTML = `
        <h2 id="jsw-title">Privacy Preferences</h2>
        <p>
          Essential technologies remain enabled as needed for the site.
          You can choose whether to enable Google Analytics.
        </p>
        <label style="display:flex;gap:10px;align-items:flex-start;margin:12px 0 18px">
          <input id="jsw-analytics" type="checkbox">
          <span>
            <strong>Analytics</strong><br>
            Allow Google Analytics to measure website usage.
          </span>
        </label>
        <div class="jsw-actions">
          <button class="jsw-primary" data-action="save">
            Save Preferences
          </button>
          <button class="jsw-secondary" data-action="reject">
            Reject Optional
          </button>
        </div>
      `;

      panel.querySelector("#jsw-analytics").checked =
        readChoice()?.analytics === true;

      panel.onclick = (event) => {
        const button = event.target.closest("[data-action]");
        if (!button) return;

        if (button.dataset.action === "reject") {
          choose(false);
        } else if (button.dataset.action === "save") {
          choose(panel.querySelector("#jsw-analytics").checked);
        }
      };
    }

    function choose(analytics) {
      saveChoice(analytics);

      const panel = document.getElementById("jsw-consent");
      if (panel) panel.remove();

      settings.hidden = false;

      if (analytics) {
        loadAnalytics();
      } else {
        // Stop future collection where consent updates are supported.
        if (window.gtag) {
          window.gtag("consent", "update", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
          });
        }

        // Reload so this page starts without loading GA from this script.
        if (analyticsLoaded) {
          window.location.reload();
        }
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
