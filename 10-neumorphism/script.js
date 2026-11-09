/* Saga Venn portfolio. Vanilla JS, no libraries, no scroll listeners. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var darkMq = window.matchMedia("(prefers-color-scheme: dark)");
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  /* 1. Theme switch */
  var sw = document.querySelector(".switch");
  function stored() { try { return localStorage.getItem("sv-theme"); } catch (e) { return null; } }
  function isDark() { var t = root.dataset.theme; return t ? t === "dark" : darkMq.matches; }
  function syncSwitch() {
    var dark = isDark();
    sw.setAttribute("aria-pressed", dark ? "true" : "false");
    metaTheme.setAttribute("content", dark ? "#272C35" : "#DDE3EA");
  }
  function applyTheme(t) { root.dataset.theme = t; syncSwitch(); }
  if (sw) {
    sw.classList.remove("is-static");
    sw.removeAttribute("aria-hidden");
    sw.removeAttribute("tabindex");
    syncSwitch();
    darkMq.addEventListener("change", function () { if (!stored()) { syncSwitch(); } });
    sw.addEventListener("pointerdown", function () { sw.classList.add("is-pressing"); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
      sw.addEventListener(ev, function () { sw.classList.remove("is-pressing"); });
    });
    sw.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      try { localStorage.setItem("sv-theme", next); } catch (e) {}
      if (!document.startViewTransition || reduce.matches) { applyTheme(next); return; }
      var r = sw.getBoundingClientRect();
      var x = r.left + r.width / 2, y = r.top + r.height / 2;
      var rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      var vt = document.startViewTransition(function () { applyTheme(next); });
      vt.ready.then(function () {
        root.animate(
          { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + rad + "px at " + x + "px " + y + "px)"] },
          { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      }).catch(function () {});
    });
  }

  /* 2. Mobile menu */
  var menuBtn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  function setMenu(open, refocus) {
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (!open && refocus) { menuBtn.focus(); }
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () { setMenu(menu.hidden, false); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) { setMenu(false, false); } });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { setMenu(false, true); }
    });
    /* Close when focus or a click leaves the header, so the sheet never covers what you use next */
    var header = document.querySelector(".site-header");
    header.addEventListener("focusout", function (e) {
      if (!menu.hidden && !e.currentTarget.contains(e.relatedTarget)) { setMenu(false, false); }
    });
    document.addEventListener("click", function (e) {
      if (!menu.hidden && !e.target.closest(".site-header")) { setMenu(false, false); }
    });
  }

  /* 3. Services tabs (roles added at runtime) */
  var list = document.querySelector("[data-tablist]");
  if (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll(".svc__key"));
    list.setAttribute("role", "tablist");
    list.setAttribute("aria-orientation", "vertical");
    tabs.forEach(function (tab, i) {
      var panel = document.getElementById(tab.getAttribute("aria-controls"));
      tab.setAttribute("role", "tab");
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.setAttribute("tabindex", "0");
      tab.addEventListener("click", function () { select(i, false); });
    });
    function select(i, focus) {
      tabs.forEach(function (tab, j) {
        var on = i === j;
        var panel = document.getElementById(tab.getAttribute("aria-controls"));
        var was = !panel.hidden;
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.tabIndex = on ? 0 : -1;
        panel.hidden = !on;
        panel.classList.toggle("is-entering", on && !was);
      });
      if (focus) { tabs[i].focus(); }
    }
    list.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement), n = tabs.length, next = null;
      if (i < 0) { return; }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { next = (i + 1) % n; }
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { next = (i - 1 + n) % n; }
      else if (e.key === "Home") { next = 0; }
      else if (e.key === "End") { next = n - 1; }
      if (next !== null) { e.preventDefault(); select(next, true); }
    });
    select(0, false);
    document.querySelectorAll(".svc__panel").forEach(function (p) { p.classList.remove("is-entering"); });
  }

  /* 4. Work reveal and 5. active nav link */
  if ("IntersectionObserver" in window) {
    var tray = document.querySelector("[data-reveal]");
    if (tray) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.2 });
      io.observe(tray);
    }
    var links = document.querySelectorAll(".navbar__link");
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        links.forEach(function (a) {
          if (a.getAttribute("href") === "#" + en.target.id) { a.setAttribute("aria-current", "true"); }
          else { a.removeAttribute("aria-current"); }
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { navIo.observe(s); });
  } else {
    var t = document.querySelector("[data-reveal]");
    if (t) { t.classList.add("is-in"); }
  }

  /* 6. Contact form: validation, error summary, loading, success */
  var form = document.getElementById("brief-form");
  if (!form) { return; }
  var btn = form.querySelector(".form__btn");
  var btnLabel = btn.querySelector(".form__btn-label");
  var summary = document.getElementById("errsum");
  var status = form.querySelector(".form__status");
  var warn = document.getElementById("tpl-warn");
  var okIcon = document.getElementById("tpl-ok");
  var submitted = false, busy = false;
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var rules = [
    { id: "f-name", label: "Your name", check: function (v) { return v ? "" : "Enter your name."; } },
    { id: "f-email", label: "Email", check: function (v) {
      if (!v) { return "Enter your email address."; }
      return emailRe.test(v) ? "" : "Enter an email address like name@company.com.";
    } },
    { id: "f-need", label: "What do you need?", focus: "need-1", check: function () {
      return form.querySelector('input[name="need"]:checked') ? "" : "Pick one option.";
    } },
    { id: "f-about", label: "About the product", check: function (v) {
      if (!v) { return "Tell me a bit about the product."; }
      return v.length < 20 ? "Add a little more, at least 20 characters." : "";
    } }
  ];
  function validate(rule) {
    var el = document.getElementById(rule.id);
    var msg = rule.check(el.value ? el.value.trim() : "");
    var out = document.getElementById(rule.id + "-error");
    out.textContent = "";
    if (msg) {
      out.appendChild(warn.content.cloneNode(true));
      out.appendChild(document.createTextNode(msg));
      if (rule.id !== "f-need") { el.setAttribute("aria-invalid", "true"); }
    } else {
      el.removeAttribute("aria-invalid");
    }
    if (rule.id === "f-need") {
      form.querySelectorAll('input[name="need"]').forEach(function (r) {
        if (msg) { r.setAttribute("aria-invalid", "true"); } else { r.removeAttribute("aria-invalid"); }
      });
    }
    return msg ? rule : null;
  }
  function renderSummary(bad, move) {
    if (!bad.length) { summary.hidden = true; return; }
    var n = bad.length;
    summary.querySelector(".errsum__title").textContent = "Check " + n + (n === 1 ? " field" : " fields") + " marked below.";
    var ul = summary.querySelector(".errsum__list");
    ul.textContent = "";
    bad.forEach(function (rule) {
      var li = document.createElement("li"), a = document.createElement("a");
      var target = rule.focus || rule.id;
      a.href = "#" + target;
      a.textContent = rule.label;
      a.addEventListener("click", function (e) { e.preventDefault(); document.getElementById(target).focus(); });
      li.appendChild(a);
      ul.appendChild(li);
    });
    summary.hidden = false;
    if (move) { summary.focus(); }
  }
  function recheck(rule) {
    if (!submitted) { return; }
    validate(rule);
    if (!summary.hidden) {
      renderSummary(rules.filter(function (r) { return document.getElementById(r.focus || r.id).getAttribute("aria-invalid") === "true"; }), false);
    }
  }
  rules.forEach(function (rule) {
    var el = document.getElementById(rule.id);
    var flag = document.getElementById(rule.focus || rule.id);
    el.addEventListener("focusout", function () { recheck(rule); });
    el.addEventListener("input", function () { if (flag.getAttribute("aria-invalid") === "true") { recheck(rule); } });
    el.addEventListener("change", function () { if (flag.getAttribute("aria-invalid") === "true") { recheck(rule); } });
  });
  function setBusy(on) {
    busy = on;
    btn.setAttribute("aria-disabled", on ? "true" : "false");
    if (on) { btn.setAttribute("aria-busy", "true"); } else { btn.removeAttribute("aria-busy"); }
    btn.classList.toggle("is-latched", on);
    btnLabel.textContent = on ? "Sending..." : "Send brief";
    if (on) { status.textContent = "Sending your brief."; }
    form.querySelectorAll("input, textarea").forEach(function (f) { f.readOnly = on; });
    form.querySelector("select").disabled = on;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) { return; }
    submitted = true;
    status.textContent = "";
    var bad = rules.map(validate).filter(Boolean);
    if (bad.length) { renderSummary(bad, true); return; }
    summary.hidden = true;
    var first = document.getElementById("f-name").value.trim().split(/\s+/)[0];
    setBusy(true);
    window.setTimeout(function () {
      setBusy(false);
      form.reset();
      submitted = false;
      status.textContent = "";
      var box = document.createElement("p");
      box.className = "status-box";
      box.appendChild(okIcon.content.cloneNode(true));
      box.appendChild(document.createTextNode("Thanks, " + first + ". Your brief is ready to send once this form is connected."));
      status.appendChild(box);
    }, 900);
  });
})();
