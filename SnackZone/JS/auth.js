const Auth = (() => {
  const DEMO_USERS = [
    {
      id: 1,
      role: "user",
      name: "Nguyễn Văn A",
      email: "user@demo.com",
      phone: "0901234567",
      password: "123456",
    },
    {
      id: 2,
      role: "admin",
      name: "Admin SnackBoom",
      email: "admin@snackboom.vn",
      phone: "0909999888",
      password: "admin123",
    },
  ];

  let currentRole = "user";
  let currentTab = "login";

  const getSession = () =>
    JSON.parse(sessionStorage.getItem("sb_user") || "null");
  const setSession = (user) =>
    sessionStorage.setItem("sb_user", JSON.stringify(user));
  const clearSession = () => sessionStorage.removeItem("sb_user");

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const isPhone = (v) => /^(0|\+84)[0-9]{9,10}$/.test(v);

  const openModal = () => {
    document.getElementById("authOverlay")?.classList.add("open");
    document.getElementById("authModal")?.classList.add("open");
    setRole(currentRole);
    setTab(currentTab);
  };

  const closeModal = () => {
    document.getElementById("authOverlay")?.classList.remove("open");
    document.getElementById("authModal")?.classList.remove("open");
    clearErrors();
  };

  const setRole = (role) => {
    currentRole = role;
    document.querySelectorAll(".role-tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.role === role);
    });
    const hint = document.getElementById("adminHint");
    if (hint) hint.style.display = role === "admin" ? "block" : "none";
  };

  const setTab = (tab) => {
    currentTab = tab;
    document.querySelectorAll(".auth-tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.tab === tab);
    });
    document
      .getElementById("loginForm")
      ?.style?.setProperty("display", tab === "login" ? "block" : "none");
    document
      .getElementById("registerForm")
      ?.style?.setProperty("display", tab === "register" ? "block" : "none");
    const regTab = document.querySelector('[data-tab="register"]');
    if (regTab) regTab.style.display = currentRole === "admin" ? "none" : "";
    if (currentRole === "admin" && tab === "register") setTab("login");
    clearErrors();
  };

  const login = () => {
    clearErrors();
    const email = document.getElementById("loginEmail")?.value.trim();
    const password = document.getElementById("loginPassword")?.value;
    let ok = true;

    if (!email || !isEmail(email)) {
      showError("loginEmailErr", "Vui lòng nhập email hợp lệ");
      ok = false;
    }
    if (!password || password.length < 6) {
      showError("loginPassErr", "Mật khẩu ít nhất 6 ký tự");
      ok = false;
    }
    if (!ok) return;

    // Tìm user
    const found = DEMO_USERS.find(
      (u) =>
        u.email === email && u.password === password && u.role === currentRole,
    );

    if (!found) {
      showError("loginPassErr", "❌ Email hoặc mật khẩu không đúng");
      return;
    }

    setSession(found);
    closeModal();
    updateAuthUI(found);
    UI.toast(`👋 Chào mừng ${found.name}!`);

    if (found.role === "admin") {
      setTimeout(() => {
        window.location.href = "../HTML/admin.html";
      }, 800);
    }
  };

  const register = () => {
    clearErrors();
    const name = document.getElementById("regName")?.value.trim();
    const phone = document.getElementById("regPhone")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim();
    const password = document.getElementById("regPassword")?.value;
    const confirm = document.getElementById("regConfirm")?.value;
    let ok = true;

    if (!name || name.length < 2) {
      showError("regNameErr", "Vui lòng nhập họ tên (ít nhất 2 ký tự)");
      ok = false;
    }
    if (!phone || !isPhone(phone)) {
      showError("regPhoneErr", "Số điện thoại không hợp lệ (VD: 0901234567)");
      ok = false;
    }
    if (!email || !isEmail(email)) {
      showError("regEmailErr", "Vui lòng nhập email hợp lệ");
      ok = false;
    }
    if (!password || password.length < 6) {
      showError("regPassErr", "Mật khẩu ít nhất 6 ký tự");
      ok = false;
    }
    if (password !== confirm) {
      showError("regConfirmErr", "Mật khẩu xác nhận không khớp");
      ok = false;
    }
    if (!ok) return;

    if (DEMO_USERS.find((u) => u.email === email)) {
      showError("regEmailErr", "Email này đã được đăng ký");
      return;
    }

    const newUser = {
      id: Date.now(),
      role: "user",
      name,
      phone,
      email,
      password,
    };
    DEMO_USERS.push(newUser);
    setSession(newUser);
    closeModal();
    updateAuthUI(newUser);
    UI.toast(`🎉 Đăng ký thành công! Chào ${name}!`);
  };

  const logout = () => {
    clearSession();
    updateAuthUI(null);
    UI.toast("👋 Đã đăng xuất!");
    if (window.location.pathname.includes("admin")) {
      window.location.href = "../HTML/index.html";
    }
  };

  const updateAuthUI = (user) => {
    const btn = document.getElementById("authBtn");
    if (!btn) return;
    if (user) {
      btn.innerHTML = `
        <span class="icon">👤</span>
        <span>${user.name.split(" ").pop()}${user.role === "admin" ? " 🔑" : ""}</span>
      `;
      btn.onclick = () => {
        if (confirm(`Xin chào ${user.name}!\nBạn có muốn đăng xuất không?`))
          logout();
      };
    } else {
      btn.innerHTML = `<span class="icon">👤</span><span>Đăng nhập</span>`;
      btn.onclick = openModal;
    }
  };

  const showError = (id, msg) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = msg;
      el.classList.add("show");
    }
  };

  const clearErrors = () => {
    document.querySelectorAll(".form-error").forEach((e) => {
      e.classList.remove("show");
      e.textContent = "";
    });
  };

  const init = () => {
    const user = getSession();
    updateAuthUI(user);

    if (window.location.pathname.includes("admin.html")) {
      if (!user || user.role !== "admin") {
        alert("⛔ Bạn không có quyền truy cập trang này!");
        window.location.href = "../HTML/index.html";
      }
    }
  };

  return {
    openModal,
    closeModal,
    setRole,
    setTab,
    login,
    register,
    logout,
    getSession,
    init,
  };
})();

document.addEventListener("DOMContentLoaded", Auth.init);
