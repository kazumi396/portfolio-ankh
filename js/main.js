import { switchViewport } from "./utility/switch-viewport.js";
import { initializeHamburgerMenu } from "./component/hamburgermenu.js";
import { initializeScrollTriggerHeader } from "./component/scrolltriggerheaderbg.js";

document.addEventListener("DOMContentLoaded", () => {
  // 画面の幅に応じてビューポートの設定を切り替え
  switchViewport();
  window.addEventListener("resize", switchViewport);

  // 各機能の初期化
  initializeHamburgerMenu();
  initializeScrollTriggerHeader();
});
