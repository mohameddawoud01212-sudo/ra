document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "ra_lang";

  const translations = {
    en: {
      nav_home: "Home",
      nav_projects: "Projects",
      nav_about: "About",
      nav_contact: "Contact",

      about_title: "About",
      about_sub: "Who we are, what we build, and why it matters."
    },

    ar: {
      nav_home: "الرئيسية",
      nav_projects: "المشاريع",
      nav_about: "من نحن",
      nav_contact: "اتصل بنا",

      about_title: "من نحن",
      about_sub: "من نحن، ماذا نبني، ولماذا ما نقوم به مهم."
    },

    de: {
      nav_home: "Start",
      nav_projects: "Projekte",
      nav_about: "Über uns",
      nav_contact: "Kontakt",

      about_title: "Über uns",
      about_sub: "Wer wir sind, was wir bauen und warum es wichtig ist."
    }
  };

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i]").forEach(el => {
      const key = el.getAttribute("data-i");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    document.querySelectorAll(".chip").forEach(c =>
      c.classList.toggle("active", c.dataset.lang === lang)
    );
  }

  document.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      setLang(btn.dataset.lang);
    });
  });

  const savedLang = localStorage.getItem(STORAGE_KEY) || "en";
  setLang(savedLang);
});
