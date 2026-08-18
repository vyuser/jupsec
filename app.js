/* =========================================================
   JUPITOSECURE — INDEPENDENT MOBILE NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("jpMobileToggle");
  const menu = document.getElementById("jpMobileMenu");
  const close = document.getElementById("jpMobileClose");

  if (!toggle || !menu || !close) {
    return;
  }


  /* =======================================================
     OPEN MENU
  ======================================================= */

  function openMobileMenu() {

    menu.classList.add("is-open");

    menu.setAttribute("aria-hidden", "false");

    toggle.setAttribute("aria-expanded", "true");

    document.body.classList.add("jp-mobile-menu-open");
  }


  /* =======================================================
     CLOSE MENU
  ======================================================= */

  function closeMobileMenu() {

    menu.classList.remove("is-open");

    menu.setAttribute("aria-hidden", "true");

    toggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("jp-mobile-menu-open");
  }


  /* =======================================================
     HAMBURGER
  ======================================================= */

  toggle.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();

    if (menu.classList.contains("is-open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }

  });


  /* =======================================================
     CLOSE BUTTON
  ======================================================= */

  close.addEventListener("click", (event) => {

    event.preventDefault();

    closeMobileMenu();

  });


  /* =======================================================
     CLICK OUTSIDE PANEL
  ======================================================= */

  menu.addEventListener("click", (event) => {

    if (event.target === menu) {
      closeMobileMenu();
    }

  });


  /* =======================================================
     DROPDOWNS
  ======================================================= */

  const dropdowns =
    menu.querySelectorAll(".jp-mobile-menu-dropdown");


  dropdowns.forEach((button) => {

    button.addEventListener("click", (event) => {

      event.preventDefault();

      const group =
        button.closest(".jp-mobile-menu-group");

      if (!group) {
        return;
      }


      /* Close other dropdowns */

      menu
        .querySelectorAll(".jp-mobile-menu-group.is-open")
        .forEach((otherGroup) => {

          if (otherGroup !== group) {
            otherGroup.classList.remove("is-open");
          }

        });


      /* Toggle current */

      group.classList.toggle("is-open");

    });

  });


  /* =======================================================
     CLOSE AFTER NORMAL LINK
  ======================================================= */

  menu.querySelectorAll(
    ".jp-mobile-menu-submenu a, .jp-mobile-menu-nav > a"
  ).forEach((link) => {

    link.addEventListener("click", () => {

      closeMobileMenu();

    });

  });


  /* =======================================================
     CTA LINKS
  ======================================================= */

  menu.querySelectorAll(".jp-mobile-btn").forEach((link) => {

    link.addEventListener("click", () => {

      closeMobileMenu();

    });

  });


  /* =======================================================
     ESC KEY
  ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      menu.classList.contains("is-open")
    ) {

      closeMobileMenu();

    }

  });


  /* =======================================================
     PREVENT BODY SCROLL
  ======================================================= */

  const style = document.createElement("style");

  style.textContent = `
    body.jp-mobile-menu-open {
      overflow: hidden !important;
    }
  `;

  document.head.appendChild(style);

});
