import pause from '../../action/pause';
import setInputField from '../../action/setInputField';
import waitForDisplayed from '../../action/waitForDisplayed';
import { smallPause } from '../../constants';
import checkContainsText from '../checkContainsText';
import isExisting from '../isExisting';

/**
 * Check for a Tab 
 * @param  {Type}     measureName The expected Tab text
 */
export default async(measureName) => {
    /**
     * The Tab of the page
     * @type {String}
     */
    const tabSelector = "//div[@id='itemListWithSearch']//md-list-item";

    await setInputField('set',measureName,'//input[@ng-model="itemListWithSearchController.searchBoxValue"]')
    await pause(smallPause)
    let elementToFind = await $$(tabSelector);

    if (elementToFind.length == 0) {
        return true;
    } 
    else {
        let screenshotName = 'Measures-With-Name-' + measureName + '-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};
