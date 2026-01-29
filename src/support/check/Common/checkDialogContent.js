import { longPause } from '../../constants'
/**
 * Check if the overlay is on or off
 * @param  {String}   falseCase       Whether to check if displayed or not
 */
export default async(falseCase) => {
    /**
     * The Overlay selector
     * @type {String}
     */
    const dialogContentSelector = "//md-dialog-content";
    
    // await $(dialogContentSelector).waitForDisplayed(longPause, !!falseCase);
    if (!!falseCase) {
        await browser.waitUntil(
            async () => (!await $(dialogContentSelector).isExisting()),
            {
                timeout: longPause,
                timeoutMsg: 'Element is still visible'
            }
        );
    }
    else {
        await browser.waitUntil(
            async () => (await $(dialogContentSelector).isExisting()),
            {
                timeout: longPause,
                timeoutMsg: 'Element not visible ' + dialogContentSelector
            }
        );
    }
    // browser.waitUntil(() => {
    //     if (!!falseCase) {
    //         return !$(dialogContentSelector).isExisting();
    //     }
    //     else {
    //         return await $(dialogContentSelector).isExisting();
    //     }
    // });
};
