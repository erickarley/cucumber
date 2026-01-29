import pause from "../pause";
import navigateToReportingPage from '../Common/navigateToReportingPage';
import clickButton from "../Common/clickButton";
import clickEditIconButton from "../Settings/clickEditIconButton";
import clickEditButton from "../Settings/Measures/clickEditButton";

export default async () => {
    await navigateToReportingPage("/Reporting/Settings/Hierarchies");

    await clickEditIconButton("Region District")
}