import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';
import checkContainer from '../../check/Common/checkContainer';

/**
 * Item to click
 * @param {String}      radioButtonName     Item to click
 */

export default async(radioButtonName) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const radioButtonSelector = "//md-radio-button//div[.='"+ radioButtonName +"']/parent::md-radio-button";

    //checkContainer('not');

    let elementToFind = await $$(radioButtonSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        await waitForDisplayed(radioButtonSelector);
        await waitFor(radioButtonSelector, bigPause, null, 'enabled');
        await clickElement('click','element',radioButtonSelector);
    }
    else {
        let screenshotName = 'Radio-Button-' + radioButtonName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
    
};