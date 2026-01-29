import clickElement from '../clickElement';
import { longPause, smallPause } from '../../constants';
import pause from '../pause';

/**
 * Clicks a button with the specified text
 * @param {String} buttonText - Text on the button to be clicked
 */
export default async (buttonText) => {
    const buttonTextSelector = `//button[contains(.,'${buttonText}')]`;
    const sanitizedText = buttonText.replace(/\s+/g, '-').replace(/\//g, '-');
    const screenshotName = `Button-${sanitizedText}-Failure-${Date.now()}.png`;

    // console.log(`[ClickButton] 🔍 Looking for button: "${buttonText}"`);

    try {
        // Wait until the element exists, is displayed, and is enabled
        await browser.waitUntil(
            async () => {
                const btn = await $(buttonTextSelector);
                return await btn.isExisting() && await btn.isDisplayed() && await btn.isEnabled();
            },
            {
                timeout: longPause,
                interval: 300,
                timeoutMsg: `[ClickButton] ❌ Button "${buttonText}" not interactable in time.`,
            }
        );

        // console.log(`[ClickButton] ✅ Button "${buttonText}" found and interactable.`);
        await clickElement('click', 'button', buttonTextSelector);
        await pause(smallPause);

    } catch (err) {
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
        console.error(`[ClickButton] ❌ Failed to click button "${buttonText}". Screenshot saved: ${screenshotName}`);
        throw new Error(`[ClickButton] Could not interact with button "${buttonText}": ${err.message}`);
    }
};
