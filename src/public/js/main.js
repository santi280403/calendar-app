//sidenav
import sideNav from './sidenav.js';
//image change
import imgage from './change-imgage.js';

window.addEventListener('load', () => {
    const container = document.querySelector('.container-loader');
    container.style.opacity = '0';
    container.style.visibility = 'hidden';

    main();
});

function main() {
    new sideNav();
    new imgage();
    rederDate();
}

//calendar
const date_str = document.getElementById('date_str');
const Month = document.getElementById('month');
const days = document.querySelector('.days');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let dt = new Date();

function rederDate() {
    dt.setDate(1);
    var day = dt.getDay();
    var endDate = new Date(
        dt.getFullYear(),
        dt.getMonth() + 1,
        0
    ).getDate();

    var prevDate = new Date(
        dt.getFullYear(),
        dt.getMonth(),
        0
    ).getDate();

    var today = new Date();

    var months = [
        "January",
        "Febrary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    date_str.innerHTML = new Date().toDateString();
    Month.innerHTML = months[dt.getMonth()];

    var cells = '';

    for (let i = day; i > 0; i--) {
        cells += `<div class="prev_date">${prevDate - i + 1}</div>`
    }

    for (let i = 1; i <= endDate; i++) {
        if (i === today.getDate() && dt.getMonth() == today.getMonth()) {
            cells += `<div class="today">${i}</div>`
        } else {
            cells += `<div onclick="d(this)" value=${i}>${i}</div>`
        }

        days.innerHTML = cells
    }

}

prev.addEventListener('click', moveLeft);
next.addEventListener('click', moveRigth);

function d(e) {
    console.log(e)
}

function moveLeft() {

    dt.setMonth(dt.getMonth() - 1);
    rederDate();

}

function moveRigth() {
    dt.setMonth(dt.getMonth() + 1);
    rederDate();
}

/**
 *
 * const divsDays = document.querySelectorAll('.today');

divsDays.forEach(day => {
    console.log(day);
    day.addEventListener('click', (e) => {
        console.log(e);
    })
})

 */