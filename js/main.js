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
            '<span class="card-meta"><span class="card-cat">' + esc(cat.label) + '</span><span class="dot" aria-hidden="true">·</span><span class="card-date">' + esc(p.timeframe.split("·")[0].trim()) + "</span></span>" +
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

  /* ----- 360° panorama (drag to look around, scroll to zoom) ----- */
  var pano = {
    state: null,   // { img, zoom, x, y, raf, interacted, dragging, sx, sy, ox, oy }
  };

  function panoStart(src) {
    var canvas = el("pano-canvas");
    canvas.style.backgroundImage = 'url("' + src + '")';
    pano.state = { zoom: 1, x: 0, y: 0, raf: 0, interacted: false, dragging: false };
    var img = new Image();
    img.onload = function () {
      if (!pano.state) return;
      pano.state.img = img;
      panoApply();
      pano.state.raf = requestAnimationFrame(panoSpin);
    };
    img.src = src;
  }

  function panoStop() {
    if (pano.state) cancelAnimationFrame(pano.state.raf);
    pano.state = null;
    el("pano-canvas").style.backgroundImage = "";
  }

  /* gentle auto-rotate until the visitor takes over */
  function panoSpin() {
    var s = pano.state;
    if (!s) return;
    if (!s.interacted && !s.dragging) {
      s.x -= 0.4;
      panoApply();
    }
    s.raf = requestAnimationFrame(panoSpin);
  }

  function panoApply() {
    var s = pano.state;
    var canvas = el("pano-canvas");
    var ch = canvas.clientHeight;
    var cw = canvas.clientWidth;
    if (!s || !s.img || !ch) return;
    var H = ch * s.zoom;                                  // rendered bg height
    var W = s.img.naturalWidth * (H / s.img.naturalHeight); // rendered tile width
    /* horizontal position wraps seamlessly (background repeats on x) */
    var x = W ? ((s.x % W) + W) % W : 0;
    /* vertical position clamps to the visible band */
    var y = Math.min(0, Math.max(ch - H, s.y));
    if (H <= ch) y = (ch - H) / 2;
    s.y = y;
    canvas.style.backgroundSize = "auto " + H + "px";
    canvas.style.backgroundPosition = x + "px " + y + "px";
  }

  (function () {
    var canvas = el("pano-canvas");
    var hint = el("pano-hint");

    canvas.addEventListener("pointerdown", function (e) {
      var s = pano.state;
      if (!s) return;
      s.dragging = true;
      s.interacted = true;
      s.sx = e.clientX; s.sy = e.clientY; s.ox = s.x; s.oy = s.y;
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add("grabbing");
      if (hint) hint.classList.add("fade");
      e.preventDefault();
    });
    canvas.addEventListener("pointermove", function (e) {
      var s = pano.state;
      if (!s || !s.dragging) return;
      s.x = s.ox + (e.clientX - s.sx);
      s.y = s.oy + (e.clientY - s.sy);
      panoApply();
    });
    function release() {
      var s = pano.state;
      if (!s) return;
      s.dragging = false;
      canvas.classList.remove("grabbing");
    }
    canvas.addEventListener("pointerup", release);
    canvas.addEventListener("pointercancel", release);

    canvas.addEventListener("wheel", function (e) {
      var s = pano.state;
      if (!s || !s.img) return;
      s.interacted = true;
      if (hint) hint.classList.add("fade");
      var factor = Math.exp(-e.deltaY * 0.0015);
      s.zoom = Math.min(3, Math.max(1, s.zoom * factor));
      panoApply();
      e.preventDefault();
    }, { passive: false });

    window.addEventListener("resize", function () { if (pano.state) panoApply(); });
  })();

  /* ----- gallery media switching (image / video / pano) ----- */

  function stopMedia() {
    var v = el("modal-video");
    if (v && !v.hidden) { try { v.pause(); } catch (err) {} }
    if (pano.state) panoStop();
  }

  function setGalleryImage(i) {
    var imgs = currentProject.images;
    stopMedia();
    if (!imgs.length) return;
    galleryIndex = (i + imgs.length) % imgs.length;
    var im = imgs[galleryIndex];
    var type = im.type || "image";

    stopMedia();

    var img = el("modal-img");
    var vid = el("modal-video");
    var pn = el("modal-pano");
    img.hidden = type !== "image";
    vid.hidden = type !== "video";
    pn.hidden = type !== "pano";

    if (type === "image") {
      img.src = im.src;
      img.alt = im.alt || "";
    } else if (type === "video") {
      if (im.poster) vid.setAttribute("poster", im.poster);
      else vid.removeAttribute("poster");
      vid.src = im.src;
      try { vid.load(); } catch (err) {}
    } else if (type === "pano") {
      panoStart(im.src);
    }
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

    var figure = el("modal-figure");
    var empty = !(p.images && p.images.length);
    figure.hidden = empty;

    el("modal-thumbs").innerHTML = (p.images || [])
      .map(function (im, idx) {
        var label = im.type === "video" ? "video " : im.type === "pano" ? "360° view " : "image ";
        var inner = im.type === "video"
          ? '<span class="thumb-play" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>'
          : '<img src="' + esc(im.thumb || im.src) + '" alt="" loading="lazy" decoding="async">';
        return (
          '<button class="thumb' + (im.type ? " thumb--" + im.type : "") + '" data-idx="' + idx + '" aria-label="Show ' + label + (idx + 1) + ' of ' + (p.images || []).length + '">' +
          inner + "</button>"
        );
      })
      .join("");

    var pres = el("modal-presentation");
    var presVid = el("modal-presentation-video");
    if (p.presentation) {
      pres.hidden = false;
      if (p.presentation.poster) presVid.setAttribute("poster", p.presentation.poster);
      else presVid.removeAttribute("poster");
      presVid.src = p.presentation.src;
      el("modal-presentation-caption").textContent = p.presentation.caption || "";
      var startPres = function () {
        presVid.play().catch(function () { /* autoplay blocked — controls still available */ });
      };
      startPres();
    } else {
      pres.hidden = true;
      try { presVid.pause(); } catch (err) {}
      presVid.removeAttribute("src");
      presVid.load();
    }

    modal.setAttribute("aria-label", p.title + " — project details");
    setGalleryImage(0);
    modal.showModal();
    el("modal-close").focus();
  }

  function closeModal() {
    stopMedia();
    var presVid = el("modal-presentation-video");
    try { presVid.pause(); } catch (err) {}
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
    stopMedia();
    var presVid = el("modal-presentation-video");
    try { presVid.pause(); } catch (err) {}
    if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  });

  /* arrow keys browse the gallery while the modal is open */
  document.addEventListener("keydown", function (e) {
    if (!modal.open) return;
    if (!currentProject || !currentProject.images.length) return;
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
  ["about", "skills", "projects", "contact"].forEach(function (id) {
    var s = document.getElementById(id);
    if (s) spy.observe(s);
  });

  /* ---------------- init ---------------- */

  renderTabs();
  renderGrid();
})();
