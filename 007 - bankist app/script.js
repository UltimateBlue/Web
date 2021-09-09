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
    deposits: [25000, 1100, 5000],
    withdraws: [18000, 500, 980, 120],
    totalActions: [25000, 1100, -18000, -500, 5000, -980, -120],
    total_in() {
        let sum = 0;
        this.deposits.forEach(curr => sum += curr);
        return sum;
    },
    total_out() {
        let withdr = 0;
        this.withdraws.forEach(curr => withdr += curr);
        return withdr;
    },
    ramaining() {
        return this.total_in() - this.total_out();
    },
    interest: 0
};
let userSu = {
    name: 'su',
    fullName: 'Susun',
    pass: 456,
    deposits: [50000, 2500, 2300],
    withdraws: [23000, 1800, 3500, 4100, 350],
    totalActions: [50000, 2500, 2300, -23000, -1800, -3500, -4100, -350],
    total_in() {
        let sum = 0;
        this.deposits.forEach(curr => sum += curr);
        return sum;
    },
    total_out() {
        let withdr = 0;
        this.withdraws.forEach(curr => withdr += curr);
        return withdr;
    },
    ramaining() {
        return this.total_in() - this.total_out();
    },
    interest: 0
};


const users_db = [userNik, userSu];






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
    let pass = document.querySelector(elements.password).value;
    console.log(`${user} ${pass} ... Check if they are in the database ...`);
    let usr;
    users_db.forEach(curr => { if (curr.name === user) usr = curr; });
    console.log(usr);
    currentUser = usr;
    loginTo();
}

function loginTo() {
    console.log(`welcome ${currentUser.fullName}`);
    clearFields();

    // bring account info on the screen..
    // 1. edit header..
    document.querySelector(elements.welcomeMessage).textContent = `Welcome back, ${currentUser.fullName}`;

    updateAccountReports(currentUser);


    document.querySelector('main').classList.remove('dontShow');
    document.querySelector('footer').classList.remove('dontShow');
    document.querySelector('main').classList.add('main-content');
    document.querySelector('footer').classList.add('footer-part');


}

function updateAccountReports() {
    let reportHTML = '';
    let revActions = currentUser.totalActions.slice().reverse();
    revActions.forEach(curr => reportHTML += `<div class="items"><div class="op-type ${curr > 0 ? 'op-type-depos' : 'op-type-withdraw'}">${curr > 0 ? 'deposits' : 'withdraw'}</div><h3 class="money-amount">${curr}€</h3></div>`);


    document.querySelector('.reports').innerHTML = '';
    document.querySelector('.reports').insertAdjacentHTML('afterbegin', reportHTML);
    console.log(currentUser.ramaining());

    document.querySelector('.total-balance').textContent = '' + currentUser.ramaining() + '€';
}

function clearFields() {
    document.querySelector(elements.username).value = '';
    document.querySelector(elements.password).value = '';
}

function transferTo() {
    const rec = document.querySelector('.transfer-to').value;
    const amount = parseFloat(document.querySelector('.transfer-amount').value);
    let receiver;
    users_db.forEach(curr => { if (curr.fullName === rec) receiver = curr; });
    receiver.deposits.push(amount);
    receiver.totalActions.push(amount);
    currentUser.withdraws.push(amount);
    currentUser.totalActions.push(-1 * amount);
    updateAccountReports();
}

function requestLoan() {

    const loanAmount = parseFloat(document.querySelector('.req-loan').value);
    console.log(loanAmount);

    if (!Number.isNaN(loanAmount)) {
        currentUser.deposits.push(loanAmount);
        currentUser.totalActions.push(loanAmount);

        updateAccountReports();
    }

}

function closeAccount() {

}