const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

const script = fs.readFileSync(path.resolve(__dirname, "../js/yodobashi.co.jp/show-actual-price.user.js"), "utf8");

test("displays the price minus points once the elements are available", () => {
  let tick;
  let available = false;
  const children = [];
  const price = { innerText: "￥12,345", parentNode: { appendChild: (element) => children.push(element) } };
  const points = { innerText: "1,234ポイント" };
  const document = {
    querySelector(selector) {
      if (!available) return null;
      return { "#js_scl_unitPrice": price, "#js_scl_pointValue": points, ".actual-price": children[0] }[selector];
    },
    createElement: () => ({ classList: { add() {} } }),
  };
  vm.runInNewContext(script, { document, setInterval: (callback) => { tick = callback; } });
  tick();
  assert.equal(children.length, 0);
  available = true;
  tick();
  tick();
  assert.equal(children.length, 1);
  assert.equal(children[0].innerText, "：実質 11111 円");
});
