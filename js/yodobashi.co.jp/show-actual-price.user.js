// ==UserScript==
// @name         Show actual price in yodobashi.co.jp
// @namespace    tomacheese.com
// @version      1.0.2
// @description  ヨドバシの商品ページで販売価格からポイントを引いた実質価格を表示する
// @author       Tomachi <tomachi@tomacheese.com> (https://github.com/book000)
// @homepageURL  https://github.com/book000/browser-user-customs
// @supportURL   https://github.com/book000/browser-user-customs/issues
// @updateURL    https://raw.githubusercontent.com/book000/browser-user-customs/master/js/yodobashi.co.jp/show-actual-price.user.js
// @downloadURL  https://raw.githubusercontent.com/book000/browser-user-customs/master/js/yodobashi.co.jp/show-actual-price.user.js
// @match        https://www.yodobashi.com/product/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yodobashi.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  setInterval(() => {
    const unitPriceElement = document.querySelector("#js_scl_unitPrice");
    const pointValueElement = document.querySelector("#js_scl_pointValue");
    const actualPriceElement = document.querySelector(".actual-price");
    if (!unitPriceElement || !pointValueElement) {
      return;
    }

    const priceText = unitPriceElement.innerText
      .replace("￥", "")
      .replaceAll(",", "");
    const pointText = pointValueElement.innerText
      .replace("ポイント", "")
      .replaceAll(",", "");
    if (!priceText.trim() || !pointText.trim()) {
      return;
    }

    const price = Number(priceText);
    const point = Number(pointText);
    if (!Number.isFinite(price) || !Number.isFinite(point)) {
      return;
    }

    const actualPrice = price - point;
    const displayElement = actualPriceElement || document.createElement("span");
    if (!actualPriceElement) {
      displayElement.classList.add("actual-price");
      unitPriceElement.parentNode.appendChild(displayElement);
    }
    displayElement.innerText = `：実質 ${actualPrice} 円`;
  }, 300);
})();
