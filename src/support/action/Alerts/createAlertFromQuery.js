import { mediumPause } from '../../constants';
import clickElement from '../clickElement';
import pause from '../pause';
import setInputfield from '../setInputField';

/**
 * operator to select
 * @param {String}      alertName     name of the alert
 */

export default async(alertName) => {
    const inputNameSelector = "//input[@ng-model='createManualAlertDialogController.alertName']";
    await setInputfield('set', alertName, inputNameSelector);
    
    const createButtonSelector = "//button[.='Create']";
    await clickElement('click','button',createButtonSelector);

    await pause(mediumPause);
}