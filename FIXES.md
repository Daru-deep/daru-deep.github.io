# 修正記録

## 1. コンソールエラーの修正

### `js/main.js` — fadeOut/fadeIn のメソッドエラー
- **問題**: `document.querySelector()` で取得したDOM要素に `.fadeOut()` / `.fadeIn()` を呼び出していた。これらはjQueryのメソッドのため、ネイティブDOM要素には存在せずスクロールのたびにエラーが発生していた
- **修正**: `elm.fadeOut()` → `$(elm).fadeOut()`、`elm.fadeIn()` → `$(elm).fadeIn()`

### `script.js` / `Hello_World.html` — 数字始まりのクラス名
- **問題**: `1in`〜`6in` のようなクラス名は CSS の仕様上無効（クラス名は数字で始められない）。jQueryのセレクタ `$('.1in')` 等が機能せず、Workセクションのモーダルが開かなかった
- **修正**: `1in`〜`6in` → `in-1`〜`in-6` に変更（script.js・Hello_World.html 両方）

---

## 2. CSS レイアウトの修正（stylesheet.css）

| 箇所 | 問題 | 修正内容 |
|---|---|---|
| `@font-face` | `.otf` ファイルに `format("woff2")` と誤記。フォントが読み込まれない | `format("opentype")` に修正 |
| `#header` | `height: 270px` と `height: 100px` が重複宣言。後者が優先されるが前者は無意味 | 有効な `100px` だけ残す |
| `#header .list` | `text-align: right` は flex コンテナ内の子要素の配置には無効 | 削除 |
| `#work ul` | `grid-column: 3/2` はグリッドアイテム（子要素）用のプロパティ。コンテナに書いても無効 | 削除 |
| `.top-wrapper` | `display: block` は div のデフォルト値のため冗長 | 削除 |
| `.top-wrapper h1` | `align-items: center` は flex/grid コンテナ以外には無効 | 削除 |
| `.mordal_wrapper img` | `gap: 0.1rem` は flex/grid コンテナ以外には無効 | 削除 |
| `#links img` | `top: auto` は `position` が指定されていない要素には無効 | 削除 |
| `#skill ul` | `list-style: none` はグローバルリセットで設定済みのため重複 | 削除 |
| `.mordal .mordal` | `padding: 50px 50px 50px 50px` は冗長な書き方 | `padding: 50px` に短縮 |

---

## 3. movieセクション iframe のレイアウト修正

- **問題**: `<iframe width="560" height="315">` とHTML属性でサイズを固定していたため、グリッドのセル幅（約475px）をはみ出しており中央に揃わなかった。HTML属性はCSSより優先されるため、CSS側でいくら制御しても効かなかった
- **修正**:
  - HTML の `width="560" height="315"` 属性をすべて削除
  - CSS に以下を追加し、セル幅に合わせて16:9を維持するよう変更

```css
#movie iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
}
```
