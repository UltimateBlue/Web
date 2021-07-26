
let UIController = (function () {

    let DOMStrings = {
        incList: 'inc-list',
        currentIncome: 'current-income',
        expList: 'exp-list',
        currentExpense: 'current-expense',
        expenseTotalPerc: 'expense-total-perc',
        currentAmount: 'current-amount',
        descript: 'descript',
        moneyAmount: 'money-amount',
        plusMinus: 'plus-minus',
        tik: 'tik',
        inc: 'inc',
    };


    let addIncRecord = function (newRecord) {
        let html = '<div id="income-%id%" class="list-items"><div class= "income-des"><p>%descript%</p></div><div class="income-val"><p>+%value%</p><svg class="del-item" id="del-inc-item%id%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M347.94 129.86L203.6 195.83a31.938 31.938 0 0 0-15.77 15.77l-65.97 144.34c-7.61 16.65 9.54 33.81 26.2 26.2l144.34-65.97a31.938 31.938 0 0 0 15.77-15.77l65.97-144.34c7.61-16.66-9.54-33.81-26.2-26.2zm-77.36 148.72c-12.47 12.47-32.69 12.47-45.16 0-12.47-12.47-12.47-32.69 0-45.16 12.47-12.47 32.69-12.47 45.16 0 12.47 12.47 12.47 32.69 0 45.16zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 448c-110.28 0-200-89.72-200-200S137.72 56 248 56s200 89.72 200 200-89.72 200-200 200z" /></svg></div></div>';

        let newHtml;
        newHtml = html.replace('%id%', newRecord.id);
        newHtml = newHtml.replace('%descript%', newRecord.desc);
        newHtml = newHtml.replace('%value%', newRecord.val);

        document.getElementById(DOMStrings.incList).insertAdjacentHTML('afterbegin', newHtml);
    };

    let addExpRecord = function (newRecord) {
        let html = '<div id="exp-%id%" class="list-items"><div class="exp-des"><p>%descript%</p></div><div class="exp-val">   <p>-%value%</p><div class="exp-percent">%perc%%</div><svg class="del-item" id="del-exp-item%id% xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M347.94 129.86L203.6 195.83a31.938 31.938 0 0 0-15.77 15.77l-65.97 144.34c-7.61 16.65 9.54 33.81 26.2 26.2l144.34-65.97a31.938 31.938 0 0 0 15.77-15.77l65.97-144.34c7.61-16.66-9.54-33.81-26.2-26.2zm-77.36 148.72c-12.47 12.47-32.69 12.47-45.16 0-12.47-12.47-12.47-32.69 0-45.16 12.47-12.47 32.69-12.47 45.16 0 12.47 12.47 12.47 32.69 0 45.16zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 448c-110.28 0-200-89.72-200-200S137.72 56 248 56s200 89.72 200 200-89.72 200-200 200z"/></svg></div></div>';

        let newHtml;
        newHtml = html.replace('%id%', newRecord.id);
        newHtml = newHtml.replace('%descript%', newRecord.desc);
        newHtml = newHtml.replace('%value%', newRecord.val);
        newHtml = newHtml.replace('%perc%', newRecord.perc.toFixed(0));

        document.getElementById(DOMStrings.expList).insertAdjacentHTML('afterbegin', newHtml);
    };

    let updateHeader = function (newRecord) {
        document.getElementById(DOMStrings.currentAmount).innerHTML = '';
        document.getElementById(DOMStrings.currentAmount).insertAdjacentText('afterbegin', newRecord[1].toFixed(2));

        document.getElementById(DOMStrings.currentIncome).innerHTML = '';
        document.getElementById(DOMStrings.currentIncome).insertAdjacentText('afterbegin', newRecord[2].toFixed(2));

        document.getElementById(DOMStrings.currentExpense).innerHTML = '';
        document.getElementById(DOMStrings.currentExpense).insertAdjacentText('afterbegin', newRecord[3].toFixed(2));
        document.getElementById(DOMStrings.expenseTotalPerc).innerHTML = '';
        document.getElementById(DOMStrings.expenseTotalPerc).insertAdjacentText('afterbegin', newRecord[4].toFixed(0));

    };

    return {
        updateUI: function (changes, sign) {
            // console.log('update UI');    ==> OK

            let done = 0;
            if (sign === 'inc') {
                done = addIncRecord(changes[0]);
            } else {
                done = addExpRecord(changes[0]);
            }
            updateHeader(changes);
            return done;
        },

        getDOM: function () {
            return DOMStrings;
        },

        clearFields: function () {

            // my code, more simpler
            document.getElementById(DOMStrings.descript).value = '';
            document.getElementById(DOMStrings.moneyAmount).value = '';
            document.getElementById(DOMStrings.descript).focus();


            // tutor's code, with tutorial purposes
            // let fieldArr, fields;
            // fields = document.querySelectorAll(DOMStrings.descript+','+DOMStrings.moneyAmount);
            // fieldArr = Array.prototype.slice.call(fields);
            // fieldArr.forEach(function(current, index, array){
            //     current.value='';
            // });
            // fieldArr[0].focus();
        },
    }


})();



let DataController = (function () {

    let db = {
        records: {
            incs: [],
            exps: [],
        },
        totalPerc: 0,
        totalAsset: 0,
        totalIncome: 0,
        totalExpense: 0,
    };


    let procNewIncome = function (descript, val) {
        // console.log('its an income');    ==> OK
        let record = {
            id: 0,
            desc: '',
            val: 0
        };


        db.totalAsset = db.totalAsset + val;
        db.totalIncome = db.totalIncome + val;
        if (db.records.incs.length > 0) {
            record.id = db.records.incs[db.records.incs.length - 1].id + 1;
        } else {
            record.id = 0;
        }
        record.desc = descript;
        record.val = val;

        db.records.incs.push(record);
        return [record, db.totalAsset, db.totalIncome, db.totalExpense, db.totalPerc];

    };

    let procNewExpense = function (descript, val) {
        let record = {
            id: 0,
            desc: '',
            val: 0,
            perc: 0
        };

        db.totalAsset = db.totalAsset - val;;
        db.totalExpense = db.totalExpense + val;
        db.totalPerc = Math.round((db.totalExpense * 100) / db.totalIncome);
                
        if (db.records.exps.length > 0) {
            record.id = db.records.exps[db.records.exps.length - 1].id + 1;
        } else {
            record.id = 0;
        }
        record.desc = descript;
        record.val = val;
        record.perc = Math.round((val * 100) / db.totalIncome);

        db.records.exps.push(record);
        return [record, db.totalAsset, db.totalIncome, db.totalExpense, db.totalPerc];
    };


    // API part
    return {
        newValue: function (sign, descript, val) {
            if (sign === 'inc') {
                changes = procNewIncome(descript, val);
            } else {
                changes = procNewExpense(descript, val);
            }
            return changes;
        },
    }

})();



let Controller = (function (dataCTRL, uiCTRL) {

    let DOMStrings = uiCTRL.getDOM();

    let getInput = function () {

        // GET UI FIELDS DATA
        let descript = document.getElementById(DOMStrings.descript).value;
        let val = parseFloat(document.getElementById(DOMStrings.moneyAmount).value);
        let sign = document.getElementById(DOMStrings.plusMinus).value;

        if (isNaN(val) || val <= 0 || descript === "") {
            return;
        }

        // INSERT THE NEW RECORD IN THE DATABASE
        let changes = dataCTRL.newValue(sign, descript, val);

        // UPDATE UI
        uiCTRL.updateUI(changes,sign);

        // CLEAR INPUT FILEDS
        uiCTRL.clearFields();

    };

    let delItem = function () {
        console.log('hi');
    };

    let init = (function () {
        // ADD EVENT HANDLERS
        document.getElementById(DOMStrings.tik).addEventListener('click', getInput);
        document.addEventListener('keypress', function (e) {
            if (e.key === 13 || e.which === 13 || e.keyCode === 13) {
                getInput();
            }
        });
        // document.querySelector('.del-item').addEventListener('click', function(e){
        //     delItem();
        //     console.log(e);
        // });
    })();

})(DataController, UIController);



//

