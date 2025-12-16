(function(){
  function currentFile(){
    const p = window.location.pathname.split("/").pop();
    return p ? p : "index.html";
  }

  function setActive(){
    const file = currentFile();
    document.querySelectorAll(".tile").forEach(t=>{
      const target = t.getAttribute("data-target");
      if(target === file) t.classList.add("active");
      else t.classList.remove("active");
    });
  }

  window.go = function(page){
    window.location.href = page;
  };

  document.addEventListener("click", (e)=>{
    const tile = e.target.closest(".tile");
    if(tile){
      const target = tile.getAttribute("data-target");
      if(target) go(target);
    }
  });

  setActive();
})();
