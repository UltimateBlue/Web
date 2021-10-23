'use strict'

const countries = ["portugal", "germany", "spain", "iran"];


function showCountryInfos(country) {
    const req = new XMLHttpRequest();
    req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    req.send();

    req.addEventListener('load', getCountryInfos)
}

function getCountryInfos() {

    const data = JSON.parse(this.responseText);
    console.log(data);

    const [resp] = data;
    console.log(resp);
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
    document.querySelector('.main__container').insertAdjacentHTML('beforeend', html);
}

countries.forEach(country => {
    console.log(country);

    showCountryInfos(country);
})


