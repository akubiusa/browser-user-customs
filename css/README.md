# browser-user-customs/css

Stylus ([Chrome](https://chrome.google.com/webstore/detail/clngdbkpkpeebahjckkjfobafhncgmne) / [Firefox](https://addons.mozilla.org/ja/firefox/addon/styl-us/)) などを用いてブラウザページにユーザスタイルを適用する。

スタイルシートのヘッダーは以下がテンプレートです。`<ファイルパス>` には `css/` からの相対パスを入れます (例: `amazon.co.jp/remove-address-name.user.css`)。ヘッダーの規則は [AGENTS.md](../AGENTS.md) を参照してください。

```css
/* ==UserStyle==
@name           タイトル
@namespace      tomacheese.com
@version        1.0.0
@description    説明文
@author         Tomachi <tomachi@tomacheese.com> (https://github.com/book000)
@homepageURL    https://github.com/book000/browser-user-customs
@supportURL     https://github.com/book000/browser-user-customs/issues
@updateURL      https://raw.githubusercontent.com/book000/browser-user-customs/master/css/<ファイルパス>
@license        MIT License
==/UserStyle== */
```
