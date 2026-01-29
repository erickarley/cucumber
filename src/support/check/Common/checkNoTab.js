import waitForDisplayed from '../../action/waitForDisplayed';
import checkContainsText from '../checkContainsText';
import isExisting from '../isExisting';

/**
 * Check for a Tab 
 * @param  {Type}     expectedTabName The expected Tab text
 */
export default async(expectedTabName) => {
    /**
     * The Tab of the page
     * @type {String}
     */
    const tabSelector = "//md-tab-item[.='" + expectedTabName + "']";

    let elementToFind = await $$(tabSelector);

    if (elementToFind.length == 0) {
        return true;
    } 
    else {
        let screenshotName = 'Tab-' + expectedTabName + '-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }

};
