const firstnameField = document.getElementById('firstname');
const lastnameField = document.getElementById('lastname');

export default class ProfileAjax {

    modalPass = `
                <div class="modal">
                    <div class="modal-header">
                        <h1></h1>
                    </div>
                    <div class="modal-body">
                        <input class="input" required/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-cancel">Cancel</button>
                        <button type="button" class="btn-save">Save</button>
                    </div>
                </div>
            `

    constructor(options) {
        this.id = options.id;
        this.modalID = options.modal;
        this.element = document.getElementById(this.id);

        this.element.addEventListener('click', (e) => {
            if (e.target.id == 'Cpass') {

                this.addModalPassword();
                this.addEventsPass();
                this.addAttribute('type', 'password');
                this.addAttribute('placeholder', 'New Password');
                this.addTitle('Change Password');

                this.sendPassword();
            }

            if (e.target.id == 'Cemail') {

                this.addModalPassword();
                this.addEventsPass();
                this.addAttribute('type', 'email');
                this.addAttribute('placeholder', 'New Email');
                this.addTitle('Change Email');

                this.addEventsPass('http://localhost:3100/edit_email');
            }

            if (e.target.id == 'Cinfo') {


                this.addModalPassword();
                this.addAttribute('type', 'text');
                this.addAttribute('placeholder', 'New Firstname');
                this.addInput();
                this.addTitle('Change Info');
                this.sendInfo();
            }

        })

    }

    addModalPassword() {
        this.cCondatiner = document.createElement('div');
        this.cCondatiner.classList.add('modal-container');
        this.cCondatiner.classList.add('active');
        document.getElementById('modal').appendChild(this.cCondatiner);

        this.cCondatiner.innerHTML = this.modalPass;

        //Select all elements to DOM
        this.modalArea = this.cCondatiner.getElementsByClassName('modal')[0];

        this.input = this.modalArea.getElementsByClassName('input')[0];

        this.modalBody = this.modalArea.getElementsByClassName('modal-body')[0];

        this.title = this.modalArea.getElementsByTagName('h1')[0];

        this.btnSavePass = this.modalArea.getElementsByClassName('btn-save')[0];
        this.btnCancelPass = this.modalArea.getElementsByClassName('btn-cancel')[0];
    }

    addInput() {
        this.input_two = document.createElement('input');
        this.input_two.classList.add('input');
        this.input_two.setAttribute('type', 'text')
        this.input_two.setAttribute('placeholder', 'New Lastname')
        this.modalBody.appendChild(this.input_two);
    }

    addEventsPass() {
        this.btnCancelPass.addEventListener('click', e => {
            this.cCondatiner.classList.remove('active');
        })
    }

    addAttribute(attribute, value) {
        this.input.setAttribute(attribute, value);
    }

    addTitle(title) {
        this.title.innerHTML = title;
    }

    sendPassword() {
        this.btnSavePass.addEventListener('click', () => {
            const data = {
                valueIn: this.input.value,
            }
            fetch('http://localhost:3100/edit_pass', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-type': 'application/json' }
            })
                .then(res => res.text())
                .then(data => {
                    console.log(data)
                    alert(data);
                    this.cCondatiner.classList.remove('active');
                })
            //console.log(method, URI, data)
        })
    }

    sendInfo() {
        this.btnSavePass.addEventListener('click', () => {
            const data = {
                firstname: this.input.value,
                lastname: this.input_two.value
            }
            fetch('/edit_info', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    firstnameField.innerHTML = data.firstname;
                    lastnameField.innerHTML = data.lastname;
                    this.cCondatiner.classList.remove('active');
                })
            //console.log(method, URI, data)
        })
    }
}