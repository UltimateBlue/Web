'use strict';


document.querySelector('button').addEventListener('click', btnHandler);

function btnHandler() {
    const input_data = document.querySelector('textarea').value;

    let ls = input_data.split('\n');

    const newlist = ls.map(curr => {
        if (curr !== '') {
            let newWord = '';
            curr.trim().split('_').forEach(cur => { newWord += cur[0].toUpperCase() + cur.slice(1) });
            console.log(`${newWord}`);
        }
    })
}