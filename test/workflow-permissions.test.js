const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const readWorkflow = (name) => fs.readFileSync(
  path.resolve(__dirname, `../.github/workflows/${name}`),
  "utf8",
);

test("lint workflow only grants read access to repository contents", () => {
  const workflow = readWorkflow("lint.yml");
  assert.match(workflow, /^permissions:\n  contents: read$/m);
  assert.doesNotMatch(workflow, /^  (?:actions|checks|contents): write$/m);
});

test("page generation is read-only and deployment keeps only Pages permissions", () => {
  const workflow = readWorkflow("deploy-pages.yml");
  assert.match(workflow, /^  generate:\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read$/m);
  assert.match(workflow, /^  deploy:\n    runs-on: ubuntu-latest\n    needs: generate\n    permissions:\n      pages: write\n      id-token: write$/m);
});
