import {
    inputBill,
    inputTip,
    inputTipField,
    inputNumPeople,
    resetButton,
} from './js/elements.js';

import {
    renderCalculation,
    toggleTipAMount,
    markDirty,
    untoggleAll,
    resetAll,
} from './js/ui.js';

inputTip.forEach((tipButton) => {
    tipButton.addEventListener('click', (evt) => {
        toggleTipAMount(evt);
        renderCalculation();
    });
});

inputTipField.addEventListener('input', untoggleAll);
inputNumPeople.addEventListener('input', () => {
    markDirty(inputNumPeople);
});

[inputBill, inputNumPeople, inputTipField].forEach((elem) =>
    elem.addEventListener('input', renderCalculation)
);

resetButton.addEventListener('click', resetAll);
