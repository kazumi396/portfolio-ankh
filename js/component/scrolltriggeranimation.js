/**
 * スクロール位置に応じてアニメーションを実行
 */
export const initializeScrollTriggerAnimation = () => {
  gsap.set(".kv", {
    opacity: 0,
    scale: 1.2,
  });

  var webStorage = function () {
    if (sessionStorage.getItem("access")) {
      // 2回目以降ページを開いたときの処理
      gsap.set(".kv", {
        opacity: 1,
        scale: 1,
      });
      gsap.set(".kv-title, .kv-title-description, .js-header, .scroll-down, .top-information, .js-header-menu-bg", { opacity: 1 });
      gsap.set(".l-header-logo", { opacity: 1, y: 0 });
    } else {
      sessionStorage.setItem("access", 0);
      // 初回ロード時の処理
      const op = gsap.timeline();
      op.to(".kv", {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: "power3.inOut",
      });
      op.fromTo(
        ".kv-title, .kv-title-description",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 2,
          ease: "power3.inOut",
        },
        "-=1",
      );
      op.fromTo(
        ".l-header-logo",
        {
          opacity: 0,
          y: "-10%",
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power3.inOut",
        },
        "-=1",
      );
      op.fromTo(
        ".js-header, .scroll-down, .js-header-menu-bg",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 2,
          ease: "power3.inOut",
        },
        "<",
      );
      op.fromTo(
        ".top-information",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 2,
          ease: "power3.inOut",
        },
        "<",
      );
    }
  };
  webStorage();

  // フェードイン
  let fadeIns = document.querySelectorAll(".js-fadeIn");
  fadeIns.forEach((fadeIn) => {
    gsap.fromTo(
      fadeIn,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: fadeIn,
          start: "top 90%",
        },
      },
    );
  });

  // スタッガー
  let staggers = document.querySelectorAll(".js-stagger");
  staggers.forEach((stagger) => {
    gsap.fromTo(
      stagger.querySelectorAll(".js-stagger-item"),
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        scrollTrigger: {
          trigger: stagger,
          start: "top 90%",
        },
      },
    );
  });

  // 背景テキスト
  const BgScrub = (percent) => {
    document.querySelectorAll(".js-bg-scrub").forEach((bgScrub) => {
      // 画面幅のパーセンテージで移動量を計算
      const moveAmount = window.innerWidth * (percent / 100);
      gsap.fromTo(
        bgScrub,
        { backgroundPositionX: 0 },
        {
          backgroundPositionX: -moveAmount,
          scrollTrigger: {
            trigger: bgScrub,
            start: "top 90%",
            end: "center center",
            scrub: 4,
          },
        },
      );
    });
  };

  let mm = gsap.matchMedia();
  mm.add("(min-width: 769px)", () => BgScrub(10)); // PC: 画面幅の10%
  mm.add("(max-width: 768px)", () => BgScrub(15)); // SP: 画面幅の15%
};
