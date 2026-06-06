const Cart = (() => {
  let items = JSON.parse(localStorage.getItem('snackboom_cart') || '{}');

  const save = () => localStorage.setItem('snackboom_cart', JSON.stringify(items));

  const formatMoney = (n) =>
    n.toLocaleString('vi-VN') + 'đ';

  const add = (product) => {
    const id = String(product.id);
    if (items[id]) {
      items[id].qty++;
    } else {
      items[id] = { ...product, qty: 1 };
    }
    save();
    updateBadge();
    renderSidebar();
    UI.toast(`🎉 Đã thêm "${product.name}" vào giỏ!`);
  };

  const remove = (id) => {
    delete items[String(id)];
    save();
    updateBadge();
    renderSidebar();
  };

  const changeQty = (id, delta) => {
    id = String(id);
    if (!items[id]) return;
    items[id].qty += delta;
    if (items[id].qty <= 0) delete items[id];
    save();
    updateBadge();
    renderSidebar();
  };

  const clear = () => {
    items = {};
    save();
    updateBadge();
    renderSidebar();
  };

  const getAll = () => Object.values(items);

  const getCount = () => Object.values(items).reduce((s, i) => s + i.qty, 0);

  const getSubtotal = () =>
    Object.values(items).reduce((s, i) => s + i.price * i.qty, 0);

  const getShipping = () => (getSubtotal() >= 79000 ? 0 : 20000);

  const getTotal = () => getSubtotal() + getShipping();

  const updateBadge = () => {
    const badges = document.querySelectorAll('.cart-badge');
    const count = getCount();
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  };

  const renderSidebar = () => {
    const body   = document.getElementById('cartBody');
    const foot   = document.getElementById('cartFoot');
    if (!body) return;

    const all = getAll().filter(i => i.qty > 0);

    if (all.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon">🛒</div>
          <div class="cart-empty__text">Giỏ hàng trống!<br>Thêm đồ ăn vặt ngay nào!</div>
        </div>`;
      if (foot) foot.style.display = 'none';
      return;
    }

    body.innerHTML = all.map(item => `
      <div class="cart-item">
        <div class="cart-item__img">
          ${item.img
            ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md)">`
            : item.emoji || '🍟'}
        </div>
        <div class="cart-item__info">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__price">${formatMoney(item.price * item.qty)}</div>
          <div class="cart-item__qty">
            <button class="qty-btn" onclick="Cart.changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="Cart.changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item__remove" onclick="Cart.remove(${item.id})" title="Xóa">✕</button>
      </div>
    `).join('');

    if (foot) {
      foot.style.display = 'block';
      const sub      = getSubtotal();
      const shipping = getShipping();
      document.getElementById('cartSubtotal').textContent = formatMoney(sub);
      document.getElementById('cartShipping').textContent =
        shipping === 0 ? '🎉 Miễn phí' : formatMoney(shipping);
      document.getElementById('cartTotal').textContent    = formatMoney(sub + shipping);
    }
  };

  const openSidebar = () => {
    document.getElementById('cartOverlay')?.classList.add('open');
    document.getElementById('cartSidebar')?.classList.add('open');
    renderSidebar();
  };

  const closeSidebar = () => {
    document.getElementById('cartOverlay')?.classList.remove('open');
    document.getElementById('cartSidebar')?.classList.remove('open');
  };

  const goCheckout = () => {
    if (getCount() === 0) {
      UI.toast('⚠️ Giỏ hàng trống, hãy thêm sản phẩm!');
      return;
    }
    closeSidebar();
    window.location.href = '../HTML/thanh-toan.html';
  };

  const init = () => {
    updateBadge();
    renderSidebar();
  };

  return { add, remove, changeQty, clear, getAll, getCount, getSubtotal, getShipping, getTotal, openSidebar, closeSidebar, goCheckout, init, formatMoney };
})();

document.addEventListener('DOMContentLoaded', Cart.init);
