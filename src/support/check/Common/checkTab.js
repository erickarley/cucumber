/**
 * Verifies a tab is visible with the expected label (case-insensitive).
 * @param {string} expectedTabName - The tab label to look for
 */
export default async (expectedTabName) => {
    const allTabsSelector = `//md-tab-item`;

    // console.log(`[Check Tab] Searching for tab (case-insensitive): "${expectedTabName}"`);

    try {
        const tabElements = await $$(allTabsSelector);

        if (tabElements.length === 0) {
            throw new Error('[Check Tab] No tabs were found on the page.');
        }

        let matchedTab = null;

        for (const tab of tabElements) {
            const text = await tab.getText();
            if (text.trim().toLowerCase() === expectedTabName.trim().toLowerCase()) {
                matchedTab = tab;
                break;
            }
        }

        if (!matchedTab) {
            throw new Error(`[Check Tab] Tab with label "${expectedTabName}" not found (case-insensitive match).`);
        }

        await matchedTab.waitForDisplayed({
            timeout: 10000,
            // timeoutMsg: `[Check Tab] Tab "${expectedTabName}" found but not visible.`,
        });

        // console.log(`[Check Tab] ✅ Tab "${expectedTabName}" is visible and matched.`);

    } catch (error) {
        const screenshotName = `TabNotFound-${expectedTabName.replace(/\s+/g, '-')}-${Date.now()}.png`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
        console.error(`[Check Tab] ❌ ${error.message}`);
        throw new Error(`[Check Tab] Could not verify tab "${expectedTabName}". Screenshot: ${screenshotName}`);
    }
};
