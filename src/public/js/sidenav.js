const openBtn = document.getElementById('open_btn');
const closeBtn = document.getElementById('close_btn');
const sideNav = document.getElementById('nav');

export default class sideNavClass {

    constructor() {
        openBtn.addEventListener('click', this.openNav);
        closeBtn.addEventListener('click', this.closeNav);
    }

    openNav() {
        sideNav.classList.add('open');
        document.body.style.transition = 'background 1s'
        document.body.style.background = 'rgba(0,0,0,.4)';
    }

    closeNav() {
        sideNav.classList.remove('open');
        document.body.style.background = 'transparent'
    }
}