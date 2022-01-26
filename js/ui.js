import {
    inputBill,
    inputTip,
    inputTipField,
    inputNumPeople,
    resetButton,
    outputTip,
    outputAmount,
} from './elements.js';

import {
    calculateTipPerPerson,
    calculateTotalPerPerson,
    inputsAreValid,
} from './core.js';

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

function markValid(inputBox) {
    const input = inputBox.closest('.input');
    input.classList.remove('input--invalid');
    input.querySelector('.input__warning').remove();
}

function isMarkedInvalid(inputBox) {
    const input = inputBox.closest('.input');
    return input.classList.contains('input--invalid');
}

function gatherInputs() {
    const amount = Number(inputBill.value);
    let tipFraction = [...inputTip].reduce((prev, curr) => {
        return curr.getAttribute('aria-pressed') === 'true'
            ? Number(curr.value)
            : prev;
    }, null);
    if (tipFraction === null) {
        tipFraction = Number(inputTipField.value) / 100 || 0;
    }
    const numPeople = Number(inputNumPeople.value);

    return { amount, tipFraction, numPeople };
}

function renderCalculation() {
    const { amount, tipFraction, numPeople } = gatherInputs();
    if (!inputsAreValid({ amount, tipFraction, numPeople })) {
        disableReset();
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

function isToggled(evt) {
    return evt.currentTarget.getAttribute('aria-pressed') === 'true';
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

export {
    markInvalid,
    markValid,
    isMarkedInvalid,
    renderCalculation,
    toggleTipAMount,
    isToggled,
    untoggleAll,
    resetAll,
};
