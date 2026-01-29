/**
 * Focuses the last opened browser window or tab.
 */
export default async (obsolete: never) => {
    let handles: string[] = [];

    await browser.waitUntil(
        async () => {
            handles = await browser.getWindowHandles();
            return handles.length > 1;
        },
        {
            timeout: 10000,
            timeoutMsg: `No additional window found. Only one window is open (URL: ${await browser.getUrl()}).`
        }
    );

    const lastHandle = handles[handles.length - 1];
    await browser.switchToWindow(lastHandle);

    const newUrl = await browser.getUrl();
    // console.log(`[Window Switch] Focused last opened window: ${newUrl}`);
};
