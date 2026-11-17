const assert = require("node:assert/strict");
const { execFileSync, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");

for (const type of ["js", "css"]) {
  for (const change of ["delete", "rename"]) {
    test(`${type} validator handles a ${change}d file`, (t) => {
      const directory = fs.mkdtempSync(path.join(os.tmpdir(), "meta-diff-test-"));
      t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
      const git = (...args) => execFileSync("git", args, { cwd: directory });
      git("init", "--quiet");
      git("config", "user.name", "Test");
      git("config", "user.email", "test@example.com");

      const folder = path.join(directory, type, "example.com");
      fs.mkdirSync(folder, { recursive: true });
      const oldName = `original.user.${type}`;
      const newName = `renamed.user.${type}`;
      const url = (name) => `https://raw.githubusercontent.com/book000/browser-user-customs/master/${type}/example.com/${name}`;
      const common = `@name Test custom
@namespace tomacheese.com
@version 1.0.0
@description Test custom metadata
@author Tomachi <tomachi@tomacheese.com> (https://github.com/book000)
@homepageURL https://github.com/book000/browser-user-customs
@supportURL https://github.com/book000/browser-user-customs/issues
@updateURL ${url(oldName)}
@license MIT`;
      const content = type === "js"
        ? `// ==UserScript==\n${common.split("\n").map((line) => `// ${line}`).join("\n")}\n// @downloadURL ${url(oldName)}\n// @match https://example.com/*\n// @grant none\n// @icon https://example.com/icon.png\n// ==/UserScript==\n`
        : `/* ==UserStyle==\n${common}\n==/UserStyle== */\nbody { color: black; }\n`;
      const oldPath = path.join(folder, oldName);
      fs.writeFileSync(oldPath, content);
      git("add", type);
      git("commit", "--quiet", "-m", "initial");
      const baseSha = git("rev-parse", "HEAD").toString().trim();

      if (change === "delete") {
        fs.unlinkSync(oldPath);
      } else {
        fs.renameSync(oldPath, path.join(folder, newName));
        fs.writeFileSync(path.join(folder, newName), content.replaceAll(url(oldName), url(newName)));
      }
      git("add", "-A");
      git("commit", "--quiet", "-m", change);
      const diff = git("diff", "--name-status", baseSha, "HEAD").toString();
      assert.match(diff, change === "delete" ? /^D\s/m : /^R\d+\s/m);

      const result = spawnSync(process.execPath, [path.resolve(__dirname, `../packages/${type}-meta.js`)], {
        cwd: directory,
        encoding: "utf8",
        env: { ...process.env, BASE_SHA: baseSha },
      });
      assert.equal(result.status, 0, result.stderr);
      assert.doesNotMatch(result.stderr, /meta not found/);
      if (change === "rename") {
        assert.match(result.stdout, new RegExp(`Check versioning ${type}/example\\.com/${newName.replaceAll(".", "\\.")}`));
      }
    });
  }
}
