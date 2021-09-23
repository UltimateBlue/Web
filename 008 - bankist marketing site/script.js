'use strict'
//////////////////////////////////////////////
// cookie
//////////////////////////////////////////////
const cookieMsg = document.createElement('div');
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
    const feature = document.querySelector('.features');
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
const header = document.querySelector('.general-header');
const li = document.querySelectorAll('.link-js');
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

document.addEventListener('scroll', e => {
    const pos = document.querySelector('.features').getBoundingClientRect();

    if (parseInt(window.scrollY) > pos.top) {
        document.querySelector('.general-header').classList.add('fixed-header');
    } else {
        document.querySelector('.general-header').classList.remove('fixed-header');

    }
})