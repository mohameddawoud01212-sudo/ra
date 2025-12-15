(function () {
  const KEY = "ra_lang";

  function getLangFromUrl() {
    const p = new URLSearchParams(window.location.search);
    return p.get("lang");
  }

  function setLang(lang) {
    localStorage.setItem(KEY, lang);

    // ✅ ثبّت اللغة في URL على كل الصفحات
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());

    // ✅ لو عندك ترجمة بـ data-i هتشتغل، لو مش موجود مش هيبوظ حاجة
    if (typeof window.applyTranslations === "function") {
      window.applyTranslations(lang);
    }
  }

  // ✅ عند فتح أي صفحة
  const urlLang = getLangFromUrl();
  const saved = localStorage.getItem(KEY) || "en";
  const lang = urlLang || saved;

  // لو URL مفيهوش lang خليّه يتضاف تلقائي
  if (!urlLang) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
  }

  // ثبّت الواجهة (RTL/LTR)
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";

  // فعّل الترجمة لو موجودة
  if (typeof window.applyTranslations === "function") {
    window.applyTranslations(lang);
  }

  // ✅ اربط أزرار اللغة (AR/DE/EN)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    setLang(btn.dataset.lang);
    // لو عايز reload بسيط لضمان ثبات كامل:
    location.reload();
  });
})();
