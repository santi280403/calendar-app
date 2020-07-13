//image change
const prevImg = document.getElementById('prev-img');
const file = document.getElementById('inputFile');

function filePrev(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            const pre = document.getElementById('prev');
            pre.src = e.target.result;
            //prevImg.appendChild(prev);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

export default class ChangeImage {

    constructor() {
        file.addEventListener('change', function () {
            filePrev(this);
        })
    }

}