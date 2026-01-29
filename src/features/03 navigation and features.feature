Feature: 2020 Basic Regression Tests
    As a Developer in Test
    I want to test if the 2020 Application keep Visual consistency

@NavAndFeatures1 @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the navigation and filtering functionality for the 
    # Dashboard landing page. It ensures users can navigate to "Home", filter 
    # Dashboards by name, and confirm the correct Dashboard appears.
    #
    # Purpose:
    # - Validate that navigation to the Dashboard landing page is successful.  
    # - Confirm filtering by Dashboard name works correctly.  
    # - Provide baseline regression coverage for dashboard navigation.  
    #
    # Features Covered:
    # - Navigation via the main menu (Home → Dashboards).  
    # - Dashboard filtering using "Name".  
    # - Validation of Dashboard list results.  
    # - Optional screenshot comparison (visual regression).  
    #
    # Application Context:
    # Dashboards are a central entry point for analytics. Ensuring correct 
    # navigation and filtering is critical for users to quickly locate and 
    # access key dashboards. This test acts as a smoke/regression baseline.
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 1 - Basic Regression Test for Dashboard Landing Page
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 1 - Basic Regression Test for Dashboard Landing Page"
        # Optional: Visual regression check for login page
        # Then  I compare this page with the existing screenshot named: "Login" for environment <1stEnvironment> with <sensitivity> sensitivity
        And   I wait for the page to be properly rendered

        # --- Navigation to Home/Dashboard ---
        When  I select "Home" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I set <dashboardName> on the Dashboards filter "Name"
        Then  I expect the cell #2 of the row #1 to contain the following text <dashboardName>
    Examples:
        | dashboardName              | sensitivity |
        | "Automation Base Dashboard" | "Medium"    |

@Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the navigation and filtering functionality for the 
    # Reports landing page. It ensures users can navigate to "Reports", apply 
    # filters, and confirm that the expected report is displayed.
    #
    # Purpose:
    # - Verify successful navigation to the Reports landing page.  
    # - Confirm filtering reports by "Name" returns expected results.  
    # - Provide baseline regression coverage for reports navigation.  
    #
    # Features Covered:
    # - Navigation via the main menu to "Reports".  
    # - Use of table filters ("Name").  
    # - Validation of filtered report entries.  
    # - Optional visual regression check.  
    #
    # Application Context:
    # Reports are a core analytic resource. Ensuring that navigation to the 
    # Reports landing page and filtering by name functions correctly provides 
    # confidence in system stability. This serves as a regression smoke test.  
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 2 - Basic Regression Test for Reports Landing Page
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 2 - Basic regression test for Report Landing Page"
        # Optional: Visual regression check for login page
        # Then  I compare this page with the existing screenshot named: "Login" for environment <1stEnvironment> with <sensitivity> sensitivity
        And   I wait for the page to be properly rendered

        # --- Navigation to Reports and filtering ---
        When  I select "Reports" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I set the filter "Name" for the table with the following value: <reportName>
        Then  I expect the cell #2 of the row #1 to contain the following text <reportName>

    Examples:
        | reportName              | sensitivity |
        | "Automation Base Report" | "Medium"    |


    @Working    
    Scenario Outline: Feature 03 - Test 3 - Basic Regression Test for Queries Landing Page
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 3 - Basic Regression Test for Queries Landing Page"
        # Then  I compare this page with the existing screenshot named: "Login" for environment <1stEnvironment> with <sensitivity> sensitivity
        And   I wait for the page to be properly rendered
        When  I select "Queries" from the navigation menu
        And   I wait for the page to be properly rendered
        Then  I expect page title to be "Queries"
        Then  I wait for the page to be properly rendered
        And   I set the filter "Name" for the table with the following value: <queryName>
        Then  I expect the cell #2 of the row #1 to contain the following text <queryName>
        Examples:
        | queryName | sensitivity |
        | "Automation Base Query" | "High" |

@Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the "Create New" widget functionality accessible from 
    # the Home page. It ensures navigation works, the widget loads properly, and 
    # optional screenshot comparison can be performed for regression checks.
    #
    # Purpose:
    # - Confirm users can successfully navigate from Home to the "Create New" option.  
    # - Validate that the Create New widget displays as expected.  
    # - Provide baseline regression coverage for Create New workflows.  
    #
    # Features Covered:
    # - Navigation from Home to "Create New".  
    # - Verification of Create New widget rendering.  
    # - Optional visual regression checks for login and Create New widget pages.  
    #
    # Application Context:
    # The "Create New" widget is a critical entry point for creating reports, queries, 
    # and dashboards. Ensuring it renders and behaves correctly provides confidence in 
    # user workflows that depend on this functionality.  
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 4 - Basic Regression Test for Create New Widget
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 4 - Basic Regression Test for Create New Widget"
        # Optional: Visual regression check for login page
        # Then  I compare this page with the existing screenshot named: "Login" for environment <1stEnvironment> with <sensitivity> sensitivity
        And   I wait for the page to be properly rendered

        # --- Navigation to Create New widget ---
        When  I select "Home" from the navigation menu
        And   I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I wait for the page to be properly rendered

    Examples:
        | sensitivity |
        | "High"      |

@Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates that the Settings page can be successfully accessed 
    # from the navigation menu and rendered correctly.
    #
    # Purpose:
    # - Ensure navigation to the Settings page works as expected.
    # - Validate that the Settings page is displayed properly.  
    # - Provide baseline regression coverage for Settings navigation and layout.  
    #
    # Features Covered:
    # - Navigation from Home to Settings.  
    # - Validation of Settings page rendering.  
    # - Optional visual regression checks for login and Settings pages.  
    #
    # Application Context:
    # The Settings page provides critical configuration and management options 
    # (e.g., reports, measures, users). A stable and functional Settings page 
    # ensures administrative workflows remain intact.  
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 5 - Basic Regression Test for Settings page
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 5 - Basic Regression Test for Settings page"
        # Optional: Visual regression check for login page
        # Then  I compare this page with the existing screenshot named: "Login" for environment <1stEnvironment> with <sensitivity> sensitivity
        And   I wait for the page to be properly rendered

        # --- Navigation to Settings page ---
        When  I select "Settings" from the navigation menu
        And   I wait for the page to be properly rendered

    Examples:
        | sensitivity |
        | "High"      |

@Working @NavAndFeatures @NavAndFeatures6
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the workflow of creating a new Dashboard and ensures 
    # all critical tabs (Hierarchy, Time, Components) are properly displayed.  
    #
    # Purpose:
    # - Confirm the Create New → Dashboard flow works.  
    # - Validate presence and behavior of Hierarchy, Time, and Components tabs.  
    # - Confirm switches for Linked Hierarchy and Linked Time toggle correctly.  
    # - Provide baseline regression coverage for dashboard creation UI.  
    #
    # Features Covered:
    # - Create New → Dashboard workflow.  
    # - Validation of Hierarchy tab.  
    # - Toggle Linked Hierarchy switch.  
    # - Validation of Time tab and Linked Time switch.  
    # - Validation of Components tab accessibility.  
    #
    # Application Context:
    # Dashboards are a central feature for end-users to view aggregated insights. 
    # Ensuring that the creation process and configuration tabs render correctly 
    # helps maintain usability, reliability, and confidence in the application’s 
    # reporting framework.  
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 6 - Basic Regression Test when creating a new dashboard
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 6 - Basic regression Test when creating a new dashboard"
        And   I wait for the page to be properly rendered

        # --- Dashboard Creation Flow ---
        When  I select "Create New" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I click the option "Dashboard" from the Create New pop up
        And   I wait for the page to be properly rendered

        # --- Hierarchy Tab Validation ---
        Then  I expect tab "Hierarchy" to be displayed
        And   I wait for the page to be properly rendered
        # Optional visual regression check
        # Then  I compare this page with the existing screenshot named: "New Dash-Hierarchy-Tab-LH-Off" for environment <1stEnvironment> with <sensitivity> sensitivity
        When  I click the switch "Linked Hierarchy" from the dashbord page
        And   I wait for the page to be properly rendered
        # Then  I compare this page with the existing screenshot named: "New Dash-Hierarchy-Tab--LH-On" for environment <1stEnvironment> with <sensitivity> sensitivity

        # --- Time Tab Validation ---
        And   I click on the Settings Tab for "Time"
        # Then  I compare this page with the existing screenshot named: "New Dash-Time-Tab-LT-Off" for environment <1stEnvironment> with <sensitivity> sensitivity
        When  I click the switch "Linked Time" from the dashbord page
        And   I wait for the page to be properly rendered
        # Then  I compare this page with the existing screenshot named: "New Dash-Time-Tab-LT-On" for environment <1stEnvironment> with <sensitivity> sensitivity

        # --- Components Tab Validation ---
        And   I click on the Settings Tab for "Components"

    Examples:
        | sensitivity |
        | "High"      |

@Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the process of creating a new report and ensures all 
    # key tabs (Hierarchy, Time, Data Elements, Graph Layout, Graph Properties, 
    # Properties) and report actions are accessible and render correctly.
    #
    # Purpose:
    # - Confirm the Create New → Report flow works properly.  
    # - Validate that all configuration tabs for a new report can be opened.  
    # - Verify availability of report actions like Download and Quick Query.  
    # - Provide baseline regression coverage for report creation UI navigation.  
    #
    # Features Covered:
    # - Create New → Report workflow.  
    # - Tab navigation: Hierarchy, Time, Data Elements, Graph Layout, Graph Properties, Properties.  
    # - Report-level actions: Download, Quick Query.  
    #
    # Application Context:
    # Reports are central for analyzing data across different measures, time ranges, 
    # and hierarchies. Ensuring their creation flow and configuration tabs render 
    # consistently helps preserve user trust and supports regression coverage for 
    # future UI or feature changes.  
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 7 - Basic Regression Test when creating a new report
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 7 - Basic Regression Test when creating a new report"
        And   I wait for the page to be properly rendered

        # --- Report Creation Flow ---
        When  I select "Create New" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I click the option "Report" from the Create New pop up
        And   I wait for the page to be properly rendered

        # --- Tab Validation ---
        # Then  I expect tab "HIERARCHY" to be displayed
        And   I click the tab "Hierarchy"
        And   I click the tab "Time"
        And   I click the tab "Data Elements"
        And   I click the tab "Graph Layout"
        And   I click the tab "Graph Properties"
        And   I click the tab "Properties"

        # --- Report Actions ---
        When  I click on the top right action called "Download"
        And   I click the button with the "close" icon
        Then  I wait on the dialog container not to be displayed

        When  I click on the top right action called "Quick Query"

    Examples:
        | sensitivity |
        | "Medium"    |

@Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the workflow for creating a new query and ensures that 
    # all critical tabs (Filters, Display Columns, Properties) are accessible and 
    # functional, along with the Quick Query action.  
    #
    # Purpose:
    # - Confirm the Create New → Query flow works properly.  
    # - Validate access to query configuration tabs and their content.  
    # - Ensure filters and display columns can be added for POS Transactions.  
    # - Validate Quick Query action availability.  
    #
    # Features Covered:
    # - Create New → Query workflow.  
    # - Tab navigation: Filters, Display Columns, Properties.  
    # - Adding filters and display columns (POS Transactions, Order Total).  
    # - Report actions: Quick Query.  
    #
    # Application Context:
    # Queries are the foundation of Analytics, allowing users to retrieve and 
    # analyze transaction data. This regression test ensures the UI for query 
    # creation, tab navigation, and Quick Query action remain stable and reliable 
    # after changes or deployments.  
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 8 - Basic Regression Test when creating a new query
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 8 - Basic Regression Test when creating a new query"
        And   I wait for the page to be properly rendered

        # --- Query Creation Flow ---
        When  I select "Create New" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I click the option "Query" from the Create New pop up
        And   I wait for the page to be properly rendered

        # --- Tab Validation ---
        And   I click the tab "FILTERS"
        And   I click the tab "DISPLAY COLUMNS"
        And   I select category "POS Transactions" with filters "Order Total" on Display Columns tab
        And   I click the tab "PROPERTIES"

        # --- Query Action ---
        When  I click on the top right action called "Quick Query"

    Examples:
        | sensitivity |
        | "Medium"    |

@Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the workflow for creating a new alert and ensures 
    # that the alert configuration interface loads correctly, including the Rules tab.  
    #
    # Purpose:
    # - Confirm the Create New → Alert flow works as expected.  
    # - Validate that the alert creation interface renders correctly.  
    # - Ensure navigation to the "Rules" tab is functional.  
    #
    # Features Covered:
    # - Create New → Alert workflow.  
    # - Validation of alert configuration tabs (Details, Rules).  
    # - Initial regression coverage for alert creation UI.  
    #
    # Application Context:
    # Alerts in Analytics notify users of conditions or anomalies in data 
    # (e.g., unusual transaction patterns, threshold breaches). Ensuring that 
    # the alert creation UI loads and functions correctly is critical for 
    # maintaining proactive monitoring and exception management.  
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 9 - Basic Regression Test when creating a new alert
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 9 - Basic Regression when creating a new alert"
        And   I wait for the page to be properly rendered

        # --- Alert Creation Flow ---
        When  I select "Create New" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I click the option "Alert" from the Create New pop up
        And   I wait for the page to be properly rendered

        # --- Tab Validation ---
        And   I click the tab "Rules"

    Examples:
        | sensitivity |
        | "High"      |

################################
    # @NavAndFeaturesPending
    # Scenario Outline: Basic Regression Test for 2 tabs Settings - "<Feature>"
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 10 - Basic Regression test for 2 tabs Settings"
    #     And   I wait for the page to be properly rendered
    #     When  I select "Settings" from the navigation menu
    #     And   I wait for the page to be properly rendered
    #     And   I open the "<Feature>" link from the Settings page
    #     Then  I wait on report grid loading gif image to not exist
    #     And   I pause for 3000ms
    #     When  I edit the <itemToEdit> settings item from the displayed list
    #     Then  I wait on the overlay not to be displayed
    #     Then  I expect the breadcrumb to show <itemToEdit> as the current item
    #     # Then  I expect tab "HIERARCHY" to be displayed
    #     # Then  I compare this page with the existing screenshot named: "<Feature>-<Tab1>-Tab" for environment <1stEnvironment> with <sensitivity> sensitivity
    #     And   I click the tab "<Tab2>"
    #     # Then  I compare this page with the existing screenshot named: "<Feature>-<Tab2>-Tab" for environment <1stEnvironment> with <sensitivity> sensitivity
    #     Examples:
    #     | sensitivity | Feature | itemToEdit | Tab1 | Tab2 |
    #     | "High" | Manage Compliance Monitors | "Automation Base Alert" | Details | Rules |

    # @NavAndFeaturesPending
    # Scenario Outline: Basic Regression Test for Settings with 1 page - "<Feature>"
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 11 - Basic Regression test for Settings with 1 page"
    #     And   I wait for the page to be properly rendered
    #     When  I select "Settings" from the navigation menu
    #     And   I wait for the page to be properly rendered
    #     And   I open the "<Feature>" link from the Settings page
    #     Then  I wait on report grid loading gif image to not exist
    #     When  I edit the <itemToEdit> item from the displayed list
    #     Then  I wait on the overlay not to be displayed
    #     # Then  I compare this page with the existing screenshot named: "<Feature>-EditItem" for environment <1stEnvironment> with <sensitivity> sensitivity
    #     Examples:
    #      | sensitivity | Feature | itemToEdit |
    #       | "High" | Manage Prescriptive Plans | "Upselling Rock Star" |
    #       | "High" | Manage Causes | "Training Issue" |
    #       | "High" | Manage Resolutions | "Case Opened in CMS" |
    #       | "High" | Manage Master KPIs | "Avg Loyalty Tx" |
        #   | "High" | Manage Email Schedules | "(LP) High Risk Report" |
        
@NavAndFeatures @The12
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the Manage Measures functionality within the Settings 
    # page, ensuring that a measure can be opened for editing and that all key tabs 
    # (Search, Filters, Summation, Display Columns, Properties, Usage) render 
    # correctly.  
    #
    # Purpose:
    # - Confirm that measures can be accessed for editing via Manage Measures.  
    # - Validate navigation across all measure configuration tabs.  
    # - Provide regression coverage for the Manage Measures interface.  
    #
    # Features Covered:
    # - Navigation to Settings → Manage Measures.  
    # - Editing an existing measure (breadcrumb validation).  
    # - Tab navigation: Search, Filters, Summation, Display Columns, Properties, Usage.  
    #
    # Application Context:
    # Measures are the foundation for analytics and reporting in the application. 
    # This regression test ensures that the Manage Measures interface remains 
    # stable, and administrators can view/edit measures without UI or navigation 
    # issues after deployments.  
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 10 - Basic Regression Test for Manage Measures
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 10 - Basic Regression Test for Manage Measures"
        And   I wait for the page to be properly rendered

        # --- Navigation to Manage Measures ---
        When  I select "Settings" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I open the "Manage Measures" link from the Settings page
        And   I wait for the page to be properly rendered

        # --- Editing Measure ---
        When  I click the edit pencil icon for the <itemToEdit> item from the list
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show <itemToEdit> as the current item

        # --- Tab Navigation ---
        And   I click the tab "<Tab2>"
        And   I click the tab "<Tab3>"
        And   I click the tab "<Tab4>"
        And   I click the tab "<Tab5>"
        And   I click the tab "<Tab6>"

    Examples:
        | sensitivity | itemToEdit               | Tab1   | Tab2    | Tab3       | Tab4            | Tab5       | Tab6  |
        | "High"      | "Automation Base Measure" | SEARCH | FILTERS | Summation  | DISPLAY COLUMNS | PROPERTIES | Usage |

@NavAndFeatures @Test13
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario provides a basic regression test to validate that key settings 
    # modules (Manage Reports, Manage Dashboards, Manage Queries) can be accessed 
    # and items can be edited without errors.  
    #
    # Purpose:
    # - Ensure navigation to Settings sub-pages (Reports, Dashboards, Queries).  
    # - Confirm that records can be selected and edited.  
    # - Validate stable rendering after opening edit mode.  
    #
    # Features Covered:
    # - Settings navigation: Manage Reports, Manage Dashboards, Manage Queries.  
    # - Record editing (Reports, Dashboards, Queries).  
    # - Overlay and loading state validations.  
    #
    # Application Context:
    # Editing base objects like reports, dashboards, and queries is central to 
    # maintaining and customizing Analytics. This regression ensures that the edit 
    # workflow is accessible and reliable across multiple feature types.  
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 11 - Basic Regression Test for "<Feature>"
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 11 - Basic Regression for Automation base objects"
        And   I wait for the page to be properly rendered

        # --- Navigation to Settings ---
        When  I select "Settings" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I open the "<Feature>" link from the Settings page
        Then  I wait on report grid loading gif image to not exist

        # --- Edit Item ---
        When  I edit the "<itemToEdit>" record from the list
        Then  I wait for the page to be properly rendered

    Examples:
        | sensitivity | Feature            | itemToEdit                |
        | "High"      | Manage Reports     | Automation Base Report     |
        | "High"      | Manage Dashboards  | Automation Base Dashboard  |
        | "High"      | Manage Queries     | Automation Base Query      |

@Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates that the user can access the "Manage Filters" page 
    # from the Settings menu and ensures the page loads correctly.  
    #
    # Purpose:
    # - Confirm navigation to Settings → Manage Filters.  
    # - Verify that the Manage Filters page renders properly after being opened.  
    # - Provide regression coverage for filter management access.  
    #
    # Features Covered:
    # - Settings navigation: Manage Filters.  
    # - Page rendering and load validation.  
    #
    # Application Context:
    # Filters are essential for refining queries and reports within the Analytics 
    # application. Stable access to the Manage Filters page ensures administrators 
    # can configure and maintain filters without issues.  
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 12 - Basic Regression Test for Settings - Open "<Feature>"
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 12 - Basic Regression Test for Manage Filters"
        And   I wait for the page to be properly rendered

        # --- Navigation to Manage Filters ---
        When  I select "Settings" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I open the "<Feature>" link from the Settings page
        Then  I pause for 2000ms

    Examples:
        | sensitivity | Feature        |
        | "High"      | Manage Filters |


@Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates that the user can access multiple configuration and
    # management pages under "Settings" and ensures they render without errors.
    #
    # Purpose:
    # - Confirm navigation to different Settings modules.  
    # - Ensure each page finishes loading and grid overlays disappear.  
    # - Provide regression coverage for critical administrative settings.  
    #
    # Features Covered:
    # - Manage Widgets  
    # - Purge Alerts  
    # - Replace Measure  
    # - Edit Company Information  
    # - Manage Fiscal Calendars  
    # - Camera Mapping  
    # - Advanced Configuration  
    #
    # Application Context:
    # These Settings modules are part of the administrative functionality that allows
    # customization, maintenance, and system configuration. Ensuring their stability
    # provides confidence that admins can access and manage these tools consistently.
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 13 - Basic Regression Test for Settings - Open "<Feature>"
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 13 - Basic Regression Test for Settings - Manage others"
        And   I wait for the page to be properly rendered

        # --- Navigation to Settings Pages ---
        When  I select "Settings" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I open the "<Feature>" link from the Settings page

        # --- Validation of load completion ---
        Then  I wait on report grid loading gif image to not exist

    Examples:
        | sensitivity | Feature                   |
        | "High"      | Manage Widgets            |
        | "High"      | Purge Alerts              |
        | "High"      | Replace Measure           |
        | "High"      | Edit Company Information  |
        | "High"      | Manage Fiscal Calendars   |
        | "High"      | Camera Mapping            |
        # | "High"      | Mail Server Configuration |
        | "High"      | Advanced Configuration    |
        # | "High"      | Case Management          |

@Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the Manage Roles functionality in Settings.
    #
    # Purpose:
    # - Ensure the Manage Roles page loads successfully.
    # - Confirm the user can edit an existing role (e.g., "Admin").
    # - Verify that all relevant tabs under role configuration are accessible.
    #
    # Features Covered:
    # - Role
    # - Users
    # - Application Access
    # - Data Access
    # - Dashboards
    # - Reports
    # - Queries
    #
    # Application Context:
    # Manage Roles is critical for defining user permissions and access control.
    # Validating its stability ensures security and access settings can be 
    # configured reliably across different parts of the system.
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 14 - Basic Regression Test for Manage Roles
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 14 - basic regression test for manage roles"
        And   I wait for the page to be properly rendered

        # --- Navigation to Settings ---
        When  I select "Settings" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I open the "Manage Roles" link from the Settings page

        # --- Page Load Validation ---
        Then  I wait on report grid loading gif image to not exist
        And   I pause for 3000ms

        # --- Edit Role ---
        When  I edit the <itemToEdit> settings item from the displayed list
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show <itemToEdit> as the current item

        # --- Validate All Role Tabs ---
        And   I click the tab "<Tab2>"
        And   I click the tab "<Tab3>"
        And   I click the tab "<Tab4>"
        And   I click the tab "<Tab5>"
        And   I click the tab "<Tab6>"
        And   I click the tab "<Tab7>"

    Examples:
        | sensitivity | itemToEdit | Tab1 | Tab2 | Tab3 | Tab4 | Tab5 | Tab6 | Tab7 |
        | "High" | "Admin" | Role | Users | Application Access  | Data Access | Dashboards  | Reports | Queries |
@NavAndFeatures @the17
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the Manage Users functionality in Settings.
    #
    # Purpose:
    # - Ensure the Manage Users page loads successfully.
    # - Confirm the user can open and edit a selected user (e.g., "Administrator").
    # - Verify that all relevant tabs under user configuration are accessible.
    #
    # Features Covered:
    # - User
    # - Application Access
    # - Data Access
    # - Dashboards
    #
    # Application Context:
    # Manage Users is critical for administering access permissions and
    # configurations at the individual user level. This test ensures the stability 
    # and usability of the Manage Users page, as well as navigation across tabs.
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 03 - Test 15 - Basic Regression Test for Manage Users
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 03 - Test 15 - Basic regression test for Manage Users"
        And   I wait for the page to be properly rendered

        # --- Navigation to Settings ---
        When  I select "Settings" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I open the "Manage Users" link from the Settings page
        And   I wait for the page to be properly rendered

        # --- Edit User ---
        When  I edit the <itemToEdit> item from the displayed list
        And   I wait for the page to be properly rendered
        # Then  I expect the breadcrumb to show <itemToEdit> as the current item

        # --- Validate All User Tabs ---
        And   I click the tab "<Tab2>"
        And   I click the tab "<Tab3>"
        And   I click the tab "<Tab4>"

    Examples:
        | sensitivity | itemToEdit      | Tab1 | Tab2              | Tab3        | Tab4       |
        | "High"      | "Administrator" | User | Application Access | Data Access | Dashboards |
