/**
 * スクロール位置に応じてヘッダーのスタイルを変更
 * - 背景色: FV以外が表示された時に透明、戻った時に元の色に
 * - ボタン色: FVが完全に見えなくなった時に--color-font-base、戻った時に--color-font-whiteに
 * PC時のみ（768px以上）に適用
 */
export const initializeScrollTriggerHeader = () => {
  const headerMenuBgElement = document.querySelector(".js-header-menu-bg");
  const hamburgerButton = document.querySelector(".js-hamburger-button");
  const hamburgerButtonLines = hamburgerButton?.querySelectorAll(".js-hamburger-button-line-span");
  const scrollTargetElement = document.querySelector(".js-scrollTarget");

  if (!headerMenuBgElement || !hamburgerButton || !hamburgerButtonLines || !scrollTargetElement) return;

  if (!window.gsap || !window.ScrollTrigger) {
    console.warn("GSAP or ScrollTrigger is not loaded");
    return;
  }

  const isPC = () => window.innerWidth >= 768;
  const animationOptions = { duration: 0.3, ease: "power2.out" };

  const hideMenuBg = () => {
    if (!isPC()) return;
    gsap.to(headerMenuBgElement, {
      backgroundColor: "rgba(0, 0, 0, 0)",
      ...animationOptions,
    });
  };

  const showMenuBg = () => {
    if (!isPC()) return;
    gsap.to(headerMenuBgElement, {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      ...animationOptions,
    });
  };

  const changeButtonColor = () => {
    if (!isPC()) return;
    hamburgerButtonLines.forEach((line) => {
      gsap.to(line, {
        backgroundColor: "var(--color-font-base)",
        ...animationOptions,
      });
    });
  };

  const resetButtonColor = () => {
    if (!isPC()) return;
    hamburgerButtonLines.forEach((line) => {
      gsap.to(line, {
        backgroundColor: "var(--color-font-white)",
        ...animationOptions,
      });
    });
  };

  ScrollTrigger.create({
    trigger: scrollTargetElement,
    start: "bottom bottom",
    end: "bottom top",
    onEnter: hideMenuBg,
    onEnterBack: hideMenuBg,
    onLeaveBack: showMenuBg,
  });

  ScrollTrigger.create({
    trigger: scrollTargetElement,
    start: "bottom top+=57",
    end: "bottom top",
    onEnter: changeButtonColor,
    onEnterBack: changeButtonColor,
    onLeaveBack: resetButtonColor,
  });
};
