const { default: clickButton } = require("../Common/clickButton");
const { default: clickTab } = require("../Common/clickTab");

import pause from "webdriverio/build/commands/browser/pause";
import checkAvailability from "../../check/Common/checkAvailability";
import navigateToReportingPage from "../Common/navigateToReportingPage";

export default async () => {
    await navigateToReportingPage("/Reporting/Landing/Queries");
    await navigateToReportingPage("/Reporting/Queries");
    await checkAvailability();
    pause(3000);
}