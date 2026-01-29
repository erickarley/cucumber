import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause } from '../../constants';
import checkOverlay from '../../check/Common/checkOverlay';
import checkLoadingOverlay from '../../check/Common/checkLoadingOverlay';

/**
 * Clicks a button with certain icon
 * @param  {String}   buttonIcon           Name of the icon on the button
 */

export default async (buttonIcon) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const buttonIconSelector = "//button/ag-md-icon[@icon='" + buttonIcon + "']";
    // console.log('Waiting for Overlay 0');
    await checkOverlay(true);
    // console.log('Waiting for Loading Overlay 0');
    await checkLoadingOverlay(true);

    let elementToFind = await $$(buttonIconSelector);

    if (elementToFind.length > 0) {

        await waitForDisplayed(buttonIconSelector);
        await waitFor(buttonIconSelector, longPause, null, 'enabled');
        await clickElement('click','element',buttonIconSelector);
    }
    else {
        let screenshotName = 'IconButton-To-Click' + buttonIcon + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
}
