import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Open the chosen dashboard
 * @param  {Number}   rowNumber      The name of the dashboard to open
 */
export default async(rowNumber) => {
    /**
     * Selector for the dashboardIcon
     * @type {String}
     */
    const dashboardIcon = "//tr[" + rowNumber +"]/td[1]";

    let elementToFind = await $$(dashboardIcon);

    if (elementToFind.length > 0) {
    //Actions of the step
        await waitForDisplayed(dashboardIcon);
        await checkIfElementExists(dashboardIcon);
        await clickElement('click', 'element', dashboardIcon);
    }
    else {
        let screenshotName = 'Dashboard-To-Open-' + rowNumber + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};