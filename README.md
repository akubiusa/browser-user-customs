# browser-user-customs

ブラウザ拡張機能の Stylus や Tampermonkey で利用できるユーザスタイルシート / ユーザスクリプトの置き場です。

一覧とインストール用リンク: [GitHub Pages](https://book000.github.io/browser-user-customs/)

## ユーザスタイル (`css/`)

[Stylus](css/README.md) で適用します。

| ファイル | 内容 |
| --- | --- |
| [css/amazon.co.jp/remove-address-name.user.css](css/amazon.co.jp/remove-address-name.user.css) | Amazon の住所情報と登録名情報を非表示にする |
| [css/emojipedia.org/avoid-scroll-disable.user.css](css/emojipedia.org/avoid-scroll-disable.user.css) | emojipedia.org のスクロール無効化を回避する |
| [css/emojipedia.org/enlarge-emoji.user.css](css/emojipedia.org/enlarge-emoji.user.css) | emojipedia.org の検索結果と一覧で絵文字を大きくする |
| [css/google.com/delete-address.user.css](css/google.com/delete-address.user.css) | Google の現在地情報を非表示にする |
| [css/google.com/delete-search-ai.user.css](css/google.com/delete-search-ai.user.css) | Google 検索結果の AI の概要を非表示にする |
| [css/search.rakuten.co.jp/remove-ads.user.css](css/search.rakuten.co.jp/remove-ads.user.css) | 楽天検索の広告を非表示にする |
| [css/ticktick.com/fix-chinese-font.user.css](css/ticktick.com/fix-chinese-font.user.css) | ticktick.com で中華フォントが使われる問題を避ける |
| [css/vault.bitwarden.com/full-size-display.user.css](css/vault.bitwarden.com/full-size-display.user.css) | Bitwarden の Web 版をフルサイズ表示にし、プレミアムの案内を消す |
| [css/yodobashi.com/remove-address-name.user.css](css/yodobashi.com/remove-address-name.user.css) | ヨドバシの住所情報と登録名情報などを非表示または伏せ字 (`******`) にする |

## ユーザスクリプト (`js/`)

[Tampermonkey](js/README.md) で適用します。

| ファイル | 内容 |
| --- | --- |
| [js/amazon.co.jp/remove-amazon-ads.user.js](js/amazon.co.jp/remove-amazon-ads.user.js) | Amazon の検索結果 (`/s?k=*`) でスポンサー商品などの広告を消す (`run()` 内の `opacity` を `.5` にすると半透明) |
| [js/copilot.cloud.microsoft/expand-mscopilot-chatbox.user.js](js/copilot.cloud.microsoft/expand-mscopilot-chatbox.user.js) | Outlook 上の Microsoft Copilot のチャット入力欄から `max-height` / `max-width` を外す |
| [js/github.com/auto-open-all-checks.user.js](js/github.com/auto-open-all-checks.user.js) | GitHub の PR で折りたたまれたチェック一覧を自動で開く |
| [js/sharepoint.com/add-folder-copy-button.user.js](js/sharepoint.com/add-folder-copy-button.user.js) | SharePoint のパンくずリストに、現在のフォルダパスを ` > ` 区切りでコピーするボタンを追加する |
| [js/yodobashi.co.jp/show-actual-price.user.js](js/yodobashi.co.jp/show-actual-price.user.js) | ヨドバシの商品ページで、販売価格からポイントを引いた実質価格を表示する |

## 開発

Node.js と `npm ci` が必要です。

```bash
npm run lint             # ヘッダーのメタデータを検証する
npm run generate-pages   # dist/index.html を生成する
```

新しいファイルの追加方法とヘッダーの規則は [AGENTS.md](AGENTS.md) を参照してください。

## ライセンス

[MIT License](LICENSE)
