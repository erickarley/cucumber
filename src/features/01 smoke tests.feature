Feature: Test the new framework structure
    As a developer
    I want to be able to test if this works

@Working @Critical @SmokeTests0
    # -------------------------------------------------------------------------
    # Summary:
    # This smoke test validates that the Analytics application’s version 
    # number can be accessed from the "About" page. It confirms that the 
    # About window opens, displays the version, and can be closed cleanly.
    #
    # Purpose:
    # - Ensure the "About" navigation option is functional.
    # - Confirm that a new window opens when "About" is selected.
    # - Validate that the version number is displayed and can be captured.
    # - Verify that the About window can be closed without errors.
    #
    # Features Covered:
    # - Navigation to About page.
    # - Window handling (focus and close).
    # - Version number visibility and capture.
    #
    # Application Context:
    # Version validation is a critical smoke test for Analytics, as it 
    # ensures that users and QA teams can verify which build of the 
    # application is currently deployed. This provides transparency 
    # and supports troubleshooting, release validation, and compliance.
    # -------------------------------------------------------------------------

    Scenario: Feature 01 - Test 1 - Open the About page to see the version number
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 1 - Version Number"
        Then  I wait for the page to be properly rendered
        When  I select "About" from the navigation menu
        # And   I wait until a new window has been opened
        When  I focus the last opened window
        Then  I wait for the version info to appear
        And   I save the information about the version number
        When  I close the last opened window


@Working @Critical @SmokeTests0.1
    # -------------------------------------------------------------------------
    # Summary:
    # This smoke test validates that a newly created query in the Analytics 
    # application successfully returns data. It ensures that the query runs, 
    # loads content, and produces non-empty results.  
    #
    # Purpose:
    # - Confirm navigation to Query creation.
    # - Validate that a query can be executed using the "Run" action.
    # - Ensure that query results are returned and not empty.
    # - Verify that at least one row of data is present in the results table.
    #
    # Features Covered:
    # - Query creation workflow.
    # - Query execution ("Run").
    # - Data load handling and content rendering.
    # - Validation of non-empty query results.
    #
    # Application Context:
    # Queries are the foundation for data exploration and reporting in the 
    # Analytics application. This smoke test ensures that the application 
    # can retrieve live data, confirming both system connectivity and 
    # baseline data availability. Without this functionality, subsequent 
    # features such as reports and dashboards would not be reliable.
    # -------------------------------------------------------------------------

    Scenario: Feature 01 - Test 2 - Test if query brings data
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 2 - Test if query brings data"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I click on the link "Query"
        Then  I wait for the page to be properly rendered
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I expect the cell #4 of the row #1 to not contain the following text ""
        And   I expect query results to be more than "0"

    @Working @Test1
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates that a user with an active account and permissions 
    # can access and view Dashboards and Reports in the Analytics application. 
    # It verifies navigation, filtering, and successful loading of both a 
    # dashboard and a report. 
    #
    # Purpose:
    # - Confirm that user permissions allow access to Dashboards and Reports.  
    # - Ensure dashboards can be located, opened, and their titles verified.  
    # - Validate that reports can be located, opened, and their titles verified.  
    #
    # Features Covered:
    # - Navigation to Dashboards and Reports.  
    # - Filter application in Dashboards and Reports lists.  
    # - Dashboard opening and content load validation.  
    # - Report opening and content load validation.  
    # - Verification of correct titles for opened resources.  
    #
    # Application Context:
    # This test ensures that role-based access is functioning correctly in the 
    # Analytics application. It demonstrates that users with the proper 
    # permissions can interact with Dashboards and Reports — two of the core 
    # components of the platform. This scenario also ties together dependencies 
    # from earlier setup tests: Dashboards (Setup04) and Reports (Setup03). 
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 3 - User has an active account with permission to view Dashboards and Reports
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 3 - account with permission to view Dashboards and Reports"
        Then  I wait for the page to be properly rendered
        When  I select "Dashboards" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I set the filter "Name" for the table with the following value: <dashboardName>
        When  I open the dashboard <dashboardName> from the Dashboards list
        Then  I wait for the page to be properly rendered
        Then  I expect the title of the dashboard to be <dashboardName>
        When  I select "Home" from the navigation menu
        Then  I wait for the page to be properly rendered
        Then  I expect page title to be "Dashboards"
        Then  I wait for the page to be properly rendered
        When  I select "Reports" from the navigation menu
        Then  I wait for the page to be properly rendered
        Then  I expect page title to be "Reports"
        Then  I wait for the page to be properly rendered
        And   I set the filter "Name" for the table with the following value: <reportName>
        And   I open the report <reportName> from the Reports list
        And   I wait for the content to finish loading  
        Then  I wait for the page to be properly rendered 
        Then  I expect the title of the report to be <reportName>

    Examples:
        | dashboardName              | reportName              |
        | "Automation Base Dashboard" | "Automation Base Report" |

    @Working @Test2
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the functionality of the Quick Query feature in 
    # the Analytics application. It ensures that users can open the Quick 
    # Query window, configure filters and ranges, run the query, and see 
    # expected results reflected in the report.  
    #
    # Purpose:
    # - Confirm that Quick Query can be launched from the Dashboards page.  
    # - Validate time and numeric filters (Transaction Time, Order Total).  
    # - Ensure that category and filter selections in Quick Query settings 
    #   update the query output.  
    # - Verify that expected columns appear in the results.  
    #
    # Features Covered:
    # - Navigation to Dashboards and Quick Query launch.  
    # - Multi-window handling (open, focus, close).  
    # - Quick Query filter setup (time, order total, category, specific filters).  
    # - Execution of Quick Query and validation of results.  
    # - Report validation via expected column presence.  
    #
    # Application Context:
    # Quick Query provides an accelerated way to run ad hoc queries without 
    # creating full saved queries. It is frequently used for rapid checks 
    # on transactional or customer data. This test ensures that Quick Query 
    # operates as intended, supports filter customization, and returns 
    # results with the correct structure (columns) — making it a critical 
    # feature for business analysts and SMEs needing fast insights.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 4 - Test Quick Query Page
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 4 - Test Quick Query Page"
        Then  I wait for the page to be properly rendered  
        When  I select "Dashboards" from the navigation menu
        Then  I wait for the page to be properly rendered
        Then  I expect page title to be "Dashboards"
        When  I click on the top right action called "Quick Query"
        And   I select "POS Transactions" from the sub action menu
        And   I pause for 10000ms
        Then  I wait for the page to be properly rendered
        Then  I expect a new window has been opened
        Then  I wait for the page to be properly rendered
        When  I focus the last opened window
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered  
        When  I set the Quick Query Transaction Time to "This Year" with start date "" and end date "" 
        And   I set the Quick Query Transaction Order Total from "15" to "340"
        # And   I set the Quick Query Transaction Primary Tender Type to "Cash"
        #When  I fill up the fields Transaction Time "This Year", Store "", Associate #"", Order #"", Reg "", Order Total "15" - "340", Manager ID "", Customer ID "", Prim Tender Acct "", Prim Tender Type "Cash", Bill Cust Addrs "", Trx "", Rfnd-Rtn Count ""
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered  
        # Then  I expect the cell #10 of the row #1 to contain the following text "Cash"
        When  I click on the top right action called "Settings"
        And   I set the Quick Query category to <quickQueryCategory>
        And   I select the filters <filters> on the Quick Query Settings page
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered 
        # Then  I expect the cell #10 of the row #1 to contain the following text "Cash"
        And   I expect column name <expectedColumnName> to appear in the report
        When  I close the last opened window
    Examples:
        | quickQueryCategory       | filters          | expectedColumnName |
        | "Customer (Master Data)" | "Account Number" | "Account Number"   |

@Working @SmokeTests3
    # -------------------------------------------------------------------------
    # Summary:
    # This smoke test validates the full workflow of using the Standard Query 
    # page in the Analytics application. It covers opening an existing query, 
    # editing and saving it under a new name, running the query, validating its 
    # appearance in the Recent section, re-opening the saved query, modifying 
    # display columns, running it again, and downloading the results.
    #
    # Purpose:
    # - Confirm that the Standard Query page can be accessed from navigation.  
    # - Validate opening and editing an existing query.  
    # - Ensure saving a query under a new name works correctly with confirmation.  
    # - Verify query execution returns non-empty results.  
    # - Confirm saved queries appear under "Recent" and can be re-opened.  
    # - Validate display column modifications and re-run functionality.  
    # - Ensure query results can be downloaded successfully.  
    #
    # Features Covered:
    # - Navigation to Queries and Recent sections.  
    # - Query edit and save (new name).  
    # - Query execution and non-empty data validation.  
    # - Display Columns tab functionality.  
    # - Query persistence under Recent.  
    # - Download of query results.  
    #
    # Application Context:
    # Standard Queries form the backbone of data exploration and reporting in 
    # the Analytics application. This test ensures end-to-end stability of 
    # query workflows: creation, editing, execution, persistence in navigation, 
    # customization of display columns, and exporting results. It validates 
    # critical smoke-level functionality, confirming that analysts can reliably 
    # work with queries from start to finish.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 5 - Test Standard Query Page
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 5 - Test Standard Query Page"
        Then  I wait for the page to be properly rendered
        When  I select "Queries" from the navigation menu
        Then  I expect the cell #2 of the row #1 to not contain the following text ""
        When  I open the query <queryName> from the Queries list
        Then  I wait for the page to be properly rendered
        Then  I wait for the application to be ready
        Then  I expect tile name "POS Transactions" to appear in the Query edit page
        When  I set the name of the Query to <automationQueryName>
        When  I click on the top right action called "Save New"
        # When  I click on the top right action called "Favorite"
        Then  I expect the "Query Saved" banner appears
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I select "Queries" from the navigation menu
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I select "Recent" from the navigation menu
        And   I click the sub item "more..." from "Recent"
        Then  I wait for the page to be properly rendered
        When  I set the filter "Name" for the table with the following value: <automationQueryName>
        Then  I expect the cell #2 of the row #1 to contain the following text <automationQueryName>
        # And   I expect <automationQueryName> to appear as a sub item of "Recent"
        When  I select "Home" from the navigation menu
        Then  I wait for the page to be properly rendered
        When  I select "Queries" from the navigation menu
        Then  I wait for the page to be properly rendered
        When  I open the query <automationQueryName> from the Queries list
        Then  I wait for the page to be properly rendered
        And   I click the tab "DISPLAY COLUMNS"
        # And   I select category <quickQueryCategory> with filters <filters> on Display Columns tab
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I expect the cell #3 of the row #1 to not contain the following text ""
        And   I select "Create New" from the navigation menu
        Then  I wait on the dialog pop up to be displayed
        And   I click the button with the "close" icon
        Then  I wait on the dialog pop up not to be displayed
        When  I click on the top right action called "Download"
        And   I click the button "Download" on the current page
        Then  I wait on the dialog container not to be displayed
    Examples:
        | queryName              | automationQueryName | 
        | "Automation Base Query" | "Automation Query"  |

@Working @Test3.1
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the "Convert to Measure" functionality in the 
    # Analytics application. It ensures that a query can be opened, modified, 
    # saved, and then converted into a measure with proper filters, dimensions, 
    # and confirmation banners.
    #
    # Purpose:
    # - Confirm that queries can be accessed and renamed for conversion.  
    # - Validate that search type changes trigger warnings and can be confirmed.  
    # - Ensure filters can be adjusted (delete defaults, add new filter).  
    # - Verify query can be saved, converted to a measure, and saved as a new measure.  
    # - Confirm "Measure Saved" banner appears and disappears as expected.  
    #
    # Features Covered:
    # - Query navigation and editing.  
    # - Warning validation when changing search type.  
    # - Filter management (deletion, addition, save).  
    # - Conversion of queries to measures.  
    # - Save and banner confirmation for measures.  
    #
    # Application Context:
    # The ability to convert queries into measures is critical for Analytics 
    # users who want to transform ad hoc data exploration into reusable, 
    # aggregated metrics. This test ensures that conversion works reliably, 
    # that users are properly warned about changes, and that converted measures 
    # are saved successfully for further use in reports and dashboards.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 6 - Test Convert to Measure Functionality 
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 6 - Test Convert to Measure Functionality"
        Then  I wait for the page to be properly rendered
        When  I select "Queries" from the navigation menu
        When  I open the query <queryName> from the Queries list
        Then  I wait for the page to be properly rendered
        And   I set the name of the Query to <automationQueryName>
        Then  I wait for the page to be properly rendered
        When  I change the search type to "POS Lines"
        #And   I pause for 1000ms
        Then  I expect a "Warning" to appear with the text "Changing the Category will reset query filters and display columns."
        And   I click the button "Continue" on the current page
        Then  I wait for the page to be properly rendered
        Then  I wait on the dialog container not to be displayed
        When  I click the tab "FILTERS"
        When  I delete the default filter when creating a query
        And   I click the button for the filter "Add New Filter"
        And   I set the filter for the value tab with <searchCriteria> Category, <filter> field with select all option 
        And   I click the button "Save" on the current page
        And   I wait for the application to be ready
        When  I click on the top right action called "Save New"
        And   I wait for the application to be ready
        # And   I click the button "Run" on the current page
        And   I click the tab "PROPERTIES"
        When  I click on the top right action called "Save"
        And   I wait for the application to be ready
        And   I click the button "Convert To Measure" on the current page
        And   I convert this query to a measure with name <convertedQueryName>, Dimension: "Store" and Filters "Order Total"
        # And   I wait for the button "Save" to be enabled
        And   I click the button "Save" on the current page
        Then  I wait on the dialog container not to be displayed
        # Then  I expect the "Measure Saved" banner appears
        Then  I wait until the banner "Measure Saved" dissapears
    Examples:
        | queryName              | automationQueryName           | convertedQueryName     | quickQueryCategory       | filters     | searchCriteria | filter     |
        | "Automation Base Query" | "Automation Query To Convert" | "Automation Converted" | "Customer (Master Data)" | "Address 2" | "POS Lines"    | "Item Type" |

@Working @Test4
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the Reporting Settings page for "Manage Measures" 
    # in the Analytics application. It covers editing an existing measure 
    # (converted from a query) and deleting it, verifying proper navigation, 
    # breadcrumbs, and confirmation behaviors.
    #
    # Purpose:
    # - Confirm that "Manage Measures" can be accessed from Settings.  
    # - Validate editing an existing measure and breadcrumb accuracy.  
    # - Ensure that a converted measure can be located, opened, and displayed.  
    # - Verify that deleting a measure works correctly with confirmation and 
    #   proper navigation back to the Manage Measures list.  
    #
    # Features Covered:
    # - Navigation to Manage Measures.  
    # - Measure editing workflow.  
    # - Breadcrumb validation for Manage Measures and specific measure detail.  
    # - Measure deletion workflow with confirmation.  
    #
    # Application Context:
    # Measures are reusable calculated metrics in the Analytics application, 
    # used in reports and dashboards. This test ensures that administrators 
    # can manage measures effectively—editing when updates are needed and 
    # deleting when measures are obsolete. It validates stability of the 
    # Manage Measures page and protects data integrity across reporting.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 7 - Test Reporting Settings Page (Manage Measures)
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 7 - Test Reporting Settings Page (Manage Measures)"
        Then  I wait for the page to be properly rendered
        When  I select "Settings" from the navigation menu
        And   I open the "Manage Measures" link from the Settings page
        Then  I wait for the page to be properly rendered
        # Then  I expect the breadcrumb to show "Manage Measures" as the current item
        # And   I expect the cell #3 of the row #1 to not contain the following text ""
        When  I edit the <convertedQueryName> item from the displayed list
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show <convertedQueryName> as the current item
        # # Measures delete
        When  I select "Settings" from the navigation menu
        And   I open the "Manage Measures" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
        When  I click the edit pencil icon for the <convertedQueryName> item from the list
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show <convertedQueryName> as the current item
        Then  I wait for the page to be properly rendered
        When  I wait for the application to be ready
        When  I click on the top right action called "Delete"
        And   I wait for the application to be ready
        When  I click the button "Continue" on the current page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
    Examples:
        | convertedQueryName     | 
        | "Automation Converted" |


@Working @SmokeTests5 @Drilldown2
    # -------------------------------------------------------------------------
    # Summary:
    # This smoke test validates the Drilldown page functionality in the 
    # Analytics application. It ensures that users can open a report, drill 
    # into its data elements, view results, adjust settings, download output, 
    # and monitor task execution via the Task Manager.
    #
    # Purpose:
    # - Confirm navigation to Reports and selection of a specific report.  
    # - Validate drilldown into report data elements and rendering of results.  
    # - Ensure settings, properties, and filters tabs are accessible.  
    # - Verify advanced filter dialog interactions (open/close).  
    # - Validate download functionality for report output.  
    # - Confirm Task Manager reflects completed tasks and supports cleanup.  
    #
    # Features Covered:
    # - Report selection and drilldown.  
    # - Data element drill interactions.  
    # - Settings, PROPERTIES, and FILTERS tab access.  
    # - Advanced filter dialog handling.  
    # - Report download and dialog confirmation.  
    # - Task Manager monitoring and removal of finished tasks.  
    #
    # Application Context:
    # Drilldowns provide users with the ability to move from summary report 
    # data into detailed transaction-level views. This test validates the 
    # end-to-end drilldown workflow, ensuring that report interactivity, 
    # filtering, downloading, and task monitoring all function correctly. 
    # Reliable drilldowns are essential for analysts to explore insights 
    # beyond high-level dashboards.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 8 - Test Drilldown Page
        Given the user navigates to the designated environment
        And   I wait for the page to be properly rendered
        When  I create a note in the Execution Log with text: "Feature 01 - Test 8 - Test Drilldown Page"
        When  I select "Reports" from the navigation menu
        Then  I expect the cell #2 of the row #1 to not contain the following text ""
        When  I set the filter "Name" for the table with the following value: <reportName>
        When  I open the item <reportName> from the listed results on the table
        And   I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        And   I wait for the page to be properly rendered
        And   I click on the Data Elements content table cell #1 for row #1
        And   I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        And   I wait for the page to be properly rendered
        Then  I wait for the report to render the results count
        And   I wait for the content to finish loading
        And   I wait for the page to be properly rendered
        Then  I expect the cell #4 of the row #1 to not contain the following text ""
        # When  I click on the top right action called "Settings"
        # And   I wait for the page to be properly rendered
        # And   I click the tab "PROPERTIES"
        # And   I click the tab "FILTERS"
        # And   I pause for 4000ms
        # # And   I click the button "Advanced" on the current page
        # # And   I pause for 2000ms
        # # And   I click the button with the "close" icon
        # # And   I pause for 2000ms
        # When  I click on the top right action called "Settings"
        # Then  I wait for the page to be properly rendered
        # And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        And   I pause for 2000ms
        And   I click the button "Download" on the current page
        Then  I wait on the dialog container not to be displayed
        And   I open the Task Manager feature
        And   I verify the Task Manager is open
        And   I pause for 4000ms
        Then  I wait on the dialog container to be displayed
        And   I click the button "Remove All Finished" on the current page
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed
        Then  I wait on the dialog container not to be displayed
        When  I close the last opened window
    Examples:
        | reportName              | 
        | "Automation Base Report" |

    # @Drilldown 
    # Scenario Outline: Test 5.1: Test Drilldown on Report - <reportId>
    #     Given the user navigates to the designated environment
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Home" from the navigation menu
    #     And   I navigate to report number <reportId>
    #     Then  I wait for the page to be properly rendered
    #     When  I create a note in the Execution Log with text: "Test 5.1"
    #     When  I pause for 5000ms
    #     Then  I wait for the page to be properly rendered
    #     When  I verify that all drillable cells from summary report <reportId> in row #1 generate no error
    #     Examples:
    #     | reportId | 
    #     | "2866" | 
    #     | "2672" | 
    #     | "2667" | 
    #     | "2640" |
    #     | "2651" |  


@Working @SmokeTests6 
    # -------------------------------------------------------------------------
    # Summary:
    # This smoke test validates the Report Page functionality in the 
    # Analytics application. It covers opening a report, saving snapshots, 
    # downloading and emailing results, configuring hierarchy and aggregation 
    # levels, adjusting time settings, selecting measures, customizing graph 
    # layouts and properties, and verifying email schedules.
    #
    # Purpose:
    # - Confirm navigation to Reports and opening of a specific report.  
    # - Validate snapshot saving, download, and email workflows.  
    # - Ensure hierarchy filters and aggregation levels can be applied.  
    # - Verify time range adjustments and report type changes.  
    # - Confirm data element and measure selection is functional.  
    # - Validate graph layout and properties can be customized.  
    # - Confirm that email schedules can be viewed and edited.  
    #
    # Features Covered:
    # - Report navigation and opening.  
    # - Snapshot creation and confirmation banner.  
    # - Report download and email workflows.  
    # - Hierarchy selection and aggregation level configuration.  
    # - Time tab settings (trend, relative type, custom ranges).  
    # - Data element and measure selection.  
    # - Graph Layout and Graph Properties adjustments.  
    # - Properties tab and Email Schedules management.  
    #
    # Application Context:
    # Reports represent one of the most critical components of the Analytics 
    # application, enabling users to analyze data across hierarchies, time 
    # frames, and measures. This test ensures that the Report Page supports 
    # end-to-end interactions including exporting, emailing, configuring views, 
    # and customizing visualizations. Reliable functionality here guarantees 
    # that analysts can generate, distribute, and interpret reports effectively.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 9 - Test Report Page
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 9 - Test Report Page"
        Then  I wait for the page to be properly rendered
        When  I select "Reports" from the navigation menu
        Then  I expect the cell #2 of the row #1 to not contain the following text ""
        When  I set the filter "Name" for the table with the following value: <reportName>
        When  I open the item <reportName> from the listed results on the table
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Snapshot"
        And   I wait for the page to be properly rendered
        Then  I wait until the banner "Snapshot saved." dissapears
        When  I click on the top right action called "Download"
        And   I click the button with the "close" icon
        Then  I wait on the dialog container not to be displayed
        When  I click on the top right action called "Email"
        Then  I wait on the dialog container to be displayed
        And   I pause for 3000ms
        And   I set the email field with "agilence123@gmail.com"
        And   I pause for 1000ms
        # And   I set the email field with "agilence123@gmail.com"
        And   I click the button "Email" on the current page
        Then  I wait on the dialog container not to be displayed
        When  I click on the top right action called "Settings"
        Then  I wait for the page to be properly rendered
        And   I click the tab "Hierarchy"
        # And   I pause for 4000ms
        And   I select the Store Hierarchy drop down option <storeHierarchy>
        Then  I wait for the page to be properly rendered
        Then  I expect the loading overlay to not appear
        # When  I expand the Hierarchy element called "All"
        # Then  I expect the loading overlay to not appear
        # When  I expand the Hierarchy element called <hierarchyToExpand>
        # # Then  I expect the loading overlay to not appear
        # And   I click the checkbox for the Hierarchy element called <hierarchyToExpand>
        Then  I wait for the page to be properly rendered
        And   I select the aggregation level <aggregationLevel> for the report
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Settings"
        Then  I wait for the page to be properly rendered
        Then  I expect that header with text <aggregationLevel> appears on the table 
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Settings"
        Then  I wait for the page to be properly rendered
        And   I click the tab "Time"
        And   I select the Report Type as Trend with Relative Type and Standard Calendar
        Then  I wait for the page to be properly rendered
        And   I set the Range field to "X Months" with X value set to "7" for the Standard Calendar
        Then  I wait for the page to be properly rendered
        And   I pause for 3000ms
        And   I set the Range field to "This Month and Last" with X value set to "" for the Standard Calendar
        Then  I wait for the page to be properly rendered
        And   I pause for 3000ms
        When  I click the tab "Data Elements"
        And   I select the data element measure "POS Measures"
        And   I select the data element <measureName>
        When  I click the tab "Graph Layout"
        And   I change the graph layout to "Stacked Column"
        And   I change the graph layout to "Bar"
        And   I change the graph layout to "Stacked Bar"
        When  I click the tab "Graph Properties"
        # And   I pause for 3000ms
        # # And   I click on the data properties button <graphProperty>
        # And   I pause for 3000ms
        When  I click the tab "Properties"
        When  I click the tab "Email Schedules"
        And   I edit the "Daily" email schedule
        And   I click the button with the "close" icon
        Then  I wait on the dialog container not to be displayed
    Examples:
        | reportName              | storeHierarchy     | hierarchyToExpand | aggregationLevel | measureName              | graphProperty  |
        | "Automation Base Report" | "All Stores (Auto)" | "Central"        | "Store"          | "Automation Base Measure" | "Order Total"  |

@Working @SmokeTests7
    # -------------------------------------------------------------------------
    # Summary:
    # This smoke test validates the creation of a new query in the Analytics 
    # application. It ensures that users can configure query parameters, add 
    # advanced filters, customize display columns, run the query, validate 
    # results, and drill into transaction-level details.
    #
    # Purpose:
    # - Confirm navigation to "Create New → Query" works.  
    # - Validate that all core tabs (SEARCH, FILTERS, DISPLAY COLUMNS, 
    #   PROPERTIES) are displayed.  
    # - Ensure filters can be added with specific operators (EXISTS).  
    # - Verify that display columns can be configured and persist correctly.  
    # - Validate that query execution returns non-empty results.  
    # - Confirm selected filters are correctly applied after execution.  
    # - Ensure drilldown into transaction details is supported and loads data.  
    #
    # Features Covered:
    # - Query creation workflow.  
    # - Tab validation (SEARCH, FILTERS, DISPLAY COLUMNS, PROPERTIES).  
    # - Filter configuration with EXISTS operator.  
    # - Display Columns customization.  
    # - Query execution and result validation.  
    # - Settings verification for applied filters.  
    # - Drilldown to transaction details and info box validation.  
    #
    # Application Context:
    # New Query creation is a fundamental feature of the Analytics application, 
    # enabling users to define and execute custom data explorations. This test 
    # ensures that advanced filtering, column customization, and result 
    # validation all work seamlessly, providing reliable tools for analysts 
    # to query data with precision and confidence.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 10 - Test New Query Creation
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 10 - Test New Query Creation"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I click on the link "Query"
        Then  I wait for the page to be properly rendered
        Then  I expect tab "SEARCH" to be displayed
        And   I expect tab "FILTERS" to be displayed
        And   I expect tab "DISPLAY COLUMNS" to be displayed
        And   I expect tab "PROPERTIES" to be displayed
        When  I change the search type to <searchType>
        Then  I wait for the page to be properly rendered
        And   I set the name of the Query to "Test7: Test New Query Creation"
        And   I click the tab "FILTERS"
        And   I pause for 3000ms
        # When  I delete the default filter when creating a query
        And   I click the button for the filter "Add New Filter"
        And   I pause for 3000ms
        And   I set the filter for the value tab with <searchType> Category, <newFilter> field with EXISTS operator and value "Yes" 
        And   I click the button "Save" on the current page
        And   I click the tab "DISPLAY COLUMNS"
        And   I select category <searchType> with filters <categoryFilter> on Display Columns tab
        And   I click the button "Run" on the current page
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        # And   I wait for the content to finish loading
        Then  I expect the cell #4 of the row #1 to not contain the following text ""
        # When  I click on the top right action called "Settings"
        # Then  I wait for the page to be properly rendered
        # Then  I expect filter <categoryFilter> to be selected
        # When  I click on the top right action called "Settings"
        # And   I wait for the content to finish loading
        # And   I wait for the page to be properly rendered
        And   I open the info box for the transaction #1
        When  I pause for 15000ms
        When  I focus the last opened window
        Then  I wait for the item master loader to disappear
    Examples:
        | searchType      | newFilter | categoryFilter |
        | "Store Master"  | "State"   | "City"         |

@Working @ReplaceMeasure
    # -------------------------------------------------------------------------
    # Summary:
    # This end-to-end test validates the "Replace Measure" functionality in 
    # the Analytics application. It covers creating two measures, running 
    # summations, creating a report that uses both measures, replacing one 
    # measure with another across the application, verifying report results, 
    # and finally cleaning up by deleting the report and measures.
    #
    # Purpose:
    # - Measure Creation Phase:  
    #   Confirm that new measures can be created with filters, summation 
    #   settings, and saved successfully with summations executed.  
    #
    # - Report Creation Phase:  
    #   Ensure that a new report can be created, configured with both measures, 
    #   saved, and validated with headers displaying both measures.  
    #
    # - Replace Measure Phase:  
    #   Validate that the Replace Measure page allows replacing an existing 
    #   measure with another, displaying correct warnings, and confirming 
    #   replacement success banners.  
    #
    # - Verification Phase:  
    #   Confirm that replaced measures are reflected correctly in report results.  
    #
    # - Cleanup Phase:  
    #   Ensure that reports and measures created during the test can be 
    #   deleted from Manage Reports and Manage Measures to leave the 
    #   environment in a clean state.  
    #
    # Features Covered:
    # - Measure creation, filter setup, summation configuration.  
    # - Task Manager validation for summation execution.  
    # - Report creation with multiple measures.  
    # - Replace Measure workflow: select source measure, select replacement 
    #   measure, confirm warnings, validate replacement success.  
    # - Report verification with replaced measures.  
    # - Report deletion from Manage Reports.  
    # - Measure deletion from Manage Measures.  
    #
    # Application Context:
    # Replacing measures is a high-impact feature in the Analytics application, 
    # allowing administrators to substitute metrics across all reports and 
    # dashboards without manually reconfiguring each one. This test validates 
    # that the replacement process works reliably end-to-end: ensuring correct 
    # measure creation, report integration, replacement confirmation, data 
    # accuracy after replacement, and cleanup. It is critical for maintaining 
    # consistency and flexibility in enterprise reporting.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 11 - Test Replace Measure Page
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 11 - Test Replace Measure Page"
        Then  I wait for the page to be properly rendered
        When  I select "Settings" from the navigation menu
        And   I click on the add icon next to "Manage Measures" on the Settings page
        # Then  I wait for the page to be properly rendered
        And   I set the name <measureName> for the Measure
        # Then  I wait for the page to be properly rendered
        When  I change the search type to "POS Transactions"
        Then  I wait for the page to be properly rendered
        When  I click the tab "FILTERS"
        And   I click the button for the filter "Add New Filter"
        And   I set the filter for the value tab with <searchCriteria> Category, <filter> field with operator ">" and amount value of "0" 
        Then  I wait for the application to be ready
        And   I click the button "Save" on the current page
        Then  I wait for the application to be ready
        And   I click the tab "Summation"
        And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "120" days to backfill
        Then  I wait for the application to be ready
        And   I click on the top right action called "Save"
        Then  I expect the "Measure Saved" banner appears       
        And   I click the button "Run Summation Now" on the current page
        Then  I expect a Pop Up with title "Manual Summation" and exact text: "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
        When  I set "120" as the number of days to backfill
        And   I click the button "Continue" on the current page
        Then  I wait for the page to be properly rendered
        And   I pause for 3000ms
        And   I open the Task Manager feature
        And   I verify the Task Manager is open
        Then  I wait on the dialog container to be displayed
        And   I expect the Task Manager to not contain the "Manual summation failed." message
        Then  I wait for the page to be properly rendered
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed
        #Second Measure
        When  I select "Settings" from the navigation menu
        And   I click on the add icon next to "Manage Measures" on the Settings page
        And   I set the name <measureToReplaceName> for the Measure
        Then  I wait for the page to be properly rendered
        And   I click the tab "Summation"
        Then  I wait for the page to be properly rendered
        And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "120" days to backfill
        Then  I wait for the application to be ready
        And   I click on the top right action called "Save"
        Then  I expect the "Measure Saved" banner appears       
        And   I click the button "Run Summation Now" on the current page
        Then  I expect a Pop Up with title "Manual Summation" and exact text: "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
        When  I set "120" as the number of days to backfill
        And   I click the button "Continue" on the current page
        And   I pause for 3000ms
        Then  I wait for the page to be properly rendered
        And   I open the Task Manager feature
        Then  I verify the Task Manager is open
        And   I expect the Task Manager to not contain the "Manual summation failed." message
        Then  I wait for the page to be properly rendered
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed
        # Report Creation
        When  I select "Create New" from the navigation menu
        And   I click the option "Report" from the Create New pop up
        Then  I wait for the page to be properly rendered
        And   I set the report name to <reportName>
        And   I click the tab "Time"
        And   I select the Report Type as Summary with Relative Type and Standard Calendar
        Then  I wait for the page to be properly rendered
        And   I set the Range field to "X Months" with X value set to "3" for the Standard Calendar
        Then  I wait for the page to be properly rendered
        When  I click the tab "Data Elements"
        And   I pause for 3000ms
        And   I select the data element measure "POS Measures"
        And   I pause for 3000ms
        And   I add the data element <measureName> to the report
        Then  I wait for the page to be properly rendered
        And   I select the data element measure "POS Measures"
        And   I add the data element <measureToReplaceName> to the report
        Then  I wait for the page to be properly rendered
        Then  I expect that header for data element <measureName> appears on the table
        And   I pause for 3000ms
        Then  I expect that header for data element <measureToReplaceName> appears on the table
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Save"
        And   I pause for 10000ms
        Then  I wait for the page to be properly rendered
        #Replace the Measure
        When  I select "Settings" from the navigation menu                                                                    
        And   I open the "Replace Measure" link from the Settings page
        Then  I expect the breadcrumb to show "Replace Measure" as the current item
        When  I select Measure to Replace with Dimension "Store", Data Element "POS Measures", with Filter <measureName> and Measure "Tx Count (#)"
        And   I click the button "Next" on the current page
        When  I select Replacement Measure with Dimension "Store", Data Element "POS Measures", with Filter <measureToReplaceName> and Measure "Tx Count (#)"
        And   I click the button "Next" on the current page
        Then  I wait for the page to be properly rendered
        And   I click the button "Replace" on the current page
        Then  I expect a "Warning" to appear with the text "The measure will be replaced throughout the application."
        And   I click the button "Replace" on the warning message
        Then  I expect the "The measure has been successfully replaced." banner appears
        # Time to check the report
        When  I select "Reports" from the navigation menu
        Then  I wait for the page to be properly rendered
        Then  I expect the loading overlay to not appear
        Then  I expect the cell #2 of the row #1 to not contain the following text ""
        When  I set the filter "Name" for the table with the following value: <reportName>
        When  I open the item <reportName> from the listed results on the table
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        Then  I expect for row #1 and column #1 to have the same value as row #1 on column #3
        When  I select "Settings" from the navigation menu
        And   I open the "Manage Reports" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Reports" as the current item
        When  I edit the <reportName> record from the list
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show <reportName> as the current item
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Delete"
        And   I pause for 2000ms
        When  I click the button "Continue" on the current page
        Then  I wait for the page to be properly rendered
        # # Measures delete
        When  I select "Settings" from the navigation menu
        And   I open the "Manage Measures" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
        When  I click the edit pencil icon for the <measureToReplaceName> item from the list
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show <measureToReplaceName> as the current item
        Then  I wait for the page to be properly rendered
        And   I pause for 5000ms
        When  I click on the top right action called "Delete"
        And   I pause for 2000ms
        When  I click the button "Continue" on the current page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
        When  I click the edit pencil icon for the <measureName> item from the list
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show <measureName> as the current item
        Then  I wait for the page to be properly rendered
        Then  I wait for the page to be properly rendered
        And   I pause for 5000ms
        When  I click on the top right action called "Delete"
        And   I pause for 2000ms
        When  I click the button "Continue" on the current page
        Then  I wait for the page to be properly rendered
    Examples:
        | measureName        | dimension | summaryColumn | measureToReplaceName | reportName                        | searchCriteria     | filter        |
        | "Original Measure" | "Store"   | "Order Total" | "ReplaceMe Measure"  | "A Report with replaced measures" | "POS Transactions" | "Order Total" |

@Working @SmokeTests10
    # -------------------------------------------------------------------------
    # Summary:
    # This smoke test validates the Favorites Page functionality in the 
    # Analytics application. It ensures that users can mark Reports, 
    # Dashboards, and Queries as favorites, verify their appearance under 
    # the Favorites menu, open them from there, and remove them successfully.
    #
    # Purpose:
    # - Confirm that Reports can be favorited, appear under Favorites, 
    #   and be unfavorited with the menu updating correctly.  
    # - Validate the same flow for Dashboards, including navigation 
    #   and removal from Favorites.  
    # - Ensure Queries can be executed, favorited, accessed from Favorites, 
    #   re-run successfully, and then unfavorited.  
    #
    # Features Covered:
    # - Report favorite and unfavorite workflow.  
    # - Dashboard favorite and unfavorite workflow.  
    # - Query execution, favorite/unfavorite, and persistence in Favorites.  
    # - Navigation validation for the Favorites menu.  
    # - Verification that unfavoriting removes items from Favorites.  
    #
    # Application Context:
    # Favorites streamline navigation for end users, giving quick access to 
    # frequently used Reports, Dashboards, and Queries. This test ensures 
    # the reliability of the Favorites system by validating the entire 
    # lifecycle of adding, accessing, and removing items. It is critical for 
    # usability and efficiency in day-to-day Analytics operations.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 12 - Test Favorites Page
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 12 - Test Favorites Page"
        Then  I wait for the page to be properly rendered
        #Reports
        When  I select "Reports" from the navigation menu
        Then  I wait for the page to be properly rendered
        Then  I expect the cell #2 of the row #1 to not contain the following text ""
        When  I set the filter "Name" for the table with the following value: <reportName>
        When  I open the item <reportName> from the listed results on the table
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Favorite"
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        Then  I wait for the page to be properly rendered
        When  I select "Favorites" from the navigation menu
        Then  I expect <reportName> to appear as a sub item of "Favorites"
        And   I click the sub item <reportName> from "Favorites"
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Favorite"
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I expect "Favorites" navigation item not to be displayed
        #Dashboards
        When  I select "Dashboards" from the navigation menu
        Then  I wait for the page to be properly rendered
        Then  I expect the cell #2 of the row #1 to not contain the following text ""
        When  I set the filter "Name" for the table with the following value: <dashboardName>
        When  I open the item <dashboardName> from the listed results on the table
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Favorite"
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        Then  I wait for the page to be properly rendered
        When  I select "Favorites" from the navigation menu
        Then  I expect <dashboardName> to appear as a sub item of "Favorites"
        And   I click the sub item <dashboardName> from "Favorites"
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I pause for 5000ms
        When  I click on the top right action called "Favorite"
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        Then  I wait for the page to be properly rendered
        Then  I expect the loading overlay to not appear
        And   I expect "Favorites" navigation item not to be displayed
        #Queries
        When  I select "Queries" from the navigation menu
        Then  I wait for the page to be properly rendered
        Then  I expect the cell #2 of the row #1 to not contain the following text ""
        When  I set the filter "Name" for the table with the following value: <queryName>
        When  I open the item <queryName> from the listed results on the table
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Favorite"
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        Then  I wait for the page to be properly rendered
        When  I select "Favorites" from the navigation menu
        Then  I expect <queryName> to appear as a sub item of "Favorites"
        And   I click the sub item <queryName> from "Favorites"
        Then  I wait for the page to be properly rendered
        When  I pause for 5000ms
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Favorite"
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        Then  I wait for the page to be properly rendered
        Then  I expect the loading overlay to not appear
        And   I expect "Favorites" navigation item not to be displayed
    Examples:
        | dashboardName              | reportName              | queryName              |
        | "Automation Base Dashboard" | "Automation Base Report" | "Automation Base Query" |

@Working @SmokeTests11
    # -------------------------------------------------------------------------
    # Summary:
    # This smoke test validates the ability to add multiple types of filters 
    # to an existing Query in the Analytics application. It ensures that 
    # text-based, exact date, and relative date filters can be created, saved, 
    # and displayed correctly in the filter list.
    #
    # Purpose:
    # - Confirm that a query can be opened from the Queries page.  
    # - Validate adding a text filter using the "CONTAINS" operator.  
    # - Ensure exact date filters can be configured with start and end dates.  
    # - Verify relative date filters can be applied using a calendar and range.  
    # - Confirm that all newly added filters appear in the filter list.  
    #
    # Features Covered:
    # - Query navigation and opening.  
    # - Adding and saving text filters.  
    # - Adding and saving exact date filters.  
    # - Adding and saving relative date/time filters.  
    # - Validation that saved filters are displayed in the filter list.  
    #
    # Application Context:
    # Filters are essential for refining queries and retrieving relevant 
    # analytics data. This test ensures that users can reliably add and 
    # save different types of filters (string, date, and relative date), 
    # which are key building blocks for precise reporting. Reliable filter 
    # functionality is critical for ensuring analysts can segment and 
    # analyze data effectively.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 13 - Test Adding New Filter
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 13 -Test Adding New Filter"
        Then  I wait for the page to be properly rendered
        #Reports
        When  I select "Queries" from the navigation menu
        Then  I expect the cell #2 of the row #1 to not contain the following text ""
        When  I set the filter "Name" for the table with the following value: <queryName>
        When  I open the item <queryName> from the listed results on the table
        Then  I wait for the page to be properly rendered
        When  I click the tab "FILTERS"
        And   I click the button for the filter "Add New Filter"
        And   I set the filter for the value tab with <categoryName> Category, <filterName1> field with operator "CONTAINS" and value <filterValue> 
        And   I click the button with the "add" icon
        And   I click the button "Save" on the current page
        Then  I wait on the dialog container not to be displayed
        Then  I expect that filter with name <filterCardName1> appears on the filters list
        #Second Filter
        And   I click the button for the filter "Add New Filter"
        And   I set the filter for the value tab with <categoryName> Category, <dateFilterName> field with exact date option starting on "11/25/1970" and finishing on "11/25/2020" 
        And   I click the button "Save" on the current page
        Then  I wait on the dialog container not to be displayed
        Then  I expect that filter with name <dateFilterCardName> appears on the filters list
        #Third Filter
        And   I click the button for the filter "Add New Filter"
        And   I set the filter for the value tab with <categoryName> Category, <dateTimeFilterName> field with Relative date on "Standard" calendar for "This Year" range and "" value
        And   I click the button "Save" on the current page
        Then  I wait on the dialog container not to be displayed
        Then  I expect that filter with name <dateTimeCardName> appears on the filters list
        Then  I wait on the dialog container not to be displayed
        Then  I expect that filter with name <dateTimeCardName> appears on the filters list
    Examples:
        | categoryName       | filterName1             | filterValue | filterCardName1                               | queryName              | dateFilterName             | dateFilterCardName                               | dateTimeFilterName       | dateTimeCardName                                |
        | "POS Transactions" | "Primary Tender Account" | "2"         | "POS Transactions >> Primary Tender Account" | "Automation Base Query" | "Related Transaction Date" | "POS Transactions >> Related Transaction Date" | "Transaction Date/Time" | "POS Transactions >> Transaction Date/Time"    |

    #issue in qadev environment 
    # @SmokeTests12 
    # Scenario Outline: Test 12: Test Camera Mapping Page
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 12"
    #     Then  I wait for the page to be properly rendered
    #     #Camera
    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Camera Mapping" link from the Settings page
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect the breadcrumb to show "Camera Mapping" as the current item
    #     When  I click the button "Add New" on the current page
    #     And   I create a new camera with name "AutoCam", type "3VR", ip address as "1.2.3.4" and port "1234", username "auto@mation.com" and password "12345678"
    #     When  I click the button "Save New" on the current page
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect camera "AutoCam" appears in the table of devices
    #     # When  I delete the camera "AutoCam" from the list of devices
    #     # When  I click the button "OK" on the current page
    #     # Then  I wait for the page to be properly rendered
    #     # When  I click the button "OK" on the current page
    #     # Then  I wait for the page to be properly rendered
    #     # # Then  I expect camera "AutoCam" not appears in the table of devices
    #     # Then  I expect camera "AutoCam" appears in the table of devices
    #     # When  I delete the camera "AutoCam" from the list of devices
    #     # When  I pause for 5000ms
    #     # When  I click the button "OK" on the current page
    #     # Then  I wait for the page to be properly rendered
    #     Then  I expect the dialog overlay message to not appear
    #     When  I click on the tab "Registers" for Camera Mapping
    #     And   I select the "CameraMappingHierarchy" Hierarchy for Camera Mapping
    #     And   I click the Camera Mapping element <Hierarchy1> in the Hierarchy Tree
    #     And   I click the Camera Mapping element <Hierarchy2> in the Hierarchy Tree
    #     And   I click the Camera Mapping element <Hierarchy3> in the Hierarchy Tree
    #     # And   I select the Device Type "Agilence Demo - Agilence Demo NVR" on the row #1 Registers Tab
    #     # When  I click the button "Save" on the current page
    #     # Then  I expect the message "Registers updated successfully" on the Camera pop up dialog to appear
    #     # When  I click the button "OK" on the current page
    #     And   I select the Device Type "AutoCam - 3VR" on the row #1 Registers Tab
    #     When  I click the button "Save" on the current page
    #     Then  I expect the message "Registers updated successfully" on the Camera pop up dialog to appear
    #     When  I click the button "OK" on the current page
    #     And   I click the Camera Mapping element <Hierarchy4> in the Hierarchy Tree
    #     And   I click the Camera Mapping element <Hierarchy3> in the Hierarchy Tree
    #     And   I select the Device Type "Agilence Demo - Agilence Demo NVR" on the row #1 Registers Tab
    #     When  I click the button "Save" on the current page
    #     Then  I expect the message "Registers updated successfully" on the Camera pop up dialog to appear
    #     When  I click the button "OK" on the current page
    # Examples:
    #     | site | Hierarchy1 | Hierarchy2 | Hierarchy3 | Hierarchy4 |
    #     | "QADev_Version" | "All" | "Erick" | "0251" | "0252" |

@Working @SmokeTests13
    # -------------------------------------------------------------------------
    # Summary:
    # This smoke test validates the Admin Reports Management functionality 
    # in the Analytics application. It ensures that administrators can open 
    # the Manage Reports page, edit an existing report, publish it to specific 
    # roles (Admin), verify its published status, and then revert it back to 
    # private.
    #
    # Purpose:
    # - Confirm that "Manage Reports" can be accessed from the Settings menu.  
    # - Validate that an existing report can be opened and edited.  
    # - Ensure that reports can be published to specific roles or users 
    #   (Admin role in this case).  
    # - Verify that published reports display as "Published" in the report list.  
    # - Validate that the report can be reverted back to "Private" status.  
    #
    # Features Covered:
    # - Navigation to Manage Reports.  
    # - Report editing and breadcrumb validation.  
    # - Report publishing workflow (roles/users selection).  
    # - Validation of Published vs. Private states in Manage Reports.  
    #
    # Application Context:
    # Report publishing is a key administrative feature that controls who can 
    # access specific analytics content. This test ensures that reports can be 
    # reliably toggled between Published and Private states, and that role-based 
    # publishing works as expected. Proper control of report visibility is 
    # essential for maintaining data governance, security, and targeted sharing 
    # within organizations.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 14 - Test Admin Reports Management
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 14 -Test Admin Reports Management"
        Then  I wait for the page to be properly rendered
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Reports" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Reports" as the current item
        When  I edit the <reportNameToPublish> record from the list
        Then  I expect the breadcrumb to show <reportNameToPublish> as the current item
        # When  I set the owner of the item as <owner>
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Publish"
        Then  I wait on the dialog container to be displayed
        When  I pause for 3000ms
        When  I click the radio button "Select Roles/Users"
        And   I choose the items "Admin" from the Roles list
        When  I click the button "Save" on the current page
        And   I click on the link "Manage Reports"
        Then  I expect the report <reportNameToPublish> to be "Published"
        When  I edit the <reportNameToPublish> record from the list
        Then  I expect the breadcrumb to show <reportNameToPublish> as the current item
        When  I click on the top right action called "Publish"
        Then  I wait on the dialog container to be displayed
        When  I pause for 3000ms
        When  I click the radio button "Select Roles/Users"
        And   I choose the items "Admin" from the Roles list
        When  I click the button "Save" on the current page
        And   I click on the link "Manage Reports"
        Then  I expect the report <reportNameToPublish> to be "Private"
    Examples:
        | reportNameToPublish     | owner |
        | "Automation Base Report" | "a"   |

@Critical @Working @SmokeTests14
    # -------------------------------------------------------------------------
    # Summary:
    # This critical smoke test validates the execution of predefined filters 
    # in queries for a given search criteria. It ensures that queries created 
    # with predefined filters return results, and that users can drill down 
    # into detail views of transactions from those results.
    #
    # Purpose:
    # - Confirm that new queries can be created with a specific search criteria.  
    # - Validate that predefined filters can be applied during query creation.  
    # - Ensure that queries with predefined filters return non-empty results.  
    # - Verify drilldown into query results and display of transaction details.  
    #
    # Features Covered:
    # - Query creation with custom search criteria.  
    # - Application of predefined filters.  
    # - Query execution and result validation (greater than zero).  
    # - Drilldown into transaction details from query results.  
    #
    # Application Context:
    # Predefined filters simplify query creation by providing ready-to-use 
    # filtering options, ensuring analysts can quickly retrieve meaningful 
    # subsets of data. This test ensures the reliability of predefined filter 
    # execution, confirms results are returned, and validates that detailed 
    # transaction information is accessible. As a critical test, it helps 
    # safeguard confidence in query accuracy and drilldown capabilities.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 01 - Test 15 - Execution of Predefined Filter <filter> for Search Criteria <searchCriteria>
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 01 - Test 15 -Execution of Predefined Filter for Search Criteria"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I click the option "Query" from the Create New pop up
        Then  I wait for the page to be properly rendered
        When  I change the search type to <searchCriteria>
        Then  I wait for the page to be properly rendered
        When  I click the tab "FILTERS"
        When  I delete the default filter when creating a query
        And   I click the button for the filter "Add New Filter"
        And   I set the filter for the value tab with <searchCriteria> Category, <filter> field with select all option 
        And   I click the button "Save" on the current page
        And   I click the button "Run" on the current page
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I expect query results to be more than "0"
        When  I click on the Query results page on row #1 and cell #7
        And   I open the Detail View transactions panel
        Then  I expect the Detail View to contain information about the transaction
    Examples:
        | searchCriteria     | filter             | numberOfReceipts | filterType   | 
        | "POS Transactions" | "Transaction Type" | 5                | "Predefined" |
