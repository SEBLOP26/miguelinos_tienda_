/**
 * app.js
 * Lógica de catálogo + carrito drawer + envío + WhatsApp
 * Edita este archivo en VSCode: aquí está todo el JavaScript (antes estaba inline en index.html).
 */



// ===== CONFIG =====
const WHATSAPP_PHONE = "593988757892";
  const SIZES = ["S","M","L","XL"];
  const SHIPPING_BY_CITY = {
    pickup:    {label:"Recoger en tienda",        cents:0},
    santo:     {label:"Santo Domingo (local)",     cents:100},
    quito:     {label:"Quito",                     cents:200},
    guayaquil: {label:"Guayaquil",                 cents:000},
    cuenca:    {label:"Cuenca",                    cents:000},
    nacional:  {label:"Nacional (otras ciudades)", cents:000},
  };

  const COLOR_HEX = {
    "Blanco":"#ffffff",
    "Negro":"#0b0f17",
    "Azul":"#2f6df6",
    "Rojo":"#ef4444",
    "Verde":"#10b981",
    "Amarillo":"#f59e0b"
  };

  // stock: mapa de combinaciones disponibles -> cantidad (o true)
  // clave: "size|color"; para productos sin talla usa solo "|Color" o "Única|Color"
  const CATALOG = [


// ==========================================
// YOGURES
// ==========================================

{
  id:"y1",
  cat:"yogurt",
  name:"Yogurt Griego de Mora 200 g",
  desc:"Yogurt griego cremoso con delicioso sabor a mora, ideal para disfrutar en cualquier momento.",
  priceCents:100,
  img:"img/yogurt-griego-mora.png"
},
{
  id:"y2",
  cat:"yogurt",
  name:"Yogurt Griego de Fresa 200 g",
  desc:"Yogurt griego cremoso con delicioso sabor a fresa, una opción práctica y nutritiva.",
  priceCents:100,
  img:"img/yogurt-griego-fresa.png"
},
{
  id:"y3",
  cat:"yogurt",
  name:"Yogurt Natural 1000 g",
  desc:"Yogurt artesanal de sabor natural y textura cremosa, elaborado para disfrutar solo o acompañado.",
  priceCents:225,
  img:"img/yogurt-natural.png"
},
{
  id:"y4",
  cat:"yogurt",
  name:"Yogurt de Fresa 1000 g",
  desc:"Yogurt artesanal de textura cremosa y agradable sabor a fresa, ideal para toda la familia.",
  priceCents:225,
  img:"img/yogurt-fresa-1l.png"
},
{
  id:"y5",
  cat:"yogurt",
  name:"Yogurt de Mora 1000 g",
  desc:"Yogurt artesanal de textura cremosa y delicioso sabor a mora, perfecto para acompañar tus comidas.",
  priceCents:225,
  img:"img/yogurt-mora-1l.png"
},
{
  id:"y6",
  cat:"yogurt",
  name:"Yogurt de Mora 2000 g",
  desc:"Yogurt artesanal con delicioso sabor a mora, presentado en formato familiar de 2 litros.",
  priceCents:350,
  img:"img/yogurt-mora-2l.png"
},
{
  id:"y7",
  cat:"yogurt",
  name:"Yogurt de Fresa 2000 g",
  desc:"Yogurt artesanal con agradable sabor a fresa, presentado en formato familiar de 2 litros.",
  priceCents:350,
  img:"img/yogurt-fresa-2l.png"
},
{
  id:"y8",
  cat:"yogurt",
  name:"Yogurt Griego Natural 1000 g",
  desc:"Yogurt griego natural de consistencia espesa y cremosa, ideal para desayunos, postres y snacks.",
  priceCents:400,
  img:"img/yogurt-griego-natural.png"
},

// ==========================================
// DERIVADOS DE LA CAÑA
// ==========================================

{
  id:"c1",
  cat:"cana",
  name:"Jugo de Caña Natural",
  desc:"Refrescante jugo de caña de sabor naturalmente dulce, ideal para disfrutar bien frío.",
  priceCents:100,
  img:"img/jugo-cana-natural.png"
},
{
  id:"c2",
  cat:"cana",
  name:"Jugo de Caña con Limón",
  desc:"Refrescante combinación de jugo de caña y limón, con un agradable equilibrio entre dulzor y acidez.",
  priceCents:100,
  img:"img/jugo-cana-limon.png"
},
{
  id:"c3",
  cat:"cana",
  name:"Miel de Caña",
  desc:"Miel de caña de sabor intenso y dulce, ideal para acompañar bebidas, postres y preparaciones tradicionales.",
  priceCents:100,
  img:"img/miel-cana.png"
},

//leche


    //{
      //id:"l1",
     // cat:"leche",
     // name:"Leche Entera 1 Litro",
      //desc:"Leche fresca pasteurizada.",
      //priceCents:120,
      //img:"img/leche-entera.jpg"
    //},
    //{
      //id:"l2",
      //cat:"leche",
      //name:"Leche Descremada 1 Litro",
      //desc:"Ligera, ideal para dietas.",
      //priceCents:120,
      //img:"img/leche-descremada.jpg"
    //},
    //{
     // id:"m1",
     // cat:"mermeladas",
      //name:"Mermelada de Mora 250g",
      //desc:"Elaborada con fruta natural.",
      //priceCents:250,
      //img:"img/mermelada-mora.jpg"
    //},
    //{
      //id:"m2",
      //cat:"mermeladas",
      //name:"Mermelada de Fresa 250g",
      //desc:"Sabor intenso, perfecta para yogurt y pan.",
      //priceCents:250,
      //img:"img/mermelada-fresa.jpg"
    //},
    //{
      //id:"o1",
      //cat:"otros",
      //name:"Manjar de leche 250g",
      //desc:"Dulce tradicional, textura cremosa.",
      //priceCents:280,
      //img:"img/manjar.jpg"
    //}
  ];

  

// ===== UTILIDADES DOM / FORMATO =====
const $  = (s)=>document.querySelector(s);
  const $$ = (s)=>document.querySelectorAll(s);
  const money = (c)=>"$"+(c/100).toFixed(2);
  const CART_KEY = "miguelinos_drawer_cart_v1";
  let currentCategory = "all";
  const filtered = () => CATALOG.filter(p => currentCategory === "all" ? true : p.cat === currentCategory);

  

// ===== CARRITO: STORAGE =====
function loadCart(){ try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; } }
  function saveCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCount(); }

  

// ===== CARRITO: OPERACIONES (add/remove/qty) =====
function addToCart(productId, variant){
    const cart = loadCart();
    const p = CATALOG.find(p=>p.id===productId);
    if(!isAvailable(p, variant?.size, variant?.color)){
      alert("Esa combinación de talla y color está agotada."); return;
    }
    const key = productId+"|"+(variant?.size||"")+"|"+(variant?.color||"");
    const found = cart.find(i=>i.key===key);
    const chosenImg = getImageForColor(p, variant?.color) || p.img;
    if(found) found.qty += 1;
    else cart.push({ key, id:p.id, cat:p.cat, name:p.name, desc:p.desc, img:chosenImg, priceCents:p.priceCents, qty:1, variant });
    saveCart(cart);
    toast("Producto agregado");
  }
  function removeFromCart(key){ saveCart(loadCart().filter(i=>i.key!==key)); renderCart(); }
  function setQty(key, qty){ const cart = loadCart(); const it = cart.find(i=>i.key===key); if(!it) return; it.qty = Math.max(1, qty); saveCart(cart); renderCart(); }
  function clearCart(){ saveCart([]); renderCart(); }

  

// ===== STOCK / IMÁGENES POR COLOR =====
function getImageForColor(product, colorName){
    if(!product?.colorImages || !colorName) return null;
    return product.colorImages[colorName] || null;
  }

  function isAvailable(product, size, color){
    if(!product.stock) return true; // si no define stock, todo disponible
    const k = `${size||""}|${color||""}`;
    const v = product.stock[k];
    return v === undefined ? true : v > 0 || v === true;
  }

  // Dispara la lógica de disponibilidad visual (habilitar/deshabilitar radios según la otra selección)
  

// ===== UI: DISPONIBILIDAD (talla/color) =====
function updateAvailability(card, product){
    const sizeChecked = card.querySelector(`fieldset.size-picker input[type=radio]:checked`)?.value;
    const colorChecked = card.querySelector(`fieldset.color-picker input[type=radio]:checked`)?.value;

    // Actualiza colores según talla seleccionada
    card.querySelectorAll(`fieldset.color-picker input[type=radio]`).forEach(input=>{
      const color = input.value;
      const ok = isAvailable(product, sizeChecked, color);
      input.disabled = !ok;
      if(!ok && input.checked){
        // Si el color actual dejó de ser válido, elige otro válido
        const alt = Array.from(card.querySelectorAll(`fieldset.color-picker input[type=radio]`)).find(i=>!i.disabled);
        if(alt){ alt.checked = true; }
      }
    });

    // Actualiza tallas según color seleccionado
    card.querySelectorAll(`fieldset.size-picker input[type=radio]`).forEach(input=>{
      const size = input.value;
      const ok = isAvailable(product, size, colorChecked);
      input.disabled = !ok;
      if(!ok && input.checked){
        const alt = Array.from(card.querySelectorAll(`fieldset.size-picker input[type=radio]`)).find(i=>!i.disabled);
        if(alt){ alt.checked = true; }
      }
    });
  }

  

// ===== UI: RENDER PRODUCTOS =====
function productCard(p){
    const hasSizes = Array.isArray(p.sizes);
    const hasColors = Array.isArray(p.colors);

    const colorSwatches = hasColors ? (`
      <div class="label-row"><span>Color</span><span class="muted"></span></div>
      <fieldset class="color-picker" aria-label="Elegir color" role="radiogroup" data-product="${p.id}">
        ${p.colors.map((c,idx)=>{
          const id = `c-${p.id}-${idx}`;
          const hex = COLOR_HEX[c] || "#ccc";
          const checked = idx===0 ? "checked" : "";
          return `<input type="radio" name="color-${p.id}" id="${id}" value="${c}" ${checked}>
                  <label for="${id}" class="swatch" title="${c}" style="--swatch:${hex}"></label>`;
        }).join("")}
      </fieldset>
    `) : "";

    const sizeRadios = hasSizes ? (`
      <div class="label-row"><span>Talla</span><span class="muted"></span></div>
      <fieldset class="size-picker" aria-label="Elegir talla" role="radiogroup" data-product="${p.id}">
        ${p.sizes.map((s,idx)=>{
          const id = `s-${p.id}-${idx}`;
          const checked = idx===0 ? "checked" : "";
          return `<input type="radio" name="size-${p.id}" id="${id}" value="${s}" ${checked}>
                  <label for="${id}" class="size">${s}</label>`;
        }).join("")}
      </fieldset>
    `) : "";

    const initialImg = getImageForColor(p, p.colors?.[0]) || p.img;

    return `
      <div class="card" data-product="${p.id}">
        <img class="prod-img" src="${initialImg}" alt="${p.name}" loading="lazy"/>
        <div class="card-body">
          <div class="pill">${p.cat}</div>
          <h3>${p.name}</h3>
          <p class="desc">${p.desc||""}</p>
          <p class="price">${money(p.priceCents)}</p>
          ${colorSwatches}
          ${sizeRadios}
          <button class="btn primary" data-add="${p.id}">Agregar</button>
        </div>
      </div>`;
  }

  function renderProducts(){
    const wrap = $("#product-list");
    wrap.innerHTML = "";
    const q = $("#search").value.trim().toLowerCase();
    const list = filtered().filter(p => p.name.toLowerCase().includes(q) || (p.desc||"").toLowerCase().includes(q));
    if(!list.length){ wrap.innerHTML = '<p class="muted">No se encontraron productos.</p>'; return; }
    list.forEach(p => { const d=document.createElement('div'); d.innerHTML=productCard(p); const card=d.firstElementChild; wrap.appendChild(card); updateAvailability(card,p); });
  }

  

// ===== UI: RENDER CARRITO Y TOTALES =====
function renderCart(){
    const cart = loadCart();
    const items = $("#cart-items"); items.innerHTML = "";
    const orderList = $("#order-list"); if(orderList) orderList.innerHTML = "";
    if(!cart.length){
      items.innerHTML = '<p class="muted">Tu carrito está vacío.</p>';
      if(orderList) orderList.innerHTML = '<div class="muted">Aún no agregas productos.</div>';
    } else {
      cart.forEach(it=>{
        const row=document.createElement("div"); row.className="cart-row list";
        const varBits=[]; if(it?.variant?.color) varBits.push("Color: "+it.variant.color); if(it?.variant?.size) varBits.push("Talla: "+it.variant.size);
        const meta = [it.cat].concat(varBits).join(" · ");
        row.innerHTML=`
          <div class="meta">
            <div class="name">${it.name}</div>
            <div class="sub">${meta}</div>
            <div class="unit">Unit: ${money(it.priceCents)}</div>
          </div>
          <div class="qty-controls">
            <button class="qbtn" data-dec="${it.key}">−</button>
            <div class="qnum">${it.qty}</div>
            <button class="qbtn" data-inc="${it.key}">+</button>
          </div>
          <button class="trash" data-remove="${it.key}" title="Quitar" aria-label="Quitar">🗑️</button>`;
        items.appendChild(row); const divider=document.createElement("div"); divider.className="divider"; items.appendChild(divider);
      });
      if(orderList){
        orderList.innerHTML = cart.map(it=>{
          const varText=[it?.variant?.size,it?.variant?.color].filter(Boolean).join(" · ");
          const lineTotal = it.qty * it.priceCents;
          return `
          <div class="order-line">
            <img class="order-thumb" src="${it.img}" alt="${it.name}"/>
            <div class="order-text">
              <span class="qtyname">${it.name}${varText?` <span class="muted">(${varText})</span>`:""}</span>
              <span class="linetotal">${it.qty} × ${money(it.priceCents)} = <b>${money(lineTotal)}</b></span>
            </div>
            <div class="order-qty-controls">
              <button class="qbtn mini" data-dec-summary="${it.key}">−</button>
              <div class="qnum mini">${it.qty}</div>
              <button class="qbtn mini" data-inc-summary="${it.key}">+</button>
            </div>
            <button class="mini-trash" data-remove="${it.key}" title="Quitar" aria-label="Quitar">🗑️</button>
          </div>`;
        }).join("");
      }
    }
    const subtotal = cart.reduce((a,i)=>a + i.qty * i.priceCents, 0);
    const cityKey = $("#city").value || "pickup";
    const ship = SHIPPING_BY_CITY[cityKey]?.cents || 0;
    $("#subtotal").textContent = money(subtotal);
    $("#shipping-amount").textContent = money(ship);
    $("#total").textContent = money(subtotal + ship);
  }

  function updateCount(){ const count = loadCart().reduce((a,i)=>a+i.qty,0); $("#cart-count").textContent = count; }

  

// ===== WHATSAPP: MENSAJE Y REDIRECCIÓN =====
function buildWhatsAppMessage(){
    const cart = loadCart();
    const orderId = "ORD-" + Date.now();
    const name    = $("#cust-name").value.trim();
    const phone   = $("#cust-phone").value.trim();
    const address = $("#cust-address").value.trim();
    const notes   = $("#cust-notes").value.trim();
    const cityKey = $("#city").value;
    const city    = SHIPPING_BY_CITY[cityKey]?.label || "N/A";
    const shipping= SHIPPING_BY_CITY[cityKey]?.cents || 0;
    if(!cart.length){ alert("Tu carrito está vacío."); return null; }
    if(!name || !phone || !address){ alert("Completa tus datos de cliente."); return null; }
    let subtotal = 0; const lines = [];
    lines.push(`🧾 *Pedido #${orderId}* — Miguelinos de Lelia`);
    lines.push(`Cliente: ${name}`);
    lines.push(`Tel: ${phone}`);
    lines.push(`Dirección: ${address}`);
    lines.push(`Ciudad/Entrega: ${city}`);
    lines.push('----------------------------');
    cart.forEach(it=>{
      const sub = it.qty * it.priceCents; subtotal += sub;
      const varBits=[]; if(it?.variant?.color) varBits.push("Color: "+it.variant.color); if(it?.variant?.size) varBits.push("Talla: "+it.variant.size);
      const meta = [it.cat].concat(varBits).join(" · ");
      lines.push(`• ${it.name} — ${meta}`);
      lines.push(`  ${it.qty} × ${money(it.priceCents)} = ${money(sub)}`);
    });
    lines.push('----------------------------');
    lines.push(`Subtotal: ${money(subtotal)}`);
    lines.push(`Envío: ${money(shipping)}`);
    lines.push(`*Total: ${money(subtotal+shipping)}*`);
    if(notes) lines.push(`Notas: ${notes}`);
    lines.push('Método de pago preferido: (Transferencia / Efectivo / Tarjeta)');
    return lines.join("\n");
  }

  function goToWhatsApp(){
    const msg = buildWhatsAppMessage();
    if(!msg) return;
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    window.location.href = url;
  }

  

// ===== DRAWER / TOAST =====
function openDrawer(){ $("#drawer").classList.add("open"); $("#drawer").setAttribute("aria-hidden","false"); $("#drawer-overlay").hidden = false; renderCart(); }
  function closeDrawer(){ $("#drawer").classList.remove("open"); $("#drawer").setAttribute("aria-hidden","true"); $("#drawer-overlay").hidden = true; }
  function toast(text){
    let t = document.createElement('div'); t.className = 'toast'; t.textContent = text;
    document.body.appendChild(t); setTimeout(()=>t.classList.add('show'), 10);
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(), 200); }, 1600);
  }

  

// ===== EVENTOS (DOMContentLoaded) =====
document.addEventListener("DOMContentLoaded", () => {
    $$(".tab").forEach(btn => btn.addEventListener("click", () => {
      $$(".tab").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.cat;
      renderProducts();
    }));

    // Swatches -> actualizan imagen y disponibilidad
    document.addEventListener('change', (e)=>{
      const fieldColor = e.target.closest('fieldset.color-picker');
      const fieldSize = e.target.closest('fieldset.size-picker');
      if(!fieldColor && !fieldSize) return;
      const card = e.target.closest('.card');
      const productId = card.dataset.product;
      const p = CATALOG.find(x=>x.id===productId);
      // actualizar imagen por color
      if(fieldColor){
        const chosen = card.querySelector(`input[name="color-${productId}"]:checked`)?.value;
        const img = card.querySelector('img.prod-img');
        const newSrc = getImageForColor(p, chosen) || p.img;
        if(img) img.src = newSrc;
      }
      // actualizar disponibilidad
      updateAvailability(card, p);
    });

    // Botón Agregar -> lee talla/color y valida stock
    document.querySelector('#product-list').addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-add]');
      if(!btn) return;
      const card = btn.closest('.card');
      const sizeChecked = card.querySelector(`input[name="size-${btn.dataset.add}"]:checked`);
      const colorChecked = card.querySelector(`input[name="color-${btn.dataset.add}"]:checked`);
      const variant = { size: sizeChecked?sizeChecked.value:undefined, color: colorChecked?colorChecked.value:undefined };
      addToCart(btn.dataset.add, variant);
    });

    $("#open-cart").addEventListener("click", openDrawer);
    $("#close-cart").addEventListener("click", closeDrawer);
    $("#drawer-overlay").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeDrawer(); });

    document.addEventListener('click', (e)=>{
      const rm = e.target.closest('button[data-remove]'); if(rm){ removeFromCart(rm.dataset.remove); return; }
      const inc = e.target.closest('button[data-inc]'); if(inc){ const it = loadCart().find(i=>i.key === inc.dataset.inc); setQty(inc.dataset.inc, (it?.qty||1) + 1); return; }
      const dec = e.target.closest('button[data-dec]'); if(dec){ const it = loadCart().find(i=>i.key === dec.dataset.dec); setQty(dec.dataset.dec, Math.max(1, (it?.qty||1) - 1)); return; }
      const incS = e.target.closest('button[data-inc-summary]'); if(incS){ const it = loadCart().find(i=>i.key === incS.dataset.incSummary); setQty(incS.dataset.incSummary, (it?.qty||1) + 1); return; }
      const decS = e.target.closest('button[data-dec-summary]'); if(decS){ const it = loadCart().find(i=>i.key === decS.dataset.decSummary); setQty(decS.dataset.decSummary, Math.max(1, (it?.qty||1) - 1)); return; }
    });

    $("#search").addEventListener("input", renderProducts);
    $("#btn-whatsapp").addEventListener("click", goToWhatsApp);
    $("#btn-clear").addEventListener("click", clearCart);
    document.addEventListener('change', (e)=>{ if(e.target.id === 'city') renderCart(); });

    renderProducts();
    updateCount();
  });
