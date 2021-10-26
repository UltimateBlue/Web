'use strict'

const countries = ["portugal", "germany", "spain", "iran"];

let temp;
function showCountryInfos(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
            temp = response;
            console.log(response);
            return response.json();
        })
        .then(resp => {
            const html = `
            <section class="country__container">
                <div class="flag">
                    <img class="flag" src=${resp.flags.svg} />
                </div>
                <div class="content">
                    <h1 class="country__name">${resp.name.common}</h1>
                    <h3 class="continent">${resp.region}</h3>
                    <p class="population"><span>👫</span>${(resp.population / 1000000).toFixed(2)} people</p>
                    <p class="language"><span>🗣️</span>${Object.values(resp.languages)[0]}</p>
                    <p class="currency"><span>💰</span>${Object.values(resp.currencies)[0].name}</p>
                </div>
            </section>`;
        })
        .catch(err => { console.log(err) });
}

showCountryInfos('portugal');


countries.forEach(country => {
    console.log(country);

    showCountryInfos(country);
})
