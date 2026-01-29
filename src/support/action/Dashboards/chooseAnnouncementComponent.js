import setInputfield from '../setInputField';
import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';

/**
 * Selects a announcement
 * @param  {String}   announcementName          The name of the announcement to select
 */
export default async(announcementName) => {
    /**
     * Selector for the announcementName
     * @type {String}
     */
    const announcementsComponentOption = "//h3[.='Announcements']";

    /**
     * Selector for the announcementName
     * @type {String}
     */
    const announcementInput = "//input[@ng-model='announcementDialogController.component.name']";
    let elementToFind = await $$(announcementsComponentOption);

    if (elementToFind.length > 0) {
    //Actions of the step
    //Select Announcement Component
        await waitForDisplayed(announcementsComponentOption);
        await checkIfElementExists(announcementsComponentOption);
        await clickElement('click','element',announcementsComponentOption);
        await pause(5000);
        //Announcement Name
        await waitForDisplayed(announcementInput);
        await checkIfElementExists(announcementInput);
        await setInputfield('set',announcementName,announcementInput);
        await pause(1000);
        await clickElement('click', 'button', "//button[.='Add']");
    }
    else {
        let screenshotName = 'Announcement-' + announcementName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};