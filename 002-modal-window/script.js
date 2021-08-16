document.querySelector('.close-btn').addEventListener('click', closeModalWin);
document.querySelector('.divs').addEventListener('click', openModalWin);



function closeModalWin() {
    document.querySelector('.fixed-fullscreen-div').style.display = 'none';
}

function openModalWin() {
    document.querySelector('.fixed-fullscreen-div').style.display = 'flex';

}