export default function () {

    const colorValue = document.getElementById('colorValue');
    const colorInpt = document.getElementById('color');

    colorInpt.addEventListener('input', () => {
        colorValue.value = colorInpt.value;
    });

}