import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import { smallPause, mediumPause } from '../../constants';
import clickButton from '../Common/clickButton';

/**
 * Opens a report from the component selector list
 * @param {String} reportName - The report to select
 */
export default async (reportName) => {
    const reportSearchBox = "//input[@ng-model='itemListWithSearchController.searchBoxValue']";
    const reportLabel = `//span[contains(.,'${reportName}')]/parent::button`;
    const reportsButtonSelector = "//h3[.='Reports']";

    try {
        const reportsButton = await $(reportsButtonSelector);
        await reportsButton.waitForExist({ timeout: 10000 });
        await reportsButton.waitForDisplayed({ timeout: 5000 });
        await clickElement('click', 'element', reportsButtonSelector);

        // console.log(`[Select Report] Clicked on "Reports" section`);

        // Wait for the report label to appear
        await browser.waitUntil(
            async () => (await $$(reportLabel)).length > 0,
            {
                timeout: 10000,
                timeoutMsg: `Report button with name "${reportName}" did not appear in time`,
            }
        );

        await waitForDisplayed(reportLabel);

        // Click report only if it hasn't already been selected
        const titleInputElement = await $("//input[@ng-model='reportDataDialogController.component.name']");
        const currentValue = await titleInputElement.getValue();

        if (currentValue !== reportName) {
            // console.log(`[Select Report] Selecting report "${reportName}"`);
            await clickElement('click', 'button', reportLabel);
            await pause(mediumPause);
        } else {
            // console.log(`[Select Report] Report "${reportName}" already selected`);
        }

        await clickButton('Add');
        await pause(smallPause);
    } catch (error) {
        const safeName = reportName.replace(/[\/\\:*?"<>|]/g, '-');
        const screenshotPath = `./ScreenShots/Report-To-Choose-${safeName}-ERROR.png`;
        await browser.saveScreenshot(screenshotPath);
        console.error(`[Select Report] Failed to choose report "${reportName}". ${error.message}`);
        throw error;
    }
};
