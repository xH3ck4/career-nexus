/* Pengelola tema terang/gelap untuk seluruh halaman Career Nexus.
   Default: terang. Pilihan disimpan di localStorage perangkat. */
(function () {
  const STORAGE_KEY = "cn-theme";
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* abaikan bila localStorage tidak tersedia */
    }
  }

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
  }

  // Terapkan tema tersimpan sedini mungkin (default terang).
  applyTheme(getStoredTheme() || "light");

  function buildToggle() {
    if (document.querySelector(".theme-toggle")) {
      return;
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Ganti mode terang atau gelap");

    const icon = document.createElement("span");
    icon.className = "theme-toggle__icon";
    icon.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.className = "theme-toggle__label";

    btn.appendChild(icon);
    btn.appendChild(label);

    const sync = () => {
      const isDark = currentTheme() === "dark";
      icon.textContent = isDark ? "☀️" : "🌙";
      label.textContent = isDark ? "Mode Terang" : "Mode Gelap";
      btn.setAttribute("aria-pressed", String(isDark));
    };

    btn.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      storeTheme(next);
      sync();
    });

    sync();
    document.body.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildToggle);
  } else {
    buildToggle();
  }
})();
