import { mediumPause } from '../../constants';
import clickElement from '../clickElement';
import pause from '../pause';
import setInputfield from '../setInputField';

/**
 * links resolution to the cause
 * @param {String}      resolutionName     name of the resolution
 */

export default async(resolutionName) => {    
    await pause(mediumPause);
    const inputNameSelector = "#add-resolution-search-box";
    await setInputfield('set', resolutionName, inputNameSelector);
    await pause(mediumPause);
    const optionSelector = "//select[@id='Resolutions']/option[1]";
    await clickElement('click','selector',optionSelector);

    await pause(mediumPause);

    await clickElement("click", 'button', '#confirm-add-resolution');
}