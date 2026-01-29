// import isExisting from '../isExisting';
// import waitForDisplayed from '../../action/waitForDisplayed';
import { bigPause, mediumPause } from '../../constants';
import pause from '../../action/pause';
// import { expect } from 'chai';

/**
 * Close all but the first tab
 * @param  {String}   obsolete Type of object to close (window or tab)
 */
/* eslint-disable no-unused-vars */
export default async() => {
    /* eslint-enable no-unused-vars */
    /**
     * The Banner name selector
     * @type {String}
     */
    const detailViewContentSelector = "//*[@class='receipt']";


    const detailLoadingSelector = "//md-progress-circular[@class='loader md-mode-indeterminate']";
    while (await $(detailLoadingSelector).isDisplayed()) {
        await pause(mediumPause);
        console.log("Waiting for Detail View Content");
    }
    
    // await browser.waitUntil(
    //     async () => (await $(detailViewContentSelector).isExisting()),
    //     {
    //         timeout: bigPause,
    //         timeoutMsg: 'Element not visible'
    //     }
    // );
    await pause(mediumPause);
    let elementToFind = await $$(detailViewContentSelector);

    if (elementToFind.length > 0) {
        //Actions of the step
        let textOnReceipt = await $(detailViewContentSelector).getText();
        //console.log(textOnReceipt);
        expect(textOnReceipt.length).toBeGreaterThan(0, 'ERROR: Empty Text on Detail View');
    }
    else {
        let screenshotName = 'Detail-View-WITHOUT-CONTENT'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};
