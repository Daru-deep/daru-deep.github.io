# JavaScript 学習記録

---

## fetch + innerHTML の相対パスの基準
> 2026-03-31

**Q**: `header.html` を fetch で注入したとき、リンクの `href` はどこが基準になる？

**A**: **今開いているページの場所**が基準になる。`header.html` の場所（`html/`フォルダ）ではない。
`fetch()` → `innerHTML` への注入はテキストをそのまま埋め込むだけなので、ブラウザはリンクを現在のページのURLを基準に解決する。
`<script src="">` や `<link href="">` のような「ファイルとして読み込む場合」は読み込み元基準になるので挙動が異なる。

---

## Promise.all + fetch によるHTML分割読み込みの仕組み
> 2026-03-31

**Q**: `Promise.all([...].map(url => fetch(url).then(r => r.text()))).then(htmls => { ... })` はどういう仕組み？

**A**:
1. `fetch(url)` — HTMLファイルをサーバーから非同期取得
2. `.then(r => r.text())` — レスポンスをテキストとして読み出す
3. `.map(...)` — 複数URLに対して上記処理を一括生成
4. `Promise.all()` — 全ファイルの取得が完了するまで待機
5. `.then(htmls => ...)` — 全部揃ったら配列を `join('')` で連結し `innerHTML` に注入

`fetch` は非同期なので `Promise.all` がないと全部揃う前に次の処理が走ってしまう。

### games.js で具体的に読む
> 2026-04-23

```js
Promise.all([
    'html/modals/modal-tgke.html',
    ...
].map(url => fetch(url).then(r => r.text())))
.then(htmls => {
    document.getElementById('modals-container').innerHTML = htmls.join('');
});
```

1. **配列** — 読み込みたいHTMLファイルのパスをまとめる
2. **`.map(...)`** — 配列の1個1個に`fetch`をかける。取得完了のタイミングはバラバラ
3. **`Promise.all(...)`** — 全部終わるまで待って、揃ったら次へ進む
4. **`.then(htmls => { ... })`** — `join('')`で連結して`modals-container`に書き込む

---

## Mixed Content ブロック
> 2026-03-31

**Q**: `http://` のCDNリンクが読み込まれない

**A**: `https://` のページ（またはローカル環境）で `http://` のリソースを読み込もうとすると、ブラウザが「Mixed Content」としてセキュリティブロックする。
解決策：`https://` のCDNに切り替えるか、ファイルをローカルに保存して相対パスで参照する。

---

## jQueryと生JSの違い
> 2026-04-03

**Q**: jQueryを使った書き方と、JSで直接書く方法の違いは？

**A**: jQueryはJSのライブラリ（便利関数集）。内部はJSで動いているのでできることは同じ、書き方が違うだけ。

| 操作 | jQuery | 生JS |
|---|---|---|
| 要素取得 | `$('.cls')` | `document.querySelectorAll('.cls')` |
| クリック | `$('.cls').on('click', fn)` | `addEventListener('click', fn)` |
| 表示 | `$('#el').fadeIn()` | `el.style.display = 'flex'` |
| HTML追加 | `$('body').append('<div>')` | `document.createElement('div')` など |

- **jQuery**: 記述が短くfadeIn等が簡単。ただし読み込みが必要でタイミング依存が生じやすい
- **生JS**: 依存なし・どこでも動く。現代の現場ではこちらが主流

---

## モーダルの仕組み（このプロジェクトの構成）
> 2026-04-03

**Q**: モーダルを新しく追加するにはどうすればいい？

**A**: 3点セットで動く。
1. `html/modals/` に新しいHTMLを作る（`<section id="gameN_wrapper">`、IDは重複しないこと）
2. `games.html` の fetch リストにそのファイルを追加
3. `js/modal.js` に `.in-N` クリックで `#gameN_wrapper` を開く処理を追加

クリック（`.in-N`）→ modal.js が検知 → `$('#gameN_wrapper').fadeIn()` → モーダル表示、という流れ。

---

## ブラウザキャッシュのクリア
> 2026-03-31

**Q**: ファイルを更新したのに表示が変わらない

**A**: ブラウザがキャッシュした古いファイルを使っている可能性がある。
`Ctrl+Shift+R`（Mac: `Cmd+Shift+R`）で強制リロードするとキャッシュを無視して再取得する。
開発中は表示がおかしいと思ったらまずこれを試す。
