# AGENTS.md

AI コーディングエージェントとコントリビューター向けのガイドです。`CLAUDE.md` はこのファイルを取り込み、`.github/copilot-instructions.md` はレビュー観点を追加します。

## Language

- 成果物は**日本語**で書く。コミットメッセージの description、PR / Issue のタイトルと本文、レビューコメント、コードコメント、ドキュメント (`README.md`、`AGENTS.md` など) が対象。
- 日本語と英数字の間には半角スペースを入れる。散文の段落の途中で手動改行しない。
- 例外 (そのまま残す): ユーザスクリプト / ユーザスタイルのヘッダーのうち識別子や URL である項目 (`@name`、`@namespace`、`@updateURL` など)、引用、技術的な識別子、生成物、外部ソースの文言。`@description` は説明文なので日本語で書く。
- 実行時メッセージ (ログ、エラー) は英語。ただしユーザ向けの UI 文言 (`alert` など) は日本語のまま。
- `package.json` の文言は英語。
- 過去のコミットの言語を揃えるために Git の履歴を書き換えない。

## Overview

Stylus 向けのユーザスタイル (`*.user.css`) と Tampermonkey 向けのユーザスクリプト (`*.user.js`) を、対象サイトのドメインごとに置いたリポジトリです。`npm run generate-pages` で一覧ページを生成し、[GitHub Pages](https://book000.github.io/browser-user-customs/) に公開します。

## Commands

```bash
npm ci                     # 依存関係のインストール
npm run lint               # css / js のメタデータ検証 (lint-css と lint-js を並列実行)
npm run lint-css           # node packages/css-meta.js
npm run lint-js            # node packages/js-meta.js
npm run generate-pages     # dist/index.html を生成 (dist/ はコミットしない)
```

- ビルドやテストはありません。ESLint などのコード用 lint も設定されていません。
- `BASE_SHA` 環境変数に比較元のコミットを渡すと、変更されたファイルの `version` が更新されているかも検証します。ローカルでは例えば `BASE_SHA=$(git merge-base HEAD origin/master) npm run lint` で再現できます。CI (`.github/workflows/lint.yml`) は PR のベースコミットを渡します。
- `.github/workflows/deploy-pages.yml` は `master` / `main` への push と手動実行で、一覧ページを GitHub Pages にデプロイします。
- Node.js は CI で 26.x を使います。依存関係は `package.json` でバージョン固定し、更新は Renovate に任せます。

## Structure

- `css/<ドメイン>/*.user.css`: ユーザスタイル。ドメインごとにディレクトリを分ける。
- `js/<ドメイン>/*.user.js`: ユーザスクリプト。ドメインごとにディレクトリを分ける。
- `css/README.md` / `js/README.md`: ヘッダーのテンプレート。新規ファイルはこれをコピーして作る。
- `packages/css-meta.js` / `packages/js-meta.js`: ヘッダーの検証スクリプト (`npm run lint`)。
- `packages/generate-pages.js` と `packages/template.html`: 全ファイルのヘッダーから一覧ページを生成する。

## Metadata rules

ヘッダーは lint で検証され、違反すると CI が失敗します。

- 必須キーが揃っていること。CSS は `name` `namespace` `version` `description` `author` `homepageURL` `supportURL` `updateURL` `license`。JS はこれに `downloadURL` `match` `grant` `icon` を加えたもの。
- `namespace` は `tomacheese.com`。
- `homepageURL` は `https://github.com/book000/browser-user-customs`、`supportURL` はその末尾に `/issues` を付けたもの。
- `author` は `Tomachi <tomachi@tomacheese.com> (https://github.com/book000)`。
- `updateURL` (JS は `downloadURL` も) は `https://raw.githubusercontent.com/book000/browser-user-customs/master/<css または js>/<そのディレクトリからの相対パス>`。実際の配置と一致させる。
- 既存ファイルを変更するときは `version` を必ず変更する。ヘッダーやコメントだけの変更でも対象になる。

## Adding a custom

1. `css/<ドメイン>/` または `js/<ドメイン>/` にファイルを作る。ドメインのディレクトリがなければ作る。
2. `css/README.md` または `js/README.md` のテンプレートをコピーし、固定値を保ったまま項目を埋める。
3. `updateURL` (JS は `downloadURL` も) を新しいファイルのパスに合わせる。
4. コミット前に `npm run lint` を実行する。

## Conventions

- 各ファイルは単体で完結させる。共通モジュールやビルド工程は導入しない。
- 対象サイトのセレクタ依存や `!important` はユーザスタイルの性質上そのまま許容する。ただし `@match` / `@-moz-document` は意図したページ・ドメインに絞る。
- コミットは [Conventional Commits](https://www.conventionalcommits.org/)、ブランチは [Conventional Branch](https://conventional-branch.github.io) の短縮形 (`feat/...`、`fix/...`)。description は日本語 (例: `feat(add-folder-copy-button.user.js): 最新の SharePoint の画面仕様に対応`)。
- Renovate の PR にはコミットしない。秘密情報をコミットしない。
