Feature: 2020 Clean up Base Objects
    As a Developer or QA Engineer
    I want to set up the necessary configuration for the upcoming tests
    # ==============================================================================
    # Feature: Environment Cleanup Suite
    #
    # Objective:
    # The following scenarios ensure the automated deletion of test artifacts 
    # (Hierarchies, Measures, Queries, Dashboards, Reports) created during QA runs.
    #
    # Purpose:
    # - Maintain a clean and stable test environment.
    # - Prevent test data pollution across regression cycles and UAT validations.
    # - Ensure SMEs and business users only see production-relevant artifacts.
    #
    # Coverage:
    # - Manage Hierarchies
    # - Manage Measures
    # - Manage Queries
    # - Manage Dashboards
    # - Manage Reports
    # ==============================================================================


    @CleanUpMeasures @Working @hierarchies
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the cleanup of test hierarchies within the Manage
    # Hierarchies page to ensure the environment remains clean after automated runs.
    #
    # Purpose:
    # - Confirm that test hierarchies created during regression or functional tests 
    #   (manual or automated) can be reliably deleted.
    # - Maintain a clean environment by removing specific hierarchies that may 
    #   interfere with subsequent tests or production-like validation.
    #
    # Features Covered:
    # - Manage Hierarchies
    # - Delete Hierarchies
    # - Environment Cleanup
    #
    # Application Context:
    # Hierarchies (manual or auto-generated) can accumulate during multiple test 
    # executions. If not cleaned, they can affect test results, cause duplicate 
    # naming conflicts, or clutter validation processes. This scenario ensures 
    # stability by programmatically cleaning up test data.
    # ------------------------------------------------------------------------------
    Scenario Outline: Feature 10 - Test 1 - Delete Hierarchy - <hierarchytodelete>
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 10 - Test 1"
        Then  I wait for the page to be properly rendered
        #Hierarchy
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Hierarchies" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        # Then  I expect that hierarchy <hierarchytodelete> has a "Success" status
        When  I delete all the hierarchies containing the name <hierarchytodelete>
    Examples:
        | hierarchytodelete |
        | "Automation - Item - Department" |
        | "Manual Hierarchy" |
        | "Auto Hierarchy" |
        | "50D78448-558B-435D-AED3-041C91DDD6F6" |
  

    @CleanUpMeasures @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the cleanup of test measures within the Manage Measures 
    # page to ensure the environment remains clean after automated runs.
    #
    # Purpose:
    # - Confirm that test measures created during regression or functional tests 
    #   can be reliably deleted.
    # - Prevent clutter or duplicate measure conflicts that could affect subsequent 
    #   testing or reporting.
    #
    # Features Covered:
    # - Manage Measures
    # - Delete Measures
    # - Environment Cleanup
    #
    # Application Context:
    # Measures are essential components for analytics and reporting. However, 
    # leftover test measures from prior runs can introduce noise, interfere with 
    # validations, or skew results. This cleanup scenario ensures that such 
    # measures are programmatically removed to preserve a stable test environment.
    # ------------------------------------------------------------------------------
    Scenario Outline: Feature 10 - Test 2 - Delete Measures - <measuretodelete>
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 10 - Test 2"
        Then  I wait for the page to be properly rendered
        #Measure
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Measures" link from the Settings page
        # Then  I wait on the overlay not to be displayed
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
        When  I delete all the measures containing the name <measuretodelete>
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
    Examples:
    | measuretodelete |
    | "Automation Base Measure" |

    @CleanUpQueries @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the cleanup of test queries within the Manage Queries 
    # page to ensure the environment remains clean after automated runs.
    #
    # Purpose:
    # - Confirm that test queries created during regression or functional tests 
    #   can be reliably deleted.
    # - Prevent clutter or duplicate queries that could impact later executions 
    #   or lead to false positives in validations.
    #
    # Features Covered:
    # - Manage Queries
    # - Delete Queries
    # - Environment Cleanup
    #
    # Application Context:
    # Queries serve as the foundation for reports, alerts, and dashboards. 
    # Residual test queries left behind after automation runs can affect performance, 
    # skew results, or confuse business users. This cleanup test ensures such queries 
    # are programmatically removed to preserve the accuracy and stability of the 
    # testing and reporting environment.
    # ------------------------------------------------------------------------------
    Scenario Outline: Feature 10 - Test 3 - Delete Queries - <queryToDelete>
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 10 - Test 3 - Cleanup"
        Then  I wait for the page to be properly rendered

        # --- Navigate to Manage Queries ---
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Queries" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I wait on report grid loading gif image to not exist
        Then  I expect the breadcrumb to show "Manage Queries" as the current item

        # --- Delete target query ---
        When  I delete all the queries containing the name <queryToDelete>
        Then  I expect the breadcrumb to show "Manage Queries" as the current item

    Examples:
        | queryToDelete           |
        | "Automation Base Query" |


    @CleanUpDashboards @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the cleanup of test dashboards within the 
    # Manage Dashboards page to ensure a clean environment post-execution.
    #
    # Purpose:
    # - Confirm that automation-created dashboards can be deleted successfully.
    # - Prevent accumulation of unused or duplicate dashboards that may affect 
    #   navigation, dashboard management, or test reliability.
    #
    # Features Covered:
    # - Manage Dashboards
    # - Delete Dashboards
    # - Environment Cleanup
    #
    # Application Context:
    # Dashboards consolidate data visualizations and insights for end-users. 
    # Residual test dashboards left behind after automation runs can confuse 
    # business users, slow down environment performance, or cause conflicts in 
    # subsequent automated test executions. This cleanup test ensures dashboards 
    # created for testing purposes are systematically removed, maintaining a 
    # stable and accurate reporting environment.
    # ------------------------------------------------------------------------------
    Scenario Outline: Feature 10 - Test 4 - Delete Dashboards - <dashboardToDelete>
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 10 - Test 4 - Cleanup"
        Then  I wait for the page to be properly rendered

        # --- Navigate to Manage Dashboards ---
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Dashboards" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I wait on report grid loading gif image to not exist
        Then  I expect the breadcrumb to show "Manage Dashboards" as the current item

        # --- Delete target dashboard ---
        When  I delete all the dashboards containing the name <dashboardToDelete>
        Then  I expect the breadcrumb to show "Manage Dashboards" as the current item

    Examples:
        | dashboardToDelete        |
        | "Automation Base Dashboard" |


    @CleanUpMeasures @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the cleanup of test measures within the 
    # Manage Measures page to ensure the environment remains stable and uncluttered.
    #
    # Purpose:
    # - Confirm that automation-created or temporary measures can be deleted.
    # - Prevent accumulation of unused or duplicate measures that may interfere 
    #   with reporting, dashboards, or automated regression tests.
    #
    # Features Covered:
    # - Manage Measures
    # - Delete Measures
    # - Environment Cleanup
    #
    # Application Context:
    # Measures provide calculated insights used across queries, reports, and dashboards. 
    # Leaving behind test measures (e.g., converted, replaced, or temporary measures) 
    # can distort reporting accuracy and confuse business users. 
    # This cleanup scenario systematically removes test measures, 
    # ensuring data integrity and test reliability in subsequent runs.
    # ------------------------------------------------------------------------------
    Scenario Outline: Feature 10 - Test 5 - Delete Measures matching name - <measuretodelete>
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 10 - Test 5"
        Then  I wait for the page to be properly rendered
        #Measure
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Measures" link from the Settings page
        # Then  I wait for the page to be properly rendered
        Then  I wait on report grid loading gif image to not exist
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
        When  I delete all the measures containing the name <measuretodelete>
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
    Examples:
    | measuretodelete |
    # | "Measure to replace" |
    # | "Automation Measure" |
    | "Automation Converted" |
    | "ReplaceMe Measure" |
    | "Original Measure" |
    | "Test " |

    @CleanUpQueries @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the cleanup of test queries within the 
    # Manage Queries page to ensure the environment remains stable and uncluttered.
    #
    # Purpose:
    # - Confirm that automation-created or temporary queries can be deleted.
    # - Prevent accumulation of unused or duplicate queries that may interfere 
    #   with regression testing, reporting, or validation workflows.
    #
    # Features Covered:
    # - Manage Queries
    # - Delete Queries
    # - Environment Cleanup
    #
    # Application Context:
    # Queries drive reporting logic and are often generated as part of automated 
    # regression or exploratory testing. Test queries left behind can pollute the 
    # working environment, confuse SMEs, and increase noise during UAT. 
    # This cleanup ensures only valid, business-related queries persist, 
    # maintaining data accuracy and a professional QA environment.
    # ------------------------------------------------------------------------------
    Scenario Outline: Feature 10 - Test 6 - Delete Queries matching name - <queryToDelete>
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 10 - Test 6"
        Then  I wait for the page to be properly rendered
        #Measure
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Queries" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I wait on report grid loading gif image to not exist
        Then  I expect the breadcrumb to show "Manage Queries" as the current item
        When  I delete all the queries containing the name <queryToDelete>
        Then  I expect the breadcrumb to show "Manage Queries" as the current item
    Examples:
    | queryToDelete |
    | "TC 234934-1" |
    # | "TC 234934-2" |
    # | "TC 234934-3" |
    # | "TC 234934-4" |
    # | "TC 234934-5" |
    # | "TC 234934" |
    | "Automation Query T" |
    | "Automation Query" |

    @CleanUpReports @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the cleanup of test reports within the 
    # Manage Reports page to maintain a clean and reliable environment.
    #
    # Purpose:
    # - Confirm that reports created during automation or exploratory testing 
    #   can be successfully deleted.
    # - Prevent unused or test-specific reports from cluttering the reporting 
    #   environment, ensuring SMEs and business users only see valid reports.
    #
    # Features Covered:
    # - Manage Reports
    # - Delete Reports
    # - Environment Cleanup
    #
    # Application Context:
    # Reports are one of the most critical user-facing features. Automated or 
    # experimental reports left behind can confuse stakeholders, distort UAT 
    # validations, and increase maintenance overhead. By ensuring all test reports 
    # are removed, QA preserves the integrity of the reporting workspace and 
    # avoids unnecessary noise during regression or production readiness checks.
    # ------------------------------------------------------------------------------
    Scenario Outline: Feature 10 - Test 7 - Delete Reports matching certain name
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 10 - Test 7"
        Then  I wait for the page to be properly rendered
        #Reports
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Reports" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Reports" as the current item
        When  I delete all the reports containing the name <reportToDelete>
        Then  I expect the breadcrumb to show "Manage Reports" as the current item
    Examples:
    | reportToDelete |
    | "A Report for Measures 4a" |
    # | "A Report for Measures 4b" |
    | "A Report with replaced measures" |
    | "Automation Base Report" |


    # @CleanUpDashboards @Working
    # Scenario Outline: Feature 10 - Test 8 - Delete Dashboards matching certain name
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Feature 10 - Test 8"
    #     Then  I wait for the page to be properly rendered
    #     #Measure
    #     When  I select "Settings" from the navigation menu
    #     Then  I wait for the page to be properly rendered
    #     And   I open the "Manage Dashboards" link from the Settings page
    #     Then  I wait for the page to be properly rendered
    #     Then  I wait on report grid loading gif image to not exist
    #     Then  I expect the breadcrumb to show "Manage Dashboards" as the current item
    #     When  I delete all the dashboards containing the name <dashboardToDelete>
    #     Then  I expect the breadcrumb to show "Manage Dashboards" as the current item
    # Examples:
    # | dashboardToDelete |
    # | "New Regression" |
    # | "Dashboard Master KPI 7" |

    @CleanUpFavorites @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the removal of all favorites within the application.
    #
    # Purpose:
    # - Ensure that test execution does not leave behind favorited items 
    #   (e.g., reports, queries, dashboards, or other entities).
    # - Maintain a clean environment so that only valid and business-relevant 
    #   favorites are visible to SMEs and end users.
    #
    # Features Covered:
    # - Favorites functionality
    # - Environment cleanup
    #
    # Application Context:
    # Favorites are designed to give users quick access to their most used entities. 
    # However, during regression testing, automation may create or modify favorites 
    # that can interfere with user workflows and introduce confusion in UAT or 
    # production environments. This cleanup ensures the Favorites section remains 
    # relevant and uncluttered.
    # ------------------------------------------------------------------------------
    Scenario: Feature 10 - Test 9 - Clean the favorites
        Given the user navigates to the designated environment
        When I create a note in the Execution Log with text: "Feature 10 - Test 9 Clean the favorites"
        Then I wait for the page to be properly rendered
        When I remove the favorites from the application

    # @Working @CleanUpHierarchy
    # Scenario: Test 16: Clean the hierarchy
    #     Given the user navigates to the designated environment
    #     When I create a note in the Execution Log with text: "Test 15: Clean the favorites"
    #     Then I wait for the page to be properly rendered
    #     When  I select "Settings" from the navigation menu
    #     Then  I wait for the page to be properly rendered
    #     And   I open the "Manage Hierarchies" link from the Settings page
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
    #     When  I delete all the hierarchies containing the name "Auto Hierarchy"
