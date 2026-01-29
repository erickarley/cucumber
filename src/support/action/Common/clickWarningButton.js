import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Clicks a warning button on 2020
 * @param  {String}   buttonText           Text on the button
 */

export default async(buttonText) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const buttonTextSelector = "//md-dialog-actions/button[contains(.,'" + buttonText + "')]";

    let elementToFind = await $$(buttonTextSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        await waitForDisplayed(buttonTextSelector);
        await checkIfElementExists(buttonTextSelector);
        await clickElement('click','button',buttonTextSelector);
    }
    else {
        let screenshotName = 'Warning-Button-' + buttonText + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
}
