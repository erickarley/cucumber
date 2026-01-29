import { mediumPause } from '../../constants';
import clickElement from '../clickElement';
import pause from '../pause';
import setInputfield from '../setInputField';

/**
 * operator to select
 * @param {String}      reopenNotes     name of the alert
 */

export default async(reopenNotes) => {
    const inputNameSelector = "//md-dialog-content//textarea";
    await setInputfield('set', reopenNotes, inputNameSelector);
    
    const createButtonSelector = "#dialogSubmitButton";
    await clickElement('click','button',createButtonSelector);

    await pause(mediumPause);
}