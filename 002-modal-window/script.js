document.querySelector('.close-btn').addEventListener('click', closeModalWin);
document.querySelectorAll('.divs').forEach(curr => curr.addEventListener('click', openModalWin));
document.querySelector('.blury').addEventListener('click', closeModalWin);

document.querySelector('.blury').style.display = 'none';
document.querySelector('.hidden-modal-window').style.display = 'none';
// document.querySelector('body').classList.toggle('blury');

function closeModalWin() {
    document.querySelector('.hidden-modal-window').style.display = 'none';
    document.querySelector('.blury').style.display = 'none';
}

function openModalWin() {
    document.querySelector('.hidden-modal-window').style.display = 'flex';
    document.querySelector('.blury').style.display = 'block';


}