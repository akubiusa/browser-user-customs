const assert = require("node:assert/strict");
const { execFileSync, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");

const validatorPath = path.resolve(__dirname, "../packages/css-meta.js");

test("rejects a changed CSS file when its version is unchanged", (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "css-meta-test-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));

  execFileSync("git", ["init", "--quiet"], { cwd: directory });
  execFileSync("git", ["config", "user.name", "Test"], { cwd: directory });
  execFileSync("git", ["config", "user.email", "test@example.com"], {
    cwd: directory,
  });

  const cssDirectory = path.join(directory, "css/example.com");
  fs.mkdirSync(cssDirectory, { recursive: true });
  const cssPath = path.join(cssDirectory, "custom.user.css");
  const css = (description) => `/* ==UserStyle==
@name           Test style
@namespace      tomacheese.com
@version        1.0.0
@description    ${description}
@author         Tomachi <tomachi@tomacheese.com> (https://github.com/book000)
@homepageURL    https://github.com/book000/browser-user-customs
@supportURL     https://github.com/book000/browser-user-customs/issues
@updateURL      https://raw.githubusercontent.com/book000/browser-user-customs/master/css/example.com/custom.user.css
@license        MIT License
==/UserStyle== */

body { color: black; }
`;

  fs.writeFileSync(cssPath, css("Original description"));
  execFileSync("git", ["add", "css"], { cwd: directory });
  execFileSync("git", ["commit", "--quiet", "-m", "initial"], {
    cwd: directory,
  });
  const baseSha = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: directory,
    encoding: "utf8",
  }).trim();

  fs.writeFileSync(cssPath, css("Changed description"));
  execFileSync("git", ["add", "css"], { cwd: directory });
  execFileSync("git", ["commit", "--quiet", "-m", "change description"], {
    cwd: directory,
  });

  const result = spawnSync("node", [validatorPath], {
    cwd: directory,
    encoding: "utf8",
    env: { ...process.env, BASE_SHA: baseSha },
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /version must be updated \(current: 1\.0\.0\)/);
});
