import mapper from './sideBarMap';
import { smallPause } from '../../constants';
import pause from '../pause';
import waitForAppReady from '../../lib/waitForAppReady';

/**
 * Clicks a sidebar menu item on Analytics with Favorites-safe logic.
 */
export default async function clickSideBarElement(elementValue) {

    let elementSelector = `//button[@aria-label="${elementValue}"]`;
    let element = await $(elementSelector);

    if (!(await element.isExisting())) {
        elementSelector = mapper(elementValue);
        if (!elementSelector) {
            throw new Error(`[Sidebar Click] No selector found for "${elementValue}".`);
        }
        element = await $(elementSelector);
    }

    try {
        await browser.waitUntil(
            async () => await element.isExisting() && await element.isDisplayed() && await element.isEnabled(),
            {
                timeout: 8000,
                timeoutMsg: `Sidebar element '${elementValue}' is not ready for interaction.`,
            }
        );

        await pause(smallPause);

        // ---------------------------
        // FAVORITES MODE DETECTION
        // ---------------------------
        const hasFav = await moduleHasFavorites(elementValue);

        if (hasFav) {
            // 1. Expand the module
            await element.click();
            await pause(300);

            // 2. Click module-specific "more..."
            const moduleId = `sidebar-${elementValue.toLowerCase().replace(/\s+/g, '-')}`;
            const moreSelector =
                `//ag-expandable-list[@id='${moduleId}']//span[contains(translate(., 'MORE', 'more'), 'more')]/parent::a`;

            const more = await $(moreSelector);
            await more.waitForDisplayed({ timeout: 8000 });
            await more.click();
        }
        else {
            await element.click();
        }


        await waitForAppReady({ context: "SidebarNav-" + elementValue });

    } catch (error) {
        const screenshotName = `Navigation-Item-${elementValue.replace(/\s+/g, '-')}-NOT-CLICKABLE-${Date.now()}.png`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
        console.error(`[Sidebar Click] ❌ Failed to click "${elementValue}": ${error.message}`);
        throw new Error(`Sidebar click failed for "${elementValue}". Screenshot: ${screenshotName}`);
    }
};

async function moduleHasFavorites(moduleName) {

    const prefixMap = {
        Reports: "/reporting/Reports",
        Dashboards: "/reporting/Dashboards",
        Queries: "/reporting/Queries",
        Alerts: "/reporting/Alerts"
    };

    const prefix = prefixMap[moduleName];
    if (!prefix) return false;

    const selector = `//ag-expandable-list[@id='sidebar-favorites']//a[contains(@href, "${prefix}")]`;

    return (await $$(selector)).length > 0;
}
