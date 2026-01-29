import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import checkAvailability from '../../check/Common/checkAvailability';
import setReportName from './setReportName';
import clickTileName from '../Queries/clickTileName';
import clickTab from '../Common/clickTab';
import { smallPause } from '../../constants';

export default async (reportType, timeType, calendarType) => {
    const reportTypeDDSelector = "//label[.='Report Type']/following-sibling::md-select";
    const timeTypeDDSelector = "//label[.='Type']/following-sibling::md-select";
    const calendarTypeDDSelector = "//label[.='Calendar']/following-sibling::md-select";

    const reportTypeOptionSelector = `//md-option[.='${reportType}']`;
    const timeTypeOptionSelector = `//md-option[@data-ng-repeat='opt in tpCtrl.typeSelect'][.='${timeType}']`;
    const calendarTypeOptionSelector = `//md-option[@data-ng-repeat='opt in tpCtrl.calendarSelect.items'][.='${calendarType}']`;

    const maxRetries = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
        attempt++;
        // console.log(`🔁 [Attempt ${attempt}/${maxRetries}] Selecting Report parameters...`);

        try {
            // --- Step 1: Check page availability ---
            await checkAvailability();

            // --- Step 2: Select Report Type ---
            // console.log(`[Dropdown] Selecting Report Type: ${reportType}`);
            await select2020DropDown(reportTypeDDSelector, reportTypeOptionSelector, reportType);

            // --- Step 3: Validate that it actually changed ---
            const reportTypeValue = await $(`//md-select-value//div[contains(.,'${reportType}')]`).isDisplayed().catch(() => false);
            if (!reportTypeValue) throw new Error(`[Validation] Report Type "${reportType}" not visible after selection`);

            // --- Step 4: Select Time Type ---
            // console.log(`[Dropdown] Selecting Time Type: ${timeType}`);
            await pause(1500);
            await select2020DropDown(timeTypeDDSelector, timeTypeOptionSelector, timeType);

            const timeTypeValue = await $(`//md-select-value//div[contains(.,'${timeType}')]`).isDisplayed().catch(() => false);
            if (!timeTypeValue) throw new Error(`[Validation] Time Type "${timeType}" not visible after selection`);

            // --- Step 5: Select Calendar Type ---
            // console.log(`[Dropdown] Selecting Calendar Type: ${calendarType}`);
            await pause(1500);
            await select2020DropDown(calendarTypeDDSelector, calendarTypeOptionSelector, calendarType);

            const calendarTypeValue = await $(`//md-select-value//div[contains(.,'${calendarType}')]`).isDisplayed().catch(() => false);
            if (!calendarTypeValue) throw new Error(`[Validation] Calendar Type "${calendarType}" not visible after selection`);

            // --- Step 6: All good ---
            success = true;
            // console.log(`All dropdowns successfully selected.`);
        } catch (err) {
            console.warn(`Attempt ${attempt} failed: ${err.message}`);

            if (attempt < maxRetries) {
                console.log(`Refreshing page to recover from UI glitch...`);
                await browser.refresh();
                await browser.pause(8000); // give Angular/React time to reload
                await checkAvailability();
                //RECOVERING STEPS FOR UI GLITCH ON Feature 00 - Test 3
                await setReportName("Automation Base Report");
                await pause(smallPause);
                await clickTileName("Store");
                await pause(smallPause);
                await clickTab("Properties");
                await pause(smallPause);
                await clickTab("Time");
                // END OF RECOVERING STEPS
            } else {
                console.error(`Failed after ${maxRetries} attempts.`);
                throw err; // rethrow the last error to fail the test
            }
        }
    }
};
