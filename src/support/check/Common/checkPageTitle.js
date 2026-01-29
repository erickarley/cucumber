/**
 * Check if the page title matches the expected string
 * @param  {String}   expectedTitle    The expected page title text
 */
export default async (expectedTitle) => {
    const titleSelector = "//div[@class='titlebar-titlebox']//span";
    const titleElement = await $(titleSelector);

    if (await titleElement.isExisting()) {
        const actualTitle = await titleElement.getText();
        const matches = actualTitle.trim() === expectedTitle.trim();

        if (!matches) {
            const screenshotName = `Page-Title-Mismatch-${expectedTitle.replace(/\s+/g, '_')}`;
            await browser.saveScreenshot(`./ScreenShots/${screenshotName}.png`);
            throw new Error(`❌ Page title mismatch. Expected: "${expectedTitle}", Found: "${actualTitle}"`);
        }

        // console.log(`✅ Page title matched: "${actualTitle}"`);
    } else {
        const screenshotName = `Page-Title-Not-Found-${expectedTitle.replace(/\s+/g, '_')}`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}.png`);
        throw new Error(`❌ Title element not found. Expected: "${expectedTitle}"`);
    }
};
