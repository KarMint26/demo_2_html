document.addEventListener("DOMContentLoaded", function () {
  const voucherBtn = document.getElementById("voucher-btn");
  const memberBtn = document.getElementById("member-btn");
  const usernameInput = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");
  const passwordGroup = document.getElementById("password-group");
  const loginForm = document.getElementById("login-form");
  const loginButton = document.getElementById("login-button");

  function switchToVoucherMode() {
    voucherBtn.classList.add("active");
    memberBtn.classList.remove("active");

    usernameInput.placeholder = "Ketik Kode Voucher";
    passwordGroup.style.display = "none";

    usernameInput.addEventListener("input", syncPasswordForVoucher);
    syncPasswordForVoucher();
  }

  function switchToMemberMode() {
    memberBtn.classList.add("active");
    voucherBtn.classList.remove("active");

    usernameInput.placeholder = "Ketik Username Member";
    passwordInput.placeholder = "Ketik Password";
    passwordGroup.style.display = "block";

    usernameInput.removeEventListener("input", syncPasswordForVoucher);
    passwordInput.value = "";
  }

  voucherBtn.addEventListener("click", switchToVoucherMode);
  memberBtn.addEventListener("click", switchToMemberMode);

  function sanitizeInput(value) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  function syncPasswordForVoucher() {
    const sanitizedValue = sanitizeInput(usernameInput.value);
    usernameInput.value = sanitizedValue;
    passwordInput.value = sanitizedValue;
  }

  usernameInput.addEventListener("input", () => {
    usernameInput.value = sanitizeInput(usernameInput.value);
  });
  passwordInput.addEventListener("input", () => {
    passwordInput.value = sanitizeInput(passwordInput.value);
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    loginButton.disabled = true;
    loginButton.textContent = "Memproses...";

    setTimeout(() => {
      loginButton.disabled = false;
      loginButton.textContent = "Login";
    }, 2000);
  });

  const slides = document.querySelectorAll(".ad-slide-item");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentSlide = 0;

  if (slides.length > 0) {
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      slides[index].classList.add("active");
      dots[index].classList.add("active");
      currentSlide = index;
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }

    showSlide(0);
    setInterval(nextSlide, 4000);
  }

  switchToVoucherMode();
  usernameInput.focus();
});
