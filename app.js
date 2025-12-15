/* RA — Global language controller (persists + applies on every page) */
(() => {
  const STORAGE_KEY = "ra_lang";

  // ✅ نفس قاموس الترجمة عندك — زوّد/عدّل مفاتيح الصفحات هنا
  const T = {
    en: {
      // header/nav/common
      brandTitle: "RA Innovation",
      brandSub: "Global innovation across every field",
      navHome: "Home",
      navVision: "Vision",
      navProjects: "Projects",
      navReach: "Capital & Reach",
      navContact: "Contact",
      navAbout: "About",
      navCompany: "Company",
      ctaTop: "Explore",

      // home/hero (مثال)
      kicker: "Innovation Engine",
      heroTitle: "RA Innovation",
      heroSubtitle:
        "Global innovation across every field — building real solutions with bold ideas, smart systems, and scalable execution.",

      // ✅ ABOUT keys (علشان about ما تفضلش إنجليزي)
      aboutKicker: "About Us",
      aboutTitle: "Who We Are",
      aboutP1:
        "RA Innovation is a future-driven innovation company focused on building advanced solutions across technology, systems, and strategic development.",
      aboutP2:
        "We don’t follow trends — we design foundations. Our work connects ideas, engineering, and execution into scalable realities.",
      aboutBadge: "Core Identity",
      aboutSectionTitle: "Our Philosophy",
      aboutSectionSub: "What defines RA Innovation",
      aboutCard1Title: "Vision First",
      aboutCard1Text:
        "Every project starts with a long-term vision, not short-term execution.",
      aboutCard2Title: "System Thinking",
      aboutCard2Text: "We build connected systems, not isolated products.",
      aboutCard3Title: "Scalable Reality",
      aboutCard3Text:
        "Ideas must survive the real world — technically and economically.",
      aboutCard4Title: "Independent Innovation",
      aboutCard4Text:
        "Original thinking without dependency on existing frameworks.",
    },

    de: {
      brandTitle: "RA Innovation",
      brandSub: "Globale Innovation in jedem Bereich",
      navHome: "Start",
      navVision: "Vision",
      navProjects: "Projekte",
      navReach: "Reichweite & Kapital",
      navContact: "Kontakt",
      navAbout: "Über uns",
      navCompany: "Unternehmen",
      ctaTop: "Entdecken",

      kicker: "Innovationsmotor",
      heroTitle: "RA Innovation",
      heroSubtitle:
        "Globale Innovation in jedem Bereich — echte Lösungen mit mutigen Ideen, intelligenten Systemen und skalierbarer Umsetzung.",

      aboutKicker: "Über uns",
      aboutTitle: "Wer wir sind",
      aboutP1:
        "RA Innovation ist ein zukunftsorientiertes Innovationsunternehmen, das sich auf den Aufbau fortschrittlicher Lösungen in Technologie, Systemen und strategischer Entwicklung konzentriert.",
      aboutP2:
        "Wir folgen keinen Trends – wir entwerfen Grundlagen. Unsere Arbeit verbindet Ideen, Technik und Umsetzung zu skalierbaren Realitäten.",
      aboutBadge: "Kernidentität",
      aboutSectionTitle: "Unsere Philosophie",
      aboutSectionSub: "Was RA Innovation definiert",
      aboutCard1Title: "Vision zuerst",
      aboutCard1Text:
        "Jedes Projekt beginnt mit einer langfristigen Vision, nicht mit kurzfristiger Umsetzung.",
      aboutCard2Title: "Systemdenken",
      aboutCard2Text:
        "Wir entwickeln vernetzte Systeme, keine isolierten Produkte.",
      aboutCard3Title: "Skalierbare Realität",
      aboutCard3Text:
        "Ideen müssen der realen Welt standhalten – technisch und wirtschaftlich.",
      aboutCard4Title: "Unabhängige Innovation",
      aboutCard4Text:
        "Eigenständiges Denken ohne Abhängigkeit von bestehenden Rahmenwerken.",
    },

    ar: {
      brandTitle: "RA Innovation",
      brandSub: "ابتكار عالمي في كل المجالات",
      navHome: "الرئيسية",
      navVision: "الرؤية",
      navProjects: "المشاريع",
      navReach: "رأس المال والانتشار",
      navContact: "تواصل",
      navAbout: "من نحن",
      navCompany: "الشركة",
      ctaTop: "استكشف",

      kicker: "محرك الابتكار",
      heroTitle: "RA Innovation",
      heroSubtitle:
        "ابتكار عالمي في كل المجالات — بناء حلول حقيقية بأفكار جريئة وأنظمة ذكية وتنفيذ قابل للتوسع.",

      aboutKicker: "من نحن",
      aboutTitle: "من نحن",
      aboutP1:
        "رع للابتكار هي شركة ابتكار موجهة للمستقبل، تركز على بناء حلول متقدمة في مجالات التقنية والأنظمة والتطوير الاستراتيجي.",
      aboutP2:
        "نحن لا نتبع الاتجاهات، بل نصمم الأسس. عملنا يربط بين الأفكار والهندسة والتنفيذ في واقع قابل للتوسع.",
      aboutBadge: "الهوية الأساسية",
      aboutSectionTitle: "فلسفتنا",
      aboutSectionSub: "ما الذي يميز رع للابتكار",
      aboutCard1Title: "الرؤية أولاً",
      aboutCard1Text:
        "كل مشروع يبدأ برؤية طويلة المدى وليس بتنفيذ قصير المدى.",
      aboutCard2Title: "تفكير منظومي",
      aboutCard2Text: "نقوم ببناء أنظمة مترابطة وليس منتجات منفصلة.",
      aboutCard3Title: "واقع قابل للتوسع",
      aboutCard3Text:
        "الأفكار يجب أن تصمد في العالم الحقيقي تقنياً واقتصادياً.",
      aboutCard4Title: "ابتكار مستقل",
      aboutCard4Text: "تفكير أصيل بدون الاعتماد على أطر جاهزة.",
    },
  };

  function getSavedLang() {
    return localStorage.getItem(STORAGE_KEY) || "en";
  }

  function setSavedLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function applyLang(lang) {
    const dict = T[lang] || T.en;

    // dir + lang
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // update texts
    document.querySelectorAll("[data-i]").forEach((el) => {
      const key = el.getAttribute("data-i");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // update lang buttons state (on this page)
    document.querySelectorAll(".chip[data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function init() {
    // ✅ apply saved language on every page load
    const lang = getSavedLang();
    applyLang(lang);

    // ✅ handle clicks anywhere
    document.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip[data-lang]");
      if (!chip) return;

      const newLang = chip.dataset.lang;
      setSavedLang(newLang);
      applyLang(newLang);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
