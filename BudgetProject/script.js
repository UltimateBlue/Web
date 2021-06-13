let currentAmount=0, totalIncome=0, totalExpense=0, sign;

init();

function init(){
    document.getElementById('tik').addEventListener('click', updateAccount); 
}

function updateAccount(){
    // var e = document.getElementById('combo-sign');
    // sign = e.selectElement.options[e.selectedIndex].value;
    sign = document.getElementById('combo-sign').value;
    sleep(5000);
    // console.log(sign);
    if(sign==='+'){
            addValue(document.getElementById('descript').value,parseInt(document.getElementById('money-amount').nodeValue));
            sleep(5000);
    }else{
            delValue(document.getElementById('descript').value,parseInt(document.getElementById('money-amount').nodeValue));
            sleep(5000);
    }

}

function delExpense(){

}
function delIncome(){

}

function addValue(descript, value){
    totalIncome = totalIncome+value;
    currentAmount = currentAmount + value;
    document.getElementById('current-amount').value=currentAmount;
    document.getElementById('income-amount').value=totalAmount;


}
function delValue(descript, value){

}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}
console.log(totalIncome);
console.log(document.getElementById('combo-sign').value);
sleep(5000);