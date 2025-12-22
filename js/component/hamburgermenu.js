export const initializeHamburgerMenu = () => {
  const menu = document.querySelector(".js-header-menu");
  const button = document.querySelector(".js-hamburger-button");
  const closeButton = document.querySelector(".js-hamburger-close-button");

  const contentsOpeningKeyframes = {
    opacity: [0, 1],
  };
  const contentsOpeningOptions = {
    duration: 300,
    easing: "ease-out",
  };
  const contentsClosingKeyframes = {
    opacity: [1, 0],
  };
  const contentsClosingOptions = {
    duration: 300,
    easing: "ease-out",
  };

  if (!menu || !button) return;

  // メニューopenする関数
  const openMenu = () => {
    menu.showModal();
    menu.animate(contentsOpeningKeyframes, contentsOpeningOptions);
    document.body.style.overflow = "hidden";
  };

  // メニューcloseする関数
  const closeMenu = (callback) => {
    const closingAnim = menu.animate(contentsClosingKeyframes, contentsClosingOptions);

    // アニメーションの完了後
    closingAnim.onfinish = () => {
      menu.close();
      document.body.style.overflow = "";
      if (callback) callback();
    };
  };

  // スムーズスクロール関数
  const smoothScrollTo = (targetId) => {
    const target = document.querySelector(targetId);
    if (target) {
      const header = document.querySelector(".js-header");
      const headerHeight = header ? header.offsetHeight : 0;

      // getBoundingClientRect()を使用して正確な位置を取得
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // ボタンクリックでopen
  button.addEventListener("click", () => {
    openMenu();
  });

  // クローズボタンクリックでclose
  closeButton.addEventListener("click", () => {
    closeMenu();
  });

  // メニュー内のリンククリック時の処理
  const menuLinks = menu.querySelectorAll('a[href^="#"]');
  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");

      // メニューを閉じ、アニメーション完了後にスクロール
      closeMenu(() => {
        // メニューが完全に閉じた後にスクロール
        smoothScrollTo(targetId);
      });
    });
  });

  // Escapeキーを押すと非表示
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    }
  });
};
