import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import { bigPause, smallPause } from '../../constants';
import checkOverlay from '../../check/Common/checkOverlay';
import checkLoadingOverlay from '../../check/Common/checkLoadingOverlay';

/**
 * Opens an item
 * @param  {String}   itemName      The name of the item to open
 */
export default async (itemName) => {
    /**
     * Selector for the itemIcon
     * @type {String}
     */
    const itemIcon = "//button[@aria-label='"+ itemName +"']";

    // console.log('Waiting for Overlay 0');
    // await checkOverlay(true);
    // console.log('Waiting for Loading Overlay 0');
    // await checkLoadingOverlay(false);

    await pause(bigPause);

    let elementToFind = await $$(itemIcon);

    if (elementToFind.length > 0) {
    //Actions of the step
        await waitForDisplayed(itemIcon);
        await pause(smallPause);
        await clickElement('click', 'button', itemIcon);
        await pause(smallPause);
    }
    else {
        let screenshotName = 'Menu-Item-' + itemName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }    
};