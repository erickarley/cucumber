export default async function clickMenuSubItem(subItemName, parentMenuItem) {

    const parentSelector =
        `//ag-expandable-list[@label='${parentMenuItem}']`;

    const itemSelector =
        `${parentSelector}//a[.//span[normalize-space()='${subItemName}']]`;

    // 1️⃣ Ensure parent exists
    await browser.waitUntil(
        async () => (await $$(parentSelector)).length > 0,
        {
            timeout: 10000,
            interval: 300,
            timeoutMsg: `[Sidebar] Parent menu "${parentMenuItem}" not found`
        }
    );

    // 2️⃣ Ensure item is visible
    await browser.waitUntil(
        async () => {
            const items = await $$(itemSelector);
            for (const el of items) {
                try {
                    if (await el.isDisplayed()) return true;
                } catch {}
            }
            return false;
        },
        {
            timeout: 10000,
            interval: 300,
            timeoutMsg: `[Sidebar] Sub item "${subItemName}" not visible under "${parentMenuItem}"`
        }
    );

    // 3️⃣ Get visible item
    const candidates = await $$(itemSelector);
    const menuItem = await (async () => {
        for (const el of candidates) {
            try {
                if (await el.isDisplayed()) return el;
            } catch {}
        }
        return null;
    })();

    if (!menuItem) {
        throw new Error(
            `[Sidebar] Sub item "${subItemName}" exists but none are visible`
        );
    }

    // 4️⃣ Scroll into view
    await menuItem.scrollIntoView({ block: 'center' });

    // 5️⃣ Try NORMAL click first
    try {
        await menuItem.click();
        return;
    } catch (err) {
        // fall through to JS click
    }

    // 6️⃣ JS click fallback (critical for floating sidebar)
    await browser.execute((el) => {
        el.click();
    }, menuItem);
}
