/* 20 Victorian: Wrenfield & Daughter. Vanilla, loaded with defer.
   1. Press-in of the red working, once, and "Pull another proof".
   2. h2 reveal on scroll, once.
   3. Landing mark on a bill reached from the programme index.
   4. Demonstration order form: validation only, sends nothing. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var motion = !reduce.matches;

  /* 1. Press-in and replay */
  var red = document.querySelector(".w-red");
  var proofBtn = document.querySelector(".proof-btn");
  var busy = false;

  if (motion && red) {
    busy = true;
    root.classList.add("js-press");
    var settle = function () {
      root.classList.remove("js-press");
      busy = false;
    };
    red.addEventListener("animationend", function onEnd(e) {
      if (e.animationName !== "register") return;
      red.removeEventListener("animationend", onEnd);
      /* the other hero lines finish before the red working does */
      settle();
    });
    /* safety net in case animationend never fires */
    window.setTimeout(function () { if (root.classList.contains("js-press")) settle(); }, 1600);

    if (proofBtn) {
      proofBtn.hidden = false;
      /* if reduced motion is switched on later, hide the control again */
      var syncProof = function () { proofBtn.hidden = reduce.matches; };
      if (reduce.addEventListener) reduce.addEventListener("change", syncProof);
      proofBtn.addEventListener("click", function () {
        if (busy || reduce.matches) return;
        busy = true;
        var pick = function () {
          var mag = 4 + Math.random() * 10;
          return (Math.random() < 0.5 ? -1 : 1) * Math.round(mag);
        };
        red.style.setProperty("--rx", pick() + "px");
        red.style.setProperty("--ry", pick() + "px");
        red.classList.remove("replay");
        void red.offsetWidth; /* force reflow so the keyframes restart */
        red.classList.add("replay");
      });
      red.addEventListener("animationend", function (e) {
        if (e.animationName === "register-again") busy = false;
      });
    }
  }

  /* 2. h2 reveal */
  var heads = document.querySelectorAll(".reveal");
  if (motion && "IntersectionObserver" in window && heads.length) {
    root.classList.add("js-reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });
    heads.forEach(function (h) {
      /* headings already on screen at load show at once */
      if (h.getBoundingClientRect().top < window.innerHeight) h.classList.add("is-in");
      else io.observe(h);
    });
  }

  /* 3. Landing mark for the programme index */
  var landTimer;
  function markLanding() {
    var id = window.location.hash.slice(1);
    if (!/^bill-\d$/.test(id)) return;
    var card = document.getElementById(id);
    if (!card) return;
    document.querySelectorAll(".card.is-landed").forEach(function (c) { c.classList.remove("is-landed"); });
    card.classList.add("is-landed");
    window.clearTimeout(landTimer);
    landTimer = window.setTimeout(function () { card.classList.remove("is-landed"); }, 2000);
  }
  window.addEventListener("hashchange", markLanding);
  document.querySelectorAll('.index a[href^="#bill-"]').forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.location.hash === a.getAttribute("href")) window.setTimeout(markLanding, 0);
    });
  });
  markLanding();

  /* 4. Order form */
  var form = document.querySelector(".form");
  if (!form) return;
  var status = form.querySelector(".form__status");
  var rules = [
    { id: "f-name", ok: function (v) { return v.trim().length > 0; } },
    { id: "f-email", ok: function (v) { return /^[^\s@]+@[^\s@]+$/.test(v.trim()); } },
    { id: "f-kind", ok: function (v) { return v !== ""; } },
    { id: "f-particulars", ok: function (v) { return v.trim().length > 0; } }
  ];

  function check(rule) {
    var field = document.getElementById(rule.id);
    var error = document.getElementById(rule.id + "-error");
    var good = rule.ok(field.value);
    error.hidden = good;
    if (good) field.removeAttribute("aria-invalid");
    else field.setAttribute("aria-invalid", "true");
    return good;
  }

  rules.forEach(function (rule) {
    var field = document.getElementById(rule.id);
    var evt = field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(evt, function () {
      if (field.getAttribute("aria-invalid") === "true") check(rule);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstBad = null;
    rules.forEach(function (rule) {
      if (!check(rule) && !firstBad) firstBad = document.getElementById(rule.id);
    });
    if (firstBad) {
      firstBad.focus();
      return;
    }
    status.textContent = "Thank you. This is a demo form, so nothing was sent. Write to ada@wrenfield.example instead.";
    /* move focus to the message before the focused button is hidden */
    status.focus();
    form.querySelector(".form__actions").hidden = true;
  });
})();
