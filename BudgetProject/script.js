
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
        footerLists: 'lists-footer',
        recordPerc: '.exp-percent',
    };


    let addIncRecord = function (newRecord) {
        let html = '<div id="incs-%id%" class="list-items"><div class= "income-des"><p>%descript%</p></div><div class="income-val"><p>+%value%</p><svg class="del-item" id="del-inc-item%id%" width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 12.21875 10.78125 L 10.78125 12.21875 L 14.5625 16 L 10.78125 19.78125 L 12.21875 21.21875 L 16 17.4375 L 19.78125 21.21875 L 21.21875 19.78125 L 17.4375 16 L 21.21875 12.21875 L 19.78125 10.78125 L 16 14.5625 Z"/></svg></div></div>';

        let newHtml;
        newHtml = html.replace('%id%', newRecord.id);
        newHtml = newHtml.replace('%descript%', newRecord.desc);
        newHtml = newHtml.replace('%value%', newRecord.val);

        document.getElementById(DOMStrings.incList).insertAdjacentHTML('afterbegin', newHtml);
    };

    let addExpRecord = function (newRecord) {
        let html = '<div id="exps-%id%" class="list-items"><div class="exp-des"><p>%descript%</p></div><div class="exp-val">   <p>-%value%</p><div class="exp-percent">%perc%%</div><svg class="del-item" id="del-exp-item%id% width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 12.21875 10.78125 L 10.78125 12.21875 L 14.5625 16 L 10.78125 19.78125 L 12.21875 21.21875 L 16 17.4375 L 19.78125 21.21875 L 21.21875 19.78125 L 17.4375 16 L 21.21875 12.21875 L 19.78125 10.78125 L 16 14.5625 Z"/></svg></div></div>';

        let newHtml;
        newHtml = html.replace('%id%', newRecord.id);
        newHtml = newHtml.replace('%descript%', newRecord.desc);
        newHtml = newHtml.replace('%value%', newRecord.val);
        newHtml = newHtml.replace('%perc%', newRecord.perc.toFixed(0));

        document.getElementById(DOMStrings.expList).insertAdjacentHTML('afterbegin', newHtml);
    };

    let updateHeader = function (newRecord) {
        document.getElementById(DOMStrings.currentAmount).textContent = newRecord[1].toFixed(2);
        document.getElementById(DOMStrings.currentIncome).textContent = newRecord[2].toFixed(2);
        document.getElementById(DOMStrings.currentExpense).textContent = newRecord[3].toFixed(2);
        document.getElementById(DOMStrings.expenseTotalPerc).textContent = newRecord[4]+'%';
    };

    return {
        updateUiPercentages: function (percetages) {
            let i = 0;
            if (percetages.length !== 0) {
                let percents = document.querySelectorAll(DOMStrings.recordPerc);
                let percentsArr = Array.prototype.slice.call(percents);
                percentsArr.forEach(function (curr) {
                    curr.textContent = percetages[i]+'%';
                    i++;
                });
            }
        },
        updateUI: function (changes, sign) {
            if (sign === 'inc') {
                addIncRecord(changes[0]);
            } else {
                addExpRecord(changes[0]);
            }
            updateHeader(changes);
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

        updateUiList: function (delElement, changes) {
            document.getElementById(delElement).remove();
            updateHeader(changes);
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
        updatePercentages();
        return [record, db.totalAsset, db.totalIncome, db.totalExpense, db.totalPerc];

    };

    let procNewExpense = function (descript, val) {
        let record = {
            id: 0,
            desc: '',
            val: 0,
            perc: 0
        };

        db.totalAsset = db.totalAsset - val;
        db.totalExpense = db.totalExpense + val;
        if (db.totalIncome !== 0) {
            db.totalPerc = Math.round((db.totalExpense * 100) / db.totalIncome);
        } else {
            db.totalPerc = -1;
        }
        if (db.records.exps.length > 0) {
            record.id = db.records.exps[db.records.exps.length - 1].id + 1;
        } else {
            record.id = 0;
        }
        record.desc = descript;
        record.val = val;
        if (db.totalIncome !== 0) {
            record.perc = Math.round((val * 100) / db.totalIncome);
        } else {
            record.perc = -1;
        }


        db.records.exps.push(record);
        return [record, db.totalAsset, db.totalIncome, db.totalExpense, db.totalPerc];
    };

    let updatePercentages = function () {
        if (db.totalIncome !== 0) {
            db.records.exps.forEach(function (curr) {
                curr.perc = Math.round((curr.val * 100) / db.totalIncome);
            });
        } else {
            db.records.exps.forEach(function (curr) {
                curr.perc = -1;
            });
        }

    }

    let recalcBudget = function (val, type) {
        if (type === 'incs') {
            db.totalAsset = db.totalAsset - val;
            db.totalIncome = db.totalIncome - val;
            if (db.totalIncome !== 0) {
                db.totalPerc = Math.round((db.totalExpense * 100) / db.totalIncome);
            } else {
                db.totalPerc = -1;
            }
        } else {
            db.totalAsset = db.totalAsset + val;
            db.totalExpense = db.totalExpense - val;
            db.totalPerc = Math.round((db.totalExpense * 100) / db.totalIncome);
        }
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
        delItem: function (id, delType) {
            let indices, index;
            // console.log(typeof id);
            indices = db.records[delType].map(function (curr) {
                return curr.id;
            });
            index = indices.indexOf(id);
            console.log(index);
            let val = db.records[delType][index].val;
            db.records.incs.splice(index, 1);
            recalcBudget(val, delType);
            let percents = 0;
            if (delType === 'incs') {
                updatePercentages();
                percents = db.records.exps.map(function (curr) {
                    return curr.perc;
                });
            }
            console.log(percents);
            return [percents, db.totalAsset, db.totalIncome, db.totalExpense, db.totalPerc];
        },
        getpercentages: function () {
            let p = db.records.exps.map(function (curr) {
                return curr.perc;
            });
            return Array.prototype.slice.call(p);
        }
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
        uiCTRL.updateUI(changes, sign);
        if (sign === 'inc') {
            console.log(dataCTRL.getpercentages());
            uiCTRL.updateUiPercentages(dataCTRL.getpercentages());
        }
        // CLEAR INPUT FILEDS
        uiCTRL.clearFields();

    };

    let delItem = function (event) {
        let delElement = event.target.parentNode.parentNode.id;

        let delSpec = delElement.split('-');
        if (delSpec.length === 2) {
            let delType = delSpec[0];
            let id = parseInt(delSpec[1]);

            if ((delType === 'incs' || delType === 'exps') && typeof id === "number") {
                console.log(id, delType);
                let changes = dataCTRL.delItem(id, delType);
                uiCTRL.updateUiList(delElement, changes);
                if (delType === 'incs') {
                    uiCTRL.updateUiPercentages(changes[0]);

                }
            }
        }
    };

    let init = (function () {
        // ADD EVENT HANDLERS
        document.getElementById(DOMStrings.footerLists).addEventListener('click', delItem);
        document.getElementById(DOMStrings.tik).addEventListener('click', getInput);
        document.addEventListener('keypress', function (e) {
            if (e.key === 13 || e.which === 13 || e.keyCode === 13) {
                getInput();
            }
        });


    })();

})(DataController, UIController);



//

