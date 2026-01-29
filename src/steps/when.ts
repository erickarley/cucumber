import { When, Before, After } from '@cucumber/cucumber';

import clearInputField from '../support/action/clearInputField';
import clickElement from '../support/action/clickElement';
import clickEveryRemoveElement from '../support/action/clickEveryRemoveElement';
import closeLastOpenedWindow from '../support/action/closeLastOpenedWindow';
import deleteCookies from '../support/action/deleteCookies';
import dragElement from '../support/action/dragElement';
import focusLastOpenedWindow from '../support/action/focusLastOpenedWindow';
import handleModal from '../support/action/handleModal';
import moveTo from '../support/action/moveTo';
import pause from '../support/action/pause';
import pressButton from '../support/action/pressButton';
import scroll from '../support/action/scroll';
import selectOption from '../support/action/selectOption';
import selectOptionByIndex from '../support/action/selectOptionByIndex';
import setCookie from '../support/action/setCookie';
import setInputField from '../support/action/setInputField';
import setPromptText from '../support/action/setPromptText';
import sortHierarchyColumn from '../support/action/sortHierarchyColumn'

import login2020 from '../support/action/Login/login2020';
import openDashboard from '../support/action/Dashboards/openDashboard';
import openReport from '../support/action/Reports/openReport';
import setFilter from '../support/action/Dashboards/setFilter';
// import clearFilter from '../support/action/Dashboards/clearFilter';
import clickSideBarElement from '../support/action/SideBarMenu/clickSideBarElement';
import clickDashboardElement from '../support/action/Dashboards/clickDashboardElement';
import clickQueryElement from '../support/action/Queries/clickQueryElement'
import selectDashboardAction from '../support/action/Dashboards/selectDashboardAction';
import setDashboardName from '../support/action/Dashboards/setDashboardName';
import chooseSettingsTab from '../support/action/Dashboards/chooseSettingsTab';
import chooseReportOnComponents from '../support/action/Dashboards/chooseReportOnComponents';
// import chooseWidgetComponent from '../support/action/Dashboards/chooseWidgetComponent';
// import chooseWidgetProperties from '../support/action/Dashboards/chooseWidgetProperties';
// import chooseAnnouncementComponent from '../support/action/Dashboards/chooseAnnouncementComponent';
// import chooseNotificationsComponent from '../support/action/Dashboards/chooseNotificationsComponent';
import selectSubAction from '../support/action/Common/selectSubAction';
// import setQuickQueryParams from '../support/action/QuickQuery/setQuickQueryParams';
import clickButton from "../support/action/Common/clickButton"
import clickSpanButton from "../support/action/Common/clickSpanButton"
import setQQCategory from '../support/action/QuickQuery/setQQCategory';
import setQQFilters from '../support/action/QuickQuery/setQQFilters';
import openQuery from '../support/action/Queries/openQuery';
import openMeasure from '../support/action/Measures/openMeasure';
import clickMenuSubItem from '../support/action/Common/clickMenuSubItem';
import setQueryName from '../support/action/Queries/setQueryName';
import clickTileName from '../support/action/Queries/clickTileName';
import clickTab from '../support/action/Common/clickTab';
import convertQueryToMeasure from '../support/action/Queries/convertQueryToMeasure';
import clickButtonWithIcon from '../support/action/Common/clickButtonWithIcon';
import setDisplayColumns from '../support/action/Queries/setDisplayColumns';
import openTaskManager from '../support/action/Common/openTaskManager';
import openInfoBox from '../support/action/Queries/openInfoBox';
import openSettingsOption from '../support/action/Settings/openSettingsOption';
import editSettingsItem from '../support/action/Settings/editSettingsItem';
import setTableHeaderFilter from '../support/action/Common/setTableHeaderFilter';
import openTableItem from '../support/action/Common/openTableItem';
import clickTableItem from '../support/action/Common/clickTableItem';
import setEmailField from '../support/action/Reports/setEmailField';
import expandHierarchy from '../support/action/Reports/expandHierarchy';
import clickHierarchyElement from '../support/action/Reports/clickHierarchyElement';
import selectAggregationLevel from '../support/action/Reports/selectAggregationLevel';
import selectStoreHierarchy from '../support/action/Reports/selectStoreHierarchy';
import selectReportType from '../support/action/Reports/selectReportType';
import setRangeStdOrFiscal from '../support/action/Reports/setRangeStdOrFiscal';
import clickDataElementMeasure from '../support/action/Reports/clickDataElementMeasure';
import clickDataElement from '../support/action/Reports/clickDataElement';
import searchDataElement from '../support/action/Reports/searchDataElement';
import clickDataPropertiesButton from '../support/action/Reports/clickDataPropertiesButton';
import clickEditEmailSchedule from '../support/action/Reports/clickEditEmailSchedule';
import clickIconForRowNumber from '../support/action/Common/clickIconForRowNumber';
import clickAlertCategory from '../support/action/Alerts/clickAlertCategory';
import clickAlertGroup from '../support/action/Alerts/clickAlertGroup';
import clickTransactionForAlertGroup from '../support/action/Alerts/clickTransactionForAlertGroup';
// import runDBQuery from '../support/action/Common/runDBQuery';
// import runAsyncDBQuery from '../support/action/Common/runAsyncDBQuery';
import clickAddIcon from '../support/action/Settings/clickAddIcon';
import setMeasureName from '../support/action/Settings/setMeasureName';
import setSummationMeasure from '../support/action/Settings/setSummationMeasure';
import setReportName from '../support/action/Reports/setReportName';
// import doubleClickDataElement from '../support/action/Reports/doubleClickDataElement';
import replaceMeasure from '../support/action/Settings/replaceMeasure';
import replacementMeasure from '../support/action/Settings/replacementMeasure';
import clickWarningButton from '../support/action/Common/clickWarningButton';
import setQQTxTime from '../support/action/QuickQuery/setQQTxTime';
import setQQTxOrderTotal from '../support/action/QuickQuery/setQQTxOrderTotal';
import setQQTxPrimTenderType from '../support/action/QuickQuery/setQQTxPrimTenderType';
import clickFilterItem from '../support/action/Queries/clickFilterItem';
import setNewFilterValue from '../support/action/Queries/setNewFilterValue';
// import setNewFilterWithValue from '../support/action/Queries/setNewFilterWithValue';
import setExactFilterOption from '../support/action/Queries/setExactFilterOption';
import setRelativeDateFilter from '../support/action/Queries/setRelativeDateFilter';
// import deleteFilter from '../support/action/Queries/deleteFilter';
import newCamera from '../support/action/Settings/CameraMapping/newCamera';
// import deleteCamera from '../support/action/Settings/CameraMapping/deleteCamera';
import clickCameraMappingElement from '../support/action/Settings/CameraMapping/clickCameraMappingElement';
import selectHierarchy from '../support/action/Settings/CameraMapping/selectCameraMappingElement';
import expandElement from '../support/action/Settings/CameraMapping/expandElement';
import selectDeviceType from '../support/action/Settings/CameraMapping/selectDeviceType';
import clickEditIconButton from '../support/action/Settings/clickEditIconButton';
import clickRadioButton from '../support/action/Settings/clickRadioButton';
import choosePublishRolesUsers from '../support/action/Settings/choosePublishRolesUsers';
import setOwner from '../support/action/Settings/setOwner';
import clickEditButton from '../support/action/Settings/Measures/clickEditButton';
import addDataElement from '../support/action/Reports/addDataElement';
// import uploadHierarchy from '../support/action/Settings/Hierarchies/uploadHierarchy';
// import setName from '../support/action/Settings/Hierarchies/setName';
// import selectEmployeeHierarchy from '../support/action/Reports/selectEmployeeHierarchy';
// import expandEmployeeHierarchy from '../support/action/Reports/expandEmployeeHierarchy';
// import clickEmployeeHierarchyCheck from '../support/action/Reports/clickEmployeeHierarchyCheck';
import selectColumnSettingsOption from '../support/action/Reports/selectColumnSettingsOption';
// import checkColumnSetting from '../support/action/Reports/checkColumnSetting';
// import selectEmployeeStoreHierarchy from '../support/action/Reports/selectEmployeeStoreHierarchy';
import clickCreateNew from '../support/action/Settings/Hierarchies/clickCreateNew';
import setAutoGenName from '../support/action/Settings/Hierarchies/setAutoGenName';
import navigateToUrl from '../support/action/Common/navigateToUrl';
import storeDataFromTable from '../support/action/Reports/storeDataFromTable';
import navigateToReport from '../support/action/Reports/navigateToReport';
// import setExactDateRange from '../support/action/Reports/setExactDateRange';
import navigateToQuery from '../support/action/Queries/navigateToQuery';
import storeDataFromQuery from '../support/action/Queries/storeDataFromQuery';
// import takeFullPageScreenShot from '../support/action/Common/takeFullPageScreenShot';
import navigateToDashboard from '../support/action/Dashboards/navigateToDashboard';
import takeDashboardScreenShot from '../support/action/Dashboards/takeDashboardScreenShot';
import clickSwitch from '../support/action/Common/clickSwitch';
// import forgotPassword from '../support/action/Login/forgotPassword';
// import storeDBQueryRes from '../support/action/Common/storeDBQueryRes';
// import parseApiResponse from '../support/action/DataFetcher/parseApiResponse';
import setBooleanFilter from '../support/action/Queries/setBooleanFilter';
import clickQueryResultsCell from '../support/action/Queries/clickQueryResultsCell';
import openDetailView from '../support/action/Queries/openDetailView';
// import takeScreenshotQueryFilter from '../support/action/Queries/takeScreenshotQueryFilter';
import setFilterWithValue from '../support/action/Queries/setFilterWithValue';
import setNewFilterPredefined from '../support/action/Queries/setNewFilterPredefined';
import deleteDefaultFilter from '../support/action/Queries/deleteDefaultFilter';
// import take1stPageScreenshot from '../support/action/Queries/take1stPageScreenshot';
import dragAdvancedFilter from '../support/action/Queries/dragAdvancedFilter';
// import capturePredefinedOptions from '../support/action/Queries/capturePredefinedOptions';
import setNewFilterPredValue from '../support/action/Queries/setNewFilterPredValue';
// import takeSSQueryReceiptValue from '../support/action/Queries/takeSSQueryReceiptValue';
// import getInfoFromTableHeader from '../support/action/Queries/getInfoFromTableHeader';
import deleteMeasures from '../support/action/Settings/Measures/deleteMeasures';
import deleteQueries from '../support/action/Settings/Queries/deleteQueries';
import deleteReports from '../support/action/Settings/Reports/deleteReports';
import editSettingsMonitor from '../support/action/Settings/editSettingsMonitor';
import saveVersionNumber from '../support/action/Common/saveVersionNumber';
import changeDownloadType from '../support/action/Queries/changeDownloadType';
import clickGroupOptionsButton from '../support/action/Queries/clickGroupOptionsButton';
import dragGridColumHeaders from '../support/action/Queries/dragGridColumHeaders';
import selectCheckboxRow from '../support/action/Queries/selectCheckboxRow';
import removeGroupingColumn from '../support/action/Queries/removeGroupingColumn';
import openReportByRowNumber from '../support/action/Reports/openReportByRowNumber';
// import openDashboardByRowNumber from '../support/action/Dashboards/openDashboardByRowNumber';
// import openQueryByRowNumber from '../support/action/Queries/openQueryByRowNumber';
import selectAdvancedFilterCategory from '../support/action/Queries/selectAdvancedFilterCategory';
import chooseFilterEventCountCriteria from '../support/action/Queries/chooseFilterEventCountCriteria';
import actionOnAdvancedGrouping from '../support/action/Queries/actionOnAdvancedGrouping';
import dragDistinctAdvancedFilter from '../support/action/Queries/dragDistinctAdvancedFilter';
import clickDistinctColumn from '../support/action/Queries/clickDistinctColumn';
import filterToCompare from '../support/action/Queries/filterToCompare';
import setDaysToBackfill from '../support/action/Queries/setDaysToBackfill';
// import selectAllSelectedReceipts from '../support/action/Queries/selectAllSelectedReceipts';
// import clickNextPage from '../support/action/Common/clickNextPage';
// import changeNumResPerPage from '../support/action/Queries/changeNumResPerPage';
import addGraphToReport from '../support/action/Reports/addGraphToReport';
import clickInfoboxWidget from '../support/action/Settings/clickInfoboxWidget';
import createInfoWidget from '../support/action/Settings/createInfoWidget';
import createNewMonitor from '../support/action/Settings/createNewMonitor';
import addNewMonitorRule from '../support/action/Settings/addNewMonitorRule';
import applyAdvancedFilter from '../support/action/Reports/applyAdvancedFilter';
import selectInitialSort from '../support/action/Reports/selectInitialSort';
import openColumnMenuItem from '../support/action/Reports/openColumnMenuItem';
// import setRelativeDateRangeOverride from '../support/action/Reports/setRelativeDateRangeOverride';
// import createMKPI from '../support/action/Settings/MasterKPIs/createMKPI';
// import searchMKPI from '../support/action/Settings/MasterKPIs/searchMKPI';
// import createNestedKPI from '../support/action/Settings/MasterKPIs/createNestedKPI';
// import editDNAScore from '../support/action/Settings/editDNAScore';
// import addDNADataElement from '../support/action/Settings/addDNADataElement';
// import chooseWidgetKPI from '../support/action/Dashboards/chooseWidgetKPI';
import refreshPage from '../support/action/refreshPage';
// import changePermissions from '../support/action/Settings/changePermissions';
import createAlertFromQuery from '../support/action/Alerts/createAlertFromQuery';
// import deleteTD2 from '../support/action/Common/deleteTD2';
// // import storeTableCellValue from '../support/action/Common/storeTableCellValue';
// import compareCellValuesInRows from '../support/action/Queries/compareCellValuesInRows';
import deleteDashboards from '../support/action/Settings/Dashboards/deleteDashboards';
import writeNoteToLog from '../support/action/Common/writeNoteToLog';
import addAutoHierarchyAggregationLevel from '../support/action/Settings/Hierarchies/addAggregationLevel';
import deleteHierarchy from '../support/action/Settings/Hierarchies/deleteHierarchy';
import clickAllDrilldowns from '../support/action/Reports/clickAllDrilldowns';
import clickCreateNewOption from '../support/action/CreateNewPopUp/clickCreateNewOption';
import kendoFilterContainsColumn from '../support/action/Common/kendo/kendoFilterContainsColumn'
import clearKendoGridColumnFilter from '../support/action/Common/kendo/clearKendoGridColumnFilter'
import clickOnCreateNewHierarchy from '../support/action/Settings/Hierarchies/clickOnCreateNewHierarchy'
import clickOnNewAutoHierarchyGeneration from '../support/action/Settings/Hierarchies/clickOnNewAutoHierarchyGeneration'
import clickOnNewManualHierarchyGeneration from '../support/action/Settings/Hierarchies/clickOnNewManualHierarchyGeneration'
import setFilterOption from '../support/action/Queries/setFilterOption';
import setInfoBoxCCDateFilter from '../support/action/InfoBox/setInfoBoxCCDateFilter';
import clickFirstTrendDrilldownGroup from '../support/action/Reports/clickFirstTrendDrilldownGroup';
import createPerformanceRecord from '../support/action/Common/createPerformanceRecord';
import setAlertsDDFilter from '../support/action/Alerts/setAlertsDDFilter';
import editExistingManualHierarchy from '../support/action/Settings/Hierarchies/editExistingManualHierarchy'
import editExistingAutoHierarchy from '../support/action/Settings/Hierarchies/editExistingAutoHierarchy'
import createAutoHierarchy from '../support/action/Settings/Hierarchies/createAutoHierarchy'
import openVideoPopup from '../support/action/Queries/openVideoPopup';

import editHierarchy from '../support/action/Settings/Hierarchies/ManualHierarchy/editHierarchy';
import addMnualHierarchyAggregationLevel from '../support/action/Settings/Hierarchies/ManualHierarchy/addAggregationLevel';
import selectHierarchyAggregationLevel from '../support/action/Hierarchy/selectHierarchyAggregationLevel';
import selectHierarchyDataSet from '../support/action/Hierarchy/selectHierarchyDataSet';
import selectOptionFromDropDown from '../support/action/Common/selectOptionFromDropDown';
import selectCategoryOption from '../support/action/Queries/selectCategoryOption'
import setInputToRandomValue from '../support/action/Common/setInputToRandomValue'
import addSingleDataElement from '../support/action/Reports/addSingleDataElement';
import selectKpiDataElement from "../support/action/Common/selectKpiDataElement"
import cleanFavorites from '../support/action/Common/cleanFavorites';
import createResolution from '../support/action/Settings/createResolution';
import createCause from '../support/action/Settings/createCause';
import reopenAlert from '../support/action/Alerts/reopenAlert';
import storeNumberOfAlerts from '../support/action/Alerts/storeNumberOfAlerts';
import linkResolutionToCause from '../support/action/Alerts/linkResolutionToCause';
import createAutoGenHierarchy from '../support/action/Hierarchies/createAutoGenHierarchy';
import captureObjectsIdList from '../support/action/comparisonTool/captureObjectsIdList';
import buildDynamicFeatureFiles from '../support/action/comparisonTool/buildDynamicFeatureFiles';
import sqlQueryExecutor from '../support/action/Common/sqlQueryExecutor';
import sqlUpdateReportsToPublic from '../support/action/comparisonTool/sqlUpdateReportsToPublic';
import sqlReportIdRecentlyRun from '../support/action/comparisonTool/sqlReportIdRecentlyRun';
import sqlUpdateDashboardsToPublic from '../support/action/comparisonTool/sqlUpdateDashboardsToPublic';
import sqlDashboardIdRecentlyRun from '../support/action/comparisonTool/sqlDashboardIdRecentlyRun';
import sqlUpdateQueriesToPublic from '../support/action/comparisonTool/sqlUpdateQueriesToPublic';
import sqlQueryIdRecentlyRun from '../support/action/comparisonTool/sqlQueryIdRecentlyRun';
import buildSingleSystemFeatureFiles from '../support/action/comparisonTool/buildSingleSystemFeatureFiles';
import newRecentReportIds from '../support/action/comparisonTool/newRecentReportIds';
import newRecentQueryIds from '../support/action/comparisonTool/newRecentQueryIds';
import newRecentDashboardIds from '../support/action/comparisonTool/newRecentDashboardIds';
import waitForNewWindow from '../support/action/Common/waitForNewWindow';
import waitForVersionInfo from '../support/action/Common/waitForVersionInfo';
import setManualHierarchyName from '../support/action/Hierarchies/setManualHierarchyName';
import selectReportCategory from '../support/action/Reports/selectReportCategory';
import changeAlertStatus from '../support/action/Alerts/changeAlertStatus';

When(
    /^I set the Manual Hierarchy Name to "([^"]*)"$/,
    setManualHierarchyName
);
When(
    /^I wait for the version info to appear$/,
    waitForVersionInfo
);

When(/^I wait until a new window has been opened$/,
    waitForNewWindow
);

When(
    /^I select "([^"]*)" as the report category$/,
    selectReportCategory
)

When(
    /^I build the single system feature file for the (reports|dashboards|queries)$/,
    buildSingleSystemFeatureFiles
);

// When(
//     /^I update the reports to be public$/,
//     sqlUpdateReportsToPublic
// );

When(
    /^I capture the list of reports$/,
    // sqlReportIdRecentlyRun
    newRecentReportIds
);

// When(
//     /^I update the dashboards to be public$/,
//     sqlUpdateDashboardsToPublic
// );

When(
    /^I capture the list of dashboards$/,
    newRecentDashboardIds
);

// When(
//     /^I update the queries to be public$/,
//     sqlUpdateQueriesToPublic
// );

When(
    /^I capture the list of queries$/,
    // sqlQueryIdRecentlyRun
    newRecentQueryIds
);

When(
    /^I build the comparison Feature files for the (dashboards|reports|queries)$/,
    buildDynamicFeatureFiles
);

When(
    /^I capture the list of (dashboards|reports|queries) to compare in the system$/,
    captureObjectsIdList
);

When(
    /^I create an (Auto Generated|Manual) Hierarchy with the Name "([^"]*)" and Data Set "([^"]*)"$/,
    createAutoGenHierarchy
);

When(
    /^I link the resolution "([^"]*)" to the cause$/,
    linkResolutionToCause
);

When(
    /^I capture the number of (Open|Closed) Alerts$/,
    storeNumberOfAlerts
);

When(
    /^I change the status of the alert to "([^"]*)"$/,
    changeAlertStatus
);

When(
    /^I reopen the alert with the following note "([^"]*)"$/,
    reopenAlert
);

When(
    /^I create a cause with name "([^"]*)?" and description "([^"]*)?" for resolution "([^"]*)?"$/,
    createCause
);

When(
    /^I create a resolution with name "([^"]*)?" and description "([^"]*)?"$/,
    createResolution
);

When(
    /^I remove the favorites from the application$/,
    cleanFavorites
);

When(
    /^I filter the alerts by the "([^"]*)?" dropdown and set it to "([^"]*)?"$/,
    setAlertsDDFilter
);

When(
    /^I create a performance record for the (query|report|dashboard) - "([^"]*)?" executed by user: "([^"]*)?"$/,
    createPerformanceRecord
);

When(
    /^I verify no errors are generated when clicking the drillable cells for (trend|comparison) report "([^"]*)?" in row #(\d+)$/,
    clickFirstTrendDrilldownGroup
);

When(
    /^I set the Transaction Date-Time filter to date "([^"]*)?" with "([^"]*)?" filter$/,
    setInfoBoxCCDateFilter
);

When(
    /^I click the option "([^"]*)?" from the Create New pop up$/,
    clickCreateNewOption
);

When(
    /^I verify that all drillable cells from (summary|trend|comparison) report "([^"]*)?" in row #(\d+) generate no error$/,
    clickAllDrilldowns
);

When(
    /^I select the aggregation level "([^"]*)?" with name "([^"]*)?"$/,
    addAutoHierarchyAggregationLevel
);

When(
    /^I create a note in the Execution Log with text: "([^"]*)?"$/,
    writeNoteToLog
);

// When(
//     /^I compare the value from cell #(\d+) for all available rows$/,
//     compareCellValuesInRows
// );

// // When(
// //     /^I store the value from cell #(\d+) and row #(\d+)$/,
// //     storeTableCellValue
// // )

// When(
//     /^I delete items from a list with name "([^"]*)?"$/,
//     deleteTD2
// );

When(
    /^I set the name to the Alert to "([^"]*)?"$/,
    createAlertFromQuery
);

// When(
//     /^I change the setting for permission "([^"]*)?" to "([^"]*)?"$/,
//     changePermissions
// );

When(
    /^I refresh the page$/,
    refreshPage
);

// When(
//     /^I create a widget with name "([^"]*)?" for the dimension "([^"]*)?" with KPI "([^"]*)?"$/,
//     chooseWidgetKPI
// );

// When(
//     /^I add the data element for the DNA Score with measure name "([^"]*)?", summary value "([^"]*)?" and improvement is "([^"]*)?"$/,
//     addDNADataElement
// );

// When(
//     /^I edit the DNA Score "([^"]*)?"$/,
//     editDNAScore
// );

// When(
//     /^I set the KPI Name filter to "([^"]*)?"$/,
//     searchMKPI
// );

// When(
//     /^I configure a nested master KPI with name "([^"]*)?", type "([^"]*)?", dimension "([^"]*)?" and master kpi "([^"]*)?"$/,
//     createNestedKPI
// );

// When(
//     /^I configure a master KPI with name "([^"]*)?", type "([^"]*)?", dimension "([^"]*)?", data element "([^"]*)?", measure "([^"]*)?" and indicator "([^"]*)?"$/,
//     createMKPI
// );

// When(
//     /^I set the date range type as "([^"]*)?", and calendar type "([^"]*)?" with range "([^"]*)?"$/,
//     setRelativeDateRangeOverride
// );

When(
    /^I open the menu item "([^"]*)?" for column "([^"]*)?"$/,
    openColumnMenuItem
);

When(
    /^I select the initial sort of the report based in indicator "([^"]*)?"$/,
    selectInitialSort
);

When(
    /^I set the column advanced filter for measure indicator "([^"]*)?" with type "([^"]*)?" and values for top "([^"]*)?" and bottom "([^"]*)?"$/, 
    applyAdvancedFilter
);

When(
    /^I add a new rule into the monitor with name "([^"]*)?" and type "([^"]*)?" for operator "([^"]*)?" and value #(\d+)$/,
    addNewMonitorRule
);

When(
    /^I create the Monitor with name "([^"]*)?", type "([^"]*)?", Dimension "([^"]*)?", data element "([^"]*)?", measure "([^"]*)?" and indicator "([^"]*)?"$/, 
    createNewMonitor
);

When(
    /^I create the Widget with name "([^"]*)?", type "([^"]*)?", data element "([^"]*)?", measure "([^"]*)?" and indicator "([^"]*)?"$/, 
    createInfoWidget
);

When(
    /^I click the button to configure the infobox widget "([^"]*)?"$/,
    clickInfoboxWidget
);

When(
    /^I enable the chart in the report$/,
    addGraphToReport
);  

// When(
//     /^I select all the grouped receipts on the page for "([^"]*)?" environment$/,
//     selectAllSelectedReceipts
// );

// When(
//     /^I click the next page button$/,
//     clickNextPage
// );

When(
    /^I set "([^"]*)?" as the number of days to backfill$/,
    setDaysToBackfill
);

When(
    /^I compare the filter "([^"]*)?" for category "([^"]*)?" with filter "([^"]*)?" for category "([^"]*)?" using operator "([^"]*)?"$/,
     filterToCompare
);

When(
    /^I click distinct column for row #(\d+)$/,
    clickDistinctColumn
);

When(
    /^I (edit|delete) the Advanced Grouping Settings$/,
    actionOnAdvancedGrouping
);

When(
    /^I set the filter (event|distinct) count operator "([^"]*)?" with value "([^"]*)?"$/,
    chooseFilterEventCountCriteria 
);

When(
    /^I select the category "([^"]*)?" from the advanced category pop up$/,
    selectAdvancedFilterCategory
);

// When(
//     /^I change the number of items per page to "([^"]*)?"$/,
//     changeNumResPerPage
// );

When(
    /^I remove the column "([^"]*)?" from the grouping list$/,
    removeGroupingColumn
);

When(
    /^I select receipt #(\d+) from the query results with( no)* grouping$/,
    selectCheckboxRow
);

When(
    /^I group the query by column "([^"]*)?"$/,
    dragGridColumHeaders
);

When(
    /^I click the grouping options button$/,
    clickGroupOptionsButton
);

When(
    /^I change the download (type|format|layout) from "([^"]*)?" to "([^"]*)?"$/,
    changeDownloadType
);

When(
    /^I save the information about the version number$/,
    saveVersionNumber
)

When(
    /^I delete all the reports containing the name "([^"]*)?"$/,
    deleteReports
);

When(
    /^I delete all the queries containing the name "([^"]*)?"$/,
    deleteQueries
);

When(
    /^I delete all the hierarchies containing the name "([^"]*)?"$/,
    deleteHierarchy
);

When(
    /^I delete all the dashboards containing the name "([^"]*)?"$/,
    deleteDashboards
);

When(
    /^I delete all the measures containing the name "([^"]*)?"$/,
    deleteMeasures
);

// When(
//     /^I store the value of the cell on row #(\d+) and column header "([^"]*)?" for category "([^"]*)?"$/,
//     getInfoFromTableHeader
// );

// When(
//     /^I captured the predefined values shown for the "([^"]*)?" filter$/,
//     capturePredefinedOptions 
// );

When(
  /^I group the query by the "([^"]*)?" filter$/,
  dragAdvancedFilter
);

When(
    /^I add the "([^"]*)?" filter as a distinct column to the query$/,
    dragDistinctAdvancedFilter
  );

// When(
//     /^I take a screenshot to the query results displayed for "([^"]*)?" criteria with "([^"]*)?" filter using operator "([^"]*)?"$/,
//     take1stPageScreenshot
// );

// When(
//     /^I captured (\d+) receipts from the results of the query for "([^"]*)?" category and "([^"]*)?" filter "([^"]*)?"$/,
//     takeScreenshotQueryFilter
// );

// When(
//     /^I captured (\d+) receipts from the results of the query for "([^"]*)?" category and "([^"]*)?" filter "([^"]*)?" with value "([^"]*)?"$/,
//     takeSSQueryReceiptValue
// );

When(
    /^I open the Detail View transactions panel$/,
    openDetailView
);

When(
    /^I click on the Query results page on row #(\d+) and cell #(\d+)$/,
    clickQueryResultsCell
);

When(
    /^I set the filter for the value tab with "([^"]*)?" Category, "([^"]*)?" field with (EXISTS) operator and value "([^"]*)?"$/,  
    setBooleanFilter
);

When(
    /^I set the filter for the value tab with "([^"]*)?" Category, "([^"]*)?" field with "([^"]*)?" operator and option "([^"]*)?"$/,  
    setFilterOption
);

// When(
//     /^I read the api response for "([^"]*)?"$/,
//     parseApiResponse
// );

// When(
//     /^I execute the query to validate the field "([^"]*)?"$/,
//     storeDBQueryRes
// );

// When(
//     /^I reset the password for the "([^"]*)?" email$/,
//     forgotPassword
// );

When(
    /^I click on the switch with the text "([^"]*)?"$/,
    clickSwitch
);

When(
    /^I navigate to dashboard number "([^"]*)?"$/,
    navigateToDashboard
);

When(
    /^I take a screenshot of the dashboard number "([^"]*)?"$/,
    takeDashboardScreenShot
);

// When(
//     /^I take a screenshot with the name "([^"]*)?"$/,
//     takeFullPageScreenShot
// );

When(
    /^I navigate to query number "([^"]*)?"$/,
    navigateToQuery
);

// When(
//     /^I set the date range from "([^"]*)?" to "([^"]*)?" for the report$/,
//     setExactDateRange
// );

When(
    /^I navigate to report number "([^"]*)?"$/,
    navigateToReport
);

When(
    /^I store the table data from the report on (disk|memory)$/,
    storeDataFromTable
);

When(
    /^I store the table data from the query on (disk|memory)$/,
    storeDataFromQuery
);

When(
    /^I stored the data from row #(\d+) and cell #(\d+) with Key name "([^"]*)?"$/,
    storeDataFromTable
);

When(
    /^I navigate to "([^"]*)?"$/,
    navigateToUrl
);

When(
    /^I set the Auto Generated Hierarchy with Name "([^"]*)?" and Data Set "([^"]*)?"$/,
    setAutoGenName
);

When(
    /^I click on Create New "([^"]*)?"$/,
    clickCreateNew
);

// When(
//     /^I check option "([^"]*)?" checkbox as the column to appear in the report$/,
//     checkColumnSetting
// );

When(
    /^I select the column settings option "([^"]*)?" for column "([^"]*)?"$/,
    selectColumnSettingsOption
);

// When(
//     /^I click the checkbox for the Employee Hierarchy element called "([^"]*)?"$/,
//     clickEmployeeHierarchyCheck
// );

// When(
//     /^I (expand|collapse) the Employee Hierarchy element called "([^"]*)?"$/,
//     expandEmployeeHierarchy
// );

// When(
//     /^I select the Employee Hierarchy option "([^"]*)?"$/,
//     selectEmployeeHierarchy
// );

// When(  
//     /^I set the name of the Hierarchy to "([^"]*)?"$/,
//     setName
// );

// When(
//     /^I upload the file "([^"]*)?" to the Manage Hierarchies page$/,
//     uploadHierarchy
// );

When(
    /^I click the edit pencil icon for the "([^"]*)?" item from the list$/,
    clickEditButton
);

When(
    /^I set the owner of the item as "([^"]*)?"$/,
    setOwner
);

When(
    /^I choose the items "([^"]*)?" from the (Roles|Users) list$/,
    choosePublishRolesUsers
);

When(
    /^I click the radio button "([^"]*)?"$/,
    clickRadioButton
);

When(
    /^I edit the "([^"]*)?" record from the list$/,
    clickEditIconButton
);

When(
    /^I select the Device Type "([^"]*)?" on the row #(\d+) Registers Tab$/,
    selectDeviceType
);

When(
    /^I click the Camera Mapping element "([^"]*)?" in the Hierarchy Tree$/,
    expandElement
);

When(
    /^I select the "([^"]*)?" Hierarchy for Camera Mapping$/,
    selectHierarchy
);

When(
    /^I click on the tab "([^"]*)?" for Camera Mapping$/,
    clickCameraMappingElement
);

// When(
//     /^I delete the camera "([^"]*)?" from the list of devices$/,
//     deleteCamera
// );

When(
    /^I create a new camera with name "([^"]*)?", type "([^"]*)?", ip address as "([^"]*)?" and port "([^"]*)?", username "([^"]*)?" and password "([^"]*)?"$/,
    newCamera
);

// When(
//     /^I (delete|edit) the filter with name "([^"]*)?" from the query$/,
//     deleteFilter
// );

When(
    /^I delete the default filter when creating a query$/,
    deleteDefaultFilter
);

When(
    /^I set the filter for the value tab with "([^"]*)?" Category, "([^"]*)?" field with Relative date on "([^"]*)?" calendar for "([^"]*)?" range and "([^"]*)?" value$/,
    setRelativeDateFilter
);

When(
    /^I set the filter for the value tab with "([^"]*)?" Category, "([^"]*)?" field with exact date option starting on "([^"]*)?" and finishing on "([^"]*)?"$/,
    setExactFilterOption
);

When(
    /^I set the filter for the value tab with "([^"]*)?" Category, "([^"]*)?" field with operator "([^"]*)?" and value "([^"]*)?"$/,
    setNewFilterValue
);

When(
    /^I set the filter for the value tab with "([^"]*)?" Category, "([^"]*)?" field with operator "([^"]*)?" and amount value of "([^"]*)?"$/,
    setFilterWithValue
);

// When(
//     /^I create a new filter for the value tab with "([^"]*)?" Category, "([^"]*)?" field with operator "([^"]*)?" and value of "([^"]*)?"$/,
//     setNewFilterWithValue
// );

When(
    /^I set the filter for the value tab with "([^"]*)?" Category, "([^"]*)?" field with option "([^"]*)?"$/,
    setNewFilterPredValue
);

When(
    /^I set the filter for the value tab with "([^"]*)?" Category, "([^"]*)?" field with select all option$/,
    setNewFilterPredefined
);

When(
    /^I click the button for the filter "([^"]*)?"$/,
    clickFilterItem
);

When(
    /^I click the button "([^"]*)?" on the warning message$/,
    clickWarningButton
);

When(
    /^I select Replacement Measure with Dimension "([^"]*)?", Data Element "([^"]*)?", with Filter "([^"]*)?" and Measure "([^"]*)?"$/,
    replacementMeasure
);

When(
    /^I select Measure to Replace with Dimension "([^"]*)?", Data Element "([^"]*)?", with Filter "([^"]*)?" and Measure "([^"]*)?"$/,
    replaceMeasure
);

// When(
//     /^I doubleclick the data element "([^"]*)?"$/,
//     doubleClickDataElement
// );

When(
    /^I add the data element "([^"]*)?" to the report$/,
    addDataElement
);

When(
    /^I add the single data element "([^"]*)?" to the report$/,
    addSingleDataElement
);

When(
    /^I set the report name to "([^"]*)?"$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },setReportName
);

When(
    /^I set the summation tab with dimension "([^"]*)?", summary columns "([^"]*)?", historical data "([^"]*)?" and "([^"]*)?" days to backfill$/,
    setSummationMeasure
);

When(
    /^I set the name "([^"]*)?" for the Measure$/,
    setMeasureName
);

When(
    /^I click on the add icon next to "([^"]*)?" on the Settings page$/,
    clickAddIcon
);

// When(
//     /^I run the Async DB Query "([^"]*)?"$/,
//     runAsyncDBQuery
// );

// When(
//     /^I run the DB Query "([^"]*)?"$/,
//     runDBQuery
// );

When(
    /^I run the DB Query "([^"]*)?"$/,
    sqlQueryExecutor
);

When(
    /^I click the transaction #(\d+) for the selected group alert$/,
    clickTransactionForAlertGroup
);

When(
    /^I open the alert group row #(\d+)$/,
    clickAlertGroup
);

When(
    /^I click on the "([^"]*)?" filter for Alerts$/,
    clickAlertCategory
)

When(
    /^I open the item #(\d+) from the listed results on the table$/,
    clickIconForRowNumber
);

When(
  /^I edit the "([^"]*)?" email schedule$/,
  clickEditEmailSchedule
);

When(
    /^I click on the data properties button "([^"]*)?"$/,
    clickDataPropertiesButton
);

When(
    /^I change the graph layout to "([^"]*)?"$/,
    clickTileName
);

When(
    /^I search for the data element "([^"]*)?"$/,
    searchDataElement
);

When(
    /^I select the data element "([^"]*)?"$/,
    clickDataElement
);

When(
    /^I select the data element measure "([^"]*)?"$/,
    clickDataElementMeasure
);

When(
    /^I set the Range field to "([^"]*)?" with X value set to "([^"]*)?" for the (Standard|Fiscal) Calendar$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },setRangeStdOrFiscal
);

When(
    /^I select the Report Type as (Summary|Trend) with (Relative|Exact) Type and (Standard|Fiscal) Calendar$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },selectReportType
);

// When(
//     /^I select the Employee-Store Hierarchy drop down option "([^"]*)?"$/,
//     selectEmployeeStoreHierarchy    
// );

When(
    /^I select the Store Hierarchy drop down option "([^"]*)?"$/,
    selectStoreHierarchy
);

When(
    /^I select the aggregation level "([^"]*)?" for the report$/,
    selectAggregationLevel
);

When(
    /^I click the checkbox for the Hierarchy element called "([^"]*)?"$/,
    clickHierarchyElement
);

When(
    /^I (expand|collapse) the Hierarchy element called "([^"]*)?"$/,
    expandHierarchy
);

When(
    /^I set the email field with "([^"]*)?"$/,
    setEmailField
);

When (
    /^I click on the Data Elements content table cell #(\d+) for row #(\d+)$/,
    clickTableItem
);

When (
    /^I open the item "([^"]*)?" from the listed results on the table$/,
    openTableItem
);

When (
    /^I set the filter "([^"]*)?" for the table with the following value: "([^"]*)?"$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },setTableHeaderFilter
);

When(
    /^I edit the "([^"]*)?" item from the displayed list$/,
    editSettingsItem
);

When(
    /^I edit the "([^"]*)?" settings item from the displayed list$/,
    editSettingsMonitor
);

When(
    /^I open the "([^"]*)?" link from the Settings page$/,
    openSettingsOption
);

When(
    /^I open the info box for the transaction #(\d+)$/,
    openInfoBox
);

When(
    /^I click the quick launch video icon for the transaction #(\d+)$/,
    openVideoPopup
);

When(
    /^I open the Task Manager feature$/,
    openTaskManager
);

When(
    /^I select category "([^"]*)?" with filters "([^"]*)?" on Display Columns tab$/,
    setDisplayColumns
);

When(
    /^I click the button with the "([^"]*)?" icon$/,
    clickButtonWithIcon
);

When(
    /^I convert this query to a measure with name "([^"]*)?", Dimension: "([^"]*)?" and Filters "([^"]*)?"$/,
    convertQueryToMeasure
);

When(
    /^I click the tab "([^"]*)?"$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },clickTab
);

When(
    /^I change the search type to "([^"]*)?"$/,
    clickTileName
);

When(
    /^I set the name of the Query to "([^"]*)?"$/,
    setQueryName
);

When(
    /^I click the sub item "([^"]*)?" from "([^"]*)?"$/,
    clickMenuSubItem
);

When(
    /^I open the query "([^"]*)?" from the Queries list$/,
    openQuery
);

When(
    /^I open the measure "([^"]*)?" from the Measures list$/,
    openMeasure
);

// When(
//     /^I open the query #(\d+) from the Queries list$/,
//     openQueryByRowNumber
// );

When(
    /^I set the Quick Query category to "([^"]*)?"$/,
    setQQCategory
);

When(
    /^I select the filters "([^"]*)?" on the Quick Query Settings page$/,
    setQQFilters
);

When(
    /^I click the button "([^"]*)?" on the current page$/,
    clickButton
);

When(
    /^I select "([^"]*)?" from the sub action menu$/,
    selectSubAction
);

When(
    /^I set the Quick Query Transaction Time to "([^"]*)?" with start date "([^"]*)?" and end date "([^"]*)?"$/,
    setQQTxTime
);

When(
    /^I set the Quick Query Transaction Order Total from "([^"]*)?" to "([^"]*)?"$/,
    setQQTxOrderTotal
);

When(
    /^I set the Quick Query Transaction Primary Tender Type to "([^"]*)?"$/,
    setQQTxPrimTenderType
);

// When(
//     /^I fill up the fields Transaction Time "([^"]*)?", Store "([^"]*)?", Associate #"([^"]*)?", Order #"([^"]*)?", Reg "([^"]*)?", Order Total "([^"]*)?" - "([^"]*)?", Manager ID "([^"]*)?", Customer ID "([^"]*)?", Prim Tender Acct "([^"]*)?", Prim Tender Type "([^"]*)?", Bill Cust Addrs "([^"]*)?", Trx "([^"]*)?", Rfnd-Rtn Count "([^"]*)?"$/,
//     setQuickQueryParams
// );

When(
    /^I open the report "([^"]*)?" from the Reports list$/,
    openReport
);

When(
    /^I open the report #(\d+) from the Reports list$/,
    openReportByRowNumber
);

// When(
//     /^I choose the Notifications component$/,
//     chooseNotificationsComponent
// );

// When(
//     /^I choose the announcement component and set its name to "([^"]*)?"$/,
//     chooseAnnouncementComponent
// );

// When(
//     /^I choose the "([^"]*)?" calendar for "([^"]*)?" range with "([^"]*)?" icon and color #(\d+) of color row (\d+)$/,
//     chooseWidgetProperties
// );

// When(
//     /^I set "([^"]*)?" as the name of the "([^"]*)?" widget from the category "([^"]*)?" for the dimension "([^"]*)?" and data element "([^"]*)?"$/,
//     chooseWidgetComponent
// );

When(
    /^I choose the "([^"]*)?" report from components$/,
    chooseReportOnComponents
);

When(
    /^I click on the Settings Tab for "([^"]*)?"$/,
    chooseSettingsTab
);

When(
    /^I set the name of the Dashboard to "([^"]*)?"$/,
    setDashboardName
);

When(
    /^I click on the top right action called "([^"]*)?"$/,
    selectDashboardAction
);

When(
    /^I select "([^"]*)?" from the navigation menu$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },
    clickSideBarElement
);
When(
    /^I click the (switch|top right action|element) "([^"]*)?" from the dashbord page$/,
    clickDashboardElement
);
When(
    /^I click the (switch|top right action|element) "([^"]*)?" from the queries page$/,
    clickQueryElement
);

// When(
//     /^I clear the filter "([^"]*)?" on the Dashboards page$/,
//     clearFilter
// );

When(
    /^I set "([^"]*)?" on the Dashboards filter "([^"]*)?"$/,
    setFilter
);

When(
    /^I open the dashboard "([^"]*)?" from the Dashboards list$/,
    openDashboard
);

// When(
//     /^I open the dashboard #(\d+) from the Dashboards list$/,
//     openDashboardByRowNumber
// );


When(
    /^I login into 2020 with username "([^"]*)?" with password "([^"]*)?"$/,
    login2020
);

When(
    /^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/,
    clickElement
);

When(
    /^I (click|doubleclick) on every remove (link|button|element) "([^"]*)?"$/,
    clickEveryRemoveElement
);

When(
    /^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/,
    setInputField
);

When(
    /^I clear the inputfield "([^"]*)?"$/,
    clearInputField
);

When(
    /^I drag element "([^"]*)?" to element "([^"]*)?"$/,
    dragElement
);

When(
    /^I pause for (\d+)ms$/,
    pause
);

When(
    /^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/,
    setCookie
);

When(
    /^I delete the cookie "([^"]*)?"$/,
    deleteCookies
);

When(
    /^I press "([^"]*)?"$/,
    pressButton
);

When(
    /^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/,
    handleModal
);

When(
    /^I enter "([^"]*)?" into the prompt$/,
    setPromptText
);

When(
    /^I scroll to element "([^"]*)?"$/,
    scroll
);

When(
    /^I close the last opened (window|tab)$/,
    closeLastOpenedWindow
);

When(
    /^I focus the last opened (window|tab)$/,
    focusLastOpenedWindow
);

When(
    /^I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"$/,
    selectOptionByIndex
);

When(
    /^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/,
    selectOption
);

When(
    /^I move to element "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/,
    moveTo
);

When(
    /^I sort on "([^"]*)?" column$/,
    sortHierarchyColumn
);

When(
    /^I sort on "([^"]*)?" column again$/,
    sortHierarchyColumn
);

When(
    /^I enter (alphabetical|numerical|special) text in contains filter on "([^"]*)?" column$/,
    kendoFilterContainsColumn
);

When(
    /^I clear contains filter on "([^"]*)?" column$/,
    clearKendoGridColumnFilter
);


When(
    /^I click on create new hierarchy button$/,
    clickOnCreateNewHierarchy
);

When(
    /^I click on auto generated hierarchy icon$/,
    clickOnNewAutoHierarchyGeneration
)

When(
    /^I click on manual hierarchy icon$/,
    clickOnNewManualHierarchyGeneration
)

When(
    /^I click on edit button for existing manual hierarchy$/,
    editExistingManualHierarchy
)

When(
    /^I click on edit button for existing auto hierarchy$/,
    editExistingAutoHierarchy
)

When(
    /^I create auto hierarchy "([^"]*)?"$/,
    createAutoHierarchy
)

When(
    /^I edit the hierarchy name "([^"]*)?"$/,
    editHierarchy
);

When(
    /^I add "([^"]*)?" as aggregation level in a new Manual Hierarchy$/,
    addMnualHierarchyAggregationLevel
);

When(
    /^I select the Hierarchy Aggregation Level with the text as "([^"]*)?" as "([^"]*)?"$/,
    selectHierarchyAggregationLevel
);

When(
    /^I select the Hierarchy Data Set as "([^"]*)?"$/,
    selectHierarchyDataSet
);

When(
    /^I select the "([^"]*)?" option from the "([^"]*)?" drop down$/,
    selectOptionFromDropDown
);

When(
    /^I click the span button "([^"]*)?" on the current page$/,
    clickSpanButton
);

When(
    /^I select "([^"]*)?" option from category$/,
    selectCategoryOption
);

When(
    /^I set "([^"]*)?" input to random guid$/,
    setInputToRandomValue
);

When(
    /^I select kpi data element "([^"]*)?"$/,
    selectKpiDataElement
)