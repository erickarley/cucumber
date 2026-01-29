import clickElement from '../clickElement';
import { longPause } from '../../constants';
import pause from '../pause';

/**
 * Clicks a tab on 2020 UI given its text
 * @param  {String} tabText Text on the tab
 */
export default async (tabText) => {
    const tabTextSelector = `//md-tab-item[.='${tabText}']`;
    const sanitizedTabName = tabText.replace(/\s+/g, '-').replace(/\//g, '-');
    const screenshotName = `Tab-${sanitizedTabName}-Failure-${Date.now()}.png`;

    // console.log(`[ClickTab] 🔍 Searching for tab with text: "${tabText}"`);

    try {
        // Wait for tab to exist, be visible, and enabled
        await browser.waitUntil(
            async () => {
                const el = await $(tabTextSelector);
                return await el.isExisting() && await el.isDisplayed() && await el.isEnabled();
            },
            {
                timeout: longPause,
                interval: 300,
                // timeoutMsg: `[ClickTab] ❌ Tab "${tabText}" not interactable within timeout.`,
            }
        );

        // console.log(`[ClickTab] ✅ Tab "${tabText}" is ready. Proceeding to click.`);
        await clickElement('click', 'element', tabTextSelector);
        await pause(2000);

    } catch (err) {
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
        console.error(`[ClickTab] ❌ Failed to click tab "${tabText}". Screenshot saved as: ${screenshotName}`);
        throw new Error(`[ClickTab] Tab "${tabText}" could not be found or clicked.`);
    }
};
