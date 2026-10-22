/* ============================================================
   VERTICE — script.js | 100% client-side, sem backend
   [ADAPTACAO]: troque o numero pelo WhatsApp real
   (DDI + DDD + numero, so digitos).
   ============================================================ */
const WHATSAPP_NUMBER = "5511900000000"; // SUBSTITUIR pelo numero real do prestador

document.documentElement.classList.add("js-enabled");
document.addEventListener("DOMContentLoaded", function () {
  initHeaderScroll();
  initWhatsAppLinks();
  initGalleryFilter();
  initGalleryModal();
  initQuoteForm();
  initScrollReveal();
  initBackToTop();
  initActiveNav();
  initYear();
  initMobileMenu();
});

function initHeaderScroll() {
  var header = document.getElementById("siteHeader");
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("header-scrolled");
    else header.classList.remove("header-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function buildWhatsUrl(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

function initWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp-msg]").forEach(function (el) {
    var msg = el.getAttribute("data-whatsapp-msg") || "";
    el.setAttribute("href", buildWhatsUrl(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
}

function initGalleryFilter() {
  var buttons = document.querySelectorAll(".filter-pills .btn");
  var cards = document.querySelectorAll(".gallery-card");
  if (!buttons.length || !cards.length) return;
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      var filter = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        var col = card.parentElement;
        var cat = card.getAttribute("data-category");
        var show = filter === "all" || cat === filter;
        if (show) {
          card.classList.remove("hide");
          if (col) col.classList.remove("hide");
        } else {
          card.classList.add("hide");
          if (col) col.classList.add("hide");
        }
      });
    });
  });
}
function initGalleryModal() {
  var modalEl = document.getElementById("galleryModal");
  if (!modalEl) return;
  var mImg = modalEl.querySelector("#galleryModalImg");
  var mCat = modalEl.querySelector("#galleryModalCat");
  var mTitle = modalEl.querySelector("#galleryModalTitle");
  var mDesc = modalEl.querySelector("#galleryModalDesc");
  var mDetail = modalEl.querySelector("#galleryModalDetail");
  var mCta = modalEl.querySelector("#galleryModalCta");
  document.querySelectorAll(".gallery-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var img = card.querySelector("img");
      if (mImg && img) { mImg.src = img.src; mImg.alt = img.alt; }
      if (mCat) mCat.textContent = card.getAttribute("data-label") || "";
      if (mTitle) mTitle.textContent = card.getAttribute("data-title") || "";
      if (mDesc) mDesc.textContent = card.getAttribute("data-desc") || "";
      if (mDetail) mDetail.textContent = card.getAttribute("data-detail") || "";
      if (mCta) {
        mCta.setAttribute("href", buildWhatsUrl("Olá! Vi um exemplo de serviço no site e gostaria de pedir um orçamento semelhante."));
        mCta.setAttribute("target", "_blank");
        mCta.setAttribute("rel", "noopener noreferrer");
      }
      if (window.bootstrap && window.bootstrap.Modal) {
        window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
      }
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); }
    });
  });
}

function initQuoteForm() {
  var form = document.getElementById("quoteForm");
  if (!form) return;
  var feedback = document.getElementById("quoteFeedback");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("qName").value.trim();
    var hood = document.getElementById("qHood").value.trim();
    var service = document.getElementById("qService").value;
    var urgency = document.getElementById("qUrgency").value;
    var desc = document.getElementById("qDesc").value.trim();
    var privacy = document.getElementById("qPrivacy").checked;
    if (!name || !hood || !service || !urgency || !desc || !privacy) {
      if (feedback) {
        feedback.textContent = "Por favor, preencha todos os campos e aceite o aviso de privacidade para continuar.";
        feedback.classList.remove("d-none");
        feedback.classList.add("alert", "alert-warning");
      }
      form.reportValidity();
      return;
    }
    var message = "Olá! Gostaria de solicitar um orçamento pelo site.\n\n*Nome:* " + name + "\n*Bairro/Região:* " + hood + "\n*Serviço:* " + service + "\n*Urgência:* " + urgency + "\n*Descrição:* " + desc;
    if (feedback) {
      feedback.textContent = "Abrindo o WhatsApp com a sua mensagem pronta para envio...";
      feedback.classList.remove("d-none", "alert-warning");
      feedback.classList.add("alert", "alert-success");
    }
    window.open(buildWhatsUrl(message), "_blank", "noopener");
  });
}

function initScrollReveal() {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
}

function initBackToTop() {
  var btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) btn.classList.add("show");
    else btn.classList.remove("show");
  }, { passive: true });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initActiveNav() {
  var links = document.querySelectorAll(".nav-link-custom");
  var sections = document.querySelectorAll("section[id]");
  if (!links.length || !sections.length || !("IntersectionObserver" in window)) return;
  var map = {};
  links.forEach(function (l) { map[l.getAttribute("href")] = l; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (l) { l.classList.remove("active"); });
        var link = map["#" + entry.target.id];
        if (link) link.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(function (s) { io.observe(s); });
}

function initYear() {
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
}

function initMobileMenu() {
  var nav = document.getElementById("mainNav");
  if (!nav) return;
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.bootstrap && window.bootstrap.Collapse && nav.classList.contains("show")) {
        window.bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
}

