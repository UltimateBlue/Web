let i, targetScore, totalScore, currentScore, activePlayer, dice1, dice2, gamePlaying;

init();

function init() {
    totalScore = [0, 0];
    currentScore = 0;
    previusScore = 0;
    activePlayer = 0;
    targetScore = 100;
    gamePlaying = true;
    i=1;

    document.querySelector('#new-game').addEventListener('click', reseting);
    document.querySelector('#roll').addEventListener('click', rolling);
    document.querySelector('#stop').addEventListener('click', holding);
    document.querySelector('#submit-btn').addEventListener('click', submitClicked);

    document.getElementById('tscore').value= targetScore;

}

function changePlayer(){
    activePlayer===0 ? activePlayer=1: activePlayer=0;
    // if(activePlayer==1){
    //     document.querySelector('.player-0').classList.remove('active');
    //     document.querySelector('.player-1').classList.add('active');
    // }else{
    //     document.querySelector('.player-1').classList.remove('active');
    //     document.querySelector('.player-0').classList.add('active');
    // }
    document.querySelector('.player-0').classList.toggle('active');
    document.querySelector('.player-1').classList.toggle('active')
    
}

function reseting(){
    currentScore=0;
    previusScore=0;
    activePlayer=0;
    totalScore=[0,0];
    dice1=1;
    dice2=1;
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('total-score-0').textContent='0';
    document.getElementById('total-score-1').textContent='0';
    document.querySelector('.player-0').classList.remove('active');
    document.querySelector('.player-0').classList.add('active');
    document.querySelector('.player-1').classList.remove('active');
    document.querySelector('.player-0').classList.remove('winner');
    document.querySelector('.player-1').classList.remove('winner');
    document.querySelector('#player-0').textContent='PLAYER '+activePlayer;
    document.querySelector('#player-1').textContent='PLAYER '+activePlayer;

    document.getElementById('dice-face').style.display='none';
    gamePlaying=true;
}

function rolling() {
    if (gamePlaying) {
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        if (dice1 == 1 || dice2 == 1) {
            document.querySelector('#current-' + activePlayer).textContent = '0';
            changePlayer();
            currentScore = 0;
        } else if(dice1 == 6 && dice2 == 6) {
            document.querySelector('#current-' + activePlayer).textContent = '0';
            currentScore = 0;
            totalScore[activePlayer]=0;
            document.getElementById('total-score-'+activePlayer).textContent='0';
            changePlayer();
        }else{
            currentScore = currentScore + dice1+dice2;
        }

        document.getElementById('dice-face1').style.display='block';
        document.querySelector('#dice-face1').innerHTML = '<img' +
            ' src="images/dice-' + dice1 + '.png" alt=""><img' +
            ' src="images/dice-' + dice2 + '.png" alt="">';
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
    }
}

function holding(){
    let lastScore = document.querySelector('#total-score-'+activePlayer).textContent;
    totalScore[activePlayer]=currentScore+parseInt(lastScore);
    document.querySelector('#total-score-' + activePlayer).textContent = totalScore[activePlayer];
    if(totalScore[activePlayer]>=targetScore){
        document.querySelector('.player-'+activePlayer).classList.add('winner');
        document.getElementById('player-'+activePlayer).textContent='WINNER';
        gamePlaying=false;
        document.getElementById('dice-face').style.display='none';
        // document.getElementById('roll').
    }else {
        document.querySelector('#current-' + activePlayer).textContent = '0';
        changePlayer();
    }
    currentScore=0;
}

function submitClicked(){
    targetScore=document.getElementById('tscore').value;
    // undefined, null, 0 or "" are coerced to false
    // everything else is coerced to true
    if(!targetScore){
        targetScore=100;
    }
    // console.log(targetScore);
    // sleep(2000);
    // document.getElementById('tscore').value = targetScore;
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

