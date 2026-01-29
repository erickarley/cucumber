Feature: 2020 Hierarchy Tests
    As a Developer in Test
    I want to test if the 2020 Hierarchy

Feature: Manage Hierarchies Regression

    # ------------------------------------------------------------------------------
    # Background:
    # Ensures the user starts every scenario already in the "Manage Hierarchies" page.
    # ------------------------------------------------------------------------------
    Background:
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Hierarchies" link from the Settings page

    @Working @FirstHierarchy
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 1 - Hierarchy Regression
    #
    # Purpose:
    # - Validate creation of a new auto-generated hierarchy.
    # - Confirm aggregation levels can be added.
    # - Ensure saving works and status is updated to "Success".
    #
    # Features Covered:
    # - Auto Hierarchy creation
    # - Aggregation levels
    # - Save and status validation
    #
    # Application Context:
    # Creating and validating hierarchies is essential for data organization.
    # This test ensures the creation flow is working end-to-end.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 1 - Hierarchy regression
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        Then  I wait for the page to be properly rendered

        # --- Create New Hierarchy ---
        When  I create a note in the Execution Log with text: "Feature 04 - Test 1"
        When  I click on Create New "Auto Generated Hierarchy"
        Then  I wait for the page to be properly rendered
        And   I set the Auto Generated Hierarchy with Name "Auto Hierarchy 3" and Data Set "Store"

        # --- Add Aggregation Level ---
        When  I click the button "Add" on the current page
        And   I select the aggregation level "City" with name "City"
        Then  I expect "City" aggregation level has been added
        Then  I wait for the page to be properly rendered

        # --- Save Hierarchy ---
        When  I click on the top right action called "Save"
        Then  I wait until the banner "Hierarchy Saved." dissapears
        Then  I wait for the page to be properly rendered

        # --- Validate Saved Hierarchy in List ---
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Hierarchies" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        Then  I expect that hierarchy "Auto Hierarchy 3" has a "Success" status

    @Working @TC001 @37352
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 2 - Ascending sort on Hierarchy name in Landing Page
    #
    # Purpose:
    # - Validate sorting functionality on the Hierarchy landing page.
    # - Ensure ascending sort on the "Hierarchy" column is correctly applied.
    #
    # Features Covered:
    # - Grid sorting
    # - Hierarchy column validation
    #
    # Application Context:
    # Sorting by hierarchy name helps users locate hierarchies quickly.
    # ------------------------------------------------------------------------------

    Scenario: Feature 04 - Test 2 - Ascending sort on Hierarchy name in Hierarchy Landing Page
        When  I create a note in the Execution Log with text: "Feature 04 - Test 2"
        Then  I wait for the page to be properly rendered
        When  I sort on "Hierarchy" column
        Then  I expect the grid is sorted ascending on "Hierarchy"
    @Working @TC001 @373522
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 3 - Descending sort on Hierarchy name in Landing Page
    #
    # Purpose:
    # - Validate sorting functionality on the Hierarchy landing page.
    # - Ensure descending sort on the "Hierarchy" column is correctly applied.
    #
    # Features Covered:
    # - Grid sorting
    # - Hierarchy column validation
    #
    # Application Context:
    # Sorting in both directions ensures full coverage of sorting functionality.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 3 - Descending sort on Hierarchy name in Hierarchy Landing Page
        When  I create a note in the Execution Log with text: "Feature 04 - Test 3"
        Then  I wait for the page to be properly rendered
        When  I sort on "Hierarchy" column
        Then  I wait for the page to be properly rendered
        Then  I sort on "Hierarchy" column again
        And   I expect the grid is sorted descending on "Hierarchy"
    @Working @TC001 @37352
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 4 - Ascending sort on Data Set in Hierarchy Landing Page
    #
    # Purpose:
    # - Validate sorting functionality on the Hierarchy landing page.
    # - Ensure ascending sort on the "Data Set" (MasterDataName) column is correctly applied.
    #
    # Features Covered:
    # - Grid sorting
    # - Data Set column validation
    #
    # Application Context:
    # Sorting by Data Set allows proper grouping and analysis of hierarchies.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 4 - Ascending sort on Data Set in Hierarchy Landing Page
        When  I create a note in the Execution Log with text: "Feature 04 - Test 4"
        Then  I wait for the page to be properly rendered
        When  I sort on "MasterDataName" column
        Then  I expect the grid is sorted ascending on "MasterDataName"
    @Working @TC001 @37352
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 5 - Descending sort on Data Set in Hierarchy Landing Page
    #
    # Purpose:
    # - Validate sorting functionality on the Hierarchy landing page.
    # - Ensure descending sort on the "Data Set" (MasterDataName) column is correctly applied.
    #
    # Features Covered:
    # - Grid sorting
    # - Data Set column validation
    #
    # Application Context:
    # Confirms sorting stability and correctness across both directions.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 5 - Descending sort on Data Set in Hierarchy Landing Page
        When  I create a note in the Execution Log with text: "Feature 04 - Test 5"
        Then  I wait for the page to be properly rendered
        When  I sort on "MasterDataName" column
        Then  I wait for the page to be properly rendered
        Then  I sort on "MasterDataName" column again
        And   I expect the grid is sorted descending on "MasterDataName"
    @Working @TC001 @37352
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 6 - Ascending sort on Description in Hierarchy Landing Page
    #
    # Purpose:
    # - Validate sorting functionality on the Hierarchy landing page.
    # - Ensure ascending sort on the "Description" column is correctly applied.
    #
    # Features Covered:
    # - Grid sorting
    # - Description column validation
    #
    # Application Context:
    # Sorting descriptions ensures clear readability and easy navigation.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 6 - Ascending sort on Description in Hierarchy Landing Page
        When  I create a note in the Execution Log with text: "Feature 04 - Test 6"
        Then  I wait for the page to be properly rendered
        When  I sort on "Description" column
        Then  I expect the grid is sorted ascending on "Description"
    @Working @TC001 @37352
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 7 - Descending sort on Description in Hierarchy Landing Page
    #
    # Purpose:
    # - Validate sorting functionality on the Hierarchy landing page.
    # - Ensure descending sort on the "Description" column is correctly applied.
    #
    # Features Covered:
    # - Grid sorting
    # - Description column validation
    #
    # Application Context:
    # Full validation requires both ascending and descending checks.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 7 - Descending sort on Description in Hierarchy Landing Page
        When  I create a note in the Execution Log with text: "Feature 04 - Test 7"
        Then  I wait for the page to be properly rendered
        When  I sort on "Description" column
        Then  I wait for the page to be properly rendered
        Then  I sort on "Description" column again
        And   I expect the grid is sorted descending on "Description"
    @Working @TC001 @37352
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 8 - Ascending sort on Status in Hierarchy Landing Page
    #
    # Purpose:
    # - Validate sorting functionality on the Hierarchy landing page.
    # - Ensure ascending sort on the "Status" column is correctly applied.
    #
    # Features Covered:
    # - Grid sorting
    # - Status column validation
    #
    # Application Context:
    # Status sorting allows users to identify processing and completed hierarchies.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 8 - Ascending sort on Status in Hierarchy Landing Page
        When  I create a note in the Execution Log with text: "Feature 04 - Test 8"
        Then  I wait for the page to be properly rendered
        When  I sort on "Status" column
        Then  I expect the grid is sorted ascending on "Status"
    @Working @TC001 @37352
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 9 - Descending sort on Status in Hierarchy Landing Page
    #
    # Purpose:
    # - Validate sorting functionality on the Hierarchy landing page.
    # - Ensure descending sort on the "Status" column is correctly applied.
    #
    # Features Covered:
    # - Grid sorting
    # - Status column validation
    #
    # Application Context:
    # Confirms robustness of the Status column’s sort feature.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 9 - Descending sort on Status in Hierarchy Landing Page
        When  I create a note in the Execution Log with text: "Feature 04 - Test 9"
        Then  I wait for the page to be properly rendered
        When  I sort on "Status" column
        Then  I wait for the page to be properly rendered
        Then  I sort on "Status" column again
        And   I expect the grid is sorted descending on "Status"
    @Working @TC001 @37352
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 10 - Ascending sort on LastModified in Hierarchy Landing Page
    #
    # Purpose:
    # - Validate sorting functionality on the Hierarchy landing page.
    # - Ensure ascending sort on the "Last Modified Date" column is correctly applied.
    #
    # Features Covered:
    # - Grid sorting
    # - Date column validation
    #
    # Application Context:
    # Ascending sort ensures the oldest hierarchies are shown first.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 10 - Ascending sort on LastModified in Hierarchy Landing Page
        When  I create a note in the Execution Log with text: "Feature 04 - Test 10"
        Then  I wait for the page to be properly rendered
        When  I sort on "LastModified" column
        Then  I wait for the page to be properly rendered
        Then  I expect the grid is sorted ascending on "Last Modified Date" date column
    @Working @TC002 @37359
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 11 - Descending sort on LastModified in Hierarchy Landing Page
    #
    # Purpose:
    # - Validate sorting functionality on the Hierarchy landing page.
    # - Ensure descending sort on the "Last Modified Date" column is correctly applied.
    #
    # Features Covered:
    # - Grid sorting
    # - Date column validation
    #
    # Application Context:
    # Descending sort ensures the most recently updated hierarchies are shown first.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 11 - Descending sort on LastModified in Hierarchy Landing Page
        When  I create a note in the Execution Log with text: "Feature 04 - Test 11"
        Then  I wait for the page to be properly rendered
        When  I sort on "LastModified" column
        Then  I wait for the page to be properly rendered
        Then  I sort on "LastModified" column again
        And   I expect the grid is sorted descending on "Last Modified Date" date column
    @Working @TC002 @3735922
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 12 - Filter using contains filter on Hierarchy column
    #
    # Purpose:
    # - Validate that the "contains" filter on the Hierarchy column functions properly.
    # - Ensure the grid updates with filtered results and restores correctly after clearing.
    #
    # Features Covered:
    # - Column filtering
    # - Grid restore validation
    #
    # Application Context:
    # Filtering supports quick searching of hierarchies by partial text.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 12 - Filter using contains filter on Hierarchy column
        When  I create a note in the Execution Log with text: "Feature 04 - Test 12"
        Then  I wait for the page to be properly rendered
        Then  I pause for 1000ms
        When  I enter alphabetical text in contains filter on "Hierarchy" column
        Then  I wait for the page to be properly rendered
        Then  I expect the grid rows are filtered on the "Hierarchy" column
        Then  I wait for the page to be properly rendered
        When  I clear contains filter on "Hierarchy" column
        Then  I wait for the page to be properly rendered
        Then  I expect the grid to be restored
    @Working @TC002 @37359
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 13 - Filter using contains filter on Status column
    #
    # Purpose:
    # - Validate that the "contains" filter on the Status column functions properly.
    # - Ensure grid rows are filtered based on entered text.
    # - Confirm the grid restores to its full state after clearing the filter.
    #
    # Features Covered:
    # - Column filtering
    # - Status filter validation
    #
    # Application Context:
    # Supports quick filtering of hierarchies based on processing state.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 13 - Filter using contains filter on Status column
        When  I create a note in the Execution Log with text: "Feature 04 - Test 13"
        Then  I wait for the page to be properly rendered
        Then  I pause for 1000ms
        When  I enter alphabetical text in contains filter on "Status" column
        Then  I wait for the page to be properly rendered
        Then  I expect the grid rows are filtered on the "Status" column
        Then  I wait for the page to be properly rendered
        When  I clear contains filter on "Status" column
        Then  I wait for the page to be properly rendered
        Then  I expect the grid to be restored
    @Working @TC002 @37359
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 14 - Filter using contains filter on Data Set column
    #
    # Purpose:
    # - Validate that the "contains" filter on the Data Set column functions correctly.
    # - Ensure grid rows are filtered based on entered text.
    # - Confirm the grid restores to its full state after clearing the filter.
    #
    # Features Covered:
    # - Column filtering
    # - Data Set filter validation
    #
    # Application Context:
    # Filtering allows narrowing results by Data Set names.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 14 - Filter using contains filter on Data Set column
        When  I create a note in the Execution Log with text: "Feature 04 - Test 14"
        Then  I wait for the page to be properly rendered
        When  I enter alphabetical text in contains filter on "Data Set" column
        Then  I wait for the page to be properly rendered
        Then  I expect the grid rows are filtered on the "Data Set" column
        Then  I wait for the page to be properly rendered
        When  I clear contains filter on "Data Set" column
        Then  I wait for the page to be properly rendered
        Then  I expect the grid to be restored
    @Working @TC002 @37359
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 15 - Filter using Numeric contains filter on Hierarchy column
    #
    # Purpose:
    # - Validate that numeric values can be used with the "contains" filter on the Hierarchy column.
    # - Confirm that editing a hierarchy persists and the filter can locate it by numeric input.
    # - Ensure grid restores to its original state after clearing the filter.
    #
    # Features Covered:
    # - Column filtering
    # - Numeric filter support
    #
    # Application Context:
    # Critical for searching hierarchies when numeric identifiers are present.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 15 - Filter using Numeric contains filter on Hierarchy column
        When  I create a note in the Execution Log with text: "Feature 04 - Test 15"
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When  I edit the hierarchy name "Automation - Item - Department"
        Then  I wait for the page to be properly rendered
        And   I click on the top right action called "Save New"
        Then  I wait for the page to be properly rendered
        When  I click on the link "Manage Hierarchies"
        Then  I wait for the page to be properly rendered
        When  I enter numerical text in contains filter on "Hierarchy" column
        Then  I wait for the page to be properly rendered
        Then  I expect the grid rows are filtered on the "Hierarchy" column
        Then  I wait for the page to be properly rendered
        When  I clear contains filter on "Hierarchy" column
        Then  I wait for the page to be properly rendered
        Then  I expect the grid to be restored

    #NOT WORKING PLEASE REVIEW THIS
    # @Not_Working @TC002 @37359
    # Scenario: Filter using contains filter on Hierarchy column
    #     Then  I wait for the page to be properly rendered
    #     When  I enter special text in contains filter on "Hierarchy" column
    #     And   I pause for 1000ms
    #     Then  I expect the grid rows are filtered on the "Hierarchy" column
    #     And   I pause for 1000ms
    #     When  I clear contains filter on "Hierarchy" column 
    #     And   I pause for 1000ms
    #     Then  I expect the grid to be restored        

    @Working @TC003 @38140
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 16 - Launch auto hierarchy builder
    #
    # Purpose:
    # - Validate that the Auto Hierarchy Builder can be launched successfully.
    # - Confirm that clicking the "create new hierarchy" button and the 
    #   "auto generated hierarchy" icon opens the builder.
    #
    # Features Covered:
    # - Auto hierarchy builder
    # - Navigation validation
    #
    # Application Context:
    # Ensures users can start building auto-generated hierarchies without error.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 16 - Launch auto hierarchy builder
        When  I create a note in the Execution Log with text: "Feature 04 - Test 16"
        Then  I wait for the page to be properly rendered
        When  I click on create new hierarchy button
        And   I click on auto generated hierarchy icon
        Then  I wait for the page to be properly rendered
        Then  I expect the auto hierarchy builder to be launched
    @Working @TC004 @38141
        # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 17 - Launch manual hierarchy builder
    #
    # Purpose:
    # - Validate that the Manual Hierarchy Builder can be launched successfully.
    # - Confirm that clicking the "create new hierarchy" button and the 
    #   "manual hierarchy" icon opens the builder.
    #
    # Features Covered:
    # - Manual hierarchy builder
    # - Navigation validation
    #
    # Application Context:
    # Ensures manual hierarchy creation workflow is accessible and functional.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 17 - Launch manual hierarchy builder
        When  I create a note in the Execution Log with text: "Feature 04 - Test 17"
        Then  I wait for the page to be properly rendered
        When  I click on create new hierarchy button
        And   I click on manual hierarchy icon
        Then  I wait for the page to be properly rendered
        Then  I expect the manual hierarchy builder to be launched
    @Working @TC005 @112119
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 18 - Open existing manual hierarchy builder
    #
    # Purpose:
    # - Validate that an existing manual hierarchy can be created and reopened.
    # - Ensure that the manual hierarchy builder launches with an assigned ID 
    #   when editing an existing hierarchy.
    #
    # Features Covered:
    # - Manual hierarchy persistence
    # - Edit and reopen functionality
    #
    # Application Context:
    # Validates continuity and persistence of manually created hierarchies.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 18 - Open existing manual hierarchy builder
        When  I create a note in the Execution Log with text: "Feature 04 - Test 18"
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When  I click on Create New "Manual Hierarchy"
        Then  I wait for the page to be properly rendered
        When  I set the Manual Hierarchy Name to "Manual Hierarchy"
        And   I click on the top right action called "Save"
        Then  I wait for the page to be properly rendered
        When  I click on the link "Manage Hierarchies"
        Then  I wait for the page to be properly rendered
        Then  I wait for the application to be ready
        When  I click on edit button for existing manual hierarchy
        Then  I wait for the page to be properly rendered
        Then  I expect the manual hierarchy builder to be launched with an id
    @Working @aa
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 19 - Open existing auto hierarchy builder
    #
    # Purpose:
    # - Validate that an existing auto hierarchy can be opened for editing.
    # - Ensure the auto hierarchy builder launches with an assigned ID when 
    #   an existing auto hierarchy is edited.
    #
    # Features Covered:
    # - Auto hierarchy persistence
    # - Edit and reopen functionality
    #
    # Application Context:
    # Confirms users can manage and reconfigure previously saved auto hierarchies.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 19 - Open existing auto hierarchy builder
        When  I create a note in the Execution Log with text: "Feature 04 - Test 19"
        Then  I wait for the page to be properly rendered
        Then  I pause for 1000ms
        When  I click on edit button for existing auto hierarchy
        Then  I wait for the page to be properly rendered
        Then  I expect the auto hierarchy builder to be launched with an id

    @Working @TC007 @36919 @activedevelopment
    # ------------------------------------------------------------------------------
    # Scenario: Feature 04 - Test 20 - Delete existing auto hierarchy
    #
    # Purpose:
    # - Ensure auto hierarchies can be created and then successfully deleted.
    # - Validate system behavior when a specific auto hierarchy is created,
    #   confirmed to exist, and then removed.
    #
    # Features Covered:
    # - Auto hierarchy lifecycle
    # - Delete functionality
    #
    # Application Context:
    # Critical to confirm users can remove obsolete or test hierarchies safely.
    # ------------------------------------------------------------------------------
    Scenario: Feature 04 - Test 20 - Delete existing auto hierarchy
        When  I create a note in the Execution Log with text: "Feature 04 - Test 20"
        Then  I expect auto hierarchy "50D78448-558B-435D-AED3-041C91DDD6F6" to not exist
        When  I create auto hierarchy "50D78448-558B-435D-AED3-041C91DDD6F6"
        Then  I wait for the page to be properly rendered
        When  I click on the link "Manage Hierarchies"
        Then  I wait for the page to be properly rendered
        Then  I pause for 1000ms
        Then  I expect auto hierarchy "50D78448-558B-435D-AED3-041C91DDD6F6" to exist
        When  I delete all the hierarchies containing the name "50D78448-558B-435D-AED3-041C91DDD6F6"
        Then  I expect auto hierarchy "50D78448-558B-435D-AED3-041C91DDD6F6" to not exist
