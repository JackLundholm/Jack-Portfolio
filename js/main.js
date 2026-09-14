/* Portfolio behaviour — tabs, cards, modal gallery, scrollspy.
   All content comes from js/data.js (CATEGORIES + PROJECTS). */

(function () {
  "use strict";

  var tabsEl = document.getElementById("project-tabs");
  var blurbEl = document.getElementById("category-blurb");
  var gridEl = document.getElementById("project-grid");
  var modal = document.getElementById("project-modal");

  var activeCat = "all";
  var currentProject = null;
  var galleryIndex = 0;
  var lastFocused = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function catById(id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) return CATEGORIES[i];
    }
    return null;
  }

  function countFor(id) {
    return PROJECTS.filter(function (p) { return p.category === id; }).length;
  }

  /* ---------------- tabs ---------------- */

  function renderTabs() {
    var tabs = [{ id: "all", label: "All", blurb: "Selected work across internships at EXP, coursework at UBC, and the submarine team." }]
      .concat(CATEGORIES);

    tabsEl.innerHTML = tabs.map(function (t) {
      var count = t.id === "all" ? PROJECTS.length : countFor(t.id);
      return (
        '<button class="tab" data-cat="' + t.id + '" aria-pressed="' + (t.id === activeCat) + '">' +
        esc(t.label) + '<span class="count">' + count + "</span></button>"
      );
    }).join("");

    var active = tabs.filter(function (t) { return t.id === activeCat; })[0];
    blurbEl.textContent = active ? active.blurb : "";
  }

  tabsEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".tab");
    if (!btn) return;
    activeCat = btn.dataset.cat;
    renderTabs();
    renderGrid();
  });

  /* ---------------- cards ---------------- */

  function renderGrid() {
    var items = PROJECTS.filter(function (p) {
      return activeCat === "all" || p.category === activeCat;
    });

    gridEl.innerHTML = items.map(function (p) {
      var cat = catById(p.category) || { label: "?" };
      return (
        '<button class="card" data-id="' + p.id + '" aria-haspopup="dialog">' +
          '<span class="card-media"><img src="' + esc(p.coverImage) + '" alt="' + esc(p.coverAlt || (p.title + " — cover image")) + '" width="1200" height="800" loading="lazy" decoding="async"></span>' +
          '<span class="card-body">' +
            '<span class="card-meta"><span class="card-cat">' + esc(cat.label) + "</span>" +
            '<span class="card-date">' + esc(p.timeframe.split("·")[0].trim()) + "</span></span>" +
            '<span class="card-title">' + esc(p.title) + "</span>" +
            '<span class="card-summary">' + esc(p.summary) + "</span>" +
          "</span>" +
        "</button>"
      );
    }).join("");
  }

  gridEl.addEventListener("click", function (e) {
    var card = e.target.closest(".card");
    if (card) openProject(card.dataset.id, card);
  });

  /* ---------------- modal ---------------- */

  function el(id) { return document.getElementById(id); }

  function setGalleryImage(i) {
    var imgs = currentProject.images;
    galleryIndex = (i + imgs.length) % imgs.length;
    var im = imgs[galleryIndex];
    var img = el("modal-img");
    img.src = im.src;
    img.alt = im.alt;
    el("modal-caption").textContent = im.caption || "";

    var thumbs = el("modal-thumbs").querySelectorAll(".thumb");
    thumbs.forEach(function (t, idx) {
      t.setAttribute("aria-current", idx === galleryIndex ? "true" : "false");
    });

    var single = imgs.length < 2;
    el("gallery-prev").hidden = single;
    el("gallery-next").hidden = single;
  }

  function openProject(id, trigger) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    currentProject = p;
    lastFocused = trigger || document.activeElement;

    var cat = catById(p.category) || { label: "?" };
    el("modal-tag").textContent = cat.label;
    el("modal-date").textContent = p.timeframe;
    el("modal-title").textContent = p.title;
    el("modal-role").textContent = p.role;
    el("modal-timeframe").textContent = p.timeframe;
    el("modal-tools").textContent = p.tools.join(", ");
    el("modal-description").innerHTML = p.description
      .map(function (para) { return "<p>" + esc(para) + "</p>"; })
      .join("");

    el("modal-links").innerHTML = (p.links || [])
      .map(function (l) {
        return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
      })
      .join("");

    el("modal-thumbs").innerHTML = p.images
      .map(function (im, idx) {
        return (
          '<button class="thumb" data-idx="' + idx + '" aria-label="Show image ' + (idx + 1) + ' of ' + p.images.length + '">' +
          '<img src="' + esc(im.thumb || im.src) + '" alt="" loading="lazy" decoding="async"></button>'
        );
      })
      .join("");

    modal.setAttribute("aria-label", p.title + " — project details");
    setGalleryImage(0);
    modal.showModal();
    el("modal-close").focus();
  }

  function closeModal() {
    if (modal.open) modal.close();
  }

  el("modal-close").addEventListener("click", closeModal);
  el("gallery-prev").addEventListener("click", function () { setGalleryImage(galleryIndex - 1); });
  el("gallery-next").addEventListener("click", function () { setGalleryImage(galleryIndex + 1); });

  el("modal-thumbs").addEventListener("click", function (e) {
    var t = e.target.closest(".thumb");
    if (t) setGalleryImage(parseInt(t.dataset.idx, 10));
  });

  /* click on backdrop closes */
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  /* restore focus when the dialog closes (Escape / close button / backdrop) */
  modal.addEventListener("close", function () {
    if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  });

  /* arrow keys browse the gallery while the modal is open */
  document.addEventListener("keydown", function (e) {
    if (!modal.open) return;
    if (e.key === "ArrowLeft") setGalleryImage(galleryIndex - 1);
    if (e.key === "ArrowRight") setGalleryImage(galleryIndex + 1);
  });

  /* ---------------- scrollspy ---------------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var spy = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + id;
          a.classList.toggle("active", on);
          if (on) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  ["about", "resume", "skills", "projects", "contact"].forEach(function (id) {
    var s = document.getElementById(id);
    if (s) spy.observe(s);
  });

  /* ---------------- init ---------------- */

  renderTabs();
  renderGrid();
})();
