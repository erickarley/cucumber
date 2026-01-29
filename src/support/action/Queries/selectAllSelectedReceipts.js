import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Selects all rows after download option select receipts is called
 * @param  {String}   environment The menu item to choose
 */
export default async(environment) => {
    /**
     * Selector for the Tile name
     * @type {String}
     */
    let checkboxSelector = "";
    
    if (environment === 'Prod_Version') {
        checkboxSelector = "//tr[1]/th[3]";
    }
    else {
        checkboxSelector = "//tr[1]/th[3]/input";
    }
    
    let elementToFind = await $$(checkboxSelector);

    if (elementToFind.length > 0) {
        await clickElement('click','element',checkboxSelector);
    }
    else {
        let screenshotName = 'Element-ToCheckAll-NOT-AVAILABLE'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }

    // waitForDisplayed(checkboxSelector);
    // waitFor(checkboxSelector, bigPause, null, 'enabled');
    // clickElement('click','element',checkboxSelector);
}
