import pause from '../../action/pause';
import { longPause, smallPause } from '../../constants'
/**
 * Check if the container is on or off
 * @param  {String}   falseCase       Whether to check if displayed or not
 */
export default async(falseCase) => {
    /**
     * The Container selector
     * @type {String}
     */
    const containerSelector = "//div[@class='md-dialog-container']";
    
    // await $(containerSelector).waitForDisplayed(longPause, !!falseCase);
    if (!!falseCase) {
        await pause(smallPause);
        await browser.waitUntil(
            async () => (!await $(containerSelector).isExisting()),
            {
                timeout: longPause,
                timeoutMsg: 'Dialog Container is still visible'
            }
        );
    }
    else {
        await pause(smallPause);
        await browser.waitUntil(
            async () => (await $(containerSelector).isExisting()),
            {
                timeout: longPause,
                timeoutMsg: 'Dialog Container not visible ' + containerSelector
            }
        );
    }
};
