'use strict'
const feature = document.querySelector('.features');
const cookieMsg = document.createElement('div');
const header = document.querySelector('.general-header');
const li = document.querySelectorAll('.link-js');
const tinyBtns = document.querySelectorAll('.btn-advs-nav');
let currentSlide = 0;
const slides = document.querySelectorAll('.adv-quots');
const arrowBtns = document.querySelectorAll('.qt-arrow');
const arrowBtnL = document.querySelector('.left-arrow');
const arrowBtnR = document.querySelector('.right-arrow');

(function () {
    window.scrollTo(0, 0);
})();
// window.scrollTo(0, 0);
// console.log(`${window.scrollX} ,  ${window.scrollY}`);

// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
// };

//////////////////////////////////////////////
// cookie
//////////////////////////////////////////////
(function () {
    cookieMsg.innerHTML = 'we use cookies to improve our service and support you. <button class="cookie-btn">Got it</button>';
    // const cookieBtn = document.querySelector('.cookie-btn');
    cookieMsg.style.backgroundColor = '#666';
    cookieMsg.style.color = 'white';
    cookieMsg.style.width = '120%';
    cookieMsg.style.display = 'flex';
    cookieMsg.style.justifyContent = 'space-around';
    cookieMsg.style.alignItems = 'center';
    cookieMsg.style.height = '90px';
    cookieMsg.style.position = 'fixed';
    cookieMsg.style.bottom = '0';
    document.querySelector('body').append(cookieMsg);
    document.querySelector('.cookie-btn').addEventListener('click', function () {
        cookieMsg.remove();
    });
})();

//////////////////////////////////////////////
// modal window
//////////////////////////////////////////////
document.querySelector('.modal-open-acc').classList.add('modal-hide');
document.querySelectorAll('.openModal').forEach(curr => curr.addEventListener('click', openModal));
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && document.querySelector('.modal-open-acc').classList.contains('modal-show')) {
        closeModal();
    }
});

function openModal() {
    document.querySelector('.modal-open-acc').classList.remove('modal-hide');
    document.querySelector('.modal-open-acc').classList.add('modal-show');
    document.querySelector('main').style = 'filter: blur(10px);';
    document.querySelector('header').style = 'filter: blur(10px);';
    document.querySelector('footer').style = 'filter: blur(10px);';
    // document.querySelector('body').style = 'overflow: hidden;';

    // document.querySelector('main').blur();
}
function closeModal() {
    document.querySelector('.modal-open-acc').classList.remove('modal-show');
    document.querySelector('.modal-open-acc').classList.add('modal-hide');
    document.querySelector('main').style = 'filter: blur(0);'
    document.querySelector('header').style = 'filter: blur(0);'
    document.querySelector('footer').style = 'filter: blur(0);'
    document.querySelector('body').style = 'overflow: auto;';
}

//////////////////////////////////////////////
// smooth scroll
//////////////////////////////////////////////
document.querySelector('.link-jump-to').addEventListener('click', () => {
    feature.scrollIntoView({ behavior: 'smooth' });
});

/*
document.querySelectorAll('.goToLink').forEach(li => {
    li.addEventListener('click', (e) => {
        e.preventDefault();
        const whereToGo = this.getAttribute("href");
        console.log(`${whereToGo}`);
        document.querySelector(whereToGo).scrollIntoView({ behavior: 'smooth' });

    })
})
*/

document.querySelector('.header-menu').addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('goToLink')) {
        const whereToGo = e.target.getAttribute("href");
        document.querySelector(whereToGo).scrollIntoView({ behavior: 'smooth' });
        // let whereToGo = e.target + '';
        // const whereToGoId = whereToGo.slice(whereToGo.indexOf('#'));
        // // if whereToGo.includes()
        // document.querySelector(whereToGoId).scrollIntoView({ behavior: "smooth" });
    }
});

// unhovered menu items fade effect

header.addEventListener('mouseover', e => {
    const clicked = e.target;
    if (!clicked.classList.contains('link-js')) return;
    header.classList.remove('reset-brightness', 'red-brightness');
    clicked.classList.remove('reset-brightness', 'add-brightness');
    header.classList.add('add-brightness');
    clicked.classList.add('red-brightness');
    console.log(`${clicked.classList}  *******  ${header.classList}`);

})
/*
li.forEach(lin => lin.addEventListener('mouseover', e => {
    // header.style.filter = "brightness(200%)";
    // lin.style.filter = "brightness(50%)"
    header.classList.remove('reset-brightness', 'red-brightness');
    lin.classList.remove('reset-brightness', 'add-brightness');
    header.classList.add('add-brightness');
    lin.classList.add('red-brightness');
    console.log(`${lin.classList}`);

}));
*/
header.addEventListener('mouseout', e => {
    if (!e.target.classList.contains('link-js')) return;
    // header.style.filter = "brightness(100%)";
    header.classList.remove('add-brightness');
    e.target.classList.remove('red-brightness')
    header.classList.add('reset-brightness');
    header.querySelectorAll('.link-js').forEach(curr => curr.classList.add('reset-brightness'))
    console.log(`${e.target.classList}  *******  ${header.classList}`);

    // header.querySelectorAll('.goToLink').forEach(curr => curr.style.filter = "brightness(100%)")
});

///////////////////////////////////////////////////////
// tabbed menu
///////////////////////////////////////////////////////
document.querySelectorAll('.op-body-text').forEach(el => {
    el.classList.add('modal-hide');
    el.classList.remove('modal-show')
});

document.querySelector('.op-body-text').classList.add('modal-show');
document.querySelector('.op-body-text').classList.remove('modal-hide');



/*
document.querySelectorAll('.op-nav-btn').forEach(btn => btn.addEventListener('click', e => {
    console.log(btn.textContent);

    const btn_class = e.target.classList.item(1);
    const idx = btn_class.slice(btn_class.length - 1);
    document.querySelectorAll('.op-body-text').forEach(el => {
        el.classList.add('modal-hide');
        el.classList.remove('modal-show')
    });

    for (let i = 1; i <= 3; i++) {
        if (i !== idx) {
            document.querySelector('.op-btn' + i).style.transform = 'translateY(0)';
        }
    }

    console.log('.opt-body-' + idx);

    const selectedBody = document.querySelector('.opt-body-' + idx);
    selectedBody.classList.add('modal-show');
    selectedBody.classList.remove('modal-hide');
    e.target.style.transform = "translateY(-5px)";

    // btnClicked.style.msTransform = "translateY(5px)";

}
));
*/

document.querySelector('.op-navigator').addEventListener('click', e => {
    // Guard Clause
    if (!e.target.classList.contains('op-nav-btn')) return;
    const btn_class = e.target.classList.item(1);
    const idx = btn_class.slice(btn_class.length - 1);
    document.querySelectorAll('.op-body-text').forEach(el => {
        el.classList.add('modal-hide');
        el.classList.remove('modal-show')
    });

    document.querySelectorAll('.op-nav-btn').forEach(btn => btn.style.transform = 'translateY(0)');

    const selectedBody = document.querySelector('.opt-body-' + idx);
    selectedBody.classList.add('modal-show');
    selectedBody.classList.remove('modal-hide');
    e.target.style.transform = "translateY(-5px)";

    // btnClicked.style.msTransform = "translateY(5px)";

}
);


///////////////////////////////////////////////////
// sticky menubar
/*
document.addEventListener('scroll', e => {
    const pos = document.querySelector('.features').getBoundingClientRect();

    if (parseInt(window.scrollY) > pos.top) {
        document.querySelector('.general-header').classList.add('fixed-header');
    } else {
        document.querySelector('.general-header').classList.remove('fixed-header');

    }
})
*/
const root_margin = `-${header.getBoundingClientRect().height}px`;
const obsOptions = {
    root: null,
    threshold: 0,
    rootMargin: root_margin,
}
const obsCallback = function (entries, observer) {
    entries.forEach(entry => entry.isIntersecting ? header.classList.remove('fixed-header') : header.classList.add('fixed-header'))
}

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(document.querySelector('.above-fold-intro'));

/////////////////////////////////////////////////////////////////
// reveal section titles on scroll
const obsOptions2 = {
    root: null,
    threshold: .2,
}
const obsCallback2 = function (entries, observer2) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('slow-showup');
        // entry.isIntersecting ? entry.target.classList.add('slow-showup') : entry.target.classList.remove('slow-showup');
        observer2.unobserve(entry.target)
        // console.log(`${entry}  ---  ${entry.target.innerText}:   ${entry.target.classList}`);

    })
}

const observer2 = new IntersectionObserver(obsCallback2, obsOptions2);
document.querySelectorAll('.section-head').forEach(el => observer2.observe(el))

//////////////////////////////////////////////////////
// lazy loading images

const obsOptions3 = {
    root: null,
    threshold: 0,
}
function obsCallback3(entries, observer3) {
    console.log(`hiiiiiiiiiiiiiiiiiii`);

    const [entry] = entries;
    entry.target.src = entry.target.dataset.src;
    entry.target.style.filter = "blur(0)";

    observer3.unobserve(entry.target);

}


const observer3 = new IntersectionObserver(obsCallback3, obsOptions3);
document.querySelectorAll('.content2-img').forEach(el => observer3.observe(el));



/////////////////////////////////////////////////////////////
// implementing slider


slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${100 * idx}%)`;
    if (idx !== 0) slide.style.visibility = 'hidden';
});

arrowBtnL.addEventListener('click', e => {
    currentSlide--;

    reArrangeSlides();
});
arrowBtnR.addEventListener('click', e => {
    currentSlide++;
    reArrangeSlides();
});
/*
arrowBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        const direction = btn.classList[1].split('-')[0];
        switch (direction) {
            case 'left':
                currentSlide--;
                if (currentSlide < 0) currentSlide = 2;
                ///////////////////////////////////////////////////////////
                // break is vital in switch-case in javascript!!
                ///////////////////////////////////////////////////////////
                break;


            case 'right':
                currentSlide++;
                if (currentSlide > 2) currentSlide = 0;
                break;

        }
        */

function reArrangeSlides() {
    if (currentSlide < 0) currentSlide = 2;
    if (currentSlide > 2) currentSlide = 0;

    console.log(currentSlide);

    slides.forEach((slide, idx) => {
        let percX = (idx - currentSlide) * 100;
        slide.style.transform = `translateX(${percX}%)`;
        idx === currentSlide ? slide.style.visibility = 'visible' : slide.style.visibility = 'hidden';
        // idx !== currentSlide ? slide.style.display = 'none' : slide.style.display = 'flex'
    });


    tinyBtns.forEach(btn => {
        if (btn.classList.contains('btn-adv-' + currentSlide)) {
            btn.style.backgroundColor = '#666';
        } else {
            btn.style.backgroundColor = '#999';
        }
    });

}

// sliding by use of below small buttons

tinyBtns.forEach(btn => btn.addEventListener('click', e => {
    currentSlide = parseInt(btn.classList[1].split('-')[2]);

    /*const ev = new Event('click');
    arrowBtns.dispatchEvent(ev)*/
    reArrangeSlides();
}));

// sliding by keybourd arrows
const obsOptions4 = {
    root: null,
    threshold: .1,
}
let flag = false;

// control keys does not handle with keypress event listeners!!!!!!!!!!!!!!!
/*Note: The onkeypress event is not fired for all keys (e.g. ALT, CTRL, SHIFT, ESC) in all browsers. To detect only whether the user has pressed a key, use the onkeydown event instead, because it works for all keys.*/
document.addEventListener('keydown', keySliding);
const obsCallback4 = function (entries, observer4) {
    entries.forEach(entry => {
        if (entry.intersectionRatio > .6) {
            flag = true;
            console.log(`attached`);
        } else {
            flag = false;
            console.log(`detached`);
        }
        console.log(`${entry.intersectionRatio}`);

    })
}
const observer4 = new IntersectionObserver(obsCallback4, obsOptions4);
observer4.observe(document.querySelector('.advs-body'));

function keySliding(e) {
    console.log(e.key);


    if (e.key === 'ArrowRight' && flag) {
        currentSlide++;
        console.log(`right arrow pressed`);

        reArrangeSlides()
    } else if (e.key === 'ArrowLeft' && flag) {
        currentSlide--;
        console.log(`left arrow pressed`);

        reArrangeSlides();

    }
    console.log(`############################################`);
}



////////////////////////////////////////////////////////////////////////////////////
