import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause, smallPause } from '../../constants';
import pause from '../pause';

/**
 * Clicks a button on 2020
 * @param  {String}   buttonText           Text on the button
 */

export default async (buttonText) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const buttonTextSelector = "//button/span[contains(.,'" + buttonText + "')]";

    let elementToFind = await $$(buttonTextSelector);

    if (elementToFind.length > 0) {
        //waitForDisplayed(buttonTextSelector);
        if (await $(buttonTextSelector).isEnabled()) {
            // waitFor(buttonTextSelector, longPause, null, 'enabled');
            await clickElement('click','button',buttonTextSelector);
            await pause(smallPause);
        }
        else {
            let screenshotName = 'Button-To-Click' + buttonText + '-NOT-ENABLED'; 
            screenshotName = screenshotName.replace(/\//g,'-');
            await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
            throw Error(screenshotName);
        }

    }
    else {
        let screenshotName = 'Button-To-Click' + buttonText + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
}
