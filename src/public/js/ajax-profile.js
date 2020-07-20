const firstnameField = document.getElementById('firstname');
const lastnameField = document.getElementById('lastname');

export default class ProfileAjax {


    //modal to information, password and email
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

    //modal to img
    modalImg = `<div class="box">
        <div class="img">
            <img src="/img/no-image.png" id="prev" class="prevImg"/>
        </div>    
        <div class="form-img">
            <div class="form-heading">
                <h1>Change Image</h1>
            </div>
            <form enctype="multipart/form-data" method="POST" class="form-data" action="/edit_img">
                <div class="div-file">
                    <p class="add-file">Add File</p>
                    <input type="file" name="image" class="btn-file" id="inputFile">
                </div>
                <button class="btn-save">Save</button>
                <button class="btn-cancel">Cancel</button>
            </form>
        </div>
    
    </div>`

    constructor(options) {
        this.id = options.id;
        this.element = document.getElementById(this.id);

        this.element.addEventListener('click', (e) => {
            //to password
            if (e.target.id == 'Cpass') {

                this.addModal();
                this.addEventsPass();
                this.addAttribute('type', 'password');
                this.addAttribute('placeholder', 'New Password');
                this.addTitle('Change Password');

                this.sendPassword();
            }

            //to email
            if (e.target.id == 'Cemail') {

                this.addModal();
                this.addEventsPass();
                this.addAttribute('type', 'email');
                this.addAttribute('placeholder', 'New Email');
                this.addTitle('Change Email');

                this.sendEmail();
            }

            //to information
            if (e.target.id == 'Cinfo') {


                this.addModal();
                this.addEventsPass();
                this.addAttribute('type', 'text');
                this.addAttribute('placeholder', 'New Firstname');
                this.addInput();
                this.addTitle('Change Info');
                this.sendInfo();

            }

            //to img
            if (e.target.id == 'img') {
                this.addModalImg();
                this.eventToImg();
            }

        })

    }

    //add modal to email, password or information
    addModal() {
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

    //add modal to img
    addModalImg() {
        this.containerImg = document.createElement('div')
        this.containerImg.classList.add('conatiner-box')
        document.getElementById('modal').appendChild(this.containerImg);

        this.containerImg.innerHTML = this.modalImg;

        this.boxArea = this.containerImg.getElementsByClassName('box')[0];

        this.inputFile = this.boxArea.getElementsByClassName('btn-file')[0];
        this.imgPrev = this.boxArea.getElementsByClassName('prevImg')[0];

        this.form = this.boxArea.getElementsByClassName('form-data')[0];
        this.btnCancelImg = this.boxArea.getElementsByClassName('btn-cancel')[0];
    }

    //add input to info 
    addInput() {
        this.input_two = document.createElement('input');
        this.input_two.classList.add('input');
        this.input_two.setAttribute('type', 'text')
        this.input_two.setAttribute('placeholder', 'New Lastname')
        this.modalBody.appendChild(this.input_two);
    }

    //add event to modal email, password or info
    addEventsPass() {
        this.btnCancelPass.addEventListener('click', e => {
            this.cCondatiner.classList.remove('active');
        })
    }


    //event to img
    eventToImg() {
        this.btnCancelImg.addEventListener('click', () => {
            this.containerImg.remove();
        })

        this.inputFile.addEventListener('change', () => {

            if (this.inputFile.files && this.inputFile.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imgPrev.src = e.target.result;
                    //prevImg.appendChild(prev);
                }
                reader.readAsDataURL(this.inputFile.files[0]);
            }
        })
    }

    //set attribute to inputs
    addAttribute(attribute, value) {
        this.input.setAttribute(attribute, value);
    }

    //add title to modal
    addTitle(title) {
        this.title.innerHTML = title;
    }

    //send password ajax
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

    //send email ajax
    sendEmail() {
        this.btnSavePass.addEventListener('click', () => {
            const data = {
                valueIn: this.input.value,
            }
            fetch('http://localhost:3100/edit_email', {
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

    //send info ajax
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