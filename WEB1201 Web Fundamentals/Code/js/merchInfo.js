const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".product-image img");

let activeImageSlide = 0;

productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('selected');
        item.classList.add('selected');
        productImageSlide.src = `${item.src}`;
        activeImageSlide = i;
    })
})

const sizeBtns = document.querySelectorAll('.size-radio-btn');
let checkedBtn = 0;

sizeBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        sizeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn = i;
    })
})

function incrementValue() {
    const inputElement = document.getElementById('quantity');
    const maxValue = parseInt(inputElement.getAttribute('max'));
    const currentValue = parseInt(inputElement.value);

    if (currentValue < maxValue) {
        inputElement.value = currentValue + 1;
    }
}

function decrementValue() {
    const inputElement = document.getElementById('quantity');
    const minValue = parseInt(inputElement.getAttribute('min'));
    const currentValue = parseInt(inputElement.value);

    if (currentValue > minValue) {
        inputElement.value = currentValue - 1;
    }
}

function checkMaxValue(inputElement) {
    const maxValue = parseInt(inputElement.getAttribute('max'));
    const enteredValue = parseInt(inputElement.value);

    if (enteredValue > maxValue) {
        inputElement.value = maxValue;
    }
}

var modal = document.getElementById("notif");
var btn = document.getElementById("cart-btn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}