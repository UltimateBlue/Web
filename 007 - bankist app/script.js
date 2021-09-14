'use strict'

const elements = {
    login_btn: '.login-btn',
    username: '.user',
    password: '.pin',
    welcomeMessage: '.who-is-working'
}

let currentUser;

let userNik = {
    name: 'nik',
    fullName: 'Nikzad',
    pass: 123,
    totalActions: [25000, 1100, -18000, -500, 5000, -980, -120, -2000],
    total_in() {
        return this.totalActions.filter(curr => curr > 0).reduce((acc, curr) => acc + curr, 0);
    },
    total_out() {
        return this.totalActions.filter(curr => curr < 0).reduce((acc, curr) => acc + curr, 0);
    },
    remaining() {
        return this.totalActions.reduce((acc, curr) => acc + curr, 0);
    },
    totalInterest() {
        return this.totalActions.filter(curr => curr > 0).reduce((acc, curr) => acc + (curr * interest_per / 100), 0);
    },
    movementsDates: [
        '2018-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2021-06-25T18:49:59.371Z',
        '2021-07-26T12:01:20.894Z',
    ],
    currency: 'IRR',
    locale: 'fa-IR',
};
let userSu = {
    name: 'su',
    fullName: 'Susun',
    pass: 456,
    totalActions: [50000, -23000, 2500, -1800, -3500, 2300, -4100, -350],
    total_in() {
        return this.totalActions.filter(curr => curr > 0).reduce((acc, curr) => acc + curr, 0);
    },
    total_out() {
        return this.totalActions.filter(curr => curr < 0).reduce((acc, curr) => acc + curr, 0);
    },
    remaining() {
        return this.totalActions.reduce((acc, curr) => acc + curr, 0);
    },
    totalInterest() {
        return this.totalActions.filter(curr => curr > 0).reduce((acc, curr) => acc + (curr * interest_per / 100), 0);
    },
    movementsDates: [
        '2018-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2021-07-26T17:01:17.194Z',
        '2021-07-28T23:36:17.929Z',
        '2021-08-01T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'en-US', // de-DE
};


const users_db = [userNik, userSu];
const interest_per = 1.2;
let sorted = false;

init();



function init() {
    // Add Event Handlers
    document.querySelector('main').classList.remove('main-content');
    document.querySelector('footer').classList.remove('footer-part');
    document.querySelector('main').classList.add('dontShow');
    document.querySelector('footer').classList.add('dontShow');
    document.querySelector(elements.login_btn).addEventListener('click', authentication);
    document.querySelector('.transfer-btn').addEventListener('click', transferTo);
    document.querySelector('.loan-btn').addEventListener('click', requestLoan);
    document.querySelector('.close-btn').addEventListener('click', closeAccount);
    document.querySelector('.middle-summery').addEventListener('click', sortReports);
    document.body.addEventListener('keypress', e => { if (document.activeElement.classList.contains('login-info') && e.key === 'Enter') { authentication(); } else if (document.activeElement.classList.contains('req-loan') && e.key === 'Enter') { requestLoan(); } else if (document.activeElement.classList.contains('transfer-amount') && e.key === 'Enter') { transferTo(); } else if (document.activeElement.classList.contains('close-acc-pin') && e.key === 'Enter') { closeAccount(); } });
    document.querySelector(elements.welcomeMessage).textContent = 'Log in to get started';
    currentUser = undefined;
};


function authentication() {
    // e.preventDefault();
    let user = document.querySelector(elements.username).value.toLowerCase();
    let pass = parseInt(document.querySelector(elements.password).value);
    // currentUser = users_db.find(curr => curr.name === user);
    // currentUser.pass === pass && loginTo();
    // 
    users_db.forEach(curr => { if (curr.name === user && curr.pass === pass) currentUser = curr; });
    currentUser && loginTo();
}

function loginTo() {
    console.log(`welcome ${currentUser.fullName}`);
    clearFields();




    // bring account info on the screen..
    // 1. edit header..
    document.querySelector(elements.welcomeMessage).textContent = `Welcome back, ${currentUser.fullName}`;

    updateAccountReports(currentUser.totalActions);
    updateFooter();

    document.querySelector('main').classList.remove('dontShow');
    document.querySelector('footer').classList.remove('dontShow');
    document.querySelector('main').classList.add('main-content');
    document.querySelector('footer').classList.add('footer-part');


}

function updateAccountReports(actions) {
    let reportHTML = '';
    // let actions = currentUser.totalActions;
    //.split('T')[0].replace('-', '/').replace('-', '/')
    const opt = { year: 'numeric', month: 'numeric', day: 'numeric' }
    const opt_currency = { style: 'currency', currency: currentUser.currency };
    actions.forEach((curr, idx) => reportHTML = `<div class="items coloring-${idx % 2}"><div class="item-type-date"><div class="op-type ${curr > 0 ? 'op-type-depos' : 'op-type-withdraw'}">${curr > 0 ? '' + Intl.NumberFormat(currentUser.locale).format(idx + 1) + (currentUser.locale === 'fa-IR' ? ' واریز ' : ' Deposite') : '' + Intl.NumberFormat(currentUser.locale).format(idx + 1) + (currentUser.locale === 'fa-IR' ? ' برداشت ' : ' Withdraw')}</div><p style="font-size: .6rem; margin-left: 5px;">${Intl.DateTimeFormat(currentUser.locale, opt).format(new Date(currentUser.movementsDates[idx]))}</p></div><h3 class="money-amount">${Intl.NumberFormat(currentUser.locale, opt_currency).format(curr)}</h3></div>` + reportHTML);
    /*
    const today = new Date(Date.now());
    const new_movDates = currentUser.movementsDates.map(curr => Math.trunc(Math.abs(today - (new Date(curr))) / (24 * 3600000)));
    console.log(new_movDates);

    const daysLeft = Array.from({ length: currentUser.movementsDates.length }, (curr, i) => {
        let d = new_movDates[i];
        if (d === 0) {
            return 'TODAY';
        } else if (d === 1) {
            return 'YESTERDAY';
        } else if (d >= 2 && d < 30) {
            return new_movDates[i] + ' DAYS AGO';
        } else if (d / 30 >= 1 && d < 366) {
            return Math.trunc(d / 30) + ' MONTH AGO';
        } else if (d > 365) {
            return Math.trunc(d / 365) + ' YEARS AGO';
        }
    });

    console.log(daysLeft);


    actions.forEach((curr, idx) => reportHTML = `<div class="items coloring-${idx % 2}"><div class="item-type-date"><div class="op-type ${curr > 0 ? 'op-type-depos' : 'op-type-withdraw'}">${curr > 0 ? '' + (idx + 1) + ' deposits' : '' + (idx + 1) + ' withdraw'}</div><p style="font-size: .6rem; margin-left: 5px;">${'  ' + daysLeft[idx]}</p></div><h3 class="money-amount">${curr.toFixed(2)}€</h3></div>` + reportHTML);
    */

    // IMPORTANT TO DO THIS!!
    document.querySelector('.reports').innerHTML = '';
    document.querySelector('.reports').insertAdjacentHTML('afterbegin', reportHTML);
    console.log(currentUser.remaining());

    // currentUser.locale = navigator.language;

    document.querySelector('.total-balance').textContent = Intl.NumberFormat(currentUser.locale, opt_currency).format(currentUser.remaining());

    const options = { year: 'numeric', month: 'numeric', day: 'numeric', /*weekday: 'short',*/ hour: 'numeric', minute: 'numeric' };
    document.querySelector('.login-time').textContent = 'As of ' + Intl.DateTimeFormat(currentUser.locale, options).format(new Date());
    console.log(`${currentUser.name} ${currentUser.locale}`);

    // const date = (new Date(Date.now())).toISOString();
    // document.querySelector('.login-time').textContent = 'As of ' + date.split('T')[0].replace('-', '/').replace('-', '/') + ', ' + date.split('T')[1].split('.')[0].slice(0, 5);
}

function updateFooter() {
    // let htmlStr = `<div class="left-summery"><div class="in-summery foot-summery">IN  <span style="color: rgb(19, 160, 26); font-size:1rem;">${currentUser.total_in()}€</span></div><div class="out-summery foot-summery">OUT  <span style="color: rgb(228, 42, 104); font-size:1rem;">${Math.abs(currentUser.total_out())}€</span></div><div class="int-summery foot-summery">INTEREST  <span style="color: rgb(19, 160, 26); font-size:1rem;">${currentUser.totalInterest()}€</span></div></div><div class="middle-summery">&downarrow: SORT</div><div class="right-summery">You will be logged out in 05:00</div>`;
    // let htmlStr = `<div>Hello world!..</div>`;
    // document.querySelector('footer').innerHTML = '';
    // document.querySelector('footer').insertAdjacentHTML('afterbegin', htmlStr);
    // document.querySelector('.IN-footer').textContent = currentUser.total_in().toFixed(2) + '€';
    const opt_currency = { style: 'currency', currency: currentUser.currency };
    document.querySelector('.IN-footer').textContent = Intl.NumberFormat(currentUser.locale, opt_currency).format(currentUser.total_in());
    document.querySelector('.OUT-footer').textContent = Intl.NumberFormat(currentUser.locale, opt_currency).format(Math.abs(currentUser.total_out()));
    // document.querySelector('.INT-footer').textContent = currentUser.totalInterest().toFixed(2) + '€';
    document.querySelector('.INT-footer').textContent = Intl.NumberFormat(currentUser.locale, opt_currency).format(currentUser.totalInterest());
    const date = new Date();
    let h = 1, m = 59;
    const logout_time = setInterval(function () {
        document.querySelector('.right-summery').textContent = `You will be logged out in ${('' + h).padStart(2, '0')}: ${('' + m).padStart(2, '0')}`;

        if (m === 0 && h >= 0) {
            --h; m = 59;
        } else if (m !== 0 && h >= 0) {
            --m;
        } else if (h < 0) {
            h = 1;
            m = 59;
        }
        if (h === 1 && m === 59) {
            clearInterval(logout_time);
            init();
        }

    }, 1000);
    // document.querySelector('.right-summery').textContent = `You will be logged out in ${ date.getHours() }:${ date.getMinutes() } `;
}

function clearFields() {
    document.querySelector(elements.username).value = '';
    document.querySelector(elements.username).blur();
    document.querySelector(elements.password).value = '';
    document.querySelector(elements.password).blur();   // so loose the focus!
    document.querySelectorAll('.opt-in').forEach(curr => curr.value = '');
}

function transferTo() {
    const rec = document.querySelector('.transfer-to').value;
    const amount = parseFloat(document.querySelector('.transfer-amount').value);
    let receiver = users_db.find(curr => curr.fullName === rec);
    // users_db.forEach(curr => { if (curr.fullName === rec) receiver = curr; });
    if (amount > 0 && currentUser.remaining() >= amount && receiver && receiver.fullName !== currentUser.fullName) {
        receiver?.totalActions.push(amount);
        currentUser?.totalActions.push(-1 * amount);
        currentUser?.movementsDates.push((new Date(Date.now())).toISOString().split('T')[0].replace('-', '/').replace('-', '/'));
        updateAccountReports(currentUser.totalActions);
        updateFooter();
        clearFields();
    }
}



function requestLoan() {
    const loanAmount = parseFloat(document.querySelector('.req-loan').value);
    if (!Number.isNaN(loanAmount)) {
        setTimeout(() => {
            currentUser.totalActions.push(loanAmount);
            currentUser.movementsDates.push((new Date(Date.now())).toISOString().split('T')[0].replace('-', '/').replace('-', '/'));

            updateAccountReports(currentUser.totalActions);
            updateFooter();
            clearFields();
        }, 5000);
    }
}

function closeAccount() {
    const usrCheck = document.querySelector('.close-acc-usr').value;
    const pinCheck = parseInt(document.querySelector('.close-acc-pin').value);

    if (usrCheck === currentUser.name && pinCheck === currentUser.pass) {
        const idx = users_db.findIndex(curr => curr.name === usrCheck);
        users_db.splice(idx, 1)
        console.log(users_db);

        clearFields();

        // bring account info on the screen..
        // 1. edit header..
        document.querySelector(elements.welcomeMessage).textContent = `Log in to get started`;


        document.querySelector('main').classList.add('dontShow');
        document.querySelector('footer').classList.add('dontShow');
        document.querySelector('main').classList.remove('main-content');
        document.querySelector('footer').classList.remove('footer-part');
    }

}


function sortReports() {
    let reps = sorted ? currentUser.totalActions : currentUser.totalActions.slice().sort((a, b) => a > b ? 1 : -1);
    updateAccountReports(reps);
    sorted = !sorted;
}
