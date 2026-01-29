import mapper from './dashboardMap';
import pause from '../pause';
import { smallPause } from '../../constants';

/**
 * Clicks a dashboard switch or button by mapped label
 * @param  {String} _elementType - not used
 * @param  {String} elementValue - label (e.g., "Linked Hierarchy")
 */
export default async (_elementType, elementValue) => {
    const selector = mapper(elementValue);
    console.log(`[Dashboard Click] Selector for "${elementValue}": ${selector}`);

    const element = await $(selector);

    try {
        await element.waitForExist({ timeout: 10000 });
        await element.waitForDisplayed({ timeout: 10000 });

        // Ensure it's enabled and visible on screen
        await browser.waitUntil(async () => await element.isEnabled(), {
            timeout: 5000,
            timeoutMsg: `Element "${elementValue}" is not enabled.`,
        });

        // Scroll it into view
        await element.scrollIntoView();

        // Use WebdriverIO's safe click with retry fallback
        await browser.waitUntil(
            async () => {
                try {
                    await element.click();
                    return true;
                } catch (err) {
                    console.warn(`[Retry] Click failed on "${elementValue}", retrying...`);
                    return false;
                }
            },
            {
                timeout: 7000,
                interval: 1000,
                timeoutMsg: `Element "${elementValue}" could not be clicked after retries.`,
            }
        );

        await pause(smallPause);

    } catch (err) {
        const screenshotName = `Click-Failure-${elementValue.replace(/[^\w]/g, '-')}-${Date.now()}.png`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
        console.error(`[Dashboard Button] Click failed on "${elementValue}": ${err.message}`);
        throw new Error(`Click failed for "${elementValue}". Screenshot: ${screenshotName}`);
    }
};
