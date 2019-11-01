window.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = '<div class="wrapper"></div>';
    let wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '<textarea name="text" id="input" autofocus></textarea> <div class="keyboard-wrap"></div>';
    let keyboardWrap = document.querySelector('.keyboard-wrap');
    keyboardWrap.innerHTML = '<div class="row"><div class="key">ё</div><div class="key">1</div><div class="key">2</div><div class="key">3</div><div class="key">4</div><div class="key">5</div><div class="key">6</div><div class="key">7</div><div class="key">8</div><div class="key">9</div><div class="key">0</div><div class="key">-</div><div class="key">=</div><div class="key special-key w-130">Backspace</div></div><div class="row"><div class="key special-key w-72">Tab</div><div class="key">й</div><div class="key">ц</div><div class="key">у</div><div class="key">к</div><div class="key">е</div><div class="key">н</div><div class="key">г</div><div class="key">ш</div><div class="key">щ</div><div class="key">з</div><div class="key">х</div><div class="key">ъ</div><div class="key">\\</div></div><div class="row"><div class="key special-key w-94">Caps lock</div><div class="key">ф</div><div class="key">ы</div><div class="key">в</div><div class="key">а</div><div class="key">п</div><div class="key">р</div><div class="key">о</div><div class="key">л</div><div class="key">д</div><div class="key">ж</div><div class="key">э</div><div class="key special-key w-130">ENTER</div></div><div class="row"><div class="key special-key w-120">Shift</div><div class="key">я</div><div class="key">ч</div><div class="key">с</div><div class="key">м</div><div class="key">и</div><div class="key">т</div><div class="key">ь</div><div class="key">б</div><div class="key">ю</div><div class="key">.</div><div class="key special-key w-156">Shift</div></div><div class="row"><div class="key special-key">Ctrl</div><div class="key special-key">Alt</div><div class="key special-key w-578">Space</div></div>'

    // keys
    let keys = document.querySelectorAll('.key');
    window.addEventListener('keypress', (e) => {

    })

});