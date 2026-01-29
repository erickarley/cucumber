import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';
import checkAvailability from '../../check/Common/checkAvailability';

/**
 * option Link to select
 * @param {String}      optionLink     The option to select
 */

export default async(optionLink) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const infoBoxIconSelector = "//a[contains(.,'"+ optionLink +"')]";
    await checkAvailability();
    // browser.waitUntil(() => {
    //     return await $(infoBoxIconSelector).isExisting();
    // });
    await browser.waitUntil(
        async () => (await $(infoBoxIconSelector).isExisting()),
        {
            timeout: bigPause,
            timeoutMsg: 'Element not visible ' + infoBoxIconSelector
        }
    );


    let elementToFind = await $$(infoBoxIconSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        await clickElement('click','element',infoBoxIconSelector);
    }
    else {
        let screenshotName = 'Settings-Item-' + optionLink + '-NOT-AVAILABLE'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }   
};