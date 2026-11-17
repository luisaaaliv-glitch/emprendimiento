/* ==========================================================================
   VANTARA STREETWEAR · Lógica, Carrusel, Tallas, Colores, Cursor, Animaciones 3D & SQL Contact
   ========================================================================== */

/* 1. CURSOR INTERACTIVO CON MOVIMIENTO Y PARTÍCULAS */
function initCustomCursor() {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  const follower = document.createElement("div");
  follower.className = "cursor-follower";
  document.body.appendChild(follower);

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    // Generar partículas de movimiento suaves
    if (Math.random() > 0.6) {
      const dot = document.createElement("div");
      dot.className = "trail-dot";
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 600);
    }
  });

  // Animación fluida para el seguidor exterior
  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  // Detectar hover sobre elementos interactivos
  const interactiveSelector = "a, button, input, textarea, .product-card, .feature-card, .gallery-item, .size-btn, .color-btn";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add("hovering");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove("hovering");
    }
  });
}

/* 2. EFECTO TILT 3D EN TARJETAS */
function init3DTilt() {
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".product-card, .feature-card");
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const rotateX = ((y / rect.height) - 0.5) * -12;
        const rotateY = ((x / rect.width) - 0.5) * 12;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      } else {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      }
    });
  });
}

/* 3. CATÁLOGO DE PRODUCTOS (CON TALLAS Y COLORES PARA LA CAMISETA BÁSICA) */
const PRODUCTS = [
  {
    id: 1,
    name: "Hoodie Heavy Red Crimson",
    price: 240000,
    short: "Hoodie oversize 450 GSM con bordado carmesí.",
    long: "Hoodie de algodón denso con caída ultra estructurada. Gráfico bordado en hilo dorado y detalles en negro.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSw1G0GhVfgR0b3eY2KTKqTLTbEqddJBX3fYFrt6u38_iQ_24t9dc12KMh&s=10",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Conjunto urban Black & Gray",
    price: 380000,
    short: "Sudadera relax con detalles en algodón gris.",
    long: "Conjunto sudadera buzo relaxed en algodón gris. Detalles negros y bota ancha de excelente caída urbana.",
    img: "https://i.pinimg.com/736x/4d/2f/96/4d2f960fc0bd4d85953214eaf59fefeb.jpg",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Graphic Tee 'Cyber Vantara'",
    price: 130000,
    short: "Camiseta oversize negra con estampado serigráfico.",
    long: "Camiseta de cuello cerrado reinforced y manga caída. Estampado serigráfico en pecho y espalda con detalles dorados.",
    img: "https://tiendaestilourbano.com/wp-content/uploads/2025/08/Estilo-Urbano-Hombre.jpg",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Pants Tactical Black",
    price: 280000,
    short: "Pantalón de corte holgado estilo cargo.",
    long: "Pantalón técnico ancho color negro desteñido tiro bajo, diseñado para máximo confort y estilo underground.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvUIO3UkYj0FOYFC0cjCL4wT2Q8cdz86RZ5pxz0oSSqg&s=10",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "Gorra Vant",
    price: 420000,
    short: "Gorra roja con detalles.",
    long: "Gorra de algodón color rojo con detalles en negro.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ErSPGT6IWENeS5TzW9vM_5n_JlxPellqnExvBVzcXI53EQBZaHWkgYY&s=10",
    sizes: ["Única"]
  },
  {
    id: 6,
    name: "Style Jean",
    price: 150000,
    short: "Jean clásico holgado.",
    long: "Jean azul medio con corte ancho y espacio para correa.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYN1c1Tv-c60izvwNib0p5Lv4H2p6pMzx3RhyQNMqRUM5sp9QwIoiqJA&s=10",
    sizes: ["30", "32", "34", "36"]
  },
  {
    id: 7,
    name: "Basic Vant Camiseta",
    price: 75000,
    short: "Camiseta básica oversize, elige tu color favorito.",
    long: "Todo armario necesita una básica de algodón premium con estilo oversize. Disponible en Blanca, Negra, Baby Blue y Ocre.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQie2yVCcxCQ4M-Hkg1rX0VDvi0_Hgxqma-PLwoR7CnYDHJDTUaAwIVauQQ&s=10",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blanca", hex: "#ffffff", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQie2yVCcxCQ4M-Hkg1rX0VDvi0_Hgxqma-PLwoR7CnYDHJDTUaAwIVauQQ&s=10" },
      { name: "Negra", hex: "#111111", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4vAEsmU-B05TCzJE2uJxbpQsZozHeopHNBq7FQtjirw&s=10" },
      { name: "Baby Blue", hex: "#89cff0", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5iMpGJAxpHKds3qua39HI52twrAkW3eIV7vIKm1BmOA&s=10" },
      { name: "Ocre", hex: "#cc7722", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAWf6oKn-qxIJI-1zh6m-OAKqGYSeAUCPFlIv5g1RDDw&s=10" }
    ]
  },
  {
    id: 8,
    name: "Gorra Vant 2.0",
    price: 95000,
    short: "Gorra negra con detalles.",
    long: "Gorra de algodón color negro con detalles en dorado.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeIUMTcLIjDeshPgYkKVuW58DDY42E_9kDZhppzjSjnA&s=10",
    sizes: ["Única"]
  }
];

let cart = [];
const money = (n) => "$" + n.toLocaleString("es-CO");

/* 4. NAVEGACIÓN SPA */
const pages = document.querySelectorAll(".page");

function showPage(id) {
  if (!id) return;
  pages.forEach(p => p.classList.toggle("active", p.id === id));
  document.querySelectorAll(".nav-link").forEach(l => {
    l.classList.toggle("current", l.getAttribute("href") === "#" + id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (!link) return;
  const href = link.getAttribute("href");
  if (href && href.length > 1 && href.startsWith("#")) {
    e.preventDefault();
    showPage(href.slice(1));
  }
});

/* 5. RENDER PRODUCTOS */
const grid = document.getElementById("products-grid");

function renderProducts() {
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card">
      <div class="product-img-wrapper">
        <img src="${p.img}" alt="${p.name}">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.short}</p>
        <p class="product-price">${money(p.price)}</p>
        <div class="product-actions">
          <button class="btn btn-ghost" data-view="${p.id}">DETALLES</button>
          <button class="btn btn-cta" data-view="${p.id}">AGREGAR 🔥</button>
        </div>
      </div>
    </article>
  `).join("");
}

/* 6. MODAL CON OPCIÓN DE TALLAS Y COLORES */
const modal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");

let selectedSize = "M";
let selectedColor = null;

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p || !modalBody || !modal) return;

  selectedSize = p.sizes ? p.sizes[0] : "Única";
  selectedColor = p.colors ? p.colors[0] : null;

  const currentImg = selectedColor ? selectedColor.img : p.img;

  modalBody.innerHTML = `
    <img id="modal-img" src="${currentImg}" alt="${p.name}">
    <div>
      <h3>${p.name}</h3>
      <p>${p.long}</p>

      ${p.colors ? `
        <div class="option-group" style="margin: 1rem 0;">
          <label style="display:block; font-size:0.85rem; color:#aaa; margin-bottom:0.4rem;">COLOR: <strong id="color-name" style="color:#fff;">${selectedColor.name}</strong></label>
          <div class="color-options" style="display:flex; gap:0.6rem;">
            ${p.colors.map((c, i) => `
              <button class="color-btn ${i === 0 ? 'active' : ''}" 
                      style="width:28px; height:28px; border-radius:50%; background-color:${c.hex}; border:2px solid ${i === 0 ? 'var(--gold-metallic)' : '#333'}; cursor:pointer;" 
                      data-color-name="${c.name}" 
                      data-color-img="${c.img}">
              </button>
            `).join("")}
          </div>
        </div>
      ` : ''}

      ${p.sizes ? `
        <div class="option-group" style="margin: 1rem 0;">
          <label style="display:block; font-size:0.85rem; color:#aaa; margin-bottom:0.4rem;">TALLA:</label>
          <div class="size-options" style="display:flex; gap:0.5rem;">
            ${p.sizes.map((s, i) => `
              <button class="size-btn ${i === 0 ? 'active' : ''}" style="background:${i === 0 ? 'var(--red-crimson)' : '#1a1a1a'}; color:#fff; border:1px solid #333; padding:0.3rem 0.8rem; cursor:pointer;" data-size="${s}">${s}</button>
            `).join("")}
          </div>
        </div>
      ` : ''}

      <p class="product-price">${money(p.price)}</p>
      <button class="btn btn-cta" id="modal-add-btn">AGREGAR AL STASH 🔥</button>
    </div>
  `;
  modal.classList.add("open");

  // Eventos de selección de color
  const colorBtns = modalBody.querySelectorAll(".color-btn");
  colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      colorBtns.forEach(b => b.style.borderColor = "#333");
      btn.style.borderColor = "var(--gold-metallic)";
      const cName = btn.dataset.colorName;
      const cImg = btn.dataset.colorImg;
      
      selectedColor = p.colors.find(c => c.name === cName);
      document.getElementById("modal-img").src = cImg;
      document.getElementById("color-name").textContent = cName;
    });
  });

  // Eventos de selección de talla
  const sizeBtns = modalBody.querySelectorAll(".size-btn");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach(b => {
        b.style.background = "#1a1a1a";
      });
      btn.style.background = "var(--red-crimson)";
      selectedSize = btn.dataset.size;
    });
  });

  // Botón agregar desde el modal
  const addBtn = document.getElementById("modal-add-btn");
  addBtn.onclick = () => {
    addToCartWithOptions(p.id, selectedSize, selectedColor);
    closeModal();
  };
}

function closeModal() {
  if (modal) modal.classList.remove("open");
}

const modalCloseBtn = document.getElementById("modal-close");
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

/* 7. CARRITO / STASH CON TALLAS Y COLORES */
const cartPanel   = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");

function addToCartWithOptions(id, size, colorObj) {
  const colorName = colorObj ? colorObj.name : null;
  const itemImg = colorObj ? colorObj.img : null;

  const item = cart.find(i => i.id === id && i.size === size && i.color === colorName);
  
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, size, color: colorName, customImg: itemImg, qty: 1 });
  }

  updateCart();
  const p = PRODUCTS.find(x => x.id === id);
  const detailStr = `${p.name} (${size}${colorName ? ' / ' + colorName : ''})`;
  showToast(`🔥 ${detailStr} agregado al Stash`);
}

function changeQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  if (cartCountEl) cartCountEl.textContent = count;

  const total = cart.reduce((acc, item) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return acc + (p ? p.price * item.qty : 0);
  }, 0);

  if (cartItemsEl) {
    if (cart.length === 0) {
      cartItemsEl.innerHTML = `<p class="cart-empty">Tu Stash está vacío 🛒<br>Elige tus prendas urbanas.</p>`;
    } else {
      cartItemsEl.innerHTML = cart.map((i, idx) => {
        const p = PRODUCTS.find(x => x.id === i.id);
        if (!p) return "";
        const displayImg = i.customImg || p.img;
        return `
          <div class="cart-item">
            <img src="${displayImg}" alt="${p.name}">
            <div>
              <div class="ci-name">${p.name}</div>
              <div class="ci-details" style="font-size:0.75rem; color:#888;">Talla: <strong>${i.size}</strong> ${i.color ? '| Color: <strong>' + i.color + '</strong>' : ''}</div>
              <div class="ci-price">${money(p.price)}</div>
              <div class="ci-qty">
                <button data-minus-idx="${idx}">−</button>
                <span>${i.qty}</span>
                <button data-plus-idx="${idx}">+</button>
              </div>
            </div>
            <button class="ci-remove" data-remove-idx="${idx}">✕</button>
          </div>`;
      }).join("");
    }
  }

  if (cartTotalEl) cartTotalEl.textContent = money(total);
}

function openCart() {
  if (cartPanel) cartPanel.classList.add("open");
  if (cartOverlay) cartOverlay.classList.add("open");
}
function closeCart() {
  if (cartPanel) cartPanel.classList.remove("open");
  if (cartOverlay) cartOverlay.classList.remove("open");
}

const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
if (cartToggle) cartToggle.addEventListener("click", openCart);
if (cartClose) cartClose.addEventListener("click", closeCart);
if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

/* 8. CÓDIGO DEL CARRUSEL DE FOTOS & MOODBOARD */
const GALLERY_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzCb3Ll2xMPKtD_e0XK9gzi1idOIkHv-ZMgKTl1s8u4g&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2RYumKl1UekhmmbQH9Ktteb2Y4mfrpK8Fn543VC6FLw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTISGDo9Y_3a0fls1fpu3-1_zutqUatpcLkI0wDC_7Yq5oYXfjCqWDFNk3g&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDjjs_VZl9UMxPx6mZlfehJKCZx35oiDkC6JGz2RS15A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAUFKoNNSC4TeehjZ5WqjqHhCAGBeIhPoOPb8uAEJ67g&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGRqLxnWvCsLjCnH4ZnypAFWUXNn8N0R3KXk_h-WFVPg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3RumRtTJvMRd-s7wEhbwNQQlkTAGIrhjgtXTA0aKu_A&s=10",
  "https://qst.com.co/cdn/shop/files/QZT112260082-019-2.webp?v=1781120194&width=2877"
];

const track = document.getElementById("carousel-track");
const dotsWrap = document.getElementById("carousel-dots");
const galleryGrid = document.getElementById("gallery-grid");
let slideIndex = 0;

function initCarousel() {
  if (track) {
    track.innerHTML = GALLERY_IMAGES.map(src => `<img src="${src}" alt="Street Look">`).join("");
  }
  if (dotsWrap) {
    dotsWrap.innerHTML = GALLERY_IMAGES.map((_, i) => `<button data-dot="${i}"></button>`).join("");
  }
  if (galleryGrid) {
    galleryGrid.innerHTML = GALLERY_IMAGES.map(src => `
      <div class="gallery-item">
        <img src="${src}" alt="Moodboard Look">
      </div>
    `).join("");
  }
  updateSlide();
}

function updateSlide() {
  if (!track) return;
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
  if (dotsWrap) {
    dotsWrap.querySelectorAll("button").forEach((btn, idx) => {
      btn.classList.toggle("active", idx === slideIndex);
    });
  }
}

const prevBtn = document.getElementById("carousel-prev");
const nextBtn = document.getElementById("carousel-next");

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    updateSlide();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % GALLERY_IMAGES.length;
    updateSlide();
  });
}

if (dotsWrap) {
  dotsWrap.addEventListener("click", (e) => {
    if (e.target.dataset.dot !== undefined) {
      slideIndex = Number(e.target.dataset.dot);
      updateSlide();
    }
  });
}

// Auto rotación del carrusel cada 4.5 segundos
setInterval(() => {
  slideIndex = (slideIndex + 1) % GALLERY_IMAGES.length;
  updateSlide();
}, 4500);

/* 9. DELEGACIÓN DE EVENTOS */
document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.dataset.view) openModal(Number(t.dataset.view));
  if (t.dataset.plusIdx !== undefined)  changeQty(Number(t.dataset.plusIdx), 1);
  if (t.dataset.minusIdx !== undefined) changeQty(Number(t.dataset.minusIdx), -1);
  if (t.dataset.removeIdx !== undefined) removeFromCart(Number(t.dataset.removeIdx));
});

/* 10. MANEJADOR DEL FORMULARIO DE CONTACTO (CONEXIÓN CON SQL BACKEND) */
const contactForm = document.getElementById("contact-form");
const formMsg = document.getElementById("form-msg");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (!contactForm.checkValidity()) {
      if (formMsg) {
        formMsg.style.color = "#8b0000";
        formMsg.textContent = "⚠️ Por favor, completa los campos requeridos.";
      }
      return;
    }

    const formData = {
      nombre: contactForm.nombre.value.trim(),
      correo: contactForm.correo.value.trim(),
      telefono: contactForm.telefono.value.trim(),
      asunto: contactForm.asunto.value.trim(),
      mensaje: contactForm.mensaje.value.trim()
    };

    try {
      const response = await fetch('http://localhost:3000/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        if (formMsg) {
          formMsg.style.color = "#c5a059";
          formMsg.textContent = `🔥 ¡Gracias, ${formData.nombre}! Tu mensaje ha sido registrado en la base de datos.`;
        }
        if (typeof showToast === "function") {
          showToast("Mensaje guardado en SQL con éxito ⚜");
        }
        contactForm.reset();
      } else {
        throw new Error(data.message || "Error al enviar");
      }
    } catch (error) {
      if (formMsg) {
        formMsg.style.color = "#8b0000";
        formMsg.textContent = "⚠️ Error de conexión con el servidor backend. Verifica que node server.js esté encendido.";
      }
    }
  });
}

/* 11. TOAST NOTIFICACIONES */
const toastEl = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3000);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeModal(); closeCart(); }
});

/* INICIALIZAR TODO */
initCustomCursor();
init3DTilt();
initCarousel();
renderProducts();
updateCart();
showPage("inicio");