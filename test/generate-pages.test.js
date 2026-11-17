const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");

const root = path.resolve(__dirname, "..");

test("generates an index containing stylesheet and userscript metadata", (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pages-test-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  fs.cpSync(path.join(root, "css"), path.join(directory, "css"), { recursive: true });
  fs.cpSync(path.join(root, "js"), path.join(directory, "js"), { recursive: true });
  execFileSync(process.execPath, [path.join(root, "packages/generate-pages.js")], { cwd: directory });
  const html = fs.readFileSync(path.join(directory, "dist/index.html"), "utf8");
  assert.match(html, /Show actual price in yodobashi\.co\.jp/);
  assert.match(html, /show-actual-price\.user\.js/);
  assert.match(html, /\.user\.css/);
  assert.doesNotMatch(html, /<USER-(?:STYLESHEET|SCRIPT)-LIST>/);
});
