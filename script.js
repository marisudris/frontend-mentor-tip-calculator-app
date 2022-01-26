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
    isToggled,
    untoggleAll,
    resetAll,
} from './js/ui.js';

inputTip.forEach((tipButton) => {
    tipButton.addEventListener('click', (evt) => {
        if (isToggled(evt)) {
            untoggleAll();
        } else {
            toggleTipAMount(evt);
        }
        renderCalculation();
    });
});

inputTipField.addEventListener('input', untoggleAll);

[inputBill, inputNumPeople, inputTipField].forEach((elem) =>
    elem.addEventListener('input', renderCalculation)
);

resetButton.addEventListener('click', resetAll);
