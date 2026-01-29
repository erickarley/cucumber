Feature: 2020 Setup and Precondition Tests
    As a Developer or QA Engineer
    I want to set up the necessary configuration for the upcoming tests

    # Summary: 
    # Validates that a user can access "Manage Hierarchies" from Settings 
    # and create a new Auto Generated hierarchy.
    #
    # Features Covered:
    # - Navigation to Manage Hierarchies
    # - Breadcrumb validation
    # - Creation of Auto Generated Hierarchy (Item → Department)
    #
    # Application Context:
    # Ensures hierarchy setup works, providing structures needed for 
    # analytics and reporting.
    @Working @Setup01
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the setup of a new hierarchy within the Analytics 
    # application. It ensures that a user can successfully navigate through 
    # the Settings menu, access "Manage Hierarchies," and create a new 
    # auto-generated hierarchy. 
    #
    # Purpose:
    # - Confirm that navigation to "Manage Hierarchies" works as expected.
    # - Validate that the breadcrumb updates correctly.
    # - Verify that a new hierarchy can be created using the "Auto Generated" 
    #   option with specified parameters.
    #
    # Features Covered:
    # - Navigation via Settings menu.
    # - Access to "Manage Hierarchies."
    # - Breadcrumb validation for correct page context.
    # - Creation of new hierarchy (Auto Generated).
    #
    # Application Context:
    # The Analytics application relies on hierarchy structures (e.g., Item, 
    # Department) for reporting and dashboard segmentation. This test confirms 
    # that hierarchy setup is working correctly and ensures future tests have 
    # valid data structures to operate on.
    # -------------------------------------------------------------------------
    Scenario: Feature 00 - Test 1 - Set up of new hierarchy
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 00 - Test 1 -  Creating a Hierarchy"
        And   I wait for the page to be properly rendered
        When  I select "Settings" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When  I create an Auto Generated Hierarchy with the Name "Automation - Item - Department" and Data Set "Item"

    @Working @Setup02
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the setup and execution of a new measure in the 
    # Analytics application. It covers the full workflow from navigation, 
    # measure creation, filter application, summation configuration, 
    # saving, and triggering a manual summation. 
    #
    # Purpose:
    # - Confirm that a measure can be created from Settings.
    # - Validate filter creation (Category > 0).
    # - Ensure summation setup works with dimensions, summary columns, 
    #   and historical data backfill.
    # - Verify manual summation can be triggered and monitored 
    #   through Task Manager.
    #
    # Features Covered:
    # - Navigation via Settings menu.
    # - Measure creation and naming.
    # - Application of filters (Category filter, > operator, value).
    # - Summation setup (dimension, summary column, backfill).
    # - Banner validation on save.
    # - Manual summation execution and confirmation pop-up.
    # - Task Manager validation for summation task status.
    #
    # Application Context:
    # Measures in the Analytics application define calculated metrics 
    # (e.g., Order Totals by Store). This test ensures that users can 
    # create valid measures, configure filters, and run backfills. 
    # It also verifies that the system communicates performance 
    # considerations when running manual summations and that task 
    # monitoring through Task Manager works correctly.
    # ------------------------------------------------------------------------
    Scenario Outline: Feature 00 - Test 2 - Set up a new measure
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 00 - Test 2 - Creating a Measure"
        And   I wait for the page to be properly rendered
        When  I select "Settings" from the navigation menu
        And   I click on the add icon next to "Manage Measures" on the Settings page
        Then  I wait for the page to be properly rendered
        And   I set the name <measureName> for the Measure
        Then  I wait for the page to be properly rendered
        When  I change the search type to "POS Transactions"
        Then  I wait for the page to be properly rendered
        When  I click the tab "FILTERS"
        And   I click the button for the filter "Add New Filter"
		And   I set the filter for the value tab with <searchCriteria> Category, <filter> field with operator ">" and amount value of "0" 
        And   I click the button "Save" on the current page
        And   I click the tab "Summation"
        And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "60" days to backfill
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
        # Then  I expect the Task Manager contains a task created "Today"
        And   I expect the Task Manager to not contain the "Manual summation failed." message
        And   I expect the Task Manager to not contain the "Manual summation cannot start because automatic summation is already in progress." message
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed
    Examples:
        | measureName | searchCriteria | filter | dimension | summaryColumn |
        | "Automation Base Measure" |"POS Transactions" | "Order Total" | "Store" | "Order Total" |

    @Working @Setup03
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the setup and saving of a new report in the 
    # Analytics application. It covers the workflow of creating a report, 
    # setting calendar and time parameters, selecting measures, and verifying 
    # that the report is saved successfully.
    #
    # Purpose:
    # - Confirm that a user can navigate from Dashboards to the "Create New" 
    #   report workflow.
    # - Validate report naming and search type configuration.
    # - Ensure time range and calendar settings can be applied.
    # - Verify data element selection and measure inclusion.
    # - Confirm that the report saves and the expected banner appears.
    #
    # Features Covered:
    # - Navigation from Dashboards to Report creation.
    # - Report setup (name, search type, report type).
    # - Calendar configuration (Standard Calendar, Relative Type, 3 months).
    # - Data element and measure selection.
    # - Report save validation (banner confirmation).
    #
    # Application Context:
    # Reports are a core feature of the Analytics application, used to 
    # summarize and visualize data across stores, timeframes, and measures. 
    # This test ensures users can build baseline reports (with configured 
    # time ranges and measures) that serve as the foundation for analytics 
    # dashboards and further reporting activities.
    # -------------------------------------------------------------------------
    Scenario Outline: Feature 00 - Test 3 - Set up of new report
        Given the user navigates to the designated environment 
        When  I create a note in the Execution Log with text: "Feature 00 - Test 3 - Creating a Report"
        And   I wait for the page to be properly rendered
        Then  I expect page title to be "Dashboards"
        When  I select "Create New" from the navigation menu
        And   I click on the link "Report"
        Then  I wait for the page to be properly rendered
        And   I set the report name to <reportName>
        Then  I wait for the page to be properly rendered
        When  I change the search type to "Store"
        Then  I wait for the page to be properly rendered
        And   I click the tab "Time"
        Then  I wait for the page to be properly rendered
        And   I select the Report Type as Summary with Relative Type and Standard Calendar
        When  I create a note in the Execution Log with text: "Calendar type selected - Setup 3 - Creating a Report"
        Then  I wait for the page to be properly rendered
        And   I set the Range field to "X Months" with X value set to "3" for the Standard Calendar
        Then  I wait for the page to be properly rendered
        When  I click the tab "Data Elements"
        And   I pause for 3000ms
        And   I select the data element measure "POS Measures"
        And   I pause for 3000ms
        And   I add the data element <measureName> to the report
        Then  I wait for the page to be properly rendered
        Then  I expect that header for data element <measureName> appears on the table
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Save"
        And   I wait until the banner "Report Saved." dissapears
        Then  I wait for the page to be properly rendered
    Examples:
    | reportName | measureName | 
    | "Automation Base Report" | "Automation Base Measure" |

    @Working @Setup04
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the setup and saving of a new dashboard in the 
    # Analytics application. It ensures that a user can create a dashboard, 
    # link it to an existing report, and confirm successful save via banner 
    # confirmation. 
    #
    # Purpose:
    # - Confirm navigation from Dashboards to the "Create New" dashboard flow.
    # - Validate that a dashboard can be named and initialized.
    # - Ensure reports (previously created) can be added as components.
    # - Verify that the dashboard saves correctly and system confirmation 
    #   banners appear as expected.
    #
    # Features Covered:
    # - Dashboard creation workflow.
    # - Dashboard naming.
    # - Linking an existing report as a component.
    # - Save confirmation and banner validation.
    #
    # Application Context:
    # Dashboards represent the top-level visualization layer of the Analytics 
    # application, combining reports and measures into a unified view for 
    # users. This test confirms that the foundational workflow of creating 
    # and saving a dashboard functions correctly, ensuring that subsequent 
    # reporting and visualization tests have a validated dashboard container.
    # -------------------------------------------------------------------------
    Scenario Outline: Feature 00 - Test 4 - Set up of new dashboard
        Given the user navigates to the designated environment 
        When  I create a note in the Execution Log with text: "Feature 00 - Test 4 - Creating a Dashboard"
        And   I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I click on the link "Dashboard"
        And   I wait for the page to be properly rendered
        And   I set the name of the Dashboard to <dashboardName>
        Then  I wait for the page to be properly rendered
        And   I click on the Settings Tab for "Components"
        And   I wait for the page to be properly rendered
        And   I choose the <reportName> report from components
        Then  I wait for the page to be properly rendered
        And   I click on the top right action called "Save"
        Then  I expect the "Dashboard Saved." banner appears
        Then  I wait until the banner "Dashboard Saved." dissapears
    Examples:
    | dashboardName | reportName | measureName |
    | "Automation Base Dashboard" | "Automation Base Report" | "Automation Base Measure" |


@Working @Setup05
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the setup and saving of a new query in the Analytics 
    # application. It ensures a user can create a query, adjust default filters, 
    # and save it successfully.
    #
    # Purpose:
    # - Confirm that a query can be created through the "Create New" flow.
    # - Validate that default filters can be removed before saving.
    # - Ensure the query saves correctly and a system confirmation banner appears.
    #
    # Features Covered:
    # - Navigation to Query creation.
    # - Query naming.
    # - Filter handling (removal of default filter).
    # - Save confirmation and banner validation.
    #
    # Application Context:
    # Queries allow users to explore and extract specific data sets within the 
    # Analytics application. This test ensures that baseline queries can be 
    # defined and saved without unnecessary default filters, providing clean 
    # foundations for advanced data exploration and reporting.
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 00 - Test 5 - Set up of new query
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 00 - Test 5 - Creating a Query"
        And   I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I click on the link "Query"
        Then  I wait for the page to be properly rendered
        When  I set the name of the Query to <queryName>
        Then  I wait for the page to be properly rendered
        When  I click the tab "FILTERS"
        When  I delete the default filter when creating a query
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Save"
        Then  I expect the "Query Saved" banner appears
    Examples:
        | queryName              |
        | "Automation Base Query" |


@Working @Setup06
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the setup of a new resolution in the Analytics 
    # application by navigating through Settings and confirming successful 
    # creation of the resolution record.
    #
    # Purpose:
    # - Confirm navigation to "Manage Resolutions" from the Settings menu.
    # - Validate breadcrumb accuracy for page context.
    # - Ensure a resolution with a name and description can be created.
    #
    # Features Covered:
    # - Navigation to Manage Resolutions.
    # - Breadcrumb validation.
    # - Resolution creation (name and description).
    #
    # Application Context:
    # Resolutions are system-level definitions that support workflow or 
    # classification processes within the Analytics application. This test 
    # ensures that resolutions can be managed through Settings, providing 
    # administrators with the ability to maintain proper categorizations 
    # and workflow outcomes.
    # -------------------------------------------------------------------------

    Scenario: Feature 00 - Test 6 - Set up a new resolution
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 00 - Test 6 - Creating a Resolution"
        And   I wait for the page to be properly rendered
        When  I select "Settings" from the navigation menu
        And   I open the "Manage Resolutions" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Resolutions" as the current item
        And   I create a resolution with name "Automation Resolution" and description "Automation Resolution Description"

    # Commented by Mitch Recommendation. Ticket DEV-3883 @Working @Setup07
    # Scenario: 06 Set up a new cause
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Setup 7 - Creating a Cause"
    #     And   I wait for the page to be properly rendered
    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage Causes" link from the Settings page
    #     And   I wait for the page to be properly rendered
    #     Then  I expect the breadcrumb to show "Manage Causes" as the current item
    #     And   I create a cause with name "Automation Cause" and description "Automation Cause Description" for resolution "Automation Resolution"
    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage Causes" link from the Settings page
    #     When  I click the edit pencil icon for the "Automation Cause" item from the list


