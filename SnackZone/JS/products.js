const PRODUCTS = [
  { id:1,  name:'Snack Khoai Tây Phô Mai',    emoji:'🧀', img:'../img/snack khoai tay pho mai.jpg',   price:25000, oldPrice:32000,  desc:'Giòn tan, thơm phức. Ăn là nghiền!',              badge:'hot',  cat:'snack', brand:'oishi',    tags:['giòn','mặn'] },
  { id:2,  name:'Trà Chanh Leo Tươi',          emoji:'🍋', img:'../img/trà chanh leo tươi.jpg',         price:35000, oldPrice:null,   desc:'Chua ngọt thanh mát, giải nhiệt ngay.',           badge:'new',  cat:'drink', brand:'homemade', tags:['mát','chua'] },
  { id:3,  name:'Kẹo Dẻo Gấu',                emoji:'🐻', img:'../img/kẹo dẻo gấu.jpg',               price:20000, oldPrice:25000,  desc:'Mềm dẻo, đủ vị trái cây ngon xỉu.',              badge:'hot',  cat:'candy', brand:'haribo',   tags:['ngọt','dẻo'] },
  { id:4,  name:'Bánh Tráng Trộn Sa Tế',      emoji:'🌶️', img:'../img/banh trang tron sa te.jpg',      price:30000, oldPrice:null,   desc:'Cay thơm sa tế, ăn không thể dừng.',              badge:'hot',  cat:'snack', brand:'homemade', tags:['cay','bánh tráng'] },
  { id:5,  name:'Bánh Su Kem Matcha',          emoji:'🍵', img:'../img/bánh su kem matcha.jpg',         price:15000, oldPrice:null,   desc:'Vỏ giòn nhân kem matcha thật thơm.',              badge:'new',  cat:'candy', brand:'homemade', tags:['matcha','kem'] },
  { id:6,  name:'Trà Sữa',                     emoji:'🧋', img:'../img/tra sữa.jpg',                    price:45000, oldPrice:50000,  desc:'Trân châu đen, trà sữa thơm ngon.',               badge:'new',  cat:'drink', brand:'bobatea',  tags:['trà sữa','ngọt'] },
  { id:7,  name:'Snack Tôm Cay Nồng',          emoji:'🦐', img:'../img/snack tom cay nòng.jpg',         price:22000, oldPrice:28000,  desc:'Cay thơm mùi tôm, ăn cùng bạn bè thật đã.',      badge:'hot',  cat:'snack', brand:'oishi',    tags:['tôm','cay'] },
  { id:8,  name:'Snack Trong Biển',            emoji:'🌊', img:'../img/snack trong biển.jpg',           price:28000, oldPrice:35000,  desc:'Nhập khẩu Nhật, vị umami đặc biệt.',              badge:null,   cat:'snack', brand:'japan',    tags:['nhập khẩu','umami'] },
  { id:9,  name:'Nước Ép Dưa Hấu Tươi',       emoji:'🍉', img:'../img/Nuoc-ep-Dua-Hau-Tuoi.png',      price:30000, oldPrice:null,   desc:'Mát lạnh tự nhiên, 100% dưa hấu tươi.',           badge:'new',  cat:'drink', brand:'homemade', tags:['nước ép','mát'] },
  { id:10, name:'Kẹo Chanh Muối',              emoji:'🍬', img:'../img/kẹo chanh muối.jpg',             price:10000, oldPrice:12000,  desc:'Vị chua muối đặc trưng, giải khát ngay.',         badge:null,   cat:'candy', brand:'local',    tags:['chua','muối'] },
  { id:11, name:'Kẹo Milo',                    emoji:'🍫', img:'../img/kẹo milo.jpg',                   price:15000, oldPrice:18000,  desc:'Vị socola sữa Milo thơm ngon quen thuộc.',        badge:null,   cat:'candy', brand:'local',    tags:['socola','sữa'] },
  { id:12, name:'Chocolate',                   emoji:'🍫', img:'../img/chocolate.png',                  price:35000, oldPrice:42000,  desc:'Socola đắng ngọt tan chảy trong miệng.',          badge:'new',  cat:'candy', brand:'local',    tags:['socola','ngọt'] },
  { id:13, name:'Kẹp Play More',               emoji:'🍘', img:'../img/kẹp play more.png',              price:12000, oldPrice:null,   desc:'Bánh kẹp thơm giòn, nhân kem đủ vị.',            badge:null,   cat:'candy', brand:'local',    tags:['bánh kẹp','giòn'] },
  { id:14, name:'Nem Tôm Snack',               emoji:'🍤', img:'../img/nem tom snack.jpg',              price:20000, oldPrice:25000,  desc:'Nem tôm giòn, vị đậm đà khó cưỡng.',             badge:'hot',  cat:'snack', brand:'local',    tags:['nem','tôm'] },
  { id:15, name:'Nem Chua Rán',                emoji:'🌮', img:'../img/nem-chua-ran.jpg',               price:25000, oldPrice:null,   desc:'Nem chua rán nóng hổi, chấm tương ớt ngon bá.',   badge:'hot',  cat:'snack', brand:'homemade', tags:['nem chua','rán'] },
  { id:16, name:'Cơm Cháy',                    emoji:'🍚', img:'../img/cơm cháy.jpg',                   price:20000, oldPrice:25000,  desc:'Cơm cháy giòn rụm, vị mặn ngọt hài hòa.',        badge:null,   cat:'snack', brand:'homemade', tags:['cơm cháy','giòn'] },
  { id:17, name:'Hạt Sấy Khô Mix',             emoji:'🥜', img:'../img/hạt sấy khô mix.jpg',            price:45000, oldPrice:55000,  desc:'Hỗn hợp hạt sấy khô bổ dưỡng, ăn vặt lành mạnh.',badge:null,   cat:'snack', brand:'local',    tags:['hạt','sấy khô'] },
  { id:18, name:'Khô Gà',                      emoji:'🍗', img:'../img/khô gà.jpg',                     price:35000, oldPrice:40000,  desc:'Khô gà xé sợi, vị cay ngọt đậm đà.',             badge:'hot',  cat:'snack', brand:'homemade', tags:['khô gà','cay'] },
  { id:19, name:'Mì Cay 7 Cấp Độ',            emoji:'🍜', img:'../img/mì cay 7 cấp độ.jpg',            price:30000, oldPrice:null,   desc:'Thử thách 7 cấp độ cay — bạn dám không?',         badge:'hot',  cat:'snack', brand:'korea',    tags:['mì cay','thử thách'] },
  { id:20, name:'Cay Cay',                     emoji:'🌶️', img:'../img/cay cay.jpg',                    price:18000, oldPrice:22000,  desc:'Snack cay đặc biệt, nghiện từ miếng đầu tiên.',   badge:'hot',  cat:'snack', brand:'local',    tags:['cay','snack'] },
  { id:21, name:'Tôm Cay Oishi',               emoji:'🦐', img:'../img/tôm cay oishi.jpg',              price:15000, oldPrice:18000,  desc:'Tôm cay Oishi giòn rụm, vị quen thuộc.',          badge:null,   cat:'snack', brand:'oishi',    tags:['tôm','oishi'] },
  { id:22, name:'Tăm Cay ĐNE',                emoji:'🌶️', img:'../img/tăm-cay đne.jpg',                price:20000, oldPrice:null,   desc:'Tăm cay ĐNE — đặc sản miền Trung cực đỉnh.',     badge:'new',  cat:'snack', brand:'local',    tags:['tăm cay','miền trung'] },
  { id:23, name:'Bánh Bò Quẩy',               emoji:'🥐', img:'../img/bánh bò quẩy.jpg',               price:15000, oldPrice:null,   desc:'Bánh bò quẩy xốp mềm, ăn chơi ăn thật đều ngon.',badge:'new',  cat:'candy', brand:'homemade', tags:['bánh bò','quẩy'] },
  { id:24, name:'Bento Đen',                   emoji:'🍱', img:'../img/bento den.jpg',                  price:55000, oldPrice:65000,  desc:'Set bento tối đa dinh dưỡng, ăn no ăn vui.',      badge:null,   cat:'combo', brand:'snackboom',tags:['bento','combo'] },
  { id:25, name:'Hổ Kaka',                     emoji:'🐯', img:'../img/hổ kaka.jpg',                    price:12000, oldPrice:15000,  desc:'Bánh hổ Kaka ngọt thơm, tuổi thơ ùa về.',         badge:null,   cat:'candy', brand:'local',    tags:['bánh','ngọt'] },
  { id:26, name:'Matcha',                      emoji:'🍵', img:'../img/matcha.jpg',                     price:40000, oldPrice:45000,  desc:'Matcha Nhật nguyên chất, pha lạnh siêu ngon.',     badge:'new',  cat:'drink', brand:'japan',    tags:['matcha','nhật'] },
  { id:27, name:'Sting Vàng',                  emoji:'⚡', img:'../img/sting vàng.jpg',                 price:12000, oldPrice:null,   desc:'Nước tăng lực Sting vàng, bùng sức mạnh ngay.',   badge:null,   cat:'drink', brand:'local',    tags:['tăng lực','sting'] },
  { id:28, name:'Pizza',                       emoji:'🍕', img:'../img/pizza.jpg',                      price:65000, oldPrice:80000,  desc:'Pizza mini thơm phức, đế giòn nhân đầy ắp.',      badge:'sale', cat:'combo', brand:'snackboom',tags:['pizza','combo'] },
  { id:29, name:'Rượu Uống Cùng Đồ Ăn',       emoji:'🍶', img:'../img/rượu uống cùng đồ ăn.jpg',       price:85000, oldPrice:100000, desc:'Rượu nhẹ nhàng, uống cùng đồ nhậu thật tuyệt.',   badge:null,   cat:'drink', brand:'local',    tags:['rượu','nhậu'] },
  { id:30, name:'Xiên Bẩn',                    emoji:'🍢', img:'../img/xiên bẩn.png',                   price:20000, oldPrice:null,   desc:'Xiên que đủ vị, sốt đặc biệt của riêng SnackBoom.',badge:'hot',  cat:'snack', brand:'homemade', tags:['xiên','sốt'] },
];

const ProductFilter = (() => {
  let filtered = [...PRODUCTS];
  let currentPage = 1;
  const ITEMS_PER_PAGE = 8;

  const getFilters = () => ({
    cat:    document.getElementById('filterCat')?.value    || 'all',
    brand:  document.getElementById('filterBrand')?.value  || 'all',
    sort:   document.getElementById('filterSort')?.value   || 'default',
    search: (document.getElementById('filterSearch')?.value || '').toLowerCase().trim(),
  });

  const apply = () => {
    const { cat, brand, sort, search } = getFilters();
    filtered = PRODUCTS.filter(p => {
      const matchCat    = cat   === 'all' || p.cat   === cat;
      const matchBrand  = brand === 'all' || p.brand === brand;
      const matchSearch = !search ||
        p.name.toLowerCase().includes(search) ||
        p.desc.toLowerCase().includes(search) ||
        p.tags.some(t => t.includes(search));
      return matchCat && matchBrand && matchSearch;
    });
    if (sort === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'name-asc')   filtered.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    if (sort === 'newest')     filtered.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    currentPage = 1;
    renderGrid();
    updateCount();
  };

  const getTotalPages = () => Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const goToPage = (page) => {
    const total = getTotalPages();
    if (page < 1 || page > total) return;
    currentPage = page;
    renderGrid();
    const grid = document.getElementById('productsGrid');
    if (grid) window.scrollTo({ top: grid.offsetTop - 140, behavior: 'smooth' });
  };

  const renderGrid = () => {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:70px 0;color:var(--gray-text)">
          <div style="font-size:3.5rem;margin-bottom:14px">🔍</div>
          <div style="font-weight:800;font-size:1.05rem">Không tìm thấy sản phẩm phù hợp</div>
          <div style="margin-top:7px;font-size:0.86rem">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</div>
        </div>`;
      renderPagination();
      return;
    }
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    grid.innerHTML = filtered.slice(start, start + ITEMS_PER_PAGE).map(p => renderCard(p)).join('');
    renderPagination();
  };

  const renderPagination = () => {
    const wrap = document.getElementById('paginationWrap');
    if (!wrap) return;
    const total = getTotalPages();
    if (total <= 1) { wrap.innerHTML = ''; return; }

    let html = `<button class="page-btn" onclick="ProductFilter.goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹</button>`;
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= currentPage - 1 && i <= currentPage + 1)) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="ProductFilter.goToPage(${i})">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        html += `<span style="padding:0 5px;align-self:center;color:var(--gray-text)">…</span>`;
      }
    }
    html += `<button class="page-btn" onclick="ProductFilter.goToPage(${currentPage + 1})" ${currentPage === total ? 'disabled' : ''}>›</button>`;
    wrap.innerHTML = html;
  };

  const renderCard = (p) => {
    const badgeMap   = { hot:'badge--hot', new:'badge--new', sale:'badge--sale' };
    const badgeLabel = { hot:'🔥 HOT', new:'✨ MỚI', sale:'💥 SALE' };
    const favIcon = UI.isFav(p.id) ? '❤️' : '🤍';
    return `
    <div class="prod-card" data-reveal>
      <div class="prod-card__img-wrap">
        <img class="prod-card__img" src="${p.img}" alt="${p.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <div class="prod-card__img-placeholder" style="display:none">${p.emoji}</div>
        ${p.badge ? `<span class="prod-card__badge ${badgeMap[p.badge]}">${badgeLabel[p.badge]}</span>` : ''}
        <button class="prod-card__fav" onclick="UI.toggleFav(this, ${p.id})">${favIcon}</button>
      </div>
      <div class="prod-card__body">
        <div class="prod-card__name">${p.name}</div>
        <div class="prod-card__desc">${p.desc}</div>
        <div class="prod-card__foot">
          <div class="prod-card__price">
            ${UI.formatMoney(p.price)}
            ${p.oldPrice ? `<span class="prod-card__old-price">${UI.formatMoney(p.oldPrice)}</span>` : ''}
          </div>
          <button class="add-btn" onclick="Cart.add(${JSON.stringify(p).split('"').join('&quot;')})" title="Thêm vào giỏ">+</button>
        </div>
      </div>
    </div>`;
  };

  const updateCount = () => {
    const el = document.getElementById('productCount');
    if (el) el.textContent = `Hiển thị ${filtered.length} / ${PRODUCTS.length} sản phẩm`;
  };

  const renderFeatured = (gridId, limit = 8) => {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const featured = PRODUCTS.filter(p => p.badge === 'hot' || p.badge === 'new').slice(0, limit);
    grid.innerHTML = featured.map(renderCard).join('');
  };

  const init = () => {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    apply();
    UI.initSearch('filterSearch', PRODUCTS, () => apply());
    ['filterCat', 'filterSort'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', apply);
    });
    document.getElementById('filterSearch')?.addEventListener('input', apply);
  };

  return { apply, goToPage, renderCard, renderFeatured, init, PRODUCTS };
})();

document.addEventListener('DOMContentLoaded', ProductFilter.init);

/* ── Brand dropdown tùy chỉnh ── */
function selectBrand(input) {
  const label  = document.getElementById('brandLabel');
  const hidden = document.getElementById('filterBrand');
  const list   = document.getElementById('brandList');
  if (label)  label.textContent = input.parentElement.textContent.trim();
  if (hidden) hidden.value = input.value;
  if (list)   list.classList.remove('open');
  ProductFilter.apply();
}

document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.brand-dropdown-wrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('brandList')?.classList.remove('open');
  }
});