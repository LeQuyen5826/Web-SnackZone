const UI = (() => {
  let toastTimer = null;

  const toast = (msg, duration = 2800) => {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), duration);
  };

  const formatMoney = (n) => n.toLocaleString('vi-VN') + 'đ';

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setActiveNav = () => {
    const path = window.location.pathname;
    document.querySelectorAll('.navbar__link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') && path.includes(link.getAttribute('href').replace('../HTML/', ''))) {
        link.classList.add('active');
      }
    });
  };

  const lazyImages = () => {
    const imgs = document.querySelectorAll('img[data-src]');
    if (!('IntersectionObserver' in window)) {
      imgs.forEach(img => { img.src = img.dataset.src; });
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '100px' });
    imgs.forEach(img => obs.observe(img));
  };

  const toggleFav = (btn, productId) => {
    const favorites = JSON.parse(localStorage.getItem('sb_favorites') || '[]');
    const idx = favorites.indexOf(productId);
    if (idx === -1) {
      favorites.push(productId);
      btn.textContent = '❤️';
      btn.classList.add('liked');
      toast('❤️ Đã thêm vào yêu thích!');
    } else {
      favorites.splice(idx, 1);
      btn.textContent = '🤍';
      btn.classList.remove('liked');
      toast('💔 Đã xóa khỏi yêu thích');
    }
    localStorage.setItem('sb_favorites', JSON.stringify(favorites));
  };

  const isFav = (productId) => {
    const favorites = JSON.parse(localStorage.getItem('sb_favorites') || '[]');
    return favorites.includes(productId);
  };

  const initReveal = () => {
    if (!('IntersectionObserver' in window)) return;
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      obs.observe(el);
    });
  };

  const initSearch = (inputId, dataList, onSelect) => {
    const input = document.getElementById(inputId);
    if (!input) return;
    let suggestBox = null;

    const removeSuggest = () => {
      suggestBox?.remove();
      suggestBox = null;
    };

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      removeSuggest();
      if (!q) return;

      const matches = dataList.filter(item =>
        item.name.toLowerCase().includes(q)
      ).slice(0, 6);

      if (!matches.length) return;

      suggestBox = document.createElement('div');
      suggestBox.className = 'search-suggest';
      suggestBox.style.cssText = `
        position:absolute; top:100%; left:0; right:0;
        background:#fff; border:2px solid var(--border);
        border-radius:var(--radius-md); box-shadow:var(--shadow-md);
        z-index:999; overflow:hidden; margin-top:4px;
      `;
      matches.forEach(item => {
        const row = document.createElement('div');
        row.style.cssText = `padding:12px 16px; cursor:pointer; font-weight:700;
          font-size:0.9rem; border-bottom:1px solid var(--border);
          display:flex; align-items:center; gap:10px;`;
        row.innerHTML = `<span>${item.emoji || '🍟'}</span> ${item.name}
          <span style="margin-left:auto;color:var(--red);font-family:'Righteous',cursive">${formatMoney(item.price)}</span>`;
        row.addEventListener('mouseenter', () => row.style.background = 'var(--cream)');
        row.addEventListener('mouseleave', () => row.style.background = '');
        row.addEventListener('click', () => {
          input.value = item.name;
          removeSuggest();
          onSelect && onSelect(item);
        });
        suggestBox.appendChild(row);
      });
      input.parentElement.style.position = 'relative';
      input.parentElement.appendChild(suggestBox);
    });

    document.addEventListener('click', (e) => {
      if (!input.parentElement.contains(e.target)) removeSuggest();
    });
  };

  const initMobileMenu = () => {
    const toggle = document.getElementById('menuToggle');
    const menu   = document.getElementById('navMenu');
    toggle?.addEventListener('click', () => {
      menu?.classList.toggle('open');
    });
  };

  const init = () => {
    setActiveNav();
    lazyImages();
    initReveal();
    initMobileMenu();
  };

  return { toast, formatMoney, scrollTo, toggleFav, isFav, initSearch, init };
})();

document.addEventListener('DOMContentLoaded', UI.init);
