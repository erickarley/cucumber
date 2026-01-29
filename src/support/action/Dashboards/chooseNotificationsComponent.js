import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';

export default async() => {
    /**
     * Selector for the Notifications
     * @type {String}
     */
    const announcementsComponentOption = "//h3[.='Notifications']";
    
    let elementToFind = await $$(announcementsComponentOption);

    if (elementToFind.length > 0) {
        //Select Notifications Component
        await waitForDisplayed(announcementsComponentOption);
        await checkIfElementExists(announcementsComponentOption);
        await clickElement('click','element',announcementsComponentOption);
    }
    else {
        let screenshotName = 'Notifications-Element-' + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};