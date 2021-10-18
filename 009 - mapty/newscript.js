"use strict";

class activity {
  date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
  }).format(new Date());
  id = (Date.now() + "").slice(-10);

  constructor(type, dist, dur, coord) {
    this.type = type;
    this.distance = dist;
    this.duration = dur;
    this.coord = coord;
  }
}

class Cycling extends activity {
  constructor(type, dist, dur, coord, elev) {
    super(type, dist, dur, coord);
    this.elevation = elev;
    this._calcSpeed();
  }
  _calcSpeed() {
    this.speed = (this.distance / (this.duration / 60)).toFixed(1);
    return this.speed;
  }
}

class Running extends activity {
  constructor(type, dist, dur, coord, cad) {
    super(type, dist, dur, coord);
    this.cadence = cad;
    this._clacPace();
  }
  _clacPace() {
    this.pace = (this.duration / this.distance).toFixed(1);
    return this.pace;
  }
}

/////////////////////////////////////////////////////////////

class map {
  #latitude;
  #longitude;
  #lat;
  #lng;
  #zoomLevel = 13;
  #mymap;
  #form;
  #db = [];

  constructor() {
    this.#form = document.querySelector(".input__div");
    this.select = document.querySelector("#type");
    this.distance = document.getElementById("distance");
    this.duration = document.getElementById("duration");
    this.elevlbl = document.getElementById("elevlbl");
    this.cadlbl = document.getElementById("cadlbl");
    this.elev_cad = document.getElementById("elev__cad");
    this.histories = document.querySelector(".workout__histories");

    this._getPosition();
    this._loadMap();
    this._paneUpdate();
    this.#mymap.on("click", (mapEvent) => this._handleMapClick(mapEvent));
    document.querySelector('.input__form').addEventListener('submit', this._formSubmitHandler.bind(this));
    // this.#form.addEventListener("keydown", this._formSubmitHandler.bind(this));
    this.histories.addEventListener("click", this._showWorkoutOnMap.bind(this));
    

    this.cadlbl.classList.add("hidden_dis");
    this.select.addEventListener("change", (e) =>
      this._handleWorkoutTypeChange(e)
    );
  }

  _getPosition() {
    this.#latitude = 37.7485009;
    this.#longitude = -7.4563786;
  }
  _loadMap() {
    console.log("map loaded")
    this.#mymap = L.map("map__pane").setView(
      [this.#latitude, this.#longitude],
      this.#zoomLevel
    );

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#mymap);

    L.marker([this.#latitude, this.#longitude])
      .addTo(this.#mymap)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          keepInView: true,
          autoClose: false,
          closeOnClick: false,
          closeOnEscapeKey: false,
        }).setContent("Your current location")
      )
      .openPopup();

    // LOAD DATABASE
    console.log("database red")
    this.#db = JSON.parse(window.localStorage.getItem("workout"));
    console.log(this.#db);
  }

  _handleMapClick(e) {
    console.log('map clicked')
    // open submit form
    this.#form.style.display = "flex";
    const fixFormAnimation = function () {
      this.#form.classList.remove("hidden");
    };
    setTimeout(fixFormAnimation.bind(this), 5);
    // this.#form.classList.remove("hidden");
    document.querySelector("#distance").focus();
    const { lat, lng } = e.latlng;
    [this.#lat, this.#lng] = [lat, lng];
    // console.log(this.#lat, this.#lng)
  }
  _formSubmitHandler(e) {
    console.log("inside form submit handler")
    e.preventDefault();
    // if (e.key !== "Enter" || this.#form.classList.contains("hidden")) return;
    //////////////////?????????????????????????????????????????????????????????????????????

    // get user inputs
    const workout_type = this.select.options[this.select.selectedIndex].text;
    const dist = Number(this.distance.value);
    const dur = Number(this.duration.value);
    const elevcad = Number(this.elev_cad.value);

    // check input validation
    // prettier-ignore
    const isValid = (...inputs) => inputs.every((input) => Number.isFinite(input) && input > 0);
    if (!isValid(dist, dur, elevcad)) {
      alert("All input fields must be positive numerical values");
      return;
    }
    // if (dist==='' || dur === '' || elevcad === ''){
    //   alert('All input fields must be filled');
    //   return;
    // } else if (!Number.isFinite(dist) || !Number.isFinite(dur) || !Number.isFinite(elevcad)){
    // } else if (dist <= 0 || dur <= 0 || elevcad <= 0){
    //   alert('All input fields must be positive numerical values2');
    //   return;
    // }

    // save user inputs
    let workItem;
    if (workout_type === "Cycling") {
      // prettier-ignore
      workItem = new Cycling(workout_type,dist,dur,[this.#lat, this.#lng],elevcad);
    } else {
      // prettier-ignore
      workItem = new Running(workout_type,dist,dur,[this.#lat, this.#lng],elevcad);
    }
    this.#db.push(workItem);

    // add the related information pane in the left bar of the page
    this._paneUpdate();

    // clean the forms' fields
    this.select.selectedIndex = 0;
    this.distance.value = "";
    this.duration.value = "";
    this.elev_cad.value = "";
    this.elev_cad.setAttribute("placeholder", "step/min");

    //close the form
    this.#form.classList.add("hidden");
    this.#form.style.display = "none";
    // setTimeout(fixFormAnimation.bind(this) , 100);

    // this.#form.style.display = 'flex';

    // save all the data on local storage
    window.localStorage.setItem("workout", JSON.stringify(this.#db));
    // console.log(stored);

    // test
    // console.log(this.#db);
    // }
  }

  _handleWorkoutTypeChange(e) {
    console.dir(e);
    let workout;
    if (this.select.value === "Running") {
      this.elevlbl.classList.add("hidden_dis");
      this.cadlbl.classList.remove("hidden_dis");
      this.elev_cad.setAttribute("placeholder", "step/min");
    } else {
      this.cadlbl.classList.add("hidden_dis");
      this.elevlbl.classList.remove("hidden_dis");
      this.elev_cad.setAttribute("placeholder", "meter");
    }
  }

  _showWorkoutOnMap(e) {
    if (e.target.classList.contains("workout__history")) {
      let id = e.target.id;
      const coord = this.#db.find((item) => (item.id = id)).coord;
      this.#mymap.setView(coord, this.#zoomLevel);
    }
    console.log(e.target);
    console.log(e.target);
  }

  _paneUpdate() {
    console.log("pane update function")
    /*
    let html;
    if (workItem.type === "Cycling") {
      html = `<div class="workout__history cycling__hist" id=${workItem.id}><h1 class="hist_title">Cycling on ${workItem.date}</h1><p>🏃 ${workItem.distance} <span class="unit">km</span>        ${workItem.duration} <span class="unit">MIN</span>        ⚡️ ${workItem.elevation} <span class="unit">MIN/KM</span>        ⚡️ ${workItem.speed} <span class="unit">KM/H</span></p></div>`;
    } else {
      html = `<div class="workout__history running__hist" id=${workItem.id}><h1 class="hist_title">Running on ${workItem.date}</h1><p>🏃 ${workItem.distance} <span class="unit">km</span>        ${workItem.duration} <span class="unit">MIN</span>        ⚡️ ${workItem.cadence} <span class="unit">SPM</span>        ⚡️ ${workItem.pace} <span class="unit">MIN/KM</span></p></div>`;
    }
    */
   let html = "";
   if (this.#db === null) {this.#db=[]; return}
    this.#db.forEach((workItem) => {
      console.log("for loop in pane update");
      console.log(workItem);
      if (workItem.type === "Cycling") {
        html = html.concat(
          `<div class="workout__history cycling__hist" id=${workItem.id}><h1 class="hist_title">Cycling on ${workItem.date}</h1><p>🏃 ${workItem.distance} <span class="unit">km</span>        ${workItem.duration} <span class="unit">MIN</span>        ⚡️ ${workItem.elevation} <span class="unit">MIN/KM</span>        ⚡️ ${workItem.speed} <span class="unit">KM/H</span></p></div>`
        );
      } else {
        html = html.concat(
          `<div class="workout__history running__hist" id=${workItem.id}><h1 class="hist_title">Running on ${workItem.date}</h1><p>🏃 ${workItem.distance} <span class="unit">km</span>        ${workItem.duration} <span class="unit">MIN</span>        ⚡️ ${workItem.cadence} <span class="unit">SPM</span>        ⚡️ ${workItem.pace} <span class="unit">MIN/KM</span></p></div>`
        );
      }

      L.marker([workItem.coord[0], workItem.coord[1]])
        .addTo(this.#mymap)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            keepInView: true,
            autoClose: false,
            closeOnClick: false,
            className: `${workItem.type.toLowerCase()}-popup`,
          })
        )
        .setPopupContent(
          `${
            workItem.type === "Cycling" ? "🏃‍♂️" : "🚴‍♀️"
          } ${workItem.type} on ${new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "2-digit",
          }).format(new Date())}`
        )
        .openPopup();
    });

    document
      .querySelector(".workout__histories").innerHTML='';
    document
      .querySelector(".workout__histories")
      .insertAdjacentHTML("afterbegin", html);
    console.log("pane updated")
    // insert a marker on the map
  }
  getDB(){
    console.log(this.#db)
  }
}

const mapi = new map();
