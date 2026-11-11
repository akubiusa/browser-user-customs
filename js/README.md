# browser-user-customs/js

Tampermonkey ([Chrome](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo) / [Firefox](https://addons.mozilla.org/ja/firefox/addon/tampermonkey/)) などを用いてブラウザページにユーザスクリプトを適用する。

ユーザスクリプトのヘッダーは以下がテンプレートです。`<ファイルパス>` には `js/` からの相対パスを入れます (例: `amazon.co.jp/remove-amazon-ads.user.js`)。ヘッダーの規則は [AGENTS.md](../AGENTS.md) を参照してください。

```js
// ==UserScript==
// @name         タイトル
// @namespace    tomacheese.com
// @version      1.0.0
// @description  説明文
// @author       Tomachi <tomachi@tomacheese.com> (https://github.com/book000)
// @homepageURL  https://github.com/book000/browser-user-customs
// @supportURL   https://github.com/book000/browser-user-customs/issues
// @updateURL    https://raw.githubusercontent.com/book000/browser-user-customs/master/js/<ファイルパス>
// @downloadURL  https://raw.githubusercontent.com/book000/browser-user-customs/master/js/<ファイルパス>
// @match        対象ページの URL パターン (複数指定可)
// @icon         https://www.google.com/s2/favicons?sz=64&domain=<ドメイン>
// @grant        none
// @license      MIT
// ==/UserScript==
```
