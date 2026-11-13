(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ================= SHOP SETTINGS ================= */
  const SHOP = {
    name: 'Ajota Mart',
    wa: '917742758460',              // WhatsApp number (orders + support)
    waShow: '77427 58460',
    tel: '+918949406824',
    telShow: '89494 06824',
    ig: 'https://www.instagram.com/ajotamartjodhpur',
    addr: 'Badla Road, Bhadwasiya, Jodhpur',
    map: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Ajota Mart, Badla Road, Bhadwasiya, Jodhpur')
  };

  /* Paste your Firebase web-app config here to turn on REAL Google + mobile OTP login.
     Leave null to use demo login (saved on this device only). */
  const FIREBASE_CONFIG = null;
  const REAL = !!FIREBASE_CONFIG;

  /* ================= CATALOG (sample prices: edit!) ================= */
  const CATS = {
    groceries:  { name: 'Groceries',        color: '#fde7b0', subs: ['Oils & Ghee', 'Atta, Rice & Dal', 'Masala & Spices', 'Sugar, Salt & Tea', 'Snacks & Biscuits'] },
    cosmetics:  { name: 'Cosmetics',        color: '#fbd5dc', subs: ['Skin Care', 'Hair Care', 'Bath & Body', 'Makeup', 'Oral Care'] },
    stationery: { name: 'Stationery',       color: '#d6e6fb', subs: ['Notebooks & Paper', 'Pens & Pencils', 'Art & Craft', 'Office Supplies'] },
    home:       { name: 'Home Essentials',  color: '#d9f0dc', subs: ['Cleaning & Laundry', 'Kitchen & Storage', 'Pooja & Daily Needs'] }
  };
  // [category, sub-category index, emoji, name, pack size, price, MRP, deal(1)]
  const RAW = [
    ['groceries',0,'🛢️','Refined Sunflower Oil (Tel)','1 L',139,155,1],
    ['groceries',0,'🛢️','Mustard Oil (Kachi Ghani)','1 L',165,185],
    ['groceries',0,'🛢️','Refined Soyabean Oil','1 L',129,145],
    ['groceries',0,'🧈','Pure Desi Ghee','500 ml',329,365,1],
    ['groceries',0,'🧈','Pure Desi Ghee','1 L',629,699],
    ['groceries',1,'🌾','Wheat Flour (Atta)','5 kg',235,260,1],
    ['groceries',1,'🌾','Wheat Flour (Atta)','10 kg',455,499],
    ['groceries',1,'🍚','Basmati Rice (Chawal)','1 kg',99,120],
    ['groceries',1,'🍚','Everyday Rice (Chawal)','5 kg',279,310],
    ['groceries',1,'🫘','Toor Dal','1 kg',149,170,1],
    ['groceries',1,'🫘','Moong Dal','1 kg',129,145],
    ['groceries',1,'🫘','Chana Dal','1 kg',99,115],
    ['groceries',1,'🌾','Besan (Gram Flour)','500 g',55,65],
    ['groceries',2,'🌶️','Red Chilli Powder (Mirchi)','200 g',75,90,1],
    ['groceries',2,'🟡','Turmeric Powder (Haldi)','200 g',55,65],
    ['groceries',2,'🌿','Coriander Powder (Dhania)','200 g',49,60],
    ['groceries',2,'🥘','Garam Masala','100 g',69,80],
    ['groceries',2,'🌱','Cumin Seeds (Jeera)','100 g',59,70],
    ['groceries',2,'⚫','Black Pepper (Kali Mirch)','50 g',65,75],
    ['groceries',3,'🍬','Sugar (Cheeni)','1 kg',48,55,1],
    ['groceries',3,'🍬','Sugar (Cheeni)','5 kg',235,265],
    ['groceries',3,'🧂','Iodised Salt (Namak)','1 kg',24,28],
    ['groceries',3,'🍵','Tea Leaves (Chai Patti)','250 g',119,135,1],
    ['groceries',3,'☕','Instant Coffee','50 g',135,155],
    ['groceries',3,'🟤','Jaggery (Gud)','1 kg',69,80],
    ['groceries',4,'🍪','Glucose Biscuits','Family pack',30,35],
    ['groceries',4,'🍪','Cream Biscuits','Pack of 3',30,36],
    ['groceries',4,'🥨','Namkeen Mixture','400 g',85,100],
    ['groceries',4,'🍜','Instant Noodles','Pack of 4',56,64],
    ['groceries',4,'🥜','Peanuts (Moongfali)','500 g',79,90],
    ['cosmetics',0,'🧴','Face Wash','100 ml',119,149,1],
    ['cosmetics',0,'🧴','Moisturising Cream','100 g',129,160],
    ['cosmetics',0,'☀️','Sunscreen Lotion','50 ml',199,250],
    ['cosmetics',0,'💧','Body Lotion','200 ml',159,199],
    ['cosmetics',1,'🧴','Shampoo','340 ml',189,235,1],
    ['cosmetics',1,'💆','Coconut Hair Oil','200 ml',89,105],
    ['cosmetics',1,'🧴','Conditioner','180 ml',149,185],
    ['cosmetics',2,'🧼','Bathing Soap (Sabun)','Pack of 4',119,140],
    ['cosmetics',2,'🚿','Body Wash','250 ml',179,225],
    ['cosmetics',2,'🌸','Talcum Powder','200 g',99,120],
    ['cosmetics',3,'💄','Matte Lipstick','1 pc',149,199,1],
    ['cosmetics',3,'👁️','Kajal','1 pc',99,130],
    ['cosmetics',3,'💅','Nail Polish','1 pc',59,80],
    ['cosmetics',4,'🪥','Toothpaste','200 g',99,115],
    ['cosmetics',4,'🪥','Toothbrush','Pack of 3',69,90],
    ['stationery',0,'📓','Ruled Notebook (172 pages)','1 pc',45,55],
    ['stationery',0,'📚','Ruled Notebooks','Pack of 6',249,300,1],
    ['stationery',0,'🗒️','Sticky Notes','1 pad',49,60],
    ['stationery',0,'📄','A4 Paper','500 sheets',299,340],
    ['stationery',1,'🖊️','Ball Pens (Blue)','Pack of 10',49,60],
    ['stationery',1,'✏️','Pencils','Pack of 10',49,60],
    ['stationery',1,'🖍️','Colour Pencils','24 shades',99,125],
    ['stationery',1,'✒️','Gel Pens','Pack of 5',59,75,1],
    ['stationery',2,'🎨','Water Colour Set','12 shades',79,99],
    ['stationery',2,'📏','Geometry Box','1 pc',89,110],
    ['stationery',2,'🧷','Glue Stick','Pack of 2',39,50],
    ['stationery',3,'📎','Stapler with Pins','1 pc',79,99],
    ['stationery',3,'🗂️','Plastic File Folders','Pack of 5',89,110],
    ['stationery',3,'✂️','Scissors','1 pc',39,50],
    ['home',0,'🧺','Detergent Powder','1 kg',99,120,1],
    ['home',0,'🧴','Liquid Detergent','1 L',189,230],
    ['home',0,'🍽️','Dishwash Liquid','500 ml',99,120],
    ['home',0,'🧽','Scrub Pad','Pack of 3',39,50],
    ['home',0,'🚽','Toilet Cleaner','500 ml',89,105],
    ['home',0,'🧹','Floor Cleaner (Phenyl)','1 L',99,120],
    ['home',0,'🧹','Broom (Jhadu)','1 pc',79,99],
    ['home',1,'🥫','Plastic Container Set','Set of 3',149,199,1],
    ['home',1,'🍶','Water Bottle','1 L',99,130],
    ['home',1,'🗑️','Garbage Bags','Pack of 30',89,110],
    ['home',1,'🍱','Lunch Box','1 pc',159,199],
    ['home',2,'🪔','Agarbatti','Pack of 6',49,60],
    ['home',2,'🕯️','Candles','Pack of 10',39,50],
    ['home',2,'🔥','Matchbox','Pack of 10',20,25],
    ['home',2,'🧿','Camphor (Kapoor)','50 g',59,75]
  ];
  const PRODUCTS = RAW.map((r, i) => ({
    id: 'p' + (i + 1), cat: r[0], sub: CATS[r[0]].subs[r[1]], emoji: r[2],
    name: r[3], size: r[4], price: r[5], mrp: r[6], deal: !!r[7]
  }));

  /* ================= HELPERS ================= */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const money = n => '₹' + Number(n).toLocaleString('en-IN');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const byId = id => PRODUCTS.find(p => p.id === id);
  const disc = p => p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
  const waLink = t => 'https://wa.me/' + SHOP.wa + '?text=' + encodeURIComponent(t);

  let cart = store.get('am_cart', {});
  let wish = store.get('am_wish', []);
  let recent = store.get('am_recent', []);
  let user = store.get('am_user', null);
  let curRoute = 'home', pendingNext = '', sliderTimer = null, onCartChange = null;

  const app = $('#app');
  $('#year').textContent = new Date().getFullYear();

  /* ================= UI BITS ================= */
  let tt;
  function toast(m) {
    const t = $('#toast');
    t.textContent = m; t.classList.add('on');
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2200);
  }
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add('show'); io.unobserve(el);
    setTimeout(() => { el.classList.remove('rv', 'show'); el.style.transitionDelay = ''; }, 1400);
  }), { threshold: 0.08 });
  function observeRV() {
    $$('.rv:not([data-o])').forEach(el => {
      el.dataset.o = 1;
      if (el.dataset.d) el.style.transitionDelay = el.dataset.d + 'ms';
      io.observe(el);
    });
  }
  document.addEventListener('error', e => {
    if (e.target && e.target.tagName === 'IMG') e.target.style.display = 'none';
  }, true);

  function setPage(html, title, keepScroll) {
    clearInterval(sliderTimer);
    onCartChange = null;
    app.innerHTML = '<div class="page">' + html + '</div>';
    document.title = (title ? title + ' | ' : '') + 'Ajota Mart Jodhpur';
    if (!keepScroll) window.scrollTo(0, 0);
    observeRV();
  }

  /* ================= CART / WISHLIST ================= */
  const saveCart = () => { store.set('am_cart', cart); updateBadges(); };
  function cartCount() { return Object.keys(cart).reduce((s, k) => s + cart[k], 0); }
  function totals() {
    let sub = 0, mrp = 0, n = 0;
    Object.keys(cart).forEach(id => {
      const p = byId(id); if (!p) return;
      sub += p.price * cart[id]; mrp += Math.max(p.mrp, p.price) * cart[id]; n += cart[id];
    });
    return { sub, mrp, n, savings: mrp - sub, total: sub };
  }
  function updateBadges() {
    ['#cartCount', '#bnCount'].forEach(s => {
      const el = $(s); const n = cartCount();
      el.textContent = n; el.style.display = n ? 'grid' : 'none';
    });
  }
  function bumpBadges() {
    ['#cartCount', '#bnCount'].forEach(s => { const el = $(s); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); });
  }
  function fly(fromEl, emoji) {
    try {
      const target = window.innerWidth <= 860 ? $('#bnCount') : $('#cartCount');
      const a = fromEl.getBoundingClientRect(), b = target.getBoundingClientRect();
      const el = document.createElement('div');
      el.className = 'fly'; el.textContent = emoji;
      el.style.left = a.left + 'px'; el.style.top = a.top + 'px';
      document.body.appendChild(el);
      const anim = el.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: 'translate(' + (b.left - a.left) + 'px,' + (b.top - a.top) + 'px) scale(.3)', opacity: .5 }
      ], { duration: 700, easing: 'cubic-bezier(.5,0,.8,.4)' });
      anim.onfinish = () => el.remove();
    } catch (e) {}
  }
  function addCart(id, qty, btn) {
    const p = byId(id); if (!p) return;
    cart[id] = (cart[id] || 0) + (qty || 1);
    saveCart(); refreshCtrls(); bumpBadges();
    if (btn) fly(btn, p.emoji);
    toast('Added to cart');
    if (onCartChange) onCartChange();
  }
  function setQty(id, q) {
    if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, 99);
    saveCart(); refreshCtrls();
    if (onCartChange) onCartChange();
  }
  function toggleWish(id, btn) {
    const i = wish.indexOf(id);
    if (i > -1) { wish.splice(i, 1); toast('Removed from wishlist'); }
    else { wish.push(id); toast('Saved to wishlist'); }
    store.set('am_wish', wish);
    $$('.heart[data-id="' + id + '"]').forEach(h => h.classList.toggle('on', wish.indexOf(id) > -1));
  }
  const ctrl = id => cart[id]
    ? '<div class="step"><button data-act="dec" data-id="' + id + '" aria-label="Less">−</button><span>' + cart[id] + '</span><button data-act="inc" data-id="' + id + '" aria-label="More">+</button></div>'
    : '<button class="add" data-act="add" data-id="' + id + '">Add</button>';
  function refreshCtrls() { $$('[data-ctrl]').forEach(el => { el.innerHTML = ctrl(el.dataset.ctrl); }); }

  /* ================= RENDER HELPERS ================= */
  const thumb = p => '<div class="pimg" style="--tile:' + CATS[p.cat].color + '"><span>' + p.emoji + '</span><img src="images/' + p.id + '.jpg" alt="' + esc(p.name) + '" loading="lazy" /></div>';
  function pcard(p, i, flat) {
    const d = disc(p);
    return '<article class="pcard' + (flat ? '' : ' rv') + '"' + (flat ? '' : ' data-d="' + ((i % 6) * 60) + '"') + '>' +
      '<button class="heart ' + (wish.indexOf(p.id) > -1 ? 'on' : '') + '" data-act="wish" data-id="' + p.id + '" aria-label="Save">♥</button>' +
      '<a class="pc-link" href="#/p/' + p.id + '">' + (d ? '<span class="off">' + d + '% off</span>' : '') + thumb(p) +
      '<h3>' + esc(p.name) + '</h3><p class="sz">' + esc(p.size) + '</p></a>' +
      '<div class="pc-foot"><div class="pr"><b>' + money(p.price) + '</b>' + (d ? '<s>' + money(p.mrp) + '</s>' : '') + '</div>' +
      '<div data-ctrl="' + p.id + '">' + ctrl(p.id) + '</div></div></article>';
  }
  const row = (title, list, link) => list.length
    ? '<section class="blk rv"><div class="blk-h"><h2>' + title + '</h2>' + (link ? '<a href="' + link + '">See all</a>' : '') + '</div><div class="hrow">' +
      list.slice(0, 14).map(p => pcard(p, 0, true)).join('') + '</div></section>'
    : '';
  const crumb = arr => '<p class="crumb"><a href="#/">Home</a>' + arr.map(a => ' › ' + (a[1] ? '<a href="' + a[1] + '">' + a[0] + '</a>' : a[0])).join('') + '</p>';

  /* ================= PAGES ================= */
  const SLIDES = [
    { c: 's1', e: '🛒🛍️', k: 'Welcome to Ajota Mart', t: "Jodhpur's one-stop Mart!", p: 'Groceries, cosmetics, stationery and home essentials. Everything for your home, in one place.', cta: 'Shop now', href: '#/cat/groceries' },
    { c: 's2', e: '💰✨', k: 'Great offers', t: 'Enjoy great offers on daily needs', p: 'Save on oils, atta, masala, soaps, notebooks and more with our deals.', cta: "See today's deals", href: '#/deals' },
    { c: 's3', e: '🛢️🌶️', k: 'Kitchen staples', t: 'Oil, atta, dal & masala', p: 'Stock up your kitchen with everyday essentials at friendly prices.', cta: 'Shop groceries', href: '#/cat/groceries' },
    { c: 's4', e: '💄📓', k: 'Beauty & school', t: 'Cosmetics, stationery & more', p: 'From face wash to notebooks. Find it all at Ajota Mart.', cta: 'Explore', href: '#/cat/cosmetics' }
  ];

  function catCard(key, i) {
    const c = CATS[key];
    const tiles = c.subs.slice(0, 4).map(s => {
      const p = PRODUCTS.find(x => x.sub === s);
      return '<a href="#/cat/' + key + '?sub=' + encodeURIComponent(s) + '"><div class="cc-t" style="background:' + c.color + '">' + p.emoji + '</div>' + esc(s) + '</a>';
    }).join('');
    return '<div class="catcard rv" data-d="' + (i * 90) + '"><h3>' + c.name + '</h3><div class="cc-g">' + tiles + '</div><a class="more" href="#/cat/' + key + '">Shop all ' + c.name.toLowerCase() + ' ›</a></div>';
  }

  function pageHome() {
    const slides = SLIDES.map((s, i) =>
      '<div class="slide ' + s.c + '" style="--img:url(\'images/slide' + (i + 1) + '.jpg\')"><div class="sl-c"><span class="sl-k">' + s.k + '</span><h2>' + s.t + '</h2><p>' + s.p + '</p><a class="btn" href="' + s.href + '">' + s.cta + '</a></div><div class="sl-e">' + s.e + '</div></div>').join('');
    const staples = PRODUCTS.filter(p => ['Oils & Ghee', 'Atta, Rice & Dal', 'Masala & Spices'].indexOf(p.sub) > -1);
    const rec = recent.map(byId).filter(Boolean);
    setPage(
      '<section class="slider" id="slider"><div class="s-track">' + slides + '</div>' +
      '<button class="s-arr s-prev" aria-label="Previous">‹</button><button class="s-arr s-next" aria-label="Next">›</button><div class="dots"></div></section>' +
      '<div class="wrap"><section class="catgrid">' + Object.keys(CATS).map(catCard).join('') + '</section>' +
      row("Today's Deals", PRODUCTS.filter(p => p.deal), '#/deals') +
      '<section class="promo rv"><div><h2>Order from home, we confirm on WhatsApp</h2><p>Add items to your cart, send your order to the shop on WhatsApp and we will confirm availability, delivery and the final amount.</p></div><a class="btn" href="#/cat/groceries">Start shopping</a></section>' +
      row('Kitchen staples', staples, '#/cat/groceries') +
      row('Recently viewed', rec, '') +
      row('Cosmetics & personal care', PRODUCTS.filter(p => p.cat === 'cosmetics'), '#/cat/cosmetics') +
      row('Stationery for school & office', PRODUCTS.filter(p => p.cat === 'stationery'), '#/cat/stationery') +
      row('Home essentials', PRODUCTS.filter(p => p.cat === 'home'), '#/cat/home') +
      '<section class="why"><div class="rv"><i>🛍️</i><h3>Everything in one place</h3><p>Groceries, cosmetics, stationery and home essentials.</p></div>' +
      '<div class="rv" data-d="100"><i>💰</i><h3>Great offers</h3><p>Deals and savings on everyday items.</p></div>' +
      '<div class="rv" data-d="200"><i>💬</i><h3>Easy ordering</h3><p>Order online and confirm with the shop on WhatsApp.</p></div>' +
      '<div class="rv" data-d="300"><i>📍</i><h3>Visit the store</h3><p>Badla Road, Bhadwasiya, Jodhpur.</p></div></section>' +
      '<section class="visit rv"><div><h2>Visit Ajota Mart</h2><p>📍 ' + SHOP.addr + '</p><p>📞 ' + SHOP.telShow + '</p><p>💬 WhatsApp: ' + SHOP.waShow + '</p>' +
      '<div class="row-b"><a class="btn" href="' + SHOP.map + '" target="_blank" rel="noopener">Get directions</a><a class="btn btn-line" href="' + SHOP.ig + '" target="_blank" rel="noopener">Instagram</a></div></div><div class="visit-art">🏪</div></section></div>',
      ''
    );
    initSlider();
  }

  function initSlider() {
    const s = $('#slider'); if (!s) return;
    const slides = $$('.slide', s), dots = $('.dots', s), track = $('.s-track', s);
    let i = 0, x0 = null;
    dots.innerHTML = slides.map((_, k) => '<button data-k="' + k + '" aria-label="Slide ' + (k + 1) + '"></button>').join('');
    const go = n => {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (i * 100) + '%)';
      $$('button', dots).forEach((b, k) => b.classList.toggle('on', k === i));
    };
    const play = () => { clearInterval(sliderTimer); sliderTimer = setInterval(() => go(i + 1), 5000); };
    go(0); play();
    $('.s-prev', s).addEventListener('click', () => { go(i - 1); play(); });
    $('.s-next', s).addEventListener('click', () => { go(i + 1); play(); });
    dots.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { go(+b.dataset.k); play(); } });
    s.addEventListener('touchstart', e => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    s.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) { go(dx < 0 ? i + 1 : i - 1); play(); }
      x0 = null;
    }, { passive: true });
  }

  function pageListing(title, base, opts) {
    opts = opts || {};
    const subs = opts.subs || [];
    const f = { sub: opts.sub || '', sort: 'rel', min: '', max: '', off: 0 };
    setPage(
      '<div class="wrap">' + crumb(opts.crumb || [[title]]) + '<div class="lhead"><h1>' + esc(title) + '</h1><span id="lcount"></span></div>' +
      '<div class="listing"><aside class="side" id="side">' +
      (subs.length ? '<h4>Category</h4><label><input type="radio" name="sub" value="" ' + (!f.sub ? 'checked' : '') + '> All</label>' +
        subs.map(s => '<label><input type="radio" name="sub" value="' + esc(s) + '" ' + (f.sub === s ? 'checked' : '') + '> ' + esc(s) + '</label>').join('') : '') +
      '<h4>Price (₹)</h4><div class="pr-in"><input id="fMin" type="number" min="0" placeholder="Min" inputmode="numeric"><input id="fMax" type="number" min="0" placeholder="Max" inputmode="numeric"></div>' +
      '<h4>Discount</h4><label><input type="radio" name="off" value="0" checked> Any</label><label><input type="radio" name="off" value="10"> 10% or more</label><label><input type="radio" name="off" value="20"> 20% or more</label></aside>' +
      '<div><div class="lbar"><button class="btn-f" id="fBtn">Filters</button><select id="sortSel" aria-label="Sort"><option value="rel">Featured</option><option value="plh">Price: Low to High</option><option value="phl">Price: High to Low</option><option value="disc">Discount</option><option value="az">Name A to Z</option></select></div><div class="pgrid" id="pgrid"></div></div></div></div>',
      title
    );
    const draw = () => {
      const l = base.filter(p => (!f.sub || p.sub === f.sub) && (f.min === '' || p.price >= +f.min) && (f.max === '' || p.price <= +f.max) && disc(p) >= f.off);
      if (f.sort === 'plh') l.sort((a, b) => a.price - b.price);
      else if (f.sort === 'phl') l.sort((a, b) => b.price - a.price);
      else if (f.sort === 'disc') l.sort((a, b) => disc(b) - disc(a));
      else if (f.sort === 'az') l.sort((a, b) => a.name.localeCompare(b.name));
      $('#lcount').textContent = l.length + (l.length === 1 ? ' item' : ' items');
      $('#pgrid').innerHTML = l.length ? l.map((p, i) => pcard(p, i)).join('') : '<p class="empty">No products match these filters.</p>';
      observeRV();
    };
    const side = $('#side');
    side.addEventListener('change', e => {
      if (e.target.name === 'sub') f.sub = e.target.value;
      if (e.target.name === 'off') f.off = +e.target.value;
      draw();
    });
    side.addEventListener('input', e => {
      if (e.target.id === 'fMin') f.min = e.target.value;
      if (e.target.id === 'fMax') f.max = e.target.value;
      draw();
    });
    $('#sortSel').addEventListener('change', e => { f.sort = e.target.value; draw(); });
    $('#fBtn').addEventListener('click', () => side.classList.toggle('open'));
    draw();
  }

  function pageCat(key, sub) {
    const c = CATS[key];
    if (!c) return pageNotFound();
    pageListing(c.name, PRODUCTS.filter(p => p.cat === key), { subs: c.subs, sub: sub || '', crumb: [[c.name]] });
  }
  function pageDeals() {
    const l = PRODUCTS.filter(p => p.deal || disc(p) >= 15).sort((a, b) => disc(b) - disc(a));
    pageListing("Today's Deals", l, { crumb: [["Today's Deals"]] });
  }
  function searchProducts(q, cat) {
    const t = q.toLowerCase().split(/\s+/).filter(Boolean);
    return PRODUCTS.filter(p => (!cat || p.cat === cat) && t.every(w => (p.name + ' ' + p.sub + ' ' + CATS[p.cat].name + ' ' + p.size).toLowerCase().indexOf(w) > -1));
  }
  function pageSearch(q, cat) {
    pageListing('Results for "' + q + '"', searchProducts(q, cat), { crumb: [['Search']] });
  }

  function pagePDP(id) {
    const p = byId(id); if (!p) return pageNotFound();
    recent = [id].concat(recent.filter(x => x !== id)).slice(0, 10); store.set('am_recent', recent);
    const d = disc(p), c = CATS[p.cat];
    const rel = PRODUCTS.filter(x => x.sub === p.sub && x.id !== id);
    setPage(
      '<div class="wrap">' + crumb([[c.name, '#/cat/' + p.cat], [p.sub, '#/cat/' + p.cat + '?sub=' + encodeURIComponent(p.sub)], [esc(p.name)]]) +
      '<div class="pdp"><div>' + thumb(p) + '</div><div><h1>' + esc(p.name) + ' <small style="font-weight:400;color:var(--muted)">(' + esc(p.size) + ')</small></h1>' +
      '<div class="price-l"><div class="big-p">' + (d ? '<small>-' + d + '%</small>' : '') + money(p.price) + '</div>' +
      (d ? '<p class="sz">M.R.P.: <s>' + money(p.mrp) + '</s> &nbsp; <b style="color:var(--green)">You save ' + money(p.mrp - p.price) + '</b></p>' : '') + '</div>' +
      '<ul><li>Category: ' + esc(p.sub) + '</li><li>Pack size: ' + esc(p.size) + '</li><li>Sold by Ajota Mart, Badla Road, Bhadwasiya, Jodhpur</li><li>Final price and availability are confirmed by the shop on WhatsApp</li></ul></div>' +
      '<aside class="buybox"><div class="big-p">' + money(p.price) + '</div><p class="stock">Available at Ajota Mart</p>' +
      '<div data-ctrl="' + p.id + '">' + ctrl(p.id) + '</div>' +
      '<button class="btn btn-or btn-block" data-act="buy" data-id="' + p.id + '">Buy Now</button>' +
      '<button class="btn btn-line btn-block" data-act="wish" data-id="' + p.id + '">♥ Save for later</button>' +
      '<p class="sold">Sold by: Ajota Mart<br>Pay on delivery or pickup</p></aside></div>' +
      row('More from ' + esc(p.sub), rel, '#/cat/' + p.cat + '?sub=' + encodeURIComponent(p.sub)) + '</div>',
      p.name
    );
  }

  function pageCart(keep) {
    const ids = Object.keys(cart).filter(byId);
    if (!ids.length) {
      setPage('<div class="wrap"><div class="empty-box"><div class="big">🛒</div><h1>Your cart is empty</h1><p>Add groceries, cosmetics, stationery and more.</p><a class="btn" href="#/">Start shopping</a></div></div>', 'Cart', keep);
      return;
    }
    const t = totals();
    setPage(
      '<div class="wrap cartpg"><div class="cart-l"><h1>Shopping Cart</h1>' +
      ids.map(id => {
        const p = byId(id);
        return '<div class="citem"><a href="#/p/' + id + '">' + thumb(p) + '</a><div><a href="#/p/' + id + '"><h3>' + esc(p.name) + '</h3></a><p class="sz">' + esc(p.size) + '</p>' +
          '<div class="pr"><b>' + money(p.price) + '</b>' + (disc(p) ? '<s>' + money(p.mrp) + '</s>' : '') + '</div>' +
          '<div class="ci-a"><div data-ctrl="' + id + '">' + ctrl(id) + '</div><button class="lnk" data-act="del" data-id="' + id + '">Delete</button><button class="lnk" data-act="save" data-id="' + id + '">Save for later</button></div></div>' +
          '<div class="ci-t">' + money(p.price * cart[id]) + '</div></div>';
      }).join('') + '</div>' +
      '<aside class="cart-r"><h3>Order summary</h3>' +
      '<div class="sum-r"><span>Items (' + t.n + ')</span><span>' + money(t.sub) + '</span></div>' +
      (t.savings ? '<div class="sum-r sv"><span>You save</span><span>' + money(t.savings) + '</span></div>' : '') +
      '<div class="sum-r"><span>Delivery</span><span>Confirmed by shop</span></div>' +
      '<div class="sum-r t"><span>Total</span><span>' + money(t.total) + '</span></div>' +
      '<a class="btn btn-or btn-block" href="#/checkout" style="margin-top:14px">Proceed to checkout</a>' +
      '<p class="note">Your order is confirmed when you send it to the shop on WhatsApp at the next step.</p></aside></div>',
      'Cart', keep
    );
    onCartChange = () => pageCart(true);
  }

  /* ----- orders ----- */
  const okey = () => 'am_orders_' + (user ? user.uid : 'guest');
  const getOrders = () => store.get(okey(), []);
  const pkey = () => 'am_prof_' + (user ? user.uid : 'guest');
  function orderMsg(o) {
    const lines = o.items.map((it, i) => (i + 1) + '. ' + it.name + ' (' + it.size + ') x ' + it.qty + ' = ' + money(it.price * it.qty));
    return '*New order - Ajota Mart*\nOrder ID: ' + o.id + '\nName: ' + o.name + '\nMobile: ' + o.phone +
      '\nReceive: ' + o.mode + '\nAddress: ' + o.addr + (o.landmark ? ' (' + o.landmark + ')' : '') +
      '\nPayment: ' + o.pay + '\n\nItems:\n' + lines.join('\n') + '\n\n*Total: ' + money(o.total) + '*';
  }

  function pageCheckout() {
    if (!user) { location.hash = '#/login?next=checkout'; return; }
    const ids = Object.keys(cart).filter(byId);
    if (!ids.length) { location.hash = '#/cart'; return; }
    const t = totals(), prof = store.get(pkey(), {});
    setPage(
      '<div class="wrap cartpg"><form class="cart-l" id="coForm" style="padding:0;background:none"><h1 style="margin:6px 0 12px">Checkout</h1>' +
      '<div class="form"><h2>1. Contact &amp; address</h2>' +
      '<label>Full name</label><input name="name" required value="' + esc(user.name || '') + '">' +
      '<label>Mobile number</label><input name="phone" required inputmode="numeric" maxlength="10" pattern="[0-9]{10}" value="' + esc(user.phone || prof.phone || '') + '" placeholder="10-digit mobile number">' +
      '<label>Address</label><textarea name="addr" rows="3" required placeholder="House no., street, area, Jodhpur">' + esc(prof.addr || '') + '</textarea>' +
      '<label>Landmark (optional)</label><input name="landmark"></div>' +
      '<div class="form"><h2>2. How do you want to receive?</h2>' +
      '<label class="opt"><input type="radio" name="mode" value="Home delivery" checked><div><b>Home delivery</b><small>Delivery area and charges are confirmed by the shop on WhatsApp</small></div></label>' +
      '<label class="opt"><input type="radio" name="mode" value="Store pickup"><div><b>Store pickup</b><small>Pick up from Badla Road, Bhadwasiya, Jodhpur</small></div></label></div>' +
      '<div class="form"><h2>3. Payment</h2>' +
      '<label class="opt"><input type="radio" name="pay" value="Pay on delivery / pickup" checked><div><b>Pay on delivery / pickup</b><small>Pay when you receive your order</small></div></label>' +
      '<label class="opt"><input type="radio" name="pay" value="UPI (details on WhatsApp)"><div><b>UPI</b><small>The shop shares payment details on WhatsApp</small></div></label></div>' +
      '<button class="btn btn-or btn-block" type="submit">Place order &amp; send on WhatsApp</button>' +
      '<p class="note">This opens WhatsApp with your order ready to send to Ajota Mart. Your order is confirmed once you send the message.</p></form>' +
      '<aside class="cart-r"><h3>Order summary</h3>' +
      ids.map(id => { const p = byId(id); return '<div class="o-i"><span>' + esc(p.name) + ' × ' + cart[id] + '</span><span>' + money(p.price * cart[id]) + '</span></div>'; }).join('') +
      '<div class="sum-r t"><span>Total</span><span>' + money(t.total) + '</span></div></aside></div>',
      'Checkout'
    );
    $('#coForm').addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(e.target), tt2 = totals();
      const order = {
        id: 'AM' + Date.now().toString().slice(-8), date: new Date().toISOString(),
        items: Object.keys(cart).filter(byId).map(id => { const p = byId(id); return { id, name: p.name, size: p.size, price: p.price, qty: cart[id] }; }),
        total: tt2.total, name: d.get('name').trim(), phone: d.get('phone').trim(), addr: d.get('addr').trim(),
        landmark: (d.get('landmark') || '').trim(), mode: d.get('mode'), pay: d.get('pay'), status: 'Sent to shop on WhatsApp'
      };
      const list = getOrders(); list.unshift(order); store.set(okey(), list);
      store.set(pkey(), Object.assign({}, prof, { addr: order.addr, phone: order.phone }));
      cart = {}; saveCart();
      window.open(waLink(orderMsg(order)), '_blank');
      location.hash = '#/order/' + order.id;
    });
  }

  function orderHTML(o, full) {
    return '<div class="order"><div class="o-h"><div>ORDER PLACED<b>' + new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + '</b></div><div>TOTAL<b>' + money(o.total) + '</b></div><div>ORDER ID<b>' + o.id + '</b></div><div><span class="status">' + esc(o.status) + '</span></div></div>' +
      o.items.map(it => '<div class="o-i"><span>' + esc(it.name) + ' (' + esc(it.size) + ') × ' + it.qty + '</span><span>' + money(it.price * it.qty) + '</span></div>').join('') +
      (full ? '<p class="note">' + esc(o.mode) + ' · ' + esc(o.pay) + '<br>' + esc(o.name) + ', ' + esc(o.phone) + '<br>' + esc(o.addr) + '</p>' : '') +
      '<div class="o-a"><button class="btn btn-sm" data-act="reorder" data-id="' + o.id + '">Order again</button><a class="btn btn-sm btn-line" target="_blank" rel="noopener" href="' + waLink(orderMsg(o)) + '">Send on WhatsApp again</a></div></div>';
  }
  function pageOrders() {
    if (!user) { location.hash = '#/login?next=orders'; return; }
    const l = getOrders();
    setPage('<div class="wrap">' + crumb([['Your Orders']]) + '<h1 style="margin:6px 0 14px">Your Orders</h1>' +
      (l.length ? l.map(o => orderHTML(o, false)).join('') : '<div class="empty-box"><div class="big">📦</div><h1>No orders yet</h1><p>Your orders will show here.</p><a class="btn" href="#/">Start shopping</a></div>') + '</div>', 'Your Orders');
  }
  function pageOrder(id) {
    if (!user) { location.hash = '#/login'; return; }
    const o = getOrders().find(x => x.id === id);
    if (!o) return pageNotFound();
    setPage('<div class="wrap"><div class="success"><div class="big">🎉</div><h1>Almost done!</h1><p>Send your order to Ajota Mart on WhatsApp so the shop can confirm it. If WhatsApp did not open, tap the button below.</p>' +
      '<a class="btn btn-or" target="_blank" rel="noopener" href="' + waLink(orderMsg(o)) + '">Send order on WhatsApp</a></div>' + orderHTML(o, true) + '</div>', 'Order ' + id);
  }

  function pageWish() {
    const l = wish.map(byId).filter(Boolean);
    setPage('<div class="wrap">' + crumb([['Wishlist']]) + '<h1 style="margin:6px 0 14px">Your Wishlist</h1>' +
      (l.length ? '<div class="pgrid">' + l.map((p, i) => pcard(p, i)).join('') + '</div>' : '<div class="empty-box"><div class="big">♥</div><h1>Nothing saved yet</h1><p>Tap the ♥ on any product to save it.</p><a class="btn" href="#/">Browse products</a></div>') + '</div>', 'Wishlist');
  }

  function pageSupport() {
    setPage('<div class="wrap">' + crumb([['Customer Support']]) + '<h1 style="margin:6px 0 4px">Customer Support</h1><p class="sz">We are happy to help with your order.</p>' +
      '<div class="sup-grid"><div class="sup rv"><i>📞</i><h3>Call us</h3><p>' + SHOP.telShow + '</p><a class="btn btn-sm" href="tel:' + SHOP.tel + '">Call now</a></div>' +
      '<div class="sup rv" data-d="100"><i>💬</i><h3>WhatsApp</h3><p>' + SHOP.waShow + '</p><a class="btn btn-sm" target="_blank" rel="noopener" href="' + waLink('Hello Ajota Mart, I need help.') + '">Chat on WhatsApp</a></div>' +
      '<div class="sup rv" data-d="200"><i>📸</i><h3>Instagram</h3><p>@ajotamartjodhpur</p><a class="btn btn-sm" target="_blank" rel="noopener" href="' + SHOP.ig + '">Follow us</a></div>' +
      '<div class="sup rv" data-d="300"><i>📍</i><h3>Visit the store</h3><p>' + SHOP.addr + '</p><a class="btn btn-sm" target="_blank" rel="noopener" href="' + SHOP.map + '">Get directions</a></div></div>' +
      '<div class="form"><h2>Send us a message</h2><form id="supForm"><label>Your name</label><input name="name" required value="' + esc(user ? user.name : '') + '"><label>How can we help?</label><textarea name="msg" rows="3" required></textarea><button class="btn btn-block" style="margin-top:14px">Send on WhatsApp</button></form></div>' +
      '<h2 style="margin:20px 0 10px">Frequently asked questions</h2>' +
      '<details><summary>How do I place an order?</summary><p>Add items to your cart, sign in, fill in your address at checkout and send the order to us on WhatsApp. The shop confirms your order there.</p></details>' +
      '<details><summary>Do you deliver?</summary><p>Choose home delivery or store pickup at checkout. The shop confirms the delivery area and charges with you on WhatsApp.</p></details>' +
      '<details><summary>How can I pay?</summary><p>You can pay on delivery or pickup. For UPI, the shop shares payment details on WhatsApp.</p></details>' +
      '<details><summary>Are the prices final?</summary><p>Prices and availability can change. The shop confirms the final amount with you on WhatsApp.</p></details></div>', 'Customer Support');
    $('#supForm').addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(e.target);
      window.open(waLink('Hello Ajota Mart, I am ' + d.get('name') + '. ' + d.get('msg')), '_blank');
    });
  }

  function pageNotFound() {
    setPage('<div class="wrap"><div class="empty-box"><div class="big">🔎</div><h1>Page not found</h1><p>We could not find what you were looking for.</p><a class="btn" href="#/">Go to home</a></div></div>', 'Not found');
  }

  /* ================= ACCOUNT / AUTH ================= */
  let FB = null, recaptcha = null, confirmation = null;
  function updateAccountUI() {
    $('#acctSmall').textContent = user ? 'Hello, ' + esc((user.name || 'Customer').split(' ')[0]) : 'Hello, sign in';
  }
  function setUser(u) {
    user = u; store.set('am_user', u); updateAccountUI();
    if (curRoute === 'login') {
      toast('Welcome, ' + (u.name || 'Customer').split(' ')[0]);
      location.hash = pendingNext ? '#/' + pendingNext : '#/account';
    }
  }
  function logout() {
    if (FB) { try { FB.signOut(); } catch (e) {} }
    user = null; store.set('am_user', null); updateAccountUI();
    toast('You have been signed out'); location.hash = '#/';
  }
  function loginLocal(o) {
    const users = store.get('am_users', []);
    let u = users.find(x => (o.phone && x.phone === o.phone) || (o.email && x.email === o.email));
    if (!u) {
      if (!o.name) { toast('Please enter your name to create an account'); return; }
      u = { uid: 'l' + Date.now(), name: o.name, phone: o.phone || '', email: o.email || '' };
      users.push(u); store.set('am_users', users);
    }
    setUser(u);
  }

  function pageLogin(next) {
    if (user) { location.hash = '#/account'; return; }
    pendingNext = next || '';
    setPage('<div class="auth"><div class="auth-card"><svg class="logo-svg big" viewBox="0 0 64 64"><use href="#logo"/></svg><h1>Sign in or create account</h1><p class="sub">Use your mobile number or Gmail.</p>' +
      (REAL ? '' : '<div class="demo"><b>Demo mode:</b> accounts are saved only on this device and are not verified. Add your Firebase keys in script.js for real Google and OTP login.</div>') +
      '<div class="tabs"><button class="tab on" data-t="phone">Mobile number</button><button class="tab" data-t="gmail">Gmail</button></div><div id="authBody"></div><div id="recaptcha"></div></div></div>', 'Sign in');
    const body = $('#authBody');
    const showPhone = () => {
      body.innerHTML = '<form id="fPhone"><label>Your name <small>(for new accounts)</small></label><input name="name" placeholder="Full name" autocomplete="name">' +
        '<label>Mobile number</label><div class="phone-in"><span>+91</span><input name="phone" inputmode="numeric" maxlength="10" pattern="[0-9]{10}" placeholder="10-digit mobile number" required></div>' +
        '<button class="btn btn-block" type="submit">' + (REAL ? 'Send OTP' : 'Continue') + '</button></form>';
      $('#fPhone').addEventListener('submit', async e => {
        e.preventDefault();
        const d = new FormData(e.target), phone = d.get('phone').trim(), name = (d.get('name') || '').trim();
        if (!REAL) return loginLocal({ phone, name });
        if (!FB) { toast('Login service is loading, please try again'); return; }
        try {
          if (!recaptcha) recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', { size: 'invisible' });
          confirmation = await FB.signInWithPhoneNumber('+91' + phone, recaptcha);
          body.innerHTML = '<form id="fOtp"><p class="sub">Enter the OTP sent to +91 ' + esc(phone) + '</p><input name="otp" inputmode="numeric" maxlength="6" placeholder="6-digit OTP" required><button class="btn btn-block" type="submit">Verify &amp; continue</button></form>';
          $('#fOtp').addEventListener('submit', async ev => {
            ev.preventDefault();
            try {
              const cred = await confirmation.confirm(ev.target.otp.value.trim());
              if (name && cred.user) store.set('am_name_' + cred.user.uid, name);
              syncFirebaseUser(cred.user);
            } catch (err) { toast('Wrong OTP, please try again'); }
          });
        } catch (err) {
          toast('Could not send OTP. Check the number and try again.');
          try { recaptcha && recaptcha.clear(); } catch (x) {}
          recaptcha = null;
        }
      });
    };
    const showGmail = () => {
      if (REAL) {
        body.innerHTML = '<button class="gbtn" id="gBtn" type="button"><b style="color:#4285f4;font-size:1.2rem">G</b> Continue with Google</button>';
        $('#gBtn').addEventListener('click', async () => {
          if (!FB) { toast('Login service is loading, please try again'); return; }
          try { const r = await FB.signInWithPopup(new firebase.auth.GoogleAuthProvider()); syncFirebaseUser(r.user); }
          catch (err) { toast('Google sign-in was cancelled or failed'); }
        });
      } else {
        body.innerHTML = '<form id="fGmail"><label>Your name <small>(for new accounts)</small></label><input name="name" placeholder="Full name" autocomplete="name"><label>Gmail address</label><input name="email" type="email" placeholder="yourname@gmail.com" required><button class="btn btn-block" type="submit">Continue</button></form>';
        $('#fGmail').addEventListener('submit', e => {
          e.preventDefault();
          const d = new FormData(e.target), email = d.get('email').trim().toLowerCase();
          if (!/@gmail\.com$/.test(email)) { toast('Please enter a Gmail address'); return; }
          loginLocal({ email, name: (d.get('name') || '').trim() });
        });
      }
    };
    showPhone();
    $$('.tab').forEach(b => b.addEventListener('click', () => {
      $$('.tab').forEach(x => x.classList.toggle('on', x === b));
      b.dataset.t === 'phone' ? showPhone() : showGmail();
    }));
  }

  function pageAccount() {
    if (!user) { location.hash = '#/login?next=account'; return; }
    const prof = store.get(pkey(), {});
    setPage('<div class="wrap">' + crumb([['Your Account']]) + '<h1 style="margin:6px 0 14px">Your Account</h1>' +
      '<div class="acct-grid"><a href="#/orders"><i>📦</i><b>Your Orders</b><span>Track and order again</span></a><a href="#/wishlist"><i>♥</i><b>Wishlist</b><span>Your saved items</span></a><a href="#/support"><i>💬</i><b>Customer Support</b><span>Call or WhatsApp us</span></a></div>' +
      '<form class="form" id="profForm"><h2>Profile</h2><label>Name</label><input name="name" required value="' + esc(user.name) + '">' +
      '<label>Mobile number</label><input name="phone" inputmode="numeric" maxlength="10" value="' + esc(user.phone || prof.phone || '') + '">' +
      '<label>Email</label><input value="' + esc(user.email || '') + '" disabled><label>Default delivery address</label><textarea name="addr" rows="3">' + esc(prof.addr || '') + '</textarea>' +
      '<button class="btn" style="margin-top:14px" type="submit">Save changes</button></form>' +
      '<button class="btn btn-line" id="logoutBtn">Sign out</button></div>', 'Your Account');
    $('#profForm').addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(e.target);
      user.name = d.get('name').trim() || user.name; user.phone = d.get('phone').trim();
      store.set('am_user', user); store.set(pkey(), { addr: d.get('addr').trim(), phone: user.phone });
      const users = store.get('am_users', []); const u = users.find(x => x.uid === user.uid);
      if (u) { u.name = user.name; u.phone = user.phone; store.set('am_users', users); }
      updateAccountUI(); toast('Profile saved');
    });
    $('#logoutBtn').addEventListener('click', logout);
  }

  /* ----- Firebase (only if FIREBASE_CONFIG is set) ----- */
  function syncFirebaseUser(u) {
    if (!u) return;
    setUser({ uid: u.uid, name: u.displayName || store.get('am_name_' + u.uid, '') || 'Customer', phone: (u.phoneNumber || '').replace('+91', ''), email: u.email || '' });
  }
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }
  if (REAL) {
    loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js')
      .then(() => loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js'))
      .then(() => {
        firebase.initializeApp(FIREBASE_CONFIG);
        FB = firebase.auth();
        FB.onAuthStateChanged(u => {
          if (u) syncFirebaseUser(u);
          else if (user && user.uid && user.uid.charAt(0) !== 'l') { user = null; store.set('am_user', null); updateAccountUI(); }
        });
      })
      .catch(() => toast('Could not load the login service'));
  }

  /* ================= SEARCH ================= */
  const q = $('#q'), sugg = $('#sugg');
  q.addEventListener('input', () => {
    const v = q.value.trim();
    if (!v) { sugg.classList.remove('on'); return; }
    const res = searchProducts(v, $('#searchCat').value).slice(0, 6);
    sugg.innerHTML = res.length
      ? res.map(p => '<a href="#/p/' + p.id + '"><span>' + p.emoji + '</span>' + esc(p.name) + ' <small>' + esc(p.size) + '</small></a>').join('')
      : '<a href="#/search?q=' + encodeURIComponent(v) + '">Search for "' + esc(v) + '"</a>';
    sugg.classList.add('on');
  });
  $('#searchForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = q.value.trim(); if (!v) return;
    sugg.classList.remove('on');
    location.hash = '#/search?q=' + encodeURIComponent(v) + ($('#searchCat').value ? '&cat=' + $('#searchCat').value : '');
  });
  document.addEventListener('click', e => { if (!e.target.closest('.search')) sugg.classList.remove('on'); });
  sugg.addEventListener('click', () => { sugg.classList.remove('on'); });

  /* ================= DRAWER ================= */
  const ov = $('#ov'), cd = $('#cdrawer');
  cd.innerHTML = '<div class="cd-h"><span>Shop by category</span><button id="cdClose" aria-label="Close">×</button></div>' +
    Object.keys(CATS).map(k => '<div class="cd-c"><a href="#/cat/' + k + '">' + CATS[k].name + '</a>' +
      CATS[k].subs.map(s => '<a class="sub" href="#/cat/' + k + '?sub=' + encodeURIComponent(s) + '">' + esc(s) + '</a>').join('') + '</div>').join('') +
    '<div class="cd-c"><a href="#/deals">⚡ Today\'s Deals</a><a href="#/support">Customer Support</a></div>';
  const openDrawer = () => { cd.classList.add('on'); ov.classList.add('on'); };
  const closeDrawer = () => { cd.classList.remove('on'); ov.classList.remove('on'); };
  $('#menuBtn').addEventListener('click', openDrawer);
  $('#bnCats').addEventListener('click', openDrawer);
  $('#cdClose').addEventListener('click', closeDrawer);
  ov.addEventListener('click', closeDrawer);
  cd.addEventListener('click', e => { if (e.target.closest('a')) closeDrawer(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  /* ================= CLICK ACTIONS ================= */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-act]'); if (!a) return;
    const act = a.dataset.act, id = a.dataset.id;
    if (act === 'add') addCart(id, 1, a);
    else if (act === 'inc') setQty(id, (cart[id] || 0) + 1);
    else if (act === 'dec') setQty(id, (cart[id] || 0) - 1);
    else if (act === 'del') { setQty(id, 0); toast('Removed from cart'); }
    else if (act === 'wish') toggleWish(id, a);
    else if (act === 'save') { if (wish.indexOf(id) < 0) { wish.push(id); store.set('am_wish', wish); } setQty(id, 0); toast('Saved for later'); }
    else if (act === 'buy') { if (!cart[id]) { cart[id] = 1; saveCart(); } location.hash = '#/checkout'; }
    else if (act === 'reorder') {
      const o = getOrders().find(x => x.id === id);
      if (o) { o.items.forEach(it => { if (byId(it.id)) cart[it.id] = (cart[it.id] || 0) + it.qty; }); saveCart(); toast('Items added to cart'); location.hash = '#/cart'; }
    }
  });

  /* ================= ROUTER ================= */
  function parse() {
    const raw = location.hash.slice(1) || '/';
    const sp = raw.split('?');
    return { parts: sp[0].split('/').filter(Boolean), params: new URLSearchParams(sp[1] || '') };
  }
  function setActive(r, arg) {
    $$('#subnav a').forEach(a => a.classList.toggle('on', a.dataset.n === (r === 'cat' ? arg : r)));
    const map = { home: 'home', deals: 'deals', cart: 'cart', checkout: 'cart', account: 'account', login: 'account', orders: 'account' };
    $$('#bn [data-b]').forEach(b => b.classList.toggle('on', b.dataset.b === map[r]));
  }
  function router() {
    const { parts, params } = parse();
    const r = parts[0] || 'home';
    curRoute = r;
    closeDrawer();
    if (r !== 'login') { try { recaptcha && recaptcha.clear(); } catch (e) {} recaptcha = null; }
    switch (r) {
      case 'home': pageHome(); break;
      case 'cat': pageCat(parts[1], params.get('sub')); break;
      case 'search': pageSearch(params.get('q') || '', params.get('cat') || ''); break;
      case 'deals': pageDeals(); break;
      case 'p': pagePDP(parts[1]); break;
      case 'cart': pageCart(); break;
      case 'checkout': pageCheckout(); break;
      case 'orders': pageOrders(); break;
      case 'order': pageOrder(parts[1]); break;
      case 'wishlist': pageWish(); break;
      case 'account': pageAccount(); break;
      case 'login': pageLogin(params.get('next')); break;
      case 'support': pageSupport(); break;
      default: pageNotFound();
    }
    setActive(r, parts[1]);
  }
  window.addEventListener('hashchange', router);

  /* ================= SCROLL PROGRESS ================= */
  let tick = false;
  window.addEventListener('scroll', () => {
    if (tick) return; tick = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      $('#progress').style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
      tick = false;
    });
  }, { passive: true });
  $('#toTop').addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ================= START ================= */
  updateBadges();
  updateAccountUI();
  router();
})();