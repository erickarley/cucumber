import waitForDisplayed from '../../action/waitForDisplayed';
import { bigPause } from '../../constants';

/**
 * Check if the given string is in the H2 name path
 * @param  {String}   expectedText The string to check for
 */
export default async(expectedText) => {
    /**
     * The Banner name selector
     * @type {String}
     */
    const h2Selector = "//h2[.='"+ expectedText + "']";
    
    // Locate the iframe inside the div with id "content"
    const iframe = await $('#content iframe');

    // Switch to the iframe context
    await browser.switchToFrame(iframe);
    console.log(await browser.getUrl());

    let elementToFind = await $$(h2Selector);

    if (elementToFind.length > 0) {
        //waitForDisplayed(h2Selector);
        // if (await $(h2Selector).isEnabled()) {
        //     // waitFor(h2Selector, longPause, null, 'enabled');
        //     await clickElement('click','button',h2Selector);
        //     await pause(smallPause);
        // }
        // else {
        //     let screenshotName = 'H2-To-Click' + expectedText + '-NOT-ENABLED'; 
        //     screenshotName = './ScreenShots/' + screenshotName.replace(/\//g,'-') + '.png';
        //     await browser.saveScreenshot(screenshotName);
        //     throw Error(screenshotName);
        // }
        console.log("Community page is working. " + expectedText + " section is available") 
    }
    else {
        let screenshotName = 'Header 2 ' + expectedText + '-NOT-EXISTS'; 
        screenshotName = './ScreenShots/' + screenshotName.replace(/\//g,'-') + '.png';
        await browser.saveScreenshot(screenshotName);
        throw Error(screenshotName);
    }
};
