'use strict'

function restartGame() {
    if (highestScore > memo) {
        memo = highestScore;
    }
    init();
    highestScore = memo;
}
function init() {

    programGuess = Math.ceil(Math.random() * 20);
    playerGuess = 0;
    currentScore = 20;
    // highestScore = 0;

    //initialize fields
    document.querySelector('.guess-status').textContent = 'Start Guess ..';
    document.querySelector('.score').textContent = '🏆 Score: ' + currentScore;
    document.querySelector('.highscore').textContent = '🥇 Highscore: ' + highestScore;
    document.querySelector('.question-mark').textContent = '?';
    document.querySelector('.question-mark').style.width = '80px';
    document.querySelector('.player-guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';


    // add event handlers
    document.querySelector(".restart-game").addEventListener('click', restartGame);
    document.querySelector('.check-btn').addEventListener('click', handleNewGuess);
    document.addEventListener('keypress', e => {
        if (e.keyCode === 13) {
            handleNewGuess();
        }
    })

}
function handleNewGuess() {
    playerGuess = parseInt(document.querySelector('.player-guess').value);
    if (playerGuess === programGuess) {
        document.querySelector('.guess-status').textContent = rightGuess;
        if (memo < currentScore) {
            memo = currentScore;
            highestScore = memo;
        }
        document.querySelector('.highscore').textContent = '🥇 Highscore: ' + highestScore;
        document.querySelector('body').style.backgroundColor = '#009900';
        document.querySelector('.question-mark').textContent = '' + programGuess;
        document.querySelector('.question-mark').style.width = '90px';
    } else if (playerGuess < programGuess) {
        document.querySelector('.guess-status').textContent = lowGuess;
        currentScore--;
    } else if (playerGuess > programGuess) {
        document.querySelector('.guess-status').textContent = highGuess;
        currentScore--;
    }
    document.querySelector('.score').textContent = '🏆 Score: ' + currentScore;
}


const highGuess = '📈 Too high';
const lowGuess = '📉 Too low';
const rightGuess = '🎉 Correct!';
let programGuess, playerGuess;
let currentScore;
let highestScore = 0;
let memo = 0;

init();






