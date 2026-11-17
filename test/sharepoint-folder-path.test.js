const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

const script = fs.readFileSync(
  path.resolve(__dirname, "../js/sharepoint.com/add-folder-copy-button.user.js"),
  "utf8",
);

for (const [rawPath, expected] of [
  ["/sites/team/Other Library/Folder", " > sites > team > Other Library > Folder > "],
  ["/sites/team/Shared Documents/Folder", "Folder > "],
]) {
  test(`copies the folder path for ${rawPath}`, () => {
    let click;
    let copied;
    const element = {
      setAttribute() {},
      classList: { add() {} },
      appendChild() {},
      addEventListener(_event, handler) { click = handler; },
    };
    const context = {
      document: {
        createElement: () => element,
        querySelector: () => ({ getAttribute: () => JSON.stringify([rawPath]) }),
      },
      navigator: { clipboard: { writeText: (text) => { copied = text; return Promise.resolve(); } } },
      setInterval() {},
      alert() {},
      console,
    };

    vm.runInNewContext(script, context);
    click();
    assert.equal(copied, expected);
  });
}
