const { default: clickButton } = require("../Common/clickButton");
const { default: clickTab } = require("../Common/clickTab");

import pause from "webdriverio/build/commands/browser/pause";
import checkAvailability from "../../check/Common/checkAvailability";
import navigateToReportingPage from "../Common/navigateToReportingPage";

export default async () => {
    await navigateToReportingPage("/reporting/Settings/Measures");
    await navigateToReportingPage("/reporting/Measure");
    await checkAvailability();
    pause(3000);
    await clickTab("FILTERS");
}