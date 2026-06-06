const Checkout = (() => {
  let promoApplied = null;

  const PROMOS = {
    'SNACK10': { type: 'percent', value: 10, label: 'Giảm 10%' },
    'FREESHIP': { type: 'shipping', value: 0,  label: 'Miễn phí giao hàng' },
    'WELCOME': { type: 'fixed', value: 20000, label: 'Giảm 20.000đ' },
  };

  const renderOrderItems = () => {
    const list = document.getElementById('orderItemsList');
    if (!list) return;

    const items = Cart.getAll();
    if (items.length === 0) {
      window.location.href = '../HTML/san-pham.html';
      return;
    }

    list.innerHTML = items.map(item => `
      <div class="order-item">
        <div class="order-item__img">
          <img src="${item.img || ''}" alt="${item.name}"
            onerror="this.style.display='none';this.parentElement.innerHTML='${item.emoji || '🍟'}'">
        </div>
        <div>
          <div class="order-item__name">${item.name}</div>
          <div class="order-item__qty">x${item.qty}</div>
        </div>
        <div class="order-item__price">${Cart.formatMoney(item.price * item.qty)}</div>
      </div>
    `).join('');
  };

  const updateSummary = () => {
    const sub      = Cart.getSubtotal();
    const shipping = promoApplied?.type === 'shipping' ? 0 : Cart.getShipping();
    let discount   = 0;

    if (promoApplied) {
      if (promoApplied.type === 'percent') discount = Math.floor(sub * promoApplied.value / 100);
      if (promoApplied.type === 'fixed')   discount = Math.min(promoApplied.value, sub);
    }

    const total = sub + shipping - discount;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('sumSubtotal', Cart.formatMoney(sub));
    set('sumShipping', shipping === 0 ? '🎉 Miễn phí' : Cart.formatMoney(shipping));
    set('sumDiscount', discount > 0 ? `-${Cart.formatMoney(discount)}` : '—');
    set('sumTotal', Cart.formatMoney(Math.max(0, total)));

    const discountRow = document.getElementById('discountRow');
    if (discountRow) discountRow.style.display = discount > 0 ? 'flex' : 'none';
  };

  const applyPromo = () => {
    const input = document.getElementById('promoInput');
    const msg   = document.getElementById('promoMsg');
    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();
    if (!code) { msg.textContent = '⚠️ Vui lòng nhập mã'; msg.style.color = 'var(--orange)'; return; }

    const promo = PROMOS[code];
    if (!promo) {
      msg.textContent = '❌ Mã không hợp lệ hoặc đã hết hạn';
      msg.style.color = 'var(--red)';
      promoApplied = null;
    } else {
      promoApplied = promo;
      msg.textContent = `✅ Áp dụng thành công: ${promo.label}`;
      msg.style.color = 'var(--green)';
      UI.toast(`🎉 Đã áp mã "${code}" — ${promo.label}`);
    }
    updateSummary();
  };

  const validateForm = () => {
    const fields = [
      { id: 'ckName',    err: 'ckNameErr',    check: v => v.length >= 2,    msg: 'Vui lòng nhập họ tên' },
      { id: 'ckPhone',   err: 'ckPhoneErr',   check: v => /^0[0-9]{9}$/.test(v), msg: 'Số điện thoại không hợp lệ' },
      { id: 'ckAddress', err: 'ckAddressErr', check: v => v.length >= 10,   msg: 'Vui lòng nhập địa chỉ đầy đủ' },
    ];

    let ok = true;
    fields.forEach(f => {
      const err = document.getElementById(f.err);
      if (err) { err.textContent = ''; err.classList.remove('show'); }
    });

    fields.forEach(f => {
      const el = document.getElementById(f.id);
      if (!el) return;
      if (!f.check(el.value.trim())) {
        const err = document.getElementById(f.err);
        if (err) { err.textContent = f.msg; err.classList.add('show'); }
        ok = false;
      }
    });

    return ok;
  };

  const placeOrder = () => {
    if (!validateForm()) {
      UI.toast('⚠️ Vui lòng điền đầy đủ thông tin!');
      document.getElementById('ckName')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const order = {
      id: 'SB' + Date.now(),
      items: Cart.getAll(),
      subtotal: Cart.getSubtotal(),
      shipping: Cart.getShipping(),
      promo: promoApplied,
      total: Cart.getTotal(),
      customer: {
        name:    document.getElementById('ckName')?.value.trim(),
        phone:   document.getElementById('ckPhone')?.value.trim(),
        email:   document.getElementById('ckEmail')?.value.trim(),
        address: document.getElementById('ckAddress')?.value.trim(),
        note:    document.getElementById('ckNote')?.value.trim(),
      },
      payment: document.querySelector('input[name="payment"]:checked')?.value || 'cod',
      shipping_method: document.querySelector('input[name="shipping"]:checked')?.value || 'standard',
      date: new Date().toLocaleString('vi-VN'),
    };

    const orders = JSON.parse(localStorage.getItem('sb_orders') || '[]');
    orders.push(order);
    localStorage.setItem('sb_orders', JSON.stringify(orders));

    Cart.clear();

    showSuccess(order);
  };

  const showSuccess = (order) => {
    const main = document.getElementById('checkoutMain');
    const succ = document.getElementById('orderSuccess');
    if (main) main.style.display = 'none';
    if (succ) {
      succ.style.display = 'block';
      const idEl = document.getElementById('successOrderId');
      if (idEl) idEl.textContent = order.id;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const init = () => {
    if (!document.getElementById('checkoutMain')) return; // Không phải trang thanh toán
    renderOrderItems();
    updateSummary();

    document.getElementById('applyPromoBtn')?.addEventListener('click', applyPromo);
    document.getElementById('placeOrderBtn')?.addEventListener('click', placeOrder);

    document.querySelectorAll('input[name="shipping"]').forEach(r => {
      r.addEventListener('change', updateSummary);
    });

    document.querySelectorAll('.ship-option, .payment-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const input = opt.querySelector('input');
        if (!input) return;
        const name = input.name;
        document.querySelectorAll(`.${opt.classList[0]}`).forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        input.checked = true;
        if (name === 'shipping') updateSummary();
      });
    });
  };

  return { init, placeOrder, applyPromo };
})();

document.addEventListener('DOMContentLoaded', Checkout.init);
