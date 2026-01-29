import { bigPause, mediumPause } from '../../constants'
import pause from '../../action/pause';
import focusLastOpenedWindow from '../../action/focusLastOpenedWindow';
import pause from '../../action/pause';
import checkAvailability from './checkAvailability';

/**
 * Check if the word is available or not
 * @param  {String}   falseCase       Whether to check if word is displayed or not
 */
export default async(falseCase) => {

    await pause(bigPause);
    // await checkNewWindow();
    await focusLastOpenedWindow();
    await pause(mediumPause);
    await checkAvailability();
    await pause(mediumPause);
    await checkAvailability();
    await browser.waitUntil(
        async () => (await $("//div[@class='flex1 spacer']//span[contains(.,'Results')]").isExisting()),
        {
            timeout: bigPause,
            timeoutMsg: 'Validation of results from drill down failed'
        }
    );

};
