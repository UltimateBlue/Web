
let UIController = (function () {






    //update header of page - total account informations

    // add html elements to the account list in the page

    // handle del button click event; remove html elements from the account list in the page


    return {
        getValue: function () {
            return {
                opType: document.getElementById('plus-minus').value,
                description: document.getElementById('descript').value,
                amount: document.getElementById('money-amount').value
            };
            // console.log(description);
            // let input = new newEntry(opType,description,amount);
            // return input;
        },
        updateUI: function(guiInfo){
            console.log(guiInfo);
            
            document.getElementById('current-amount').value = '+' + guiInfo[0];/*
            document.getElementById('current-income').value = parseFloat(guiInfo[1]);
            document.getElementById('current-expense').value = parseFloat(guiInfo[2]);
            document.getElementById('expense-total-per').value = parseFloat(guiInfo[3]);*/
        },
        removeItem: function () {

        }

    };



})();



let CalcsController = (function () {
    
    
    // define database structures

    let totalAmount = 0, totalIncome = 0, totalExpense = 0, totalExpPerc = 0, idInc = 0, idExp=0;
    let incRecord = function (idInc, opType, description, amount) {
        this.id = idInc,
            this.opType = opType,
            this.description = description,
            this.amount = amount
    };
    let expRecord = function (idExp, opType, description, amount, perc) {
        this.id = idExp,
            this.opType = opType,
            this.description = description,
            this.amount = amount,
            this.perc = perc
    };

    let totalIncRecords = [];
    let totalExpRecords = [];

    return {
        updatedb: function (input) {
            if (input.opType === 'inc') {
                // incAmount();
                idInc = idInc+1;
                totalAmount = totalAmount + input.amount;
                totalIncome = totalIncome + input.amount;
                let record = new incRecord(idInc , input.opType,input.description,input.amount);
                totalIncRecords.push(record);
                console.log(totalIncRecords);
                return{
                    totalAmount, totalIncome, totalExpense, totalExpPerc, totalIncRecords
                };

            } else {
                // decAmount();
                idExp = idExp+1;
                totalAmount = totalAmount - input.amount;
                totalIncome = totalExpense - input.amount;
                totalExpPerc = totalExpense*100/totalAmount;

                let record = new expRecord(idExp , input.opType,input.description,input.amount, (100*input.amount)/totalAmount);
                totalExpRecords.push(record);
                console.log(totalExpRecords);
                return{
                    totalAmount, totalIncome, totalExpense, totalExpPerc, totalExpRecords
                };
            }
        }
    }


})();



let Controller = (function (CalcCTRL, UiCTRL) {

    let getNewItem = function () {
        let input = UiCTRL.getValue();
        console.log(input);
        let guiInfo = CalcCTRL.updatedb(input);
        UiCTRL.updateUI(guiInfo);
    }

    // handle ok button click event
    document.getElementById('tik').addEventListener('click', getNewItem);
    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            UiCTRL.getNewItem();
        }
    });

    // document.getElementById('del-item').addEventListener('click', UiCTRL.removeItem);





})(CalcsController, UIController);



//

