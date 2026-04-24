Promise.all([
    'html/modals/modal-tgke.html',
    'html/modals/modal-number-guess.html',
    'html/modals/modal-binary-calc.html',
    'html/modals/modal-puyo-puzzle.html',
    'html/modals/modal-strategy.html',
    'html/modals/modal-danmaku.html'
].map(url => fetch(url).then(r => r.text())))
.then(htmls => {
    document.getElementById('modals-container').innerHTML = htmls.join('');
});
