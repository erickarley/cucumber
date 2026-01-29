/**
 * Verifies a popup dialog with exact title and text
 */
export default async function checkPopUp(expectedTitle, expectedTextContent) {

    const dialogSelector = "//md-dialog";
    const titleSelector = ".//h2//span";
    const contentSelector = ".//md-dialog-content";

    // Wait for dialog container (not just title)
    await browser.waitUntil(async () => {
        const dialog = await $(dialogSelector);
        return await dialog.isExisting() && await dialog.isDisplayed();
    }, {
        timeout: 10000,
        interval: 300,
        timeoutMsg: `[Popup] Dialog did not appear`
    });

    const dialog = await $(dialogSelector);

    // Wait for animation to settle
    await browser.waitUntil(async () => {
        const opacity = await dialog.getCSSProperty('opacity');
        return Number(opacity.value) >= 0.95;
    }, {
        timeout: 5000,
        interval: 200,
        timeoutMsg: `[Popup] Dialog animation did not complete`
    });

    // Validate title (normalized text)
    const title = await dialog.$(titleSelector);
    await browser.waitUntil(async () => {
        const text = (await title.getText()).trim();
        return text === expectedTitle;
    }, {
        timeout: 5000,
        interval: 200,
        timeoutMsg: `[Popup] Title mismatch. Expected "${expectedTitle}"`
    });

    // Validate content text (contains, not exact DOM match)
    const content = await dialog.$(contentSelector);
    const contentText = (await content.getText()).replace(/\s+/g, ' ').trim();

    if (!contentText.includes(expectedTextContent)) {
        throw new Error(
            `[Popup] Content mismatch.\nExpected to include:\n"${expectedTextContent}"\nActual:\n"${contentText}"`
        );
    }

    // console.log(`[Popup] Verified: "${expectedTitle}"`);
}
