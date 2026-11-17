const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

const script = fs.readFileSync(
  path.resolve(
    __dirname,
    "../js/yodobashi.co.jp/show-actual-price.user.js",
  ),
  "utf8",
);

function createPage(price, point) {
  let interval;
  const actualPriceElement = {
    classList: { add() {} },
    innerText: "",
  };
  const unitPriceElement = {
    innerText: price,
    parentNode: {
      appendChild(element) {
        assert.equal(element, actualPriceElement);
      },
    },
  };
  const pointValueElement = { innerText: point };
  const document = {
    createElement: () => actualPriceElement,
    querySelector(selector) {
      if (selector === "#js_scl_unitPrice") return unitPriceElement;
      if (selector === "#js_scl_pointValue") return pointValueElement;
      if (selector === ".actual-price") {
        return actualPriceElement.innerText ? actualPriceElement : null;
      }
      return null;
    },
  };

  vm.runInNewContext(script, {
    document,
    setInterval(callback) {
      interval = callback;
    },
  });

  return {
    actualPriceElement,
    run: (nextPrice, nextPoint) => {
      unitPriceElement.innerText = nextPrice;
      pointValueElement.innerText = nextPoint;
      interval();
    },
  };
}

test("updates the existing actual price when price and points change", () => {
  const page = createPage("￥1,000", "100ポイント");

  page.run("￥1,000", "100ポイント");
  assert.equal(page.actualPriceElement.innerText, "：実質 900 円");

  page.run("￥2,000", "200ポイント");
  assert.equal(page.actualPriceElement.innerText, "：実質 1800 円");
});

test("does not display a nonnumeric actual price", () => {
  const page = createPage("価格確認中", "100ポイント");

  page.run("価格確認中", "100ポイント");
  assert.equal(page.actualPriceElement.innerText, "");
});
