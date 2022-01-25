'use strict';

const inputBill = document.querySelector('.js-input-bill');
const inputTip = document.querySelectorAll('.js-input-tip');
const inputTipField = document.querySelector('.js-input-tip-field');
const inputNumPeople = document.querySelector('.js-input-num-people');
const outputTip = document.querySelector('.js-output-tip');
const outputAmount = document.querySelector('.js-output-total');
const resetButton = document.querySelector('.js-reset');

function calculateTotalPerPerson(amount, tipFraction, numPeople) {
    return (
        amount / numPeople +
        calculateTipPerPerson(amount, tipFraction, numPeople)
    );
}

function calculateTipPerPerson(amount, tipFraction, numPeople) {
    return calculateTip(amount, tipFraction) / numPeople;
}

function calculateTip(amount, tipFraction) {
    return amount * tipFraction;
}

function outputCalculation() {
    const amount = Number(inputBill.value);
    let tipFraction = [...inputTip].reduce((prev, curr) => {
        return curr.getAttribute('aria-pressed') === 'true'
            ? Number(curr.value)
            : prev;
    }, null);
    console.log(tipFraction);
    if (tipFraction === null) {
        tipFraction = Number(inputTipField.value) / 100;
    }
    const numPeople = Number(inputNumPeople.value);
    console.log(amount, tipFraction, numPeople);
    if (!inputsAreValid({ amount, tipFraction, numPeople })) {
        disableReset();
        console.log('invalid');
        return;
    }
    outputTip.textContent = `$${calculateTipPerPerson(
        amount,
        tipFraction,
        numPeople
    ).toFixed(2)}`;
    outputAmount.textContent = `$${calculateTotalPerPerson(
        amount,
        tipFraction,
        numPeople
    ).toFixed(2)}`;
    enableReset();
}

function toggleTipAMount(evt) {
    untoggleAll();
    evt.currentTarget.setAttribute('aria-pressed', 'true');
}

function untoggleAll() {
    [...inputTip].forEach((input) =>
        input.setAttribute('aria-pressed', 'false')
    );
}

function enableReset() {
    resetButton.disabled = false;
}

function disableReset() {
    resetButton.disabled = true;
}

function inputsAreValid({ amount, tipFraction, numPeople }) {
    return (
        billIsValid(amount) &&
        tipFractionIsValid(tipFraction) &&
        numPeopleIsValid(numPeople)
    );
}

function billIsValid(amount) {
    return !Number.isNaN(amount) || amount >= 0;
}

function tipFractionIsValid(tipFraction) {
    return !Number.isNaN(tipFraction) || tipFraction >= 0;
}

function numPeopleIsValid(numPeople) {
    if (Number.isNaN(numPeople) || !Number.isInteger(numPeople)) {
        return false;
    }
    if (numPeople <= 0) {
        markInvalid(inputNumPeople, "Can't be zero");
        return false;
    }
    if (isMarkedInvalid(inputNumPeople)) {
        markValid(inputNumPeople);
    }
    return true;
}

function markInvalid(inputBox, message) {
    const input = inputBox.closest('.input');
    if (isMarkedInvalid(inputBox)) {
        return;
    }
    input.classList.add('input--invalid');
    const label = input.querySelector('.input__label');
    label.insertAdjacentHTML(
        'beforeend',
        `<span class="input__warning">${message}</span>`
    );
}

function isMarkedInvalid(inputBox) {
    const input = inputBox.closest('.input');
    return input.classList.contains('input--invalid');
}

function markValid(inputBox) {
    const input = inputBox.closest('.input');
    input.classList.remove('input--invalid');
    input.querySelector('.input__warning').remove();
}

function resetAll() {
    [inputBill, inputTipField, inputNumPeople].forEach(
        (input) => (input.value = '')
    );
    untoggleAll();
    [outputAmount, outputTip].forEach(
        (output) => (output.textContent = '$0.00')
    );
    disableReset();
}

inputTip.forEach((tipButton) => {
    tipButton.addEventListener('click', (evt) => {
        toggleTipAMount(evt);
        outputCalculation();
    });
});

inputTipField.addEventListener('input', untoggleAll);

[inputBill, inputNumPeople, inputTipField].forEach((elem) =>
    elem.addEventListener('input', outputCalculation)
);

resetButton.addEventListener('click', resetAll);
