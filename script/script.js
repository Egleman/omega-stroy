const scroll_blocker = () => {
    const calcScroll = () => {
        let div = document.createElement('div');
        div.style.width = '500px';
        div.style.height = '500px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }
    const blockBody = () => {
        const body = document.body;
        body.style.overflowY = 'hidden';
        body.style.touchAction = 'none';
        const bodyScroll = calcScroll();
        body.style.paddingRight = `${bodyScroll}px`;
    }
    const unBlockBody = () => {
        const body = document.body;
        body.style.overflowY = 'auto';
        body.style.touchAction = 'auto';
        body.style.paddingRight = `0`;
    }
    return {
        blockBody,
        unBlockBody
    }
}


// Плавный скролл якорных ссылок
const scrollLinks = document.querySelectorAll('[scroll]');
scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const blockId = link.getAttribute('href');
        document.querySelector(blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    })
})

// Кнопки открытия модальных окон
const modalLinks = document.querySelectorAll('[toggle]');
modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const blockId = link.getAttribute('toggle');
        document.querySelector(blockId).classList.toggle('active');
        if (document.querySelector(blockId).classList.contains('active')) {
            scroll_blocker().blockBody();
        } else {
            scroll_blocker().unBlockBody();
        }
    })
})

// Маска номера телефона
const phoneInputs = document.querySelectorAll('[data-input="masked"]');
const im = new Inputmask({
    mask: '(+7|8) (999) 999-99-99',
    showMaskOnHover: false,
    showMaskOnFocus: false,
    jitMasking: true,
    inputmode: 'tel'
})
phoneInputs.forEach(input => {
    im.mask(input);
})

