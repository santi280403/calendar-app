//sidenav
import sideNav from './sidenav.js';
//image change
import imgage from './change-imgage.js';
//ajaxProfil
import profile from './ajax-profile.js';
//calendar
import calendar from './calendar.js';

window.addEventListener('load', () => {
    const container = document.querySelector('.container-loader');
    container.style.opacity = '0';
    container.style.visibility = 'hidden';

    main();
});

function main() {
    new sideNav();
    new imgage();
}

new calendar();

const passChange = new profile({ id: 'Cpass' });
const emailChange = new profile({ id: 'Cemail' });
const infoChange = new profile({ id: 'Cinfo' });
const imgChange = new profile({ id: 'img' });