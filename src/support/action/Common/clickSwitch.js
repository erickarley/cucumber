import waitForDisplayed from '../waitForDisplayed';
import clickElement from '../clickElement';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Look for the switch to Click
 * @param  {String}   switchText      The name of the switch to Click
 */
export default async(switchText) => {
    /**
     * Selector for the switch
     * @type {String}
     */
    const switchControlSelector = "//md-switch//div[contains(.,'" + switchText + "')]";
    
    let elementToFind = await $$(switchControlSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        await waitForDisplayed(switchControlSelector);
        await waitFor(switchControlSelector,bigPause,null, 'enabled');
        await clickElement('click','element',switchControlSelector);
    }
    else {
        let screenshotName = 'Switch-Item-' + switchText + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }    
};