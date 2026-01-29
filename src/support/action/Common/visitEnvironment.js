import openWebsite from '../openWebsite';
import login2020 from '../Login/login2020';
import properties from '../../config/environments';
import checkAvailability from '../../check/Common/checkAvailability';
import waitForDashboardReady from './waitForDashboardReady';

/**
 * Closes all browser tabs except the first one
 */
const closeExtraTabs = async () => {
    // Get all open window handles (tabs)
    const allTabs = await browser.getWindowHandles();

    // Loop through tabs and close all except the first one
    for (let i = 1; i < allTabs.length; i++) {
        await browser.switchToWindow(allTabs[i]);
        await browser.closeWindow();
    }

    // Focus back on the first tab
    await browser.switchToWindow(allTabs[0]);
};

/**
 * Performs login with the default credentials on arguments environment or default credentials
 */
export default async () => {
    let userName = '';
    let password = '';
    let environmentURL = '';
    let userArguments = process.argv;

    const hasServer = (element) => element.indexOf('server') !== -1;
    const serverParamIndex = userArguments.findIndex(hasServer);

    const hasUser = (element) => element.indexOf('user') !== -1;
    const userParamIndex = userArguments.findIndex(hasUser);

    const hasPassword = (element) => element.indexOf('password') !== -1;
    const passwordParamIndex = userArguments.findIndex(hasPassword);
    // Get all window handles
    const allWindowHandles = await browser.getWindowHandles();

    // Close all tabs except the first one
    for (let i = 1; i < allWindowHandles.length; i++) {
        await browser.switchToWindow(allWindowHandles[i]);
        await browser.closeWindow();
    }

    // Switch to the remaining open window
    await browser.switchToWindow(allWindowHandles[0]);

    if (serverParamIndex > 0) {
        environmentURL = userArguments[serverParamIndex].substring(7);
    } else {
        environmentURL = properties.server;
    }
    environmentURL = 'https://' + environmentURL + '/reporting/Account/LogOff';

    if (userParamIndex > 0) {
        userName = userArguments[userParamIndex].substring(5);
    } else {
        userName = properties.user;
    }

    if (passwordParamIndex > 0) {
        password = userArguments[passwordParamIndex].substring(9);
    } else {
        password = properties.password;
    }

    // Close all extra tabs before proceeding
    await closeExtraTabs();

    // Navigate to the environment URL
    await openWebsite('url', environmentURL);

    try {
        await $('#username').waitForExist({ timeout: 10000 });
        await $('#username').waitForDisplayed({ timeout: 5000 });
        // console.log("[Login Check] Login page is ready.");
    } catch (e) {
        await browser.saveScreenshot('./ScreenShots/LoginPageNotReady.png');
        console.error("[Login Check] Login page did not render properly.");
        throw e;
    }

    // Perform login
    await login2020(userName, password);

    // Wait for dashboard or homepage UI to confirm login success
    try {
        await waitForDashboardReady();
    } catch (e) {
        await browser.saveScreenshot('./ScreenShots/HomePageNotReady.png');
        throw e;
    }
};
