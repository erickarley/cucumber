/**
 * Waits for a new browser window or tab to be opened
 */
export default async () => {
    const originalHandles = await browser.getWindowHandles();

    await browser.waitUntil(
        async () => {
            const currentHandles = await browser.getWindowHandles();
            return currentHandles.length > originalHandles.length;
        },
        {
            timeout: 10000,
            timeoutMsg: 'No new window opened'
        }
    );
};
