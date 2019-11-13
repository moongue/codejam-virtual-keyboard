window.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = '<div class="wrapper"></div>';
    let wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '<textarea name="text" id="input" autofocus></textarea><div class="keyboard-wrap"></div>';
    let keyboardWrap = document.querySelector('.keyboard-wrap');
    keyboardWrap.innerHTML = '<div class="row"><div class="key"><sup></sup>ё</div><div class="key"><sup>!</sup>1</div><div class="key"><sup>"</sup>2</div><div class="key"><sup>№</sup>3</div><div class="key"><sup>;</sup>4</div><div class="key"><sup>%</sup>5</div><div class="key"><sup>:</sup>6</div><div class="key"><sup>?</sup>7</div><div class="key"><sup>*</sup>8</div><div class="key"><sup>(</sup>9</div><div class="key"><sup>)</sup>0</div><div class="key"><sup>_</sup>-</div><div class="key"><sup>+</sup>=</div><div class="key special-key w-130">Backspace</div></div><div class="row"><div class="key special-key w-72">Tab</div><div class="key">й</div><div class="key">ц</div><div class="key">у</div><div class="key">к</div><div class="key">е</div><div class="key">н</div><div class="key">г</div><div class="key">ш</div><div class="key">щ</div><div class="key">з</div><div class="key">х</div><div class="key">ъ</div><div class="key">\\</div></div><div class="row"><div class="key special-key w-94" id="caps">CapsLock</div><div class="key">ф</div><div class="key">ы</div><div class="key">в</div><div class="key">а</div><div class="key">п</div><div class="key">р</div><div class="key">о</div><div class="key">л</div><div class="key">д</div><div class="key">ж</div><div class="key">э</div><div class="key special-key w-130">Enter</div></div><div class="row"><div class="key special-key w-120">Shift</div><div class="key">я</div><div class="key">ч</div><div class="key">с</div><div class="key">м</div><div class="key">и</div><div class="key">т</div><div class="key">ь</div><div class="key">б</div><div class="key">ю</div><div class="key">.</div><div class="key special-key w-156">Shift</div></div><div class="row"><div class="key special-key">Ctrl</div><div class="key special-key">Alt</div><div class="key special-key w-578">Space</div></div>'

    localStorage.setItem('language', 'rus');

    let textarea = document.getElementById('input');
    let stub = false;
    let toggle = false;

    // keys
    let keys = document.querySelectorAll('.key');
    keys.forEach(item => {
        item.addEventListener('mousedown', function () {
            this.classList.add('press');
            if (!item.classList.contains('special-key')) {
                if (toggle) {
                    textarea.value += item.innerHTML[item.innerHTML.length - 1].toUpperCase();
                } else {
                    textarea.value += item.innerHTML[item.innerHTML.length - 1];
                }
            } else if (item.classList.contains('special-key')) {

                if (item.textContent === 'Backspace') {
                    textarea.value = textarea.value.slice(0, -1);

                } else if (item.textContent === 'Enter') {
                    textarea.value += '\n';

                } else if (item.textContent === 'CapsLock') {
                    toggle ? toggle = false : toggle = true;

                    if (toggle) {
                        upperSymbols();
                    } else {
                        returnStandardCase();
                    }
                } else if (item.textContent === 'Space') {
                    textarea.value += ' ';
                }
            }
        });
        item.addEventListener('mouseup', function () {
            this.classList.remove('press');
        });
        item.addEventListener('mouseout', function () {
            this.classList.remove('press');
        });
    });

    // language switching
    runOnKeys(() => {
        if (localStorage.getItem('language') === 'rus') {
            localStorage.setItem('language', 'eng');
            translateWord();

        } else if (localStorage.getItem('language') === 'eng') {
            localStorage.setItem('language', 'rus');
            translateWord();

        }
        changeSymbolUpper();
    }, "AltLeft", "ShiftLeft");


    window.addEventListener('keydown', (e) => {
        console.log(e.key);
        keys.forEach(item => {
            if (item.innerText === e.key || item.innerText === e.code || item.innerHTML[item.innerHTML.length - 1] === e.key) {
                item.classList.add('press');

                if (!document.querySelector('#input:focus')) {
                    if (!item.classList.contains('special-key')) {
                        textarea.value += e.key;
                    }
                    if (e.keyCode === 8) {
                        textarea.value = textarea.value.slice(0, -1);
                    }
                }
            } else if (e.key === 'Control') {
                if (item.innerText === 'Ctrl') {
                    item.classList.add('press');
                }
            }
        });

        if (e.keyCode === 32) {
            textarea.value = textarea.value + ' ';
        }
        if (e.keyCode === 13) {
            textarea.value = textarea.value + '\n';
        }
        if (e.keyCode === 16) {
            upperSymbols();

            if (!stub) {
                stub = true;
                changeSymbol();
            }
        }
        if (stub) {
            keys.forEach(item => {
                if (!document.querySelector('#input:focus')) {
                    if (item.querySelector('sup')) {
                        let sup = item.querySelector('sup');
                        if (e.key === sup.textContent) {
                            textarea.value += e.key;
                        }
                    }
                }
            });
        }
        checkCapsLock(e);
    });

    window.addEventListener('keyup', (e) => {
        keys.forEach(item => {
            if (item.innerText === e.key || item.innerText === e.code || item.innerHTML[item.innerHTML.length - 1] === e.key) {
                item.classList.remove('press');

            } else if (e.key === 'Control') {
                if (item.innerText === 'Ctrl') {
                    item.classList.remove('press');
                }
            }
        });
        if (e.keyCode === 16) {
            stub = false;
            changeSymbol();
            returnStandardCase();
        }
    });

    // functions
    function checkCapsLock(event) {
        let capsLock = event.getModifierState && event.getModifierState('CapsLock');

        if (capsLock) {
            upperSymbols();
        } else {
            returnStandardCase();
        }
    }

    function returnStandardCase() {
        keys.forEach(item => {
            if (!item.classList.contains('special-key')) {
                item.style.textTransform = 'inherit';
            }
        })
    }

    function upperSymbols() {
        keys.forEach(item => {
            if (!item.classList.contains('special-key')) {
                item.style.textTransform = 'uppercase';
            }
        });
    }

    function changeSymbol() {
        if (localStorage.getItem('language') === 'rus') {
            const firstSymbol = '\\.';
            const secondSymbol = '/,';

            keys.forEach(item => {
                for (let i = 0; i < firstSymbol.length; i++) {
                    if (item.textContent === firstSymbol[i]) {
                        item.textContent = secondSymbol[i];
                    } else if (item.textContent === secondSymbol[i]) {
                        item.textContent = firstSymbol[i];
                    }
                }
            });
        } else if (localStorage.getItem('language') === 'eng') {
            const firstSymbol = '`[]\\;\',./';
            const secondSymbol = '~{}|:"<>?';

            keys.forEach(item => {
                for (let i = 0; i < firstSymbol.length; i++) {
                    if (item.textContent === firstSymbol[i]) {
                        item.textContent = secondSymbol[i];
                    } else if (item.textContent === secondSymbol[i]) {
                        item.textContent = firstSymbol[i];
                    }
                }
            });

        }
    }

    function changeSymbolUpper() {
        const firstSymbol = '@#$^&[]\\;\',./';
        const secondSymbol = '"№;:?[]\\;\',./';

        keys.forEach(item => {
            if (!item.classList.contains('special-key')) {
                let sup = item.querySelector('sup');

                if (sup) {
                    for (let i = 0; i < firstSymbol.length; i++) {
                        if (sup.textContent === firstSymbol[i]) {
                            sup.textContent = secondSymbol[i];
                        } else if (sup.textContent === secondSymbol[i]) {
                            sup.textContent = firstSymbol[i];
                        }
                    }
                }
            }
        });
    }

    function runOnKeys(func, ...codes) {
        let pressed = new Set();

        document.addEventListener('keydown', function (event) {
            pressed.add(event.code);

            for (let code of codes) {
                if (!pressed.has(code)) {
                    return;
                }
            }
            pressed.clear();

            func();
        });

        document.addEventListener('keyup', function (event) {
            pressed.delete(event.code);
        });

    }

    function translateWord() {
        const rusWord = "ёйцукенгшщзхъ\\фывапролджэячсмитьбю.";
        const engWord = "`qwertyuiop[]\\asdfghjkl;'zxcvbnm,./";

        console.log(rusWord.length, engWord.length);
        keys.forEach(item => {
            for (let i = 0; i < rusWord.length - 1; i++) {
                if (!item.classList.contains('special-key')) {
                    if (item.textContent === rusWord[i]) {
                        item.textContent = engWord[i]
                    } else if (item.textContent === engWord[i]) {
                        item.textContent = rusWord[i]
                    }
                }
            }
        });
        if (localStorage.getItem('language') === 'eng') {
            keys.forEach(item => {
                if (item.textContent === 'ю') {
                    item.textContent = '/'
                }
            })
        } else if (localStorage.getItem('language') === 'rus') {
            keys.forEach(item => {
                if (item.textContent === '/') {
                    item.textContent = '.'
                }
            })
        }
    }
});

