
let UIController = (function () {

    let addIncRecord = function (newRecord) {
        let html = '<div id="income-%id%" class="list-items"><div class= "income-des"><p>%descript%</p></div><div class="income-val"><p>+%value%</p><svg class="del-item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M347.94 129.86L203.6 195.83a31.938 31.938 0 0 0-15.77 15.77l-65.97 144.34c-7.61 16.65 9.54 33.81 26.2 26.2l144.34-65.97a31.938 31.938 0 0 0 15.77-15.77l65.97-144.34c7.61-16.66-9.54-33.81-26.2-26.2zm-77.36 148.72c-12.47 12.47-32.69 12.47-45.16 0-12.47-12.47-12.47-32.69 0-45.16 12.47-12.47 32.69-12.47 45.16 0 12.47 12.47 12.47 32.69 0 45.16zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 448c-110.28 0-200-89.72-200-200S137.72 56 248 56s200 89.72 200 200-89.72 200-200 200z" /></svg></div></div>';

        let newHtml;
        newHtml = html.replace('%id%', newRecord.id);
        newHtml = newHtml.replace('%descript%', newRecord.descript);
        newHtml = newHtml.replace('%value%', newRecord.val);


        document.getElementById('inc-list').insertAdjacentHTML('afterbegin', newHtml);

        document.getElementById('current-income').innerHTML = '';
        document.getElementById('current-income').insertAdjacentText('afterbegin', newRecord.totalIncome.toFixed(2));

        return 1;
    };

    let addExpRecord = function (newRecord) {
        let html = '<div id="exp-%id%" class="list-items"><div class="exp-des"><p>%descript%</p></div><div class="exp-val">   <p>-%value%</p><div class="exp-percent">%perc%%</div><svg class="del-item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M347.94 129.86L203.6 195.83a31.938 31.938 0 0 0-15.77 15.77l-65.97 144.34c-7.61 16.65 9.54 33.81 26.2 26.2l144.34-65.97a31.938 31.938 0 0 0 15.77-15.77l65.97-144.34c7.61-16.66-9.54-33.81-26.2-26.2zm-77.36 148.72c-12.47 12.47-32.69 12.47-45.16 0-12.47-12.47-12.47-32.69 0-45.16 12.47-12.47 32.69-12.47 45.16 0 12.47 12.47 12.47 32.69 0 45.16zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 448c-110.28 0-200-89.72-200-200S137.72 56 248 56s200 89.72 200 200-89.72 200-200 200z"/></svg></div></div>';

        let newHtml;
        newHtml = html.replace('%id%', newRecord.id);
        newHtml = newHtml.replace('%descript%', newRecord.descript);
        newHtml = newHtml.replace('%value%', newRecord.val);
        newHtml = newHtml.replace('%perc%', newRecord.recordPerc.toFixed(0));

        document.getElementById('exp-list').insertAdjacentHTML('afterbegin', newHtml);

        document.getElementById('current-expense').innerHTML = '';
        document.getElementById('current-expense').insertAdjacentText('afterbegin', newRecord.totalExpense.toFixed(2));
        document.getElementById('expense-total-perc').innerHTML = '';
        document.getElementById('expense-total-perc').insertAdjacentText('afterbegin', newRecord.totalPerc.toFixed(0));

        return 1;
    };

    let updateHeader = function (newRecord) {
        document.getElementById('current-amount').innerHTML = '';
        document.getElementById('current-amount').insertAdjacentText('afterbegin', newRecord.totalAsset.toFixed(2));

        


    };

    return {
        updateUI: function (newRecord) {
            // console.log('update UI');    ==> OK

            let done = 0;
            if (newRecord.sign === 'inc') {
                done = addIncRecord(newRecord);
            } else {
                done = addExpRecord(newRecord);
            }
            updateHeader(newRecord);
            return done;
        },
    }


})();



let DataController = (function () {

    let totalAsset = 0;
    let totalIncome = 0;
    let totalExpense = 0;
    let totalPerc = 0;
    let records = [];
    let incNum = 0;
    let expNum = 0;




    let procNewIncome = function (newRecord) {
        // console.log('its an income');    ==> OK
        totalAsset = totalAsset + parseInt(newRecord.val);
        newRecord.totalAsset = totalAsset;
        totalIncome = totalIncome + parseInt(newRecord.val);
        newRecord.totalIncome = totalIncome;
        incNum = incNum + 1;
        newRecord.id = incNum;

        return newRecord;

    };

    let procNewExpense = function (newRecord) {
        // console.log('its an expense');   ==> OK
        totalAsset = totalAsset - parseInt(newRecord.val);
        newRecord.totalAsset = totalAsset;
        totalExpense = totalExpense + parseInt(newRecord.val);
        newRecord.totalExpense = totalExpense;
        totalPerc = (totalExpense * 100) / totalIncome;
        newRecord.totalPerc = totalPerc;
        recordPerc = (newRecord.val * 100) / totalAsset;
        newRecord.recordPerc = recordPerc;
        expNum = expNum + 1;
        newRecord.id = expNum;

        return newRecord;

    };


    // API part
    return {
        newValue: function (sign, descript, val) {
            let newRecord = {
                id: 0,
                sign: sign,
                descript: descript,
                val: val,
                totalPerc: 0,
                recordPerc: 0,
                totalAsset: 0,
                totalIncome: 0,
                totalExpense: 0,
                totalPerc
            };

            if (sign === 'inc') {
                newRecord = procNewIncome(newRecord);
            } else {
                newRecord = procNewExpense(newRecord);
            }

            // //TEMP PART BEGIN
            //     newRecord = {
            //         sign: 1,
            //         desc: 'description',
            //         val: 100
            //     };

            // //TEMP PART END
            records.push(newRecord);
            return newRecord;
        },
    }

})();



let Controller = (function (dataCTRL, uiCTRL) {

    let getInput = function () {

        //ADD EVENT HANDLERS
        let descript = document.getElementById('descript').value;
        let val = document.getElementById('money-amount').value;
        let sign = document.getElementById('plus-minus').value;
        // console.log(descript+val+sign); // ==> OK

        let newRecord = dataCTRL.newValue(sign, descript, val);
        console.log(newRecord);
        let done = uiCTRL.updateUI(newRecord);
        if (done === 1) {
            console.log('its done!');
        }

    };





    // event handlers
    document.getElementById('tik').addEventListener('click', getInput);
    document.addEventListener('keypress', function (e) {
        if (e.key === 13 || e.which === 13 || e.keyCode === 13) {
            getInput();
        }
    });







})(DataController, UIController);



//

