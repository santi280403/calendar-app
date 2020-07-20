import Color from './color.js';
import DatePicker from './date-picker.js';

const date_str = document.getElementById('date_str');
const Month = document.getElementById('month');
const days = document.querySelector('.days');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');


//elements to modal
const modalContainer = document.querySelector('.container-modal');
const btnCancel = document.querySelector('.btn-cancel-calendar');
const btnSend = document.querySelector('.btn-send-calendar');

const startDate = document.getElementById('start');
const endDate = document.getElementById('end');

let dt = new Date();


function calendar() {

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
            cells += `<div class="today" id="day">${i}</div>`
        } else {
            cells += `<div id="day">${i}</div>`
        }

        days.innerHTML = cells
    }

    Calendar.prototype.updateDate();
    Calendar.prototype.setDates();

}


export default class Calendar {

    constructor() {

        this.init();
    }

    init() {
        new DatePicker({ id: 'start' });
        new DatePicker({ id: 'end' });
        Color();
        calendar();

        this.events();
    }

    setDates() {
        if (startDate.value == '') {
            this.savedDate = new Date();
        } else {
            var strDt = startDate.value;
            var strDtArr = strDt.split("/");
            var strDt = strDtArr[2] + "-" + strDtArr[1] + "-" + strDtArr[0];
            this.savedDate = new Date(strDt);
        }

        this.selectedDate = this.savedDate;

        //console.log(this.selectedDate)
    }

    updateDate() {
        const dayHtml = document.querySelectorAll('#day');

        dayHtml.forEach(e => {
            e.addEventListener('click', d => {
                if (document.getElementsByClassName('today')[0]) {
                    document.getElementsByClassName('today')[0].classList.remove('today')
                }
                d.target.classList.add('today');

                modalContainer.classList.add('show');
                //this.selectedDate = new Date(year, month, r.target.innerHTML); (dt.getMonth() + 1)

                startDate.value = d.target.innerHTML + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear()
                endDate.value = d.target.innerHTML + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear()
            })
            let dt_2 = new Date(2020, 6, 15)
            if (dt_2.getDate() == e.innerHTML && dt.getMonth() == dt_2.getMonth()) {
                e.style.color = 'red'
            }
        });
    }

    events() {
        next.addEventListener('click', this.moveRigth);
        prev.addEventListener('click', this.moveLeft);

        btnCancel.addEventListener('click', () => {
            modalContainer.classList.remove('show');
        })

        btnSend.addEventListener('click', e => {
            this.setDates();
            //console.log(this.selectedDate)

            const startValue = startDate.value;

            console.log(startValue)

            let new_value = startValue.split(" ")[0].split("/").reverse().join("/");

            console.log(new_value);

            const dt_3 = new Date(new_value);

            console.log(dt_3)
        })
    }

    moveRigth() {
        dt.setMonth(dt.getMonth() + 1);
        calendar();
    }

    moveLeft() {
        dt.setMonth(dt.getMonth() - 1);
        calendar();
    }

}