import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Opens a tab
 * @param  {String}   tabName      The name of the tab to open
 */
export default async(tabName) => {
    /**
     * Selector for the tabName
     * @type {String}
     */
    const tabLabel = "//md-tab-item[.='"+ tabName +"']";

    let elementToFind = await $$(tabLabel);

    if (elementToFind.length > 0) {
    //Actions of the step
        await waitForDisplayed(tabLabel);
        await checkIfElementExists(tabLabel);
        await clickElement('click', 'button', tabLabel);
    }
    else {
        let screenshotName = 'Settings-Tab-' + tabName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};