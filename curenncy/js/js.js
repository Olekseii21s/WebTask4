//get reference to first select element
const currencyEl_one = document.getElementById('currency-one');


const currencyEl_two = document.getElementById('currency-two');


const amountEl_one = document.getElementById('amount-one');


const amountEl_two = document.getElementById('amount-two');


const rateEl = document.getElementById('rate');

const swap = document.getElementById('swap');


function calculate() {
    const currency_one = currencyEl_one.value;

    const currency_two = currencyEl_two.value;

    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency_one}&json`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            const currency_one_rate = data[0].rate;

            fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency_two}&json`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);

                    const currency_two_rate = data[0].rate;

                    const rate = currency_two_rate / currency_one_rate;

                    rateEl.innerText = `1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}`;

                    amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
                });
        });
}

currencyEl_one.addEventListener('change', calculate);

amountEl_one.addEventListener('input', calculate);

currencyEl_two.addEventListener('change', calculate);

amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', function() {
    const temp = currencyEl_one.value;

    currencyEl_one.value = currencyEl_two.value;

    currencyEl_two.value = temp;
    calculate();
});

calculate();


let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slider img');
    if (index < 0) {
        slideIndex = slides.length - 1;
    } else if (index >= slides.length) {
        slideIndex = 0;
    }
    slides.forEach((slide, i) => {
        if (i === slideIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

showSlide(slideIndex);

