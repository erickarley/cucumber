import openWebsite from "../openWebsite";
import login2020 from '../Login/login2020';
import { ReportingUsername, ReportingPassword } from "../../../../reportinguser";

/**
 * Navigates to the specified Reporting page
 */
export default async (pageRelativeUrl: string) => {
    pageRelativeUrl = pageRelativeUrl.toLowerCase();
    let currentPage = await browser.getUrl();
    if (CompareRelativeToAbsoluteUrl(currentPage, pageRelativeUrl)) {
        return;
    }
    // await openWebsite('site', pageRelativeUrl);
    
    // currentPage = await browser.getUrl();
    if (currentPage.toLowerCase().includes('/reporting/account/logon')){
        await login2020(ReportingUsername, ReportingPassword);
    
        const overlay = await $('.loadingOverlay');
        await overlay.waitForExist({ timeout: 5000 });
        await overlay.waitForDisplayed({ timeout: 20000, reverse: true });

        await $('#imgCompanyLogo').waitForExist({ timeout: 20000 });

        currentPage = await browser.getUrl();
        expect(currentPage.toLowerCase()).toMatch(pageRelativeUrl);
    }
};

function CompareRelativeToAbsoluteUrl (absolute: string, relative: string) {
    if (absolute.endsWith("/") && !relative.endsWith("/")) {
        absolute = absolute.substring(0, absolute.length - 1);
    }
    return absolute.endsWith(relative);
}