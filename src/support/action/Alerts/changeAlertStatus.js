import { smallPause } from '../../constants';
import clickElement from '../clickElement';
import pause from '../pause';

/**
 * Clicks a Status for an alert
 * @param  {String}   statusName           Name of Status
 */

export default async(statusName) => {
    /**
     * Selector for the Cause drop down
     * @type {String}
     */
    const selectorForOptions = "//div[@id='investigateUtilities']//ag-md-icon[@class='downArrow']";

    let elementToFind = await $$(selectorForOptions);

    if (elementToFind.length > 0) {
        await clickElement('click','element',selectorForOptions);
        await pause(smallPause);
        await clickElement('click', 'selector', "//md-menu-item//div[.='"+ statusName + "']")
        await pause(smallPause);
    } 
    else {
        let screenshotName = 'Alert-Status-' + statusName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
}
