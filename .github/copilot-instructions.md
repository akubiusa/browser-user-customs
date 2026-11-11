# Copilot code review instructions

Follow `AGENTS.md` at the repository root (structure, metadata rules, conventions). Review the points below.

## Language

- Deliverables (commit descriptions, PR/Issue text, review comments, code comments, documentation) are written in Japanese. Runtime messages (logs, errors) and `package.json` text are English.
- Header fields that are identifiers or URLs stay as they are; `@description` is Japanese prose.

## Metadata header (highest priority)

Each custom file starts with a metadata header validated by `npm run lint` (`packages/css-meta.js`, `packages/js-meta.js`). Flag a changed file when:

- A required key is missing (JS additionally requires `downloadURL`, `match`, `grant`, `icon`).
- `namespace`, `author`, `homepageURL` or `supportURL` differ from the fixed values listed in `AGENTS.md`.
- `updateURL` (and `downloadURL` for JS) does not match the file's actual path under `master/css/` or `master/js/`; a copied file with a stale path is a common mistake.
- An existing file was modified but its `version` was not changed.

## Placement and scope

- A new custom lives under the directory matching its target domain.
- `@match` / `@-moz-document` should be scoped to the intended pages, not overly broad.

## What NOT to flag

- Hard-coded selectors, site-specific hacks and `!important` are inherent to userstyles for third-party sites.
- Each custom file is standalone; do not suggest shared modules or a build step.
- `dist/` is generated and not committed.
