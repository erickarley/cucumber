// import { extraHugePause } from '../../constants'

import { bigPause, smallPause } from "../../constants";

/**
 * Check if the overlay is on or off
 * @param  {String}   falseCase       Whether to check if displayed or not
 */
export default async (falseCase) => {
    /**
     * The Overlay selector
     * @type {String}
     */
    const overlaySelector = "//div[@ng-show='progress.show'][@aria-hidden='false']";
    
    //$(overlaySelector).waitForDisplayed(extraHugePause, !!falseCase);
    await browser.waitUntil(
        async () => (!await $(overlaySelector).isExisting()),
        {
            timeout: bigPause,
            timeoutMsg: 'Overlay Selector not visible'
        }
    );
};
