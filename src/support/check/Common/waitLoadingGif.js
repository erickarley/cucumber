import { hugePause, bigPause } from '../../constants'
import waitFor from '../../action/waitFor'
import pause from '../../action/pause';
import waitForDisplayed from '../../action/waitForDisplayed';
/**
 * Check if the loading gif is on or off
 * @param  {String}   falseCase       Whether to check if displayed or not
 */
export default async(falseCase) => {
    /**
     * The Overlay selector
     * @type {String}
     */
    //const loadingGifSelector = "//img[@src[contains(.,'loading-image.gif')]]";
    const loadingGifSelector = "//*[@class='k-loading-image']";
    // console.log('Loading Gif')
    await waitFor(loadingGifSelector,hugePause,falseCase,'exist');
    await pause(bigPause);
    // browser.waitUntil(() => {
    //     return !$(loadingGifSelector).isExisting();
    // });
    /**
    * The Banner name selector
    * @type {String}
    */
    const BannerNameSelector = "//span[contains(.,'Your result set has been truncated.')]";
    
    await waitForDisplayed(BannerNameSelector,'not');

};
