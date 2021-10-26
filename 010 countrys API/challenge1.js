'use strict'
let temp;

fetch('https://geocode.xyz/51.50354,-0.12768?geoit=json')
    .then(response => {
        temp = response;
        if (!response.ok) throw new Error(`Don't request so fast! (${response.status})`);
        response.json();
    })
    .then(response => console.log(`you are in the ${response.city} of ${response.country}`))
    .catch(error => console.error(error.message));