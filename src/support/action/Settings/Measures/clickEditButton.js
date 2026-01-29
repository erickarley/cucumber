import clickElement from '../../clickElement';
import waitForDisplayed from '../../waitForDisplayed';
import waitFor from '../../waitFor';
import { bigPause, mediumPause } from '../../../constants';
import checkLoadingOverlay from '../../../check/Common/checkLoadingOverlay';
import checkOverlay from '../../../check/Common/checkOverlay';
import pause from '../../pause';

/**
 * Item to edit
 * @param {String}      itemName     Item to edit
 */

export default async(itemName) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const itemEditButtonSelector = "//span[.='"+ itemName +"']/ancestor::tr/td[1]//a";
    
    await checkLoadingOverlay(true);
    await checkOverlay(true);

    await pause(mediumPause);

    let objectToCheck = await $$(itemEditButtonSelector);

    if (objectToCheck.length > 0) {

        await waitForDisplayed(itemEditButtonSelector);
        await waitFor(itemEditButtonSelector, bigPause, null, 'enabled');
        await clickElement('click','element',itemEditButtonSelector);
    }
    else {
        let screenshotName = 'Item-To-Edit-' + itemName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};