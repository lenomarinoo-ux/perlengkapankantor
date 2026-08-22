/* ============================================================
   PRELOADER - Spinner Only
   ============================================================ */
(function () {
  "use strict";

  var FADE = 400;

  var style = document.createElement("style");
  style.id = "scf-preloader-style";
  style.textContent =
    "#scf-preloader{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#fff8f5,#f5ebdd,#efe6e2);transition:opacity " + FADE + "ms ease,visibility " + FADE + "ms ease;opacity:1;visibility:visible}" +
    "#scf-preloader.hide{opacity:0;visibility:hidden}" +
    ".scf-spin{width:36px;height:36px;border:3px solid rgba(80,44,18,.1);border-top-color:#502c12;border-radius:50%;animation:sp .65s linear infinite}" +
    "@keyframes sp{to{transform:rotate(360deg)}}" +
    "body.scf-loading{overflow:hidden!important}";
  document.head.appendChild(style);

  var el = document.createElement("div");
  el.id = "scf-preloader";
  el.setAttribute("role", "status");
  el.innerHTML = '<div class="scf-spin"></div>';

  if (document.body) {
    document.body.prepend(el);
    document.body.classList.add("scf-loading");
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      document.body.prepend(el);
      document.body.classList.add("scf-loading");
    });
  }

  var t0 = Date.now();

  function hide() {
    var p = document.getElementById("scf-preloader");
    if (!p) return;
    var wait = Math.max(0, 200 - (Date.now() - t0));
    setTimeout(function () {
      p.classList.add("hide");
      document.body.classList.remove("scf-loading");
      setTimeout(function () {
        p.remove();
        var s = document.getElementById("scf-preloader-style");
        if (s) s.remove();
      }, FADE + 50);
    }, wait);
  }

  if (document.readyState === "interactive" || document.readyState === "complete") {
    hide();
  } else {
    document.addEventListener("DOMContentLoaded", hide);
  }
  window.addEventListener("load", hide);
  setTimeout(hide, 300);
})();
