// navigateToUrl.js
import waitForAppReady from '../../lib/waitForAppReady';

/**
 * Deep-link navigation for core modules.
 * BASE URL comes from CLI: server=yourEnv.agilenceqa.com
 *
 * @param {string} target - Dashboards | Reports | Queries | direct URL path
 */
export default async function navigateToUrl(target) {

    const ROUTES = {
        Dashboards: "/reporting/Landing/Dashboards",
        Reports: "/reporting/Reports",
        Queries: "/reporting/Queries"
    };

    const isKnownModule = Object.prototype.hasOwnProperty.call(ROUTES, target);
    const relativePath = isKnownModule ? ROUTES[target] : target;

    const serverArg = process.argv.find(a => a.startsWith("server="));
    if (!serverArg) {
        throw new Error("[DirectNavigation] Missing CLI parameter: server=<hostname>");
    }

    const server = serverArg.split("=")[1].trim();
    const baseUrl = `https://${server}`;

    const fullUrl = baseUrl + relativePath;

    // console.log(`Navigating to: ${fullUrl}`);

    try {
        await browser.url(fullUrl);

        await waitForAppReady({
            context: `DirectNav-${target}`
        });

    } catch (err) {
        const screenshot = `DirectNav-${target}-${Date.now()}.png`;
        await browser.saveScreenshot(`./ScreenShots/${screenshot}`);
        console.error(`[DirectNavigation] ❌ Failed to navigate to "${target}". Screenshot: ${screenshot}`);
        throw err;
    }
}
