// ===== MOBILE MENU =====
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

// ===== DROPDOWN MENU =====
const dropdown = document.querySelector(".dropdown");
const dropBtn = document.getElementById("dropBtn");

if (dropdown && dropBtn) {
  dropBtn.addEventListener("click", () => {
    dropdown.classList.toggle("open");
    dropBtn.setAttribute(
      "aria-expanded",
      dropdown.classList.contains("open") ? "true" : "false"
    );
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      dropBtn.setAttribute("aria-expanded", "false");
    }
  });

  dropdown.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      dropdown.classList.remove("open");
      dropBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== NAV SEARCH -> Go to PEDIA =====
const navSearch = document.getElementById("navSearch");
const btnNavSearch = document.getElementById("btnNavSearch");
const navSuggest = document.getElementById("navSuggest");

function goToPediaSearch(q) {
  const pedia = document.getElementById("pedia");
  if (pedia) pedia.scrollIntoView({ behavior: "smooth" });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = q;
    filterData();
  }
}

if (btnNavSearch && navSearch) {
  btnNavSearch.addEventListener("click", () => {
    const q = navSearch.value.trim();
    goToPediaSearch(q);
    hideSuggest();
  });

  navSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      btnNavSearch.click();
    }
  });
}

// ===== AUTO SUGGESTION (GOOGLE-LIKE) =====
let suggestIndex = -1;

function hideSuggest() {
  if (!navSuggest) return;
  navSuggest.classList.add("hidden");
  navSuggest.innerHTML = "";
  suggestIndex = -1;
}

function showSuggest(items) {
  if (!navSuggest) return;

  navSuggest.innerHTML = items
    .map((item, idx) => {
      return `
        <div class="suggest-item" data-index="${idx}" data-value="${item.name}">
          <div class="suggest-title">${item.name}</div>
          <div class="suggest-meta">${item.category} • ${item.recyclable ? "Bisa dikelola" : "Terbatas"}</div>
        </div>
      `;
    })
    .join("");

  navSuggest.classList.remove("hidden");

  // click event
  navSuggest.querySelectorAll(".suggest-item").forEach((el) => {
    el.addEventListener("click", () => {
      const value = el.getAttribute("data-value") || "";
      navSearch.value = value;
      goToPediaSearch(value);
      hideSuggest();
    });
  });
}

function updateActiveSuggest() {
  if (!navSuggest) return;
  const all = navSuggest.querySelectorAll(".suggest-item");
  all.forEach((x) => x.classList.remove("active"));
  if (suggestIndex >= 0 && all[suggestIndex]) {
    all[suggestIndex].classList.add("active");
  }
}

function getSuggestions(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return wasteData
    .filter((x) => x.name.toLowerCase().includes(q))
    .slice(0, 6);
}

if (navSearch) {
  navSearch.addEventListener("input", () => {
    const q = navSearch.value.trim();
    const items = getSuggestions(q);

    if (items.length === 0) {
      hideSuggest();
      return;
    }

    showSuggest(items);
  });

  navSearch.addEventListener("keydown", (e) => {
    if (!navSuggest || navSuggest.classList.contains("hidden")) return;

    const items = navSuggest.querySelectorAll(".suggest-item");
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      suggestIndex = Math.min(suggestIndex + 1, items.length - 1);
      updateActiveSuggest();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      suggestIndex = Math.max(suggestIndex - 1, 0);
      updateActiveSuggest();
    }

    if (e.key === "Escape") {
      hideSuggest();
    }

    if (e.key === "Enter") {
      // kalau arrow selection aktif, ambil itu
      if (suggestIndex >= 0 && items[suggestIndex]) {
        e.preventDefault();
        const value = items[suggestIndex].getAttribute("data-value") || "";
        navSearch.value = value;
        goToPediaSearch(value);
        hideSuggest();
      }
    }
  });

  // klik di luar -> close
  document.addEventListener("click", (e) => {
    if (!navSuggest) return;
    if (!e.target.closest(".nav-search-wrap")) {
      hideSuggest();
    }
  });
}

// ===== PEDIA SEARCH + FILTER =====
const listEl = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const countInfo = document.getElementById("countInfo");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const btnClose = document.getElementById("btnClose");

function render(items) {
  if (!listEl) return;
  listEl.innerHTML = "";

  if (countInfo) countInfo.textContent = `Menampilkan ${items.length} item`;

  if (items.length === 0) {
    listEl.innerHTML = `
      <div style="padding:14px 0;border-top:1px solid rgba(25,45,30,.14)">
        <h3 style="margin:0 0 6px">😢 Tidak ditemukan</h3>
        <p style="margin:0;color:#55645a;line-height:1.9">
          Coba kata kunci lain atau ubah filter kategori.
        </p>
      </div>
    `;
    return;
  }

  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "pedia-card reveal";
    div.innerHTML = `
      <h3 style="margin:0 0 6px">${item.name}</h3>
      <p style="margin:0;color:#55645a;line-height:1.9">
        <b>${item.category}</b> • ${item.recyclable ? "✅ Bisa dikelola" : "❌ Terbatas"}
      </p>
      <p style="margin:10px 0 0;color:#55645a;line-height:1.9">
        ${item.overview.substring(0, 150)}...
      </p>
    `;
    div.addEventListener("click", () => openModal(item));
    listEl.appendChild(div);
  });

  revealCheck();
}

function openModal(item) {
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <h2 style="margin:0 0 8px">${item.name}</h2>

    <p style="margin:0;color:#55645a;line-height:1.9">
      <b>Kategori:</b> ${item.category} •
      <b>Status:</b> ${item.recyclable ? "Bisa dikelola/didaur ulang" : "Tidak/terbatas"}
    </p>

    <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(25,45,30,.14)">
      <h3 style="margin:0 0 6px">📌 Penjelasan</h3>
      <p style="margin:0;color:#55645a;line-height:2.0">${item.overview}</p>
    </div>

    <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(25,45,30,.14)">
      <h3 style="margin:0 0 6px">✅ Cara Buang yang Benar</h3>
      <ul class="list">
        ${item.howTo.map((x) => `<li>${x}</li>`).join("")}
      </ul>
    </div>

    <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(25,45,30,.14)">
      <h3 style="margin:0 0 6px">⚠️ Kesalahan Umum</h3>
      <ul class="list">
        ${item.mistakes.map((x) => `<li>${x}</li>`).join("")}
      </ul>
    </div>

    <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(25,45,30,.14)">
      <h3 style="margin:0 0 6px">💡 Fakta Singkat</h3>
      <p style="margin:0;color:#55645a;line-height:2.0">${item.fact}</p>
    </div>
  `;

  modal.classList.remove("hidden");
}

function closeModal() {
  if (!modal) return;
  modal.classList.add("hidden");
}

if (btnClose) btnClose.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

function filterData() {
  if (!searchInput || !categoryFilter) {
    render(wasteData);
    return;
  }

  const q = searchInput.value.trim().toLowerCase();
  const cat = categoryFilter.value;

  const filtered = wasteData.filter((item) => {
    const matchQuery =
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.overview.toLowerCase().includes(q);

    const matchCat = cat === "all" ? true : item.category === cat;
    return matchQuery && matchCat;
  });

  render(filtered);
}

if (searchInput) searchInput.addEventListener("input", filterData);
if (categoryFilter) categoryFilter.addEventListener("change", filterData);

// init
render(wasteData);
filterData();

// ===== BACK TO TOP =====
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 700) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== SMOOTH REVEAL ANIMATION =====
function revealCheck() {
  const trigger = window.innerHeight * 0.90;
  document.querySelectorAll(".reveal").forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("show");
  });
}

window.addEventListener("scroll", revealCheck);
window.addEventListener("load", revealCheck);
revealCheck();
