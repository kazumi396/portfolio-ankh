export const initializeHamburgerMenu = () => {
  const menu = document.querySelector(".js-header-menu");
  const button = document.querySelector(".js-hamburger-button");
  const closeButton = document.querySelector(".js-hamburger-close-button");

  // コンテンツ Opening Keyframe
  const contentsOpeningKeyframes = {
    opacity: [0, 1],
  };

  // コンテンツ Opening Option
  const contentsOpeningOptions = {
    duration: 300,
    easing: "ease-out",
  };

  // コンテンツ Closing Keyframe
  const contentsClosingKeyframes = {
    opacity: [1, 0],
  };

  // コンテンツ Closing Option
  const contentsClosingOptions = {
    duration: 300,
    easing: "ease-out",
  };

  // menuとbuttonがページ内にない場合returnする
  if (!menu || !button) return;

  // メニューopenする関数
  const openMenu = () => {
    menu.showModal();
    menu.animate(contentsOpeningKeyframes, contentsOpeningOptions);
    document.body.style.overflow = "hidden"; // 背景固定
  };

  // メニューcloseする関数
  const closeMenu = () => {
    const closingAnim = menu.animate(contentsClosingKeyframes, contentsClosingOptions);

    // アニメーションの完了後
    closingAnim.onfinish = () => {
      menu.close();
      document.body.style.overflow = ""; // 背景固定解除
    };
  };

  // スムーズスクロール関数
  const smoothScrollTo = (targetId) => {
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = document.querySelector(".js-header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

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

      // メニューを閉じる
      closeMenu();

      // 少し遅延させてからスクロール（メニューが閉じるのを待つ）
      setTimeout(() => {
        smoothScrollTo(targetId);
      }, 300);
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
