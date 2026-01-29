import setInputfield from '../setInputField';
import checkIfElementExists from '../../lib/checkIfElementExists';

const fieldSelector = "//input[@name='reportName']";
const timeout = 10000;
const maxAttempts = 2;

/**
 * Sets the report name field, retrying by navigating to the creation URL if it initially fails
 * @param  {String} fieldValue - The value to set in the report name field
 */
export default async (fieldValue) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // console.log(`[setReportName] Attempt ${attempt}: Waiting for report name field...`);
            const input = await $(fieldSelector);
            await input.waitForExist({ timeout });
            await input.waitForDisplayed({ timeout });
            await checkIfElementExists(fieldSelector);

            // console.log(`[setReportName] Setting report name to "${fieldValue}"`);
            await setInputfield('set', fieldValue, fieldSelector);
            return; // ✅ Success
        } catch (e) {
            const screenshotName = `Setting-Report-Name-${fieldValue.replace(/[\/\*]/g, '-')}-Attempt-${attempt}.png`;
            await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
            // console.error(`[setReportName] ERROR on attempt ${attempt}: ${e.message}`);

            if (attempt < maxAttempts) {
                console.warn(`[setReportName] Retrying by navigating directly to the creation URL...`);
                await browser.url('/reporting/Reports/Create');
                await browser.pause(3000); // short pause for re-rendering
            } else {
                throw new Error(`Failed to set report name after ${maxAttempts} attempts: ${e.message}`);
            }
        }
    }
};
