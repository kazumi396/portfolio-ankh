/**
 * スクロール位置に応じてアニメーションを実行
 */
export const initializeScrollTriggerAnimation = () => {
  gsap.set('.l-header-logo,.kv-title, .kv-title-description, .js-header, .scroll-down, .top-information', {
    opacity: 0,
  });

  const op = gsap.timeline();


  op.from(".kv",
    {
      opacity: 0,
      scale: 1.2,
      duration: 4,
      ease: "power3.inOut",
    });

  op.fromTo(".kv-title, .kv-title-description",
    {
      opacity: 0,
    },
    {
    opacity: 1,
    duration: 2,
    ease: "power3.inOut",
  },"-=1");

  op.fromTo(".l-header-logo",
    {
      opacity: 0,
      y: "-10%",
    },
    {
    opacity: 1,
    y: 0,
    duration: 2,
    ease: "power3.inOut",
  },"-=1");


  op.fromTo(".js-header, .scroll-down",
    {
      opacity: 0,
    },
    {
    opacity: 1,
    duration: 2,
    ease: "power3.inOut",
  },
  '<');

  op.fromTo(".top-information",
    {
      opacity: 0,
    },
    {
    opacity: 1,
    duration: 2,
    ease: "power3.inOut",
  },
  '<');


// フェードイン
  let fadeIns = document.querySelectorAll('.js-fadeIn');
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
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: fadeIn,
        start: 'top 90%',
      },
    }
  );
});
};

// スタッガー
let staggers = document.querySelectorAll('.js-stagger');
staggers.forEach((stagger) => {
  gsap.fromTo(
    stagger.querySelectorAll('.js-stagger-item'),
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
        start: 'top 90%',
      },
    }
  );
});