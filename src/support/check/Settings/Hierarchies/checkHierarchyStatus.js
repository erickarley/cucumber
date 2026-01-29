import isExisting from '../../isExisting';
// import waitForDisplayed from '../../action/waitForDisplayed';
// import { bigPause } from '../../constants';

/**
 * Check if the given string is in the Task Manager
 * @param  {String}   hierarchyName The hierarchyName string
 * @param  {String}   expectedStatus The string to check for
 */
export default async(hierarchyName, expectedStatus) => {
    /**
     * The Banner name selector
     * @type {String}
     */
    const statusSelector = "//td[.='" + hierarchyName + "']/ancestor::tr/td[9][.='" + expectedStatus + "']";
    
    // await waitForDisplayed(statusSelector);
    // await browser.waitUntil(
    //     async () => (await $(statusSelector).isExisting()),
    //     {
    //         timeout: bigPause,
    //         timeoutMsg: 'Element not visible'
    //     }
    // );
    await isExisting(statusSelector,false);
};
