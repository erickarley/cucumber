import { Then } from '@cucumber/cucumber';

import checkClass from '../support/check/checkClass';
import checkContainsAnyText from '../support/check/checkContainsAnyText';
import checkIsEmpty from '../support/check/checkIsEmpty';
import checkContainsText from '../support/check/checkContainsText';
import checkCookieContent from '../support/check/checkCookieContent';
import checkCookieExists from '../support/check/checkCookieExists';
import checkDimension from '../support/check/checkDimension';
import checkEqualsText from '../support/check/checkEqualsText';
import checkFocus from '../support/check/checkFocus';
import checkInURLPath from '../support/check/checkInURLPath';
import checkIsOpenedInNewWindow from '../support/check/checkIsOpenedInNewWindow';
import checkModal from '../support/check/checkModal';
import checkModalText from '../support/check/checkModalText';
import checkNewWindow from '../support/check/checkNewWindow';
import checkOffset from '../support/check/checkOffset';
import checkProperty from '../support/check/checkProperty';
import checkFontProperty from '../support/check/checkFontProperty';
import checkSelected from '../support/check/checkSelected';
import checkTitle from '../support/check/checkTitle';
import checkTitleContains from '../support/check/checkTitleContains';
import checkURL from '../support/check/checkURL';
import checkURLPath from '../support/check/checkURLPath';
import checkWithinViewport from '../support/check/checkWithinViewport';
import compareText from '../support/check/compareText';
import isEnabled from '../support/check/isEnabled';
import isExisting from '../support/check/isExisting';
import isVisible from '../support/check/isDisplayed';
import waitFor from '../support/action/waitFor';
import waitForVisible from '../support/action/waitForDisplayed';
import checkIfElementExists from '../support/lib/checkIfElementExists';
import parameterizedPause from '../support/action/Common/parameterizedPause';
import checkReportTitle from '../support/check/Reports/checkReportTitle';
import checkDashboardTitle from '../support/check/Dashboards/checkDashboardTitle';
import checkTableData from '../support/check/Dashboards/checkTableData';
import checkReportColumn from '../support/check/QuickQuery/checkReportColumn';
import checkTileName from '../support/check/Queries/checkTileName';
import checkBanner from '../support/check/Queries/checkBanner';
import checkMenuSubItem from '../support/check/Common/checkMenuSubItem';
import checkWarning from '../support/check/Queries/checkWarning';
// import checkVideoCardContent from '../support/check/InfoBox/checkVideoCardContent';
import checkLabelFieldValue from '../support/check/InfoBox/checkLabelFieldValue';
import checkBreadCrumb from '../support/check/Settings/checkBreadCrumb';
import checkForExistingTasks from '../support/check/Common/checkForExistingTasks';
import checkTableHeader from '../support/check/Common/checkTableHeader';
import checkDataElementExists from '../support/check/Reports/checkDataElementExists';
import checkTab from '../support/check/Common/checkTab';
import checkSelectedFilter from '../support/check/Queries/checkSelectedFilter';
// import compareTrxVsDetail from '../support/check/Alerts/compareTrxVsDetail';
// import checkClosedAlertIncreases from '../support/check/Alerts/checkClosedAlertIncreases';
// import dbScalarValidator from '../support/action/Common/dbScalarValidator';
import checkClosedAlertAsync from '../support/check/Alerts/checkClosedAlertAsync';
import checkMeasureOnReport from '../support/check/Reports/checkMeasureOnReport';
import compareTwoTableCells from '../support/check/Reports/compareTwoTableCells';
import checkOverlay from '../support/check/Common/checkOverlay';
import checkContainer from '../support/check/Common/checkContainer';
import checkBannerDissapears from '../support/check/Common/checkBannerDissapears';
import checkDialogContent from '../support/check/Common/checkDialogContent';
import checkNavItem from '../support/check/Common/checkNavItem';
import checkFiltersTabItem from '../support/check/Queries/checkFiltersTabItem';
import checkExistingCamera from '../support/check/Settings/CameraMapping/checkExistingCamera';
import checkDialogText from '../support/check/Settings/CameraMapping/checkDialogText';
import checkDialogOverlay from '../support/check/Settings/CameraMapping/checkDialogOverlay';
import checkLoadingOverlay from '../support/check/Common/checkLoadingOverlay';
import checkAggregationLevel from '../support/check/Settings/Hierarchies/checkAggregationLevel';
// import checkNoDataFoundFilterContainer from '../support/check/Common/checkNoDataFoundFilterContainer';
import compareDataFromReports from '../support/check/Reports/compareDataFromReports';
// import compareStoredKeyVSTable from '../support/check/Reports/compareStoredKeyVSTable';
import waitLoadingGif from '../support/check/Common/waitLoadingGif';
import compareDataFromQueries from '../support/check/Queries/compareDataFromQueries';
// import compareScreenshotVsActual from '../support/check/Common/compareScreenshotVsActual';
import compareDashboardScreenshots from '../support/check/Dashboards/compareDashboardScreenshots';
// import checkForgotPasswordPopContent from '../support/check/Login/checkForgotPasswordPopContent';
// import resultsDBValidator from '../support/check/DB/resultsDBValidator';
import waitLoadingDashboard from '../support/check/Common/waitLoadingDashboard';
// import compareTableCell from '../support/check/DataFetcher/compareTableCell';
// import captureDetailViewInfo from '../support/check/Queries/captureDetailViewInfo';
// import compareFilterGrouping from '../support/check/Queries/compareFilterGrouping';
// import checkTextonDetailView from '../support/check/Queries/checkTextonDetailView';
// import checkDetailViewContent from '../support/check/Queries/checkDetailViewContent';
import checkPublishStatus from '../support/check/Reports/checkPublishStatus';
import checkNumberOfResults from '../support/check/Queries/checkNumberOfResults';
import checkContentOnDetailView from '../support/check/Queries/checkContentOnDetailView';
import checkTaskStatusMessage from '../support/check/Common/checkTaskStatusMessage';
import checkPopUp from '../support/check/Queries/checkPopUp';
import checkTaskManagerMessage from '../support/check/Queries/checkTaskManagerMessage';
import isButtonDisabled from '../support/check/Common/isButtonDisabled';
// import verifyComponentName from '../support/check/Dashboards/verifyComponentName';
import checkTextOnSpan from '../support/check/Common/checkTextOnSpan';
import checkReportGraph from '../support/check/Dashboards/checkReportGraph';
import checkSwitchStatus from '../support/check/Common/checkSwitchStatus';
import checkExistingMeasures from '../support/check/Settings/checkExistingMeasures';
import checkNoTab from '../support/check/Common/checkNoTab';
import checkTableHeaderFC from '../support/check/Reports/checkTableHeaderFC';
// import checkOperand from '../support/check/Settings/MasterKPI/checkOperand';
import checkDialogSummation from '../support/check/Queries/checkDialogSummation';
// import checkActionButtonStatus from '../support/check/Common/checkActionButtonStatus';
// import checkButtonExists from '../support/check/Common/checkButtonExists';
// import checkOverlay from '../support/check/Common/checkOverlay';
// import checkReportTitle from '../support/check/Reports/checkReportTitle';
// import checkDashboardTitle from '../support/check/Dashboards/checkDashboardTitle';
// import checkReportColumn from '../support/check/QuickQuery/checkReportColumn';
import checkAttribute from '../support/check/checkAttribute';
import checkTaskManagerTask from '../support/check/Common/checkTaskManagerTask';
import checkAvailability from '../support/check/Common/checkAvailability';
import checkHierarchyStatus from '../support/check/Settings/Hierarchies/checkHierarchyStatus';
import waitForReportToRender from '../support/check/Common/waitForReportToRender';
import checkKendoGridSort from '../support/check/Common/kendo/checkKendoGridSort'
import checkKendoGridSortOnDate from '../support/check/Common/kendo/checkKendoGridSortOnDate'
import checkKendoGridFilter from '../support/check/Common/kendo/checkKendoGridFilter'
import checkKendoGridIsRestored from '../support/action/Common/kendo/checkKendoGridIsRestored'
import checkAutoHierarchyBuilderIsShown from '../support/check/Settings/Hierarchies/checkAutoHierarchyBuilderIsShown'
import checkManualHierarchyBuilderIsShown from '../support/check/Settings/Hierarchies/checkManualHierarchyBuilderIsShown'
import checkManualHierarchyBuilderIsShownWithId from '../support/check/Settings/Hierarchies/checkManualHierarchyBuilderIsShownWithId'
import checkAutoHierarchyBuilderIsShownWithId from '../support/check/Settings/Hierarchies/checkAutoHierarchyBuilderIsShownWithId'
import checkHierarchyExist  from '../support/check/Settings/Hierarchies/checkHierarchyExist'
import checkHierarchyDoesNotExist  from '../support/check/Settings/Hierarchies/checkHierarchyDoesNotExist'
import checkIconExistsInTable from '../support/check/Queries/checkIconExistsInTable';
import checkVideoOverlay from '../support/check/Queries/checkVideoOverlay';
import isElementDisabled from '../support/check/Common/isElementDisabled';

//Manual Hierarchy
import setHierarchyField from '../support/action/Hierarchies/setHierarchyField';
import checkOverlaySectionMessage from '../support/check/checkOverlaySectionMessage';

import checkOptionInDropDown from '../support/check/Common/checkOptionInDropDown';
import checkInputValue from '../support/check/Common/checkInputValue';
import checkPerformance from '../support/check/Common/checkPerformance';
import checkTransactionHistoryRecord from '../support/check/InfoBox/checkTransactionHistoryRecord';
import checkAdvancedFilter from '../support/check/Reports/checkAdvancedFilter';

import checkFollowedByColumnExist from '../support/check/Measure/checkFollowedByColumnExist'
import checkFollowedByColumnsAreRemoved from '../support/check/Measure/checkFollowedByColumnsAreRemoved'
import checkFollowedSummationColumnDoesNotAppear from '../support/check/Measure/checkFollowedSummationColumnDoesNotAppear'
import checkFollowedByMeasuresExists from '../support/check/Measure/checkFollowedByMeasuresExists'
import checkFirstInitialSortSelection from '../support/action/Reports/checkFirstInitialSortSelection';
import checkFirstGraphableColumn from '../support/action/Reports/checkFirstGraphableColumn';
import checkFollowedByColumnsExistsInReport from '../support/check/Measure/checkFollowedByColumnsExistsInReport'
import checkThatAllFollowedBySortOptionsExists from '../support/action/Reports/checkThatAllFollowedBySortOptionsExists';
import checkThatAllFollowedByMeasureAreGraphableExists from '../support/action/Reports/checkThatAllFollowedByMeasureAreGraphableExists';
import checkAllFollowedByMeasuresInKpi from '../support/action/Reports/checkAllFollowedByMeasuresInKpi';
import checkAllFollowedByMeasuresMatchDefinition from '../support/check/Measure/checkAllFollowedByMeasuresMatchDefinition'
import checkNumberOfAlerts from '../support/check/Alerts/checkNumberOfAlerts';
import checkBasicComponents from '../support/check/Reports/checkBasicComponents';
import checkQueryBasicComponents from '../support/check/Queries/checkQueryBasicComponents';
import checkDashboardBasicComponents from '../support/check/Dashboards/checkDashboardBasicComponents';
import checkHierarchyCheckbox from '../support/check/Reports/checkHierarchyCheckbox';
import checkVersionNumber from '../support/check/Common/checkVersionNumber';
import validateH2 from '../support/check/Community/validateH2';
import checkCellValueOnColumn from '../support/check/Reports/checkCellValueOnColumn';
import checkPageTitle from '../support/check/Common/checkPageTitle';
import waitForReportContent from '../support/check/Reports/waitReportContent';
import verifyTaskManagerState from '../support/check/Common/verifyTaskManagerState';
import waitForItemMasterLoader from '../support/check/InfoBox/waitForItemMasterLoader';
import checkInboxForEmail from '../support/lib/validateEmail';
import { showInboxSubjects } from '../support/lib/checkEmails';
import checkReportEmail from '../support/lib/checkReportEmail';
import checkReportAttachment from '../support/lib/checkReportAttachment';
import getReportAttachment from '../support/lib/getReportAttachment';
import { validatePDFReport } from '../support/lib/readPDFReport';
import { validateExcelReport } from "../support/lib/readXLSReport";
import waitForAppReady from '../support/lib/waitForAppReady';
import { waitForDeferredResults } from '../support/wait';

Then(
  /^I expect query results to be more than "([^"]*)"$/,
  async (expected) => {

    // Ensure all async loading is complete
    await waitForDeferredResults();

    const text = await $("//span[contains(.,'Results: ')]").getText();
    const num = parseInt(text.replace(/[^0-9]/g, ""), 10);

    expect(num).toBeGreaterThan(Number(expected));
});


Then(/^I wait for the application to be ready$/, 
    waitForAppReady
);

Then(
  /^I download the "([^"]*)" (PDF|Excel)? report from email$/,
  async (reportName, fileType) => {
    const type = fileType ? fileType.toLowerCase() : 'pdf';
    console.log(`Downloading ${type.toUpperCase()} report: "${reportName}"...`);

    const filePath = await getReportAttachment(reportName, type);

    // Store path globally in WebDriverIO shared store
    await browser.sharedStore.set('downloadedReportPath', filePath);
    await browser.sharedStore.set('downloadedReportType', type);
    await browser.sharedStore.set('downloadedReportName', reportName);

    console.log(`Report downloaded and stored: ${filePath}`);
  }
);

Then(
  /^I validate the downloaded (PDF|Excel)? report contains "([^"]*)"$/,
  async (fileType, headerText) => {
    const type = fileType ? fileType.toLowerCase() : await browser.sharedStore.get('downloadedReportType');
    const filePath = await browser.sharedStore.get('downloadedReportPath');
    const reportName = await browser.sharedStore.get('downloadedReportName');

    if (!filePath) {
      throw new Error('No downloaded report found in shared store. Run the download step first.');
    }

    console.log(`🔍 Validating ${type.toUpperCase()} content for "${headerText}"...`);

    if (type === 'pdf') {
      await validatePDFReport(filePath, reportName, headerText);
    } else if (type === 'excel') {
      await validateExcelReport(filePath, reportName, headerText);
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }

    console.log(`Content validation successful for "${headerText}"`);
  }
);

Then(
  /^the report email should contain report "([^"]*)" with a "([^"]*)" attachment$/,
  async (expectedReportName, expectedFileType) => {
    await checkReportAttachment(expectedReportName, expectedFileType, 60000);
  }
);

Then(/^the report email should contain report "([^"]*)" and link to the server$/, async (expectedReportName) => {
    const { reportName, server } = await checkReportEmail(expectedReportName, 60000);

    console.log(`✅ Report Email Verified`);
    console.log(`🔎 Extracted Report Name: "${reportName}"`);
    console.log(`🔗 Extracted Server URL: "${server}"`);
});


Then(/^I check the recent emails$/, async () => {
    const emails = await showInboxSubjects(5);
    console.log(emails);
});

Then(/^I should receive an email with subject "([^"]*)"$/, async (expectedSubject) => {
    await checkInboxForEmail(expectedSubject, 60000);
});

Then(
    /^I wait for the item master loader to disappear$/, 
    waitForItemMasterLoader
);

Then(
    /^I verify the Task Manager is (open|closed)$/,
    verifyTaskManagerState
);

Then(
    /^I wait for the content to finish loading$/,
    waitForReportContent
);

Then(
    /^I expect page title to be "([^"]*)?"$/,
    checkPageTitle
);

Then(
    /^I expect that hierarchy checkbox "([^"]*)?" is( not)* checked$/,
    checkHierarchyCheckbox
);

Then(
    /^I verify the basic structure of the dashboard is correct$/,
    checkDashboardBasicComponents
);

Then(
    /^I verify the basic structure of the query is correct$/,
    checkQueryBasicComponents
);

Then(
    /^I verify the basic structure of the report is correct$/,
    checkBasicComponents
);

Then(
    /^I check the value of the cell under "([^"]*)?" header at row "([^"]*)?"$/,
    checkCellValueOnColumn
);

Then(
    /^I check the "([^"]*)?" header in the Community Page$/,
    validateH2
);

Then(
    /^I check the version number in the server$/,
    checkVersionNumber
);

Then(
    /^I expect the number of (Open|Closed) Alerts has been (increased|decreased|not changed)$/,
    checkNumberOfAlerts
);

Then(
    /^I verify that the (top|bottom) value of the Advanced Filter is set to "([^"]*)?"$/,
    checkAdvancedFilter
);

Then(
    /^I expect( not)* to see a transaction history record in column (\d+) with value "([^"]*)?"$/,
    checkTransactionHistoryRecord
);

Then(
    /^I wait for the report( not)* to render the results count$/,
    waitForReportToRender
);

Then(
    /^I expect that hierarchy "([^"]*)?" has a "([^"]*)?" status$/,
    checkHierarchyStatus
);

Then(
    /^I expect( not)* to find the message "([^"]*)?"$/,
    checkTaskManagerMessage
);

Then(
    /^I wait for the page to be properly rendered$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },
    checkAvailability
);

Then(
    /^I wait for the elements to render$/,
    parameterizedPause
);  

Then(
    /^I wait for (Report|Query|Dashboard)-"([^"]*)?" to be properly rendered$/,
    checkPerformance
);

// Then(
//     /^I expect column name "([^"]*)?"( not)* to appear in the report$/,
//     checkReportColumn
// );

// Then(
//     /^I expect the title of the report( not)* to be "([^"]*)?"$/,
//     checkReportTitle
// );

// Then(
//     /^I expect the title of the dashboard( not)* to be "([^"]*)?"$/,
//     checkDashboardTitle
// );

// Then(
//     /^I wait on the overlay( not)* to be displayed$/,
//     checkOverlay
// );



// const { Then } = require('cucumber');

// Then(
//     /^I validate that button "([^"]*)?" is (enabled|disabled)$/,
//     checkButtonExists
// );

// Then(
//     /^I validate that action button "([^"]*)?" is (enabled|disabled)$/,
//     checkActionButtonStatus
// );

// Then(
//     /^I expect( not)* to find the indicator "([^"]*)?" in the Master KPI operand list$/,
//     checkOperand
// );

Then(
    /^I expect table header with name "([^"]*)?" to( not)* appear$/,
    checkTableHeaderFC
);

Then(
    /^I expect no measures are shown for "([^"]*)?" measure name$/,
    checkExistingMeasures
);

Then(
    /^I expect the switch "([^"]*)?" to be (off|on)$/,
    checkSwitchStatus
);

Then(
    /^I expect a report graph to( not)* be displayed with text "([^"]*)?"$/,
    checkReportGraph
);

Then(
    /^I expect to( partially| not)* find "([^"]*)?" as span text in the page$/,
    checkTextOnSpan
);


Then(
    /^I expect "([^"]*)?" button to be (disabled|enabled)$/,
    isButtonDisabled
);

Then(
    /^I expect the element "([^"]*)?" to be (disabled|enabled)$/,
    isElementDisabled
);

// Then(
//     /^I expect the component with name "([^"]*)?" is( not)* visible$/,
//     verifyComponentName
// );

Then(
    /^I expect the Task Manager to( not)* contain the "([^"]*)?" message$/,
    checkTaskStatusMessage
);

// Then(
//     /^I expect query results to be (less|more) than "([^"]*)?"$/,
//     checkNumberOfResults
// );

Then(
    /^I expect the Detail View to contain information about the transaction$/,
    checkContentOnDetailView
);

Then(
    /^I expect the report "([^"]*)?" to be "([^"]*)?"$/,
    checkPublishStatus
);

// Then(
//     /^I check if the detail view contains the text captured from row #(\d+) and column header "([^"]*)?" for category "([^"]*)?"$/,
//     checkDetailViewContent
// );

// Then(
//     /^I check the detail view contains the following text: "([^"]*)?"$/,
//     checkTextonDetailView
// );

// Then(
//     /^I compare the grouping results from the query to the stored options for predefined filter "([^"]*)?"$/,
//     compareFilterGrouping
// );

// Then(
//     /^I captured the main transaction information from the Detail View for "([^"]*)?" criteria with "([^"]*)?" filter on row #(\d+)$/,
//     captureDetailViewInfo
// );

// Then(
//     /^I compare api response for "([^"]*)?" against values on cell #(\d+) of the table$/,
//     compareTableCell
// );

// Then(
//     /^I expect stored key "([^"]*)?"( not)* to have the value "([^"]*)?"$/,
//     resultsDBValidator
// );

// Then(
//     /^I expect the content of the dialog to be "([^"]*)?"$/,
//     checkForgotPasswordPopContent
// );

Then(
    /^I compare visually the current dashboard "([^"]*)?" with the screenshot of the dashboard from the previous environment$/,
    compareDashboardScreenshots
);

// Then(
//     /^I compare this page with the existing screenshot named: "([^"]*)?" for environment "([^"]*)?" with "([^"]*)?" sensitivity$/,
//     compareScreenshotVsActual
// );

Then(
    /^I wait for the dashboard loading gif image to not exist$/,
    waitLoadingDashboard
);

Then(
    /^I wait on report grid loading gif image to( not)* exist$/,
    waitLoadingGif
);

// Then(
//     /^I expect Key "([^"]*)?"( not)* to be equal to the content on row #(\d+) and cell #(\d+)$/,
//     compareStoredKeyVSTable
// );

Then(
    /^I expect data stored in (disk|memory) for report "([^"]*)?" to have the same content as previous environment$/,
    compareDataFromReports
);

Then(
    /^I expect data stored in (disk|memory) for query "([^"]*)?" to have the same content as previous environment$/,
    compareDataFromQueries
);

// Then(
//     /^I expect the filter container to expand with the following text "([^"]*)?"$/,
//     checkNoDataFoundFilterContainer
// );

Then(
    /^I expect "([^"]*)?" aggregation level has been added$/,
    checkAggregationLevel
);

Then(
    /^I expect the loading overlay to( not)* appear$/,
    checkLoadingOverlay
);

Then(
    /^I expect the dialog overlay message to( not)* appear$/,
    checkDialogOverlay
);


Then(
    /^I expect the video overlay to( not)* appear$/,
    checkVideoOverlay
);


Then(
    /^I expect the message "([^"]*)?" on the Camera pop up dialog to( not)* appear$/,
    checkDialogText
);

Then(
    /^I expect camera "([^"]*)?"( not)* appears in the table of devices$/,
    checkExistingCamera
);

Then(
    /^I expect that filter with name "([^"]*)?"( not)* appears on the filters list$/,
    checkFiltersTabItem
);

Then(
    /^I expect "([^"]*)?" navigation item( not)* to be displayed$/,
    checkNavItem
);

Then(
    /^I wait until the banner "([^"]*)?" dissapears$/,
    checkBannerDissapears
);

Then(
    /^I wait on the dialog pop up( not)* to be displayed$/,
    checkDialogContent
);

Then(
    /^I wait on the dialog container( not)* to be displayed$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },
    checkContainer
);

Then(
    /^I wait on the overlay( not)* to be displayed$/,
    checkOverlay
);

Then(
    /^I expect for row #(\d+) and column #(\d+) to( not)* have the same value as row #(\d+) on column #(\d+)$/,
    compareTwoTableCells
);

Then(
    /^I expect that header for (data element|measure) "([^"]*)?" appears on the table$/,
    checkMeasureOnReport
);

// // Then(
// //     /^I expect that column "([^"]*)?" is displayed on the table$/,
// //     checkMeasureOnReport
// // );

Then(
    /^I expect that closing this alert with cause "([^"]*)?" and resolution "([^"]*)?" increases the Closed Alerts$/,
    checkClosedAlertAsync
);

// Then(
//     /^I expect that Query "([^"]*)?" return "([^"]*)?" with "([^"]*)?" as value$/,
//     dbScalarValidator
// );

// Then(
//     /^I expect that value on table cell #(\d+) for transaction #(\d+) is displayed on the detailed view as the "([^"]*)?" field$/,
//     compareTrxVsDetail
// );

Then(
    /^I expect filter "([^"]*)?"( not)* to be selected$/,
    checkSelectedFilter
);

Then(
    /^I expect tab "([^"]*)?" to be displayed$/,
    checkTab
);

Then(
    /^I expect tab "([^"]*)?" not to be displayed$/,
    checkNoTab
);

Then(
    /^I expect data element "([^"]*)?"( not)* to appear in the list$/,
    checkDataElementExists
);

Then(
    /^I expect that header with text "([^"]*)?" appears on the table$/,
    checkTableHeader
);

Then(
  /^I expect the Task Manager contains a task created "([^"]*)?"$/,
  checkForExistingTasks
);

Then(
    /^I expect the breadcrumb to show "([^"]*)?" as the current item$/,
    checkBreadCrumb
);

Then(
    /^I expect field "([^"]*)?"( not)* to contain "([^"]*)?" on the InfoBox current Tab$/,
    checkLabelFieldValue
);

// Then(
//     /^I expect the video error message( not)* to appear with text "([^"]*)?"$/,
//     checkVideoCardContent
// );

Then(
    /^I expect the dialog to contain title: "([^"]*)?" and text "([^"]*)?"$/,
    checkDialogSummation
);

Then(
    /^I expect a "([^"]*)?" to appear with the text "([^"]*)?"$/,
    checkWarning
);

Then(
    /^I expect a Pop Up with title "([^"]*)?" and exact text: "([^"]*)?"$/,
    checkPopUp
);

Then(
    /^I expect "([^"]*)?" to appear as a sub item of "([^"]*)?"$/,
    checkMenuSubItem
);

Then(
    /^I expect the "([^"]*)?" banner appears$/,
    checkBanner
);

Then(
    /^I expect tile name "([^"]*)?"( not)* to appear in the Query edit page$/,
    checkTileName
);

Then(
    /^I expect column name "([^"]*)?"( not)* to appear in the report$/,
    checkReportColumn
);

Then(
    /^I expect the cell #(\d+) of the row #(\d+) to( not)* contain the following text "([^"]*)?"$/,
    checkTableData
);

Then(
    /^I expect the cell #(\d+) of the row #(\d+) to( not)* contain the following icon "([^"]*)?"$/,
    checkIconExistsInTable
);

Then(
    /^I expect the title of the report( not)* to be "([^"]*)?"$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },checkReportTitle
);

Then(
    /^I expect the title of the dashboard( not)* to be "([^"]*)?"$/,
    checkDashboardTitle
);


Then(
    /^I expect that the title is( not)* "([^"]*)?"$/,
    checkTitle
);

Then(
    /^I expect that the title( not)* contains "([^"]*)?"$/,
    checkTitleContains
);

Then(
    /^I expect that element "([^"]*)?" does( not)* appear exactly "([^"]*)?" times$/,
    checkIfElementExists
);

Then(
    /^I expect that element "([^"]*)?" is( not)* displayed$/,
    isVisible
);

Then(
    /^I expect that element "([^"]*)?" becomes( not)* displayed$/,
    waitForVisible
);

Then(
    /^I expect that element "([^"]*)?" is( not)* within the viewport$/,
    checkWithinViewport
);

Then(
    /^I expect that element "([^"]*)?" does( not)* exist$/,
    isExisting
);

Then(
    /^I expect that element "([^"]*)?"( not)* contains the same text as element "([^"]*)?"$/,
    compareText
);

Then(
    /^I expect that (button|element) "([^"]*)?"( not)* matches the text "([^"]*)?"$/,
    checkEqualsText
);

Then(
    /^I expect that (button|element|container) "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    checkContainsText
);

Then(
    /^I expect that (button|element) "([^"]*)?"( not)* contains any text$/,
    checkContainsAnyText
);

Then(
    /^I expect that (button|element) "([^"]*)?" is( not)* empty$/,
    checkIsEmpty
);

Then(
    /^I expect that the url is( not)* "([^"]*)?"$/,
    checkURL
);

Then(
    /^I expect that the path is( not)* "([^"]*)?"$/,
    checkURLPath
);

Then(
    /^I expect the url to( not)* contain "([^"]*)?"$/,
    checkInURLPath
);

Then(
    /^I expect that the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    checkProperty
);

Then(
    /^I expect that the font( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    checkFontProperty
);

Then(
    /^I expect that checkbox "([^"]*)?" is( not)* checked$/,
    checkSelected
);

Then(
    /^I expect that element "([^"]*)?" is( not)* selected$/,
    checkSelected
);

Then(
    /^I expect that element "([^"]*)?" is( not)* enabled$/,
    isEnabled
);

Then(
    /^I expect that cookie "([^"]*)?"( not)* contains "([^"]*)?"$/,
    checkCookieContent
);

Then(
    /^I expect that cookie "([^"]*)?"( not)* exists$/,
    checkCookieExists
);

Then(
    /^I expect that element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/,
    checkDimension
);

Then(
    /^I expect that element "([^"]*)?" is( not)* positioned at ([\d+.?\d*]+)px on the (x|y) axis$/,
    checkOffset
);

Then(
    /^I expect that element "([^"]*)?" (has|does not have) the attribute "([^"]*)?"$/,
    checkAttribute
);

Then(
    /^I expect that element "([^"]*)?" (has|does not have) the class "([^"]*)?"$/,
    checkClass
);

Then(
    /^I expect a new (window|tab) has( not)* been opened$/,
    checkNewWindow
);

Then(
    /^I expect the url "([^"]*)?" is opened in a new (tab|window)$/,
    checkIsOpenedInNewWindow
);

Then(
    /^I expect that element "([^"]*)?" is( not)* focused$/,
    checkFocus
);

Then(
    /^I wait on element "([^"]*)?"(?: for (\d+)ms)*(?: to( not)* (be checked|be enabled|be selected|be displayed|contain a text|contain a value|exist))*$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },
    waitFor
);

Then(
    /^I expect that a (alertbox|confirmbox|prompt) is( not)* opened$/,
    checkModal
);

Then(
    /^I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "([^"]*)?"$/,
    checkModalText
);

Then(
    /^I expect the Task Manager Task "([^"]*)?" (has|does not have) (details|message|category) "([^"]*)?"$/,
    checkTaskManagerTask
);

Then(
    /^I expect the grid is sorted (ascending|descending) on "([^"]*)?"$/,
    checkKendoGridSort
);

Then(
    /^I expect the grid is sorted (ascending|descending) on "([^"]*)?" date column$/,
    checkKendoGridSortOnDate
);

// Then(
//     /^I expect the grid is sorted (ascending|descending) on "([^"]*)?" date column$/,
//     checkKendoGridSortOnDate
// );

Then(
    /^I expect the grid rows are filtered on the "([^"]*)?" column$/,
    checkKendoGridFilter
);

Then(
    /^I expect the grid to be restored$/,
    checkKendoGridIsRestored
);

Then(
    /^I expect the auto hierarchy builder to be launched$/,
    checkAutoHierarchyBuilderIsShown
);

Then(
    /^I expect the manual hierarchy builder to be launched$/,
    checkManualHierarchyBuilderIsShown
);

Then(
    /^I expect the manual hierarchy builder to be launched with an id$/,
    checkManualHierarchyBuilderIsShownWithId
);


Then(
    /^I expect the auto hierarchy builder to be launched with an id$/,
    checkAutoHierarchyBuilderIsShownWithId
);

Then (
    /^I expect auto hierarchy "([^"]*)?" to exist$/,
    checkHierarchyExist
)

Then (
    /^I expect auto hierarchy "([^"]*)?" to not exist$/,
    checkHierarchyDoesNotExist
)

Then(
    /^I set the "([^"]*)?" hierachy "([^"]*)?" to "([^"]*)?"$/,
    setHierarchyField
);

Then(
    /^When I try to (create|override) a hierarchy I expect a overlay message with "([^"]*)?" as title and with "([^"]*)?" as a message$/,
    checkOverlaySectionMessage
);

Then(
    /^I expect the "([^"]*)?" drop down to contain the "([^"]*)?" option$/,
    checkOptionInDropDown
);

Then(
    /^I expect the "([^"]*)?" input to have the value "([^"]*)?"$/,
    checkInputValue
);

Then(
    /^I expect the defaulted summary columns within the "Summation" tab to be automatically added with the equivalent Following Transaction columns$/,
    checkFollowedByColumnExist
);


Then(
    /^I expect the added followed by summary columns to be removed$/,
    checkFollowedByColumnsAreRemoved
);

Then(
    /^I expect summary column "([^"]*)?" to be removed$/,
    checkFollowedSummationColumnDoesNotAppear
);


Then(
    /^I expect all followed by measures to be present$/,
    checkFollowedByMeasuresExists
);


Then(
    /^I expect all followed by column names to appear in the report$/,
    checkFollowedByColumnsExistsInReport
);


Then(
    /^I expect all followed by column names to appear in report initial sort$/,
    checkThatAllFollowedBySortOptionsExists
);

Then(
    /^I expect all followed by column names to appear as graphable in the report$/,
    checkThatAllFollowedByMeasureAreGraphableExists
);

Then(
    /^I expect the first initial sort option to be "([^"]*)?"$/,
    checkFirstInitialSortSelection
);

Then(
    /^I expect the first graphable column to be "([^"]*)?"$/,
    checkFirstGraphableColumn
);

Then(
    /^I expect all followed by measures to be available$/,
    checkAllFollowedByMeasuresInKpi
);

Then(
    /^I expect all followed by measures to be available and selected$/,
    checkAllFollowedByMeasuresMatchDefinition
);

