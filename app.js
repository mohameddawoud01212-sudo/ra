(function () {
  const links = document.querySelectorAll("nav a[data-page]");
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  links.forEach(a => {
    const page = (a.getAttribute("data-page") || "").toLowerCase();
    if (page === file) a.classList.add("active");
  });
})();
