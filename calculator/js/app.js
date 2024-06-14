const screen = document.getElementById('display');
const topScreen = document.getElementById('topDisplay');
const inputButtons = document.querySelectorAll('.input-button');
const numBut = document.querySelectorAll('.numberButton');
const operationBut = document.querySelectorAll('[data-operation]');
const squareBut = document.querySelector('#squareBut');
const sqrtBut = document.querySelector('#sqrtBut');
const oneDividedBut = document.querySelector('#oneDivided');
const percentBut = document.querySelector('#percentBut');
const posNegToggler = document.querySelector('#posNegToggle');
const equalBut = document.querySelector('#equalBut');
const acBut = document.querySelector('#ac');
const delBut = document.querySelector('#del');
const dotBut = document.getElementById('dot');
const answerBut = document.getElementById('ansBut');

const maxLettersCanShow = parseInt(screen.offsetWidth / 35);

inputButtons.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add('clicked');
        setTimeout(() => {
            element.classList.remove('clicked');
        }, 100);
    });
});

window.addEventListener('load', acFunc);

let clickedBut = null, firstValue = null, secondValue = null, operator = null;

acBut.addEventListener('click', acFunc);
function acFunc() {
    topScreen.value = '';
    screen.value = '0';
    firstValue = null;
    secondValue = null;
}

delBut.addEventListener('click', () => {
    screen.value = screen.value.slice(0, -1);
});

dotBut.addEventListener('click', dotFunc);
function dotFunc() {
    if (!screen.value.includes('.')) {
        screen.value += '.';
    }
}

numBut.forEach(element => {
    element.addEventListener('click', numButFunc);
});

function numButFunc(event) {
    if (screen.value === '0') {
        screen.value = '';
    }
    if (screen.value.length < maxLettersCanShow) {
        clickedBut = event.target.innerText;
        screen.value += clickedBut;
    }
}

operationBut.forEach(element => {
    element.addEventListener('click', operation);
});

function operation(event) {
    const operatorSymbols = ['+', '-', '*', '/'];
    const clickedOperator = event.target.dataset.operation;

    if (screen.value != '' && topScreen.value == '') {
        firstValue = parseFloat(screen.value);
        operator = clickedOperator;
        topScreen.value = screen.value + " " + operator;
        screen.value = '';
    } else if (screen.value == '' && topScreen.value != '') {
        const lastChar = topScreen.value.charAt(topScreen.value.length - 1);
        if (operatorSymbols.includes(lastChar)) {
            operator = clickedOperator;
            topScreen.value = topScreen.value.slice(0, -1) + operator;
        }
    } else if (screen.value != '' && topScreen.value != '') {
        equalFunc();
        firstValue = parseFloat(screen.value);
        operator = clickedOperator;
        topScreen.value = screen.value + " " + operator;
        screen.value = '';
    } else if (operatorSymbols.includes(clickedOperator)) {
        operator = clickedOperator;
        topScreen.value = topScreen.value.slice(0, -1) + operator;
    }
}

squareBut.addEventListener('click', squareFunc);
function squareFunc() {
    if (screen.value != '') {
        screen.value = preventOverflow(Math.pow(parseFloat(screen.value), 2));
        saveAnsToLocaleStorage(screen.value);
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        });
    }
}

sqrtBut.addEventListener('click', sqrtFunc);
function sqrtFunc() {
    if (parseFloat(screen.value) >= 0) {
        screen.value = preventOverflow(Math.sqrt(parseFloat(screen.value)));
        saveAnsToLocaleStorage(screen.value);
    } else {
        screen.value = 'Invalid Input';
    }
    numBut.forEach(element => {
        element.addEventListener('click', removeAns);
    });
}

oneDividedBut.addEventListener('click', () => {
    if (screen.value != '') {
        screen.value = preventOverflow(1 / parseFloat(screen.value));
        saveAnsToLocaleStorage(screen.value);
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        });
    }
});

posNegToggler.addEventListener('click', () => {
    if (screen.value != '') {
        screen.value = parseFloat(screen.value) * -1;
    }
});

percentBut.addEventListener('click', percentFunc);
function percentFunc() {
    if (screen.value != '') {
        if (operator == '+' || operator == '-') {
            screen.value = preventOverflow(firstValue * parseFloat(screen.value) * 0.01);
        } else {
            screen.value = preventOverflow(firstValue * parseFloat(screen.value) * 0.01);
            topScreen.value = '';
            firstValue = '';
        }
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        });
    }
}

answerBut.addEventListener('click', () => {
    screen.value = JSON.parse(localStorage.getItem('smart-calc-SRT'))?.answer || 0;
});

function saveAnsToLocaleStorage(answer) {
    localStorage.setItem('smart-calc-SRT', JSON.stringify({ answer: parseFloat(answer) }));
}

equalBut.addEventListener('click', equalFunc);

function equalFunc() {
    if (screen.value && firstValue) {
        secondValue = parseFloat(screen.value);
        let result = 0;

        switch (operator) {
            case '+':
                result = firstValue + secondValue;
                break;
            case '-':
                result = firstValue - secondValue;
                break;
            case '*':
                result = firstValue * secondValue;
                break;
            case '/':
                result = firstValue / secondValue;
                break;
        }

        screen.value = preventOverflow(result);
        topScreen.value = '';
        firstValue = '';
        secondValue = '';

        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        });
        dotBut.addEventListener('click', removeAns);

        saveAnsToLocaleStorage(result);
    }
}

function preventOverflow(answer) {
    return answer.toString().length > maxLettersCanShow ? parseFloat(answer).toPrecision(maxLettersCanShow) : answer;
}

function removeAns(event) {
    screen.value = '';
    clickedBut = event.target.innerText;
    screen.value = clickedBut;
    numBut.forEach(element => {
        element.removeEventListener('click', removeAns);
    });
    dotBut.removeEventListener('click', removeAns);
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'Enter':
            equalBut.click();
            e.preventDefault();
            break;
        case 'Delete':
            delBut.click();
            e.preventDefault();
            break;
        case 'Backspace':
            acBut.click();
            e.preventDefault();
            break;
        case 'ArrowUp':
            answerBut.click();
            e.preventDefault();
            break;
        case '-':
            operationBut.forEach(element => {
                if (element.innerHTML == '−') { element.click(); }
            });
            e.preventDefault();
            break;
        case '*':
            operationBut.forEach(element => {
                if (element.innerHTML == '×') { element.click(); }
            });
            e.preventDefault();
            break;
        case '/':
            operationBut.forEach(element => {
                if (element.innerHTML == '÷') { element.click(); }
            });
            e.preventDefault();
            break;
        default:
            const targetButton = [...inputButtons].find(element => e.key === element.innerText);
            if (targetButton) {
                targetButton.click();
                e.preventDefault();
            }
    }
});
