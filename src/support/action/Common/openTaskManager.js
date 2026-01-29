import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause } from '../../constants';

export default async() => {
    /**
     * Selector for the button
     * @type {String}
     */
    const buttonTextSelector = "#taskManagerBtn";

    let elementToFind = await $$(buttonTextSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        await waitForDisplayed(buttonTextSelector);
        await waitFor(buttonTextSelector, longPause, null, 'enabled');
        await clickElement('click','element',buttonTextSelector);
    }
    else {
        let screenshotName = 'Task-Manager-Button-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
}
