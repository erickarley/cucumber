import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import { smallPause } from '../../constants';
import pause from '../pause';
//import pause from '../pause';

/**
 * Opens a sub action
 * @param  {String}   subActionName      The name of the sub action to open
 */
export default async (subActionName) => {
    /**
     * Selector for the subAction
     * @type {String}
     */
    const subAction = "//button[contains(.,'"+ subActionName +"')]";

    let elementToFind = await $$(subAction);

    if (elementToFind.length > 0) {
        //Actions of the step
        //pause(1000);
        await waitForDisplayed(subAction);
        await browser.waitUntil(
            async () => (await $(subAction).isExisting()),
            {
                timeout: smallPause,
                timeoutMsg: 'Button is not available'
            }
        );
        await clickElement('click', 'element', subAction);
        await pause(smallPause);
    }
    else {
        let screenshotName = 'SubAction-Item-' + subActionName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }    
};