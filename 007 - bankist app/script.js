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
    totalActions: [25000, 1100, -18000, -500, 5000, -980, -120],
    total_in() {
        return this.totalActions.filter(curr => curr > 0).reduce((acc, curr) => acc + curr, 0);
    },
    total_out() {
        return this.totalActions.filter(curr => curr < 0).reduce((acc, curr) => acc + curr, 0);
    },
    ramaining() {
        return this.totalActions.reduce((acc, curr) => acc + curr, 0);
    },
    totalInterest() {
        return this.totalActions.filter(curr => curr > 0).reduce((acc, curr) => acc + (curr * interest_per / 100), 0);
    }
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
    ramaining() {
        return this.totalActions.reduce((acc, curr) => acc + curr, 0);
    },
    totalInterest() {
        return this.totalActions.filter(curr => curr > 0).reduce((acc, curr) => acc + (curr * interest_per / 100), 0);
    }
};


const users_db = [userNik, userSu];
const interest_per = 1.2;





(function init() {
    // Add Event Handlers
    document.querySelector('main').classList.add('dontShow');
    document.querySelector('footer').classList.add('dontShow');
    document.querySelector(elements.login_btn).addEventListener('click', authentication);
    document.querySelector('.transfer-btn').addEventListener('click', transferTo);
    document.querySelector('.loan-btn').addEventListener('click', requestLoan);
    document.querySelector('.close-btn').addEventListener('click', closeAccount);
    document.body.addEventListener('keypress', e => { if (document.activeElement.classList.contains('login-info') && e.key === 'Enter') { authentication(); } else if (document.activeElement.classList.contains('req-loan') && e.key === 'Enter') { requestLoan(); } else if (document.activeElement.classList.contains('transfer-amount') && e.key === 'Enter') { transferTo(); } else if (document.activeElement.classList.contains('close-acc-pin') && e.key === 'Enter') { closeAccount(); } });

})();


function authentication() {
    let user = document.querySelector(elements.username).value.toLowerCase();
    let pass = parseInt(document.querySelector(elements.password).value);
    users_db.forEach(curr => { if (curr.name === user && curr.pass === pass) currentUser = curr; });
    loginTo();
}

function loginTo() {
    console.log(`welcome ${currentUser.fullName}`);
    clearFields();

    // bring account info on the screen..
    // 1. edit header..
    document.querySelector(elements.welcomeMessage).textContent = `Welcome back, ${currentUser.fullName}`;


    document.querySelector('main').classList.remove('dontShow');
    document.querySelector('footer').classList.remove('dontShow');
    document.querySelector('main').classList.add('main-content');
    document.querySelector('footer').classList.add('footer-part');

    updateAccountReports();
    updateFooter()
}

function updateAccountReports() {
    let reportHTML = '';
    let actions = currentUser.totalActions;
    actions.forEach((curr, idx) => reportHTML = `<div class="items"><div class="op-type ${curr > 0 ? 'op-type-depos' : 'op-type-withdraw'}">${curr > 0 ? '' + (idx + 1) + ' deposits' : '' + (idx + 1) + ' withdraw'}</div><h3 class="money-amount">${curr}€</h3></div>` + reportHTML);

    // IMPORTANT TO DO THIS!!
    document.querySelector('.reports').innerHTML = '';
    document.querySelector('.reports').insertAdjacentHTML('afterbegin', reportHTML);
    console.log(currentUser.ramaining());

    document.querySelector('.total-balance').textContent = '' + currentUser.ramaining() + '€';
}

function updateFooter() {
    let htmlStr = `<div class="left-summery"><div class="in-summery foot-summery">IN  <span style="color: rgb(19, 160, 26); font-size:1rem;">${currentUser.total_in()}€</span></div><div class="out-summery foot-summery">OUT  <span style="color: rgb(228, 42, 104); font-size:1rem;">${Math.abs(currentUser.total_out())}€</span></div><div class="int-summery foot-summery">INTEREST  <span style="color: rgb(19, 160, 26); font-size:1rem;">${currentUser.totalInterest()}€</span></div></div><div class="middle-summery"> SORT</div><div class="right-summery">You will be logged out in 05:00</div>`;
    // let htmlStr = `<div>Hello world!..</div>`;
    document.querySelector('footer').innerHTML = '';
    document.querySelector('footer').insertAdjacentHTML('afterbegin', htmlStr);
}

function clearFields() {
    document.querySelector(elements.username).value = '';
    document.querySelector(elements.password).value = '';
    document.querySelector('.opt-in').value = '';

}

function transferTo() {
    const rec = document.querySelector('.transfer-to').value;
    const amount = parseFloat(document.querySelector('.transfer-amount').value);
    let receiver;
    users_db.forEach(curr => { if (curr.fullName === rec) receiver = curr; });
    receiver.totalActions.push(amount);
    currentUser.totalActions.push(-1 * amount);
    updateAccountReports();
    updateFooter();
}

function requestLoan() {

    const loanAmount = parseFloat(document.querySelector('.req-loan').value);
    console.log(loanAmount);

    if (!Number.isNaN(loanAmount)) {
        currentUser.totalActions.push(loanAmount);

        updateAccountReports();
        updateFooter()
    }

}

function closeAccount() {

}