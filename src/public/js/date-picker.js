//const dt = new Date();

export default class DatePicker {

    //layout datepicker

    datepicker = `
    <div class="display-area">
        <div class="day">Saturday</div>
        <div class="date">19</div>
        <div class="month">Oct</div>
        <div class="year">2019</div>
    </div>
    <div class="calendar-area">
        <div class="month-nav">
            <div class="month-prev">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div class="month">October 2019</div>
            <div class="month-next">
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
        <table class="tbl-calendar">
            <thead class="thead">
                <tr class="row-days">
                    <th class="th-day">Su</th>
                    <th class="th-day">Mo</th>
                    <th class="th-day">Tu</th>
                    <th class="th-day">We</th>
                    <th class="th-day">Th</th>
                    <th class="th-day">Fr</th>
                    <th class="th-day">Sa</th>
                </tr>
            </thead>
            <tbody class="tbody">
        
            </tbody>
        </table>
        <div class="month-footer">
            <div class="btn-save-picker">Save</div>
            <div class="btn-cancel-picker">Cancel</div>
        </div>
    </div>
    `

    constructor(elements) {

        this.id = elements.id;

        this.inputDate = document.getElementById(this.id);

        this.inputDate.addEventListener('focus', () => {
            if (document.getElementsByClassName("datepicker")[0]) {
                document.getElementsByClassName("datepicker")[0].remove();
            }

            this.valueInp = this.inputDate.value;

            console.log(this.valueInp)

            this.init();
        })

    }

    init() {

        if (this.inputDate.value == "") {
            this.savedDate = new Date();
        } else {
            var strDt = this.inputDate.value;
            var strDtArr = strDt.split("/");
            var strDt = strDtArr[2] + "-" + strDtArr[1] + "-" + strDtArr[0];
            this.savedDate = new Date(strDt);
        }

        this.selectedDate = this.savedDate;
        this.currentMonth = this.savedDate.getMonth();
        this.currentYear = this.savedDate.getFullYear();

        this.months = [
            { fullname: "January", shortname: "Jan" },
            { fullname: "Fabruary", shortname: "Feb" },
            { fullname: "March", shortname: "Mar" },
            { fullname: "April", shortname: "Apr" },
            { fullname: "May", shortname: "May" },
            { fullname: "June", shortname: "June" },
            { fullname: "July", shortname: "July" },
            { fullname: "August", shortname: "Aug" },
            { fullname: "September", shortname: "Sept" },
            { fullname: "October", shortname: "Oct" },
            { fullname: "November", shortname: "Nov" },
            { fullname: "December", shortname: "Dec" }
        ];

        this.days = [
            { fullname: "Sunday", shortname: "Su" },
            { fullname: "Monday", shortname: "Mo" },
            { fullname: "Tuesday", shortname: "Tu" },
            { fullname: "Wednesday", shortname: "We" },
            { fullname: "Thursday", shortname: "Th" },
            { fullname: "Friday", shortname: "Fr" },
            { fullname: "Saturday", shortname: "Sa" }
        ];

        this.createDatePicker();
        this.events();
        this.datesCalendar(this.currentMonth, this.currentYear);
        this.load();

    }

    //load page

    load() {
        let new_value = this.valueInp.split(" ")[0].split("/").reverse().join("/");
        const dt = new Date(new_value);

        this.cDay.innerHTML = this.days[dt.getDay()].fullname;
        this.cDate.innerHTML = dt.getDate();
        this.cMonth.innerHTML = this.months[dt.getMonth()].shortname;
        this.cYear.innerHTML = dt.getFullYear();
    }

    //create all the elements to datepicker

    createDatePicker() {
        this.cContainer = document.createElement('div');
        this.cContainer.classList.add('datepicker');
        document.body.appendChild(this.cContainer);

        var rect = this.inputDate.getBoundingClientRect();
        this.cContainer.style.left = rect.x + "px";
        this.cContainer.style.top = rect.y + rect.height + "px";

        this.cContainer.innerHTML = this.datepicker;


        //Get Elements display area
        this.cDisplayArea = this.cContainer.getElementsByClassName('display-area')[0];

        this.cDate = this.cDisplayArea.getElementsByClassName('date')[0];
        this.cDay = this.cDisplayArea.getElementsByClassName('day')[0];
        this.cMonth = this.cDisplayArea.getElementsByClassName("month")[0];
        this.cYear = this.cDisplayArea.getElementsByClassName("year")[0];

        //Get calendarArea
        this.cCalendarArea = this.cContainer.getElementsByClassName("calendar-area")[0];

        //month nav
        this.cMonthNavigator = this.cCalendarArea.getElementsByClassName("month-nav")[0];

        this.cMonthPrevious = this.cMonthNavigator.getElementsByClassName("month-prev")[0];
        this.cMonthNav = this.cMonthNavigator.getElementsByClassName("month")[0];
        this.cMonthNext = this.cMonthNavigator.getElementsByClassName("month-next")[0];


        //calendar Body
        this.tBody = this.cCalendarArea.getElementsByClassName("tbody")[0];

        // inpute area save and cancel button        

        this.btnSave = this.cCalendarArea.getElementsByClassName("btn-save-picker")[0];
        this.btnCancel = this.cCalendarArea.getElementsByClassName("btn-cancel-picker")[0];

    }


    //add all events
    events() {
        this.cMonthPrevious.addEventListener("click", () => { this.prev() });
        this.cMonthNext.addEventListener("click", () => { this.next() });

        this.btnCancel.addEventListener('click', () => {
            document.body.removeChild(this.cContainer);
        });

        this.btnSave.addEventListener('click', () => {
            this.inputDate.value = (this.cDate.innerHTML) + "/" + (this.selectedDate.getMonth() + 1) + '/' + this.selectedDate.getFullYear()
            document.body.removeChild(this.cContainer);
        });
    }

    //set the calendar

    datesCalendar(month, year) {
        let daysInMonth = new Date(year, month, 0).getDate();

        // Clear table body
        this.tBody.innerHTML = "";

        // Update Month above calendar
        this.cMonthNav.innerHTML = this.months[month].fullname + " " + year;


        // Generate calendar with dates

        let date = new Date(year, month, 1);

        while (date.getDate() <= daysInMonth && month == date.getMonth()) {

            let row = document.createElement("tr");

            // Generate dates
            for (let j = 0; j < 7; j++) {

                if (j == date.getDay() && month == date.getMonth()) {
                    let cell = document.createElement("td");
                    cell.classList.add("date-cell");
                    let cellText = document.createTextNode(date.getDate());

                    if (date.getDate() === this.selectedDate.getDate()
                        && year === this.selectedDate.getFullYear()
                        && month === this.selectedDate.getMonth()) {
                        cell.classList.add("dt-active");
                    }

                    date.setDate(date.getDate() + 1);
                    cell.appendChild(cellText);
                    row.appendChild(cell);



                    cell.addEventListener("click", (e) => {
                        this.selectedDate = new Date(year, month, e.target.innerHTML);
                        if (document.getElementsByClassName("dt-active")[0]) {
                            document.getElementsByClassName("dt-active")[0].classList.remove("dt-active");
                        }
                        e.target.classList.add("dt-active");
                        this.updateDisplay();
                    });

                } else {
                    let cell = document.createElement("td");
                    let cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

            }

            this.tBody.appendChild(row);

        }

    }

    //previous date
    prev() {
        this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
        this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
        this.datesCalendar(this.currentMonth, this.currentYear);
    }
    //next date
    next() {
        this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
        this.currentMonth = (this.currentMonth === 11) ? 0 : this.currentMonth + 1;
        this.datesCalendar(this.currentMonth, this.currentYear);
    }

    //update the display
    updateDisplay() {
        this.cDay.innerHTML = this.days[this.selectedDate.getDay()].fullname;
        this.cDate.innerHTML = this.selectedDate.getDate();
        this.cMonth.innerHTML = this.months[this.selectedDate.getMonth()].shortname;
        this.cYear.innerHTML = this.selectedDate.getFullYear();
    }

}