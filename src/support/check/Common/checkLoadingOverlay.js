import { bigPause, hugePause, smallPause } from '../../constants'
/**
 * Check if the overlay is on or off
 * @param  {String}   falseCase       Whether to check if displayed or not
 */
export default async (falseCase) => {
    /**
     * The Overlay selector
     * @type {String}
     */
    //const overlaySelector = "//div[@class[contains(.,'loadingOverlay')]]";
    const overlaySelector = "//div[@class[contains(.,'loadingOverlay')]][@style[contains(.,'flex')]]";
    await browser.waitUntil(
        async () => (!await $(overlaySelector).isExisting()),
        {
            timeout: bigPause,
            timeoutMsg: 'Loading Overlay timing issues'
        }
    );

    
    // await browser.waitUntil(() => {
    //     return !$(overlaySelector).isExisting();
    // });
    // $(overlaySelector).waitForDisplayed(hugePause, !!falseCase);
};
