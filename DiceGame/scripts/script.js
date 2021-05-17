let totalScore, currentScore, activePlayer, dice, gamePlaying;

totalScore = [0,0];
currentScore=0;
activePlayer=0;
gamePlaying=true;

document.querySelector('#new-game').addEventListener('click',reseting);
document.querySelector('#roll').addEventListener('click',rolling);
document.querySelector('#stop').addEventListener('click',holding);
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
    activePlayer=0;
    totalScore=[0,0];
    dice=1;
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
        dice = Math.floor(Math.random() * 6) + 1;
        if (dice == 1) {
            document.querySelector('#current-' + activePlayer).textContent = '0';
            changePlayer();
            currentScore = 0;


        } else {
            currentScore = currentScore + dice;
        }
        document.getElementById('dice-face').style.display='block';
        document.querySelector('#dice-face').innerHTML = '<img' +
            ' src="images/dice-' + dice + '.png" alt="">';
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
    }
}

function holding(){
    let lastScore = document.querySelector('#total-score-'+activePlayer).textContent;
    totalScore[activePlayer]=currentScore+parseInt(lastScore);
    document.querySelector('#total-score-' + activePlayer).textContent = totalScore[activePlayer];
    if(totalScore[activePlayer]>=20){
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


// document.querySelector('#current-0').textContent=dice;