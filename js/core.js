import { inputNumPeople } from './elements.js';
import { markInvalid, markValid, isMarkedInvalid } from './ui.js';

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

export { calculateTotalPerPerson, calculateTipPerPerson, inputsAreValid };
