Feature: 2020 Regression Tests
    As an engineer in the QA Team 
    I want to verify the functionality in the application

@Working @TC001 @23933622
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the ability to export multiple query receipts both 
    # with and without grid grouping enabled. It covers different edge cases, 
    # including exporting multiple rows, cancelling selection, exporting with 
    # no rows selected, and exporting with only a single row selected.
    #
    # Purpose:
    # - Ensure that users can select and export receipts from query results.  
    # - Verify behavior with grouped vs non-grouped query results.  
    # - Validate export actions when multiple receipts, single receipts, or 
    #   no receipts are selected.  
    # - Confirm the Task Manager accurately reflects export operations.  
    #
    # Features Covered:
    # - Query creation and filtering by category and operator.  
    # - Grouping query results by a column ("Store").  
    # - Exporting selected receipts (multiple, single, or none).  
    # - Task Manager verification for export tasks.  
    # - Cancel operations for selected receipts.  
    #
    # Application Context:
    # Exports of receipts are a key functionality for analysis, auditing, and 
    # compliance. This test ensures that exports behave consistently in 
    # scenarios involving grouping, selection, cancellation, and edge cases 
    # such as exporting with no rows selected. It helps validate that users 
    # maintain control over what data is exported and that the Task Manager 
    # reflects accurate task creation and completion.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 02 - Test 1 - TC001 Export Multiple Query Receipts without Grid Grouping 
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 02 - Test 1"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        Then  I wait for the application to be ready
        And   I click the option "Query" from the Create New pop up
        Then  I wait for the page to be properly rendered
        Then  I wait for the application to be ready
        When  I change the search type to <searchCriteria>
        Then  I wait for the page to be properly rendered
        When  I click the tab "FILTERS"
        And   I click the button for the filter "Add New Filter"
        And   I set the filter for the value tab with <searchCriteria> Category, <filter> field with operator ">" and amount value of "1" 
        And   I click the button "Save" on the current page
        Then  I wait on the dialog container not to be displayed
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I pause for 3000ms
        And   I group the query by column "Store"
        And   I pause for 1000ms

        # Case 1: Export with grouping enabled (2 receipts selected)
        When  I click on the top right action called "Download"
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I click the button "Select Receipts" on the current page
        And   I click the grouping options button
        And   I select receipt #1 from the query results with grouping
        And   I select receipt #2 from the query results with grouping
        And   I click the button "Export" on the current page
        And   I pause for 1000ms
        And   I open the Task Manager feature
        And   I verify the Task Manager is open
        And   I pause for 10000ms
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed

        # Case 2: Cancel export after selecting rows without grouping
        And   I pause for 1000ms
        # When  I click on the top right action called "Settings"
        # Then  I wait for the page to be properly rendered
        # When  I click on the top right action called "Settings"
        # Then  I wait for the page to be properly rendered
        When  I remove the column "Store" from the grouping list
        When  I click on the top right action called "Download"
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I click the button "Select Receipts" on the current page
        And   I select receipt #1 from the query results with no grouping
        And   I select receipt #2 from the query results with no grouping
        And   I click the button "Cancel" on the current page

        # Case 3: Attempt export with no rows selected
        And   I pause for 1000ms
        When  I click on the top right action called "Download"
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I click the button "Select Receipts" on the current page
        And   I pause for 2000ms
        And   I click the button "Cancel" on the current page

        # Case 4: Export with only 1 row selected
        And   I pause for 1000ms
        When  I click on the top right action called "Download"
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I click the button "Select Receipts" on the current page
        And   I pause for 2000ms
        And   I select receipt #1 from the query results with no grouping
        And   I click the button "Export" on the current page
        And   I open the Task Manager feature
        And   I verify the Task Manager is open
        And   I pause for 10000ms
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed

    Examples:
        | searchCriteria     | filter        |
        | "POS Transactions" | "Order Total" |

@Working @TC002 @239337
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the functionality of exporting multiple receipts 
    # from query results when grid grouping is applied. It covers various 
    # cases, including exporting multiple rows, cancelling exports, 
    # attempting exports with no rows selected, and exporting a single row.
    #
    # Purpose:
    # - Ensure receipt export works correctly under grouped query conditions.  
    # - Verify consistent behavior across multiple row selection, single row 
    #   selection, and no selection scenarios.  
    # - Confirm that cancellations are handled gracefully.  
    # - Validate Task Manager integration during grouped receipt exports.  
    #
    # Features Covered:
    # - Query creation and execution for POS Transactions.  
    # - Grouping query results by "Store".  
    # - Exporting selected receipts with grouping enabled.  
    # - Cancel operations during grouped exports.  
    # - Task Manager validation for grouped export tasks.  
    #
    # Application Context:
    # Exporting receipts with grouping is essential for users analyzing 
    # structured data by store or other dimensions. This test ensures the 
    # application can handle grouped exports reliably, avoiding data loss or 
    # process errors, and providing accurate visibility in Task Manager.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 02 - Test 2 - Export Multiple Query Receipts with Grid Grouping 
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 02 - Test 2"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I pause for 2000ms
        And   I click the option "Query" from the Create New pop up
        Then  I wait for the page to be properly rendered
        When  I change the search type to <searchCriteria>
        Then  I wait for the page to be properly rendered
        When  I click the tab "FILTERS"
        When  I delete the default filter when creating a query
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I pause for 2000ms
        And   I group the query by column "Store"
        And   I pause for 2000ms

        # Case 1: Export with grouping (2 receipts selected)
        When  I click on the top right action called "Download"
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I click the button "Select Receipts" on the current page
        And   I pause for 2000ms
        And   I click the grouping options button
        And   I pause for 2000ms
        And   I select receipt #2 from the query results with grouping
        And   I select receipt #3 from the query results with grouping
        And   I click the button "Export" on the current page
        And   I open the Task Manager feature
        And   I verify the Task Manager is open
        And   I pause for 10000ms
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed

        # Case 2: Cancel export after selecting rows
        And   I pause for 1000ms
        # When  I click on the top right action called "Settings"
        # Then  I wait for the page to be properly rendered
        # When  I click on the top right action called "Settings"
        # Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        And   I pause for 2000ms
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I pause for 2000ms
        And   I click the button "Select Receipts" on the current page
        And   I pause for 2000ms
        And   I select receipt #2 from the query results with grouping
        And   I select receipt #3 from the query results with grouping
        And   I click the button "Cancel" on the current page

        # Case 3: Attempt export with no rows selected
        And   I pause for 1000ms
        When  I click on the top right action called "Download"
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I click the button "Select Receipts" on the current page
        And   I pause for 2000ms
        And   I click the button "Cancel" on the current page

        # Case 4: Export with only 1 row selected
        And   I pause for 1000ms
        When  I click on the top right action called "Download"
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I click the button "Select Receipts" on the current page
        And   I pause for 2000ms
        And   I select receipt #2 from the query results with grouping
        And   I click the button "Export" on the current page
        And   I open the Task Manager feature
        And   I verify the Task Manager is open
        And   I pause for 10000ms
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed

    Examples:
        | searchCriteria     |
        | "POS Transactions" |

@Working @TC003 @167887
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the export of multiple query receipts when no grid 
    # grouping is applied. It includes advanced filter logic, distinct column 
    # additions, and event/distinct count filtering before exporting results.
    #
    # Purpose:
    # - Ensure receipt exports work correctly without grouping applied.  
    # - Validate advanced filtering logic with comparisons (e.g., Order Subtotal < Order Total).  
    # - Verify use of filter event counts and distinct count filters.  
    # - Confirm distinct columns can be added and used for drilldowns.  
    # - Validate download options and formats (PDF and Excel).  
    #
    # Features Covered:
    # - Query creation and execution with advanced filters.  
    # - Comparison filters between fields.  
    # - Export receipts without grouping (Excel/PDF).  
    # - Event count and distinct count filters.  
    # - Adding distinct columns to queries.  
    # - Drilldown into distinct columns.  
    # - Verification of non-empty results and multi-step export workflows.  
    #
    # Application Context:
    # This test ensures analysts can export accurate data when grouping is not 
    # applied, while still leveraging advanced filter capabilities and distinct 
    # column analysis. Validating these workflows is key for flexible reporting 
    # and guarantees that the export system works under different query setups.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 02 - Test 3 - Export Multiple Query Receipts without Grid Grouping 
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 02 - Test 3"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I pause for 2000ms
        And   I click the option "Query" from the Create New pop up
        Then  I wait for the page to be properly rendered
        When  I change the search type to <searchCriteria>
        Then  I wait for the page to be properly rendered

        # Apply advanced filter logic
        When  I click the tab "FILTERS"
        And   I click the button for the filter "Add New Filter"
        And   I compare the filter "Order Subtotal" for category "POS Transactions" with filter "Order Total" for category "POS Transactions" using operator "<"
        And   I click the button "Save" on the current page
        Then  I wait for the page to be properly rendered

        # Select columns and run query
        And   I click the tab "DISPLAY COLUMNS"
        And   I select category <quickQueryCategory> with filters <filters> on Display Columns tab
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered

        # Export receipts without grouping
        And   I click the grouping options button
        And   I pause for 2000ms
        And   I click the button "Apply" on the current page
        And   I pause for 2000ms
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered

        # Apply advanced filtering with event and distinct counts
        When  I click on the top right action called "Settings"
        Then  I wait for the page to be properly rendered
        And   I click the tab "FILTERS"
        And   I click the button "Advanced" on the current page
        And   I group the query by the <filters> filter
        And   I click the switch "Filter Event Count" from the queries page
        And   I set the filter event count operator ">" with value "10"
        And   I pause for 2000ms
        And   I add the <distinctFilter> filter as a distinct column to the query
        And   I pause for 2000ms
        And   I click the switch "Filter Distinct Count" from the queries page
        And   I set the filter distinct count operator ">" with value "1"
        And   I click the button "Save" on the current page
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered

        # Export with advanced filters applied
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered

        # Drilldown into distinct columns
        And   I pause for 2000ms
        And   I click distinct column for row #1
        Then  I wait for the application to be ready
        # And   I pause for 10000ms
        # Then  I wait for the page to be properly rendered
        When  I focus the last opened window
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I expect query results to be more than "2"

        # Final export validation
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait on the dialog container not to be displayed
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered

    Examples:
        | searchCriteria     | filter   | numberOfReceipts | quickQueryCategory | filters            | distinctFilter   |
        | "POS Transactions" | "Voids"  | 1                | "POS Transactions" | "Discount Amount"  | "Discount Count" |

@RegressionTestsX @TC004 @167990
    # -------------------------------------------------------------------------
    # Summary:
    # This regression test validates advanced POS Transactions query 
    # functionality that combines grouping and filtering across multiple 
    # categories (POS Transactions and POS Lines). It confirms query execution, 
    # grouping logic, advanced filtering, event/distinct count controls, and 
    # export functionality.
    #
    # Purpose:
    # - Validate query creation with multiple categories and filters.  
    # - Ensure relative date filters (e.g., "This Week") apply correctly.  
    # - Verify POS Lines filters integrate with POS Transactions queries.  
    # - Confirm grouping by transaction type and advanced grouping edits.  
    # - Validate filter event count and distinct count logic.  
    # - Confirm query results can be exported to Excel successfully.  
    # - Ensure drilldowns via distinct column selection are available.  
    #
    # Features Covered:
    # - Advanced query creation using multiple categories.  
    # - Relative date filters with "Standard" calendar.  
    # - Integration of POS Transactions and POS Lines in filters.  
    # - Grouping and advanced grouping management.  
    # - Filter event count and distinct count validation.  
    # - Query result exports in Excel format.  
    # - Drilldown through distinct columns.  
    #
    # Application Context:
    # Analysts often need to create advanced queries that combine transaction 
    # and line-level filters with grouping for deeper insights. This test ensures 
    # the system can handle such queries, apply event/distinct count logic, and 
    # provide reliable export options. As a regression test, it helps ensure 
    # complex query workflows remain stable across releases.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 02 - Test 4 - Advance POS Transactions Query (POS Transactions Grouping w/POS Lines Contains Filter) 
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 02 - Test 4"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I pause for 2000ms
        And   I click the option "Query" from the Create New pop up
        Then  I wait for the page to be properly rendered
        When  I change the search type to <searchCriteria>
        Then  I wait for the page to be properly rendered

        # Apply filters for POS Transactions and POS Lines
        When  I click the tab "FILTERS"
        When  I delete the default filter when creating a query
        And   I click the button for the filter "Add New Filter"
        And   I set the filter for the value tab with <searchCriteria> Category, <dateTimeFilterName> field with Relative date on "Standard" calendar for "This Week" range and "" value
        And   I pause for 2000ms
        And   I click the button "Save" on the current page
        And   I click the button for the filter "Add New Filter"
        And   I set the filter for the value tab with <searchCriteria2> Category, <filter> field with select all option 
        And   I click the button "Save" on the current page
        Then  I wait for the page to be properly rendered

        # Select columns and run the query
        And   I click the tab "DISPLAY COLUMNS"
        And   I select category <quickQueryCategory> with filters <filters> on Display Columns tab
        And   I click the button "Run" on the current page
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered

        # Grouping and initial export
        And   I click the grouping options button
        Then  I wait for the application to be ready
        And   I click the button "Apply" on the current page
        Then  I wait for the application to be ready
        When  I click on the top right action called "Download"
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        And   I pause for 15000ms
        And   I open the Task Manager feature
        And   I verify the Task Manager is open
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed

        # Advanced grouping and filter counts
        And   I pause for 2000ms
        When  I click on the top right action called "Settings"
        Then  I wait for the page to be properly rendered
        And   I click the tab "FILTERS"
        And   I click the button "Advanced" on the current page
        And   I group the query by the <filters> filter
        And   I click the switch "Filter Event Count" from the queries page
        And   I set the filter event count operator ">" with value "0"
        And   I pause for 2000ms
        And   I add the <distinctFilter> filter as a distinct column to the query
        And   I click the switch "Filter Distinct Count" from the queries page
        And   I set the filter distinct count operator ">" with value "0"
        And   I click the button "Save" on the current page
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered

        # Edit advanced grouping settings and re-run
        When  I click on the top right action called "Settings"
        Then  I wait for the page to be properly rendered
        And   I click the tab "FILTERS"
        And   I edit the Advanced Grouping Settings
        And   I pause for 2000ms
        And   I click the button "Save" on the current page
        And   I pause for 2000ms
        And   I click the button "Run" on the current page
        And   I pause for 2000ms
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered

        # Final export and drilldown
        When  I click on the top right action called "Download"
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        And   I click distinct column for row #1

    Examples:
        | searchCriteria     | searchCriteria2 | filter      | numberOfReceipts | quickQueryCategory | filters            | distinctFilter   | dateTimeFilterName      |
        | "POS Transactions" | "POS Lines"     | "Item Type" | 1                | "POS Transactions" | "Transaction Type" | "Discount Count" | "Transaction Date/Time" |

@In_Progress @TC004 @167992
    # -------------------------------------------------------------------------
    # Summary:
    # This advanced query test validates integration between POS Transactions 
    # and POS Lines by applying multiple filters, including comparison logic 
    # (Discount Amount < Order Total). It ensures grouped queries, advanced 
    # filters, event/distinct counts, and drilldowns all function as expected.
    #
    # Purpose:
    # - Confirm that advanced queries spanning POS Transactions and POS Lines 
    #   execute correctly.  
    # - Validate comparison filters (field-to-field: Discount Amount < Order Total).  
    # - Ensure grouping by selected fields is supported.  
    # - Verify event count and distinct count filters work with combined criteria.  
    # - Confirm exports (PDF and Excel) generate correctly.  
    # - Validate drilldown via distinct column selection, ensuring results > 3.  
    #
    # Features Covered:
    # - Advanced query creation using POS Transactions and POS Lines categories.  
    # - Comparison filters between transaction fields.  
    # - Grouping and advanced grouping logic.  
    # - Event count and distinct count filter validation.  
    # - Export results (PDF and Excel).  
    # - Drilldown navigation from distinct column values.  
    #
    # Application Context:
    # Complex reporting often requires blending transaction-level and line-level 
    # data with advanced logic (e.g., comparing Discount Amount vs. Order Total). 
    # This test ensures analysts can construct and run these queries, apply 
    # grouping and advanced filters, export the results, and drill into details 
    # with confidence. As it is marked **In_Progress**, the test is still being 
    # refined but is key for validating advanced analytics use cases.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 02 - Test 5 - Advance POS Transactions Query (POS Transactions Grouping w/POS Lines Contains Filter) 
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 02 - Test 5"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I pause for 2000ms
        And   I click the option "Query" from the Create New pop up
        Then  I wait for the page to be properly rendered
        When  I change the search type to <searchCriteria>
        Then  I wait for the page to be properly rendered

        # Apply filters including comparison filter and POS Lines integration
        When  I click the tab "FILTERS"
        And   I click the button for the filter "Add New Filter"
        And   I set the filter for the value tab with <searchCriteria> Category, <filter> field with select all option 
        And   I pause for 2000ms
        And   I click the button "Save" on the current page
        And   I click the button for the filter "Add New Filter"
        And   I compare the filter "Discount Amount" for category "POS Transactions" with filter "Order Total" for category "POS Transactions" using operator "<"
        And   I set the filter for the value tab with <searchCriteria2> Category, <filter2> field with select all option 
        And   I click the button "Save" on the current page
        Then  I wait for the page to be properly rendered

        # Run and validate query
        And   I click the tab "DISPLAY COLUMNS"
        And   I select category <quickQueryCategory> with filters <filters> on Display Columns tab
        And   I click the button "Run" on the current page
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered

        # Apply grouping and export
        And   I click the grouping options button
        And   I pause for 2000ms
        And   I click the button "Apply" on the current page
        And   I pause for 2000ms
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait on the dialog container not to be displayed

        # Advanced grouping with event/distinct counts
        When  I click on the top right action called "Settings"
        Then  I wait for the page to be properly rendered
        And   I click the tab "FILTERS"
        And   I click the button "Advanced" on the current page
        And   I group the query by the <filters> filter
        And   I click the switch "Filter Event Count" from the queries page
        And   I set the filter event count operator ">" with value "0"
        And   I pause for 2000ms
        And   I add the <distinctFilter> filter as a distinct column to the query
        And   I click the switch "Filter Distinct Count" from the queries page
        And   I set the filter distinct count operator ">" with value "0"
        And   I click the button "Save" on the current page
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered

        # Drilldown and validate results > 3
        And   I pause for 2000ms
        And   I click distinct column for row #1
        And   I pause for 10000ms
        Then  I wait for the page to be properly rendered
        Then  I expect a new window has been opened
        Then  I wait for the page to be properly rendered
        When  I focus the last opened window
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I expect query results to be more than "3"

        # Final exports
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait on the dialog container not to be displayed
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page

    Examples:
        | searchCriteria     | searchCriteria2 | filter             | filter2       | numberOfReceipts | quickQueryCategory | filters            | distinctFilter     |
        | "POS Transactions" | "POS Lines"     | "Transaction Type" | "Item Type"   | 1                | "POS Transactions" | "Transaction Type" | "Associate Number" |

#     @In_Progress @TC002 @239339
#     Scenario Outline: 239339 - TC004 Export All Query Receipts with Grid Grouping 
#         Given the user navigates to the designated environment
#         When  I create a note in the Execution Log with text: "Test 6"
#         Then  I wait for the page to be properly rendered
#         When  I select "Create New" from the navigation menu
#         And   I pause for 2000ms
#         And   I click the option "Query" from the Create New pop up
#         Then  I wait for the page to be properly rendered
#         When  I change the search type to <searchCriteria>
#         Then  I wait for the page to be properly rendered
#         When  I click the tab "FILTERS"
# 		When  I delete the default filter when creating a query
#         And   I click the button "Run" on the current page
#         Then  I wait for the page to be properly rendered
#         And   I group the query by column "Store"
#         # And   I open the info box for the transaction #1
#         And   I pause for 2000ms
#         When  I click on the top right action called "Download"
#         # Then  I wait on the dialog container not to be displayed
#         When  I change the download type from "Full Grid" to "Selected Receipts"
#         And   I click the button "Select Receipts" on the current page
#         # And   I click the grouping options button
#         And   I pause for 5000ms
#         And   I select all the grouped receipts on the page for <site> environment
#         And   I pause for 2000ms
#         And   I click the next page button
#         And   I pause for 2000ms
#         And   I select all the grouped receipts on the page for <site> environment
#         And   I click the button "Export" on the current page
#         # It seems previous step is not RegressionTests
# # PROPOSAL STARTS HERE
#         And   I pause for 1000ms
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
#         And   I pause for 60000ms
#         And   I click the button with the "close" icon
#         And   I pause for 1000ms
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
#         And   I pause for 60000ms
#         And   I click the button with the "close" icon
#         And   I pause for 1000ms
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
#         And   I pause for 60000ms
#         And   I click the button with the "close" icon
#         And   I pause for 1000ms
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
#         And   I pause for 60000ms
#         And   I click the button with the "close" icon
#         And   I pause for 1000ms
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
#         And   I pause for 60000ms
#         And   I click the button with the "close" icon
#         And   I pause for 1000ms
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
        # Then  I expect the Task Manager contains a task created "Today"
#         And   I pause for 10000ms
#         # And   I click the button "Download" on the current page
#         And   I click the button with the "close" icon
#         And   I pause for 1000ms
#         # Step 10
#         When  I click on the top right action called "Download"
#         When  I change the download type from "Full Grid" to "Selected Receipts"
        # And   I click the button "Select Receipts" on the current page
#         And   I select all the grouped receipts on the page for <site> environment
#         And   I click the button "Export" on the current page
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
#         And   I pause for 60000ms
#         And   I click the button with the "close" icon
#         And   I pause for 1000ms
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
#         And   I pause for 60000ms
#         And   I click the button with the "close" icon
#         And   I pause for 1000ms

#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
        # Then  I expect the Task Manager contains a task created "Today"
#         And   I pause for 10000ms
#         # And   I click the button "Download" on the current page
#         And   I click the button with the "close" icon
#         And   I pause for 1000ms
#         #20
#         When  I click on the top right action called "Download"
#         When  I change the download type from "Full Grid" to "Selected Receipts"
# And   I click the button "Select Receipts" on the current page
#         And   I select all the grouped receipts on the page for <site> environment
#         #25
#         When  I change the number of items per page to "50"
#         And   I pause for 1000ms
#         And   I select all the grouped receipts on the page for <site> environment
#         When  I change the number of items per page to "100"
#         And   I pause for 1000ms
#         And   I click the button "Cancel" on the current page
#         # #No rows selected
#         And   I pause for 1000ms
#         When  I click on the top right action called "Download"
#         When  I change the download type from "Full Grid" to "Selected Receipts"
# And   I click the button "Select Receipts" on the current page
#         And   I pause for 2000ms
#         And   I click the button "Cancel" on the current page
#         #1 row selected
#         And   I pause for 1000ms
#         When  I click on the top right action called "Download"
#         When  I change the download type from "Full Grid" to "Selected Receipts"
# And   I click the button "Select Receipts" on the current page
#         And   I pause for 2000ms
#         And   I group the query by column "Store"
#         And   I pause for 2000ms
#         And   I select receipt #2 from the query results with grouping
#         And   I pause for 2000ms
#         And   I click the button "Export" on the current page
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
        # Then  I expect the Task Manager contains a task created "Today"
#         And   I pause for 10000ms
#         # And   I click the button "Download" on the current page
#         And   I click the button with the "close" icon
#     Examples:
#         | searchCriteria |
#         | "POS Transactions" |
#         # | "POS Transactions" |

@Working @TC003 @234934-1
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates the creation of a new query, saving it, and converting 
    # it into a measure. It specifically ensures that conversion rules are applied 
    # correctly, including dimension and filter selection, and that the "Save" 
    # button remains disabled when required conditions are not met.
    #
    # Purpose:
    # - Confirm new queries can be created and saved successfully.  
    # - Validate conversion of queries into measures.  
    # - Ensure measure conversion settings (filters, dimensions, backfill days) 
    #   are correctly applied.  
    # - Verify that the application disables the "Save" button if required 
    #   measure details are incomplete.  
    #
    # Features Covered:
    # - Query creation and saving.  
    # - Conversion of queries into measures.  
    # - Validation of measure settings (dimension, filters, days to backfill).  
    # - UI safeguard: ensuring "Save" button state reflects configuration validity.  
    #
    # Application Context:
    # Converting queries into reusable measures is a key feature for analytics 
    # consistency. This test ensures the conversion workflow enforces rules 
    # correctly, preventing incomplete or invalid measures from being saved.  
    # It supports data integrity and reliability in reporting.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 02 - Test 6 - Export All Query Receipts with Grid Grouping 
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 02 - Test 6"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I pause for 2000ms
        And   I click the option "Query" from the Create New pop up
        Then  I wait for the page to be properly rendered

        # Verify query creation UI
        Then  I expect tab "SEARCH" to be displayed
        And   I expect tab "FILTERS" to be displayed
        And   I expect tab "DISPLAY COLUMNS" to be displayed
        And   I expect tab "PROPERTIES" to be displayed

        # Save the new query
        And   I set the name of the Query to "TC 234934-1"
        When  I click on the top right action called "Save"
        Then  I expect the "Query Saved" banner appears

        # Convert query to a measure
        And   I refresh the page
        Then  I wait for the page to be properly rendered        
        And   I click the tab "PROPERTIES"
        And   I click the button "Convert To Measure" on the current page
        And   I convert this query to a measure with name <convertedQueryName>, Dimension: "" and Filters "Order Total"
        And   I set "7" as the number of days to backfill
        Then  I expect "Save" button to be disabled

    Examples:
        | convertedQueryName |
        | "TC234934"         |

    # @RegressionTests4-2 @TC003 @234934-2
    # Scenario Outline: 234934-2 - TC004 Export All Query Receipts with Grid Grouping 
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 8"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Create New" from the navigation menu
    #     And   I pause for 2000ms
    #     And   I click the option "Query" from the Create New pop up
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect tab "SEARCH" to be displayed
    #     And   I expect tab "FILTERS" to be displayed
    #     And   I expect tab "DISPLAY COLUMNS" to be displayed
    #     And   I expect tab "PROPERTIES" to be displayed
    #     And   I set the name of the Query to "TC 234934-2"
    #     When  I click on the top right action called "Save"
    #     Then  I expect the "Query Saved" banner appears
    #     # And   I click the tab "FILTERS"
	# 	# When  I delete the default filter when creating a query
    #     # And   I click the button for the filter "Add New Filter"
    #     # And   I set the filter for the value tab with <searchType> Category, <newFilter> field with EXISTS operator and value "Yes" 
    #     # And   I click the button "Save" on the current page
    #     And   I refresh the page
    #     Then  I wait for the page to be properly rendered
    #     And   I click the tab "PROPERTIES"
    #     And   I click the button "Convert To Measure" on the current page
    #     And   I convert this query to a measure with name <convertedQueryName>, Dimension: "Store" and Filters "Order Total"
    #     And   I set "7" as the number of days to backfill
    #     Then  I expect "Save" button to be enabled
    # Examples:
    #     | convertedQueryName | 
    #     | "TC234934" | 
    #     # | "TC234934" | 

    # @RegressionTests6 @TC003 @234934-3
    # Scenario Outline: 234934-3 - TC004 Export All Query Receipts with Grid Grouping 
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 9"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Create New" from the navigation menu
    #     And   I pause for 2000ms
    #     And   I click the option "Query" from the Create New pop up
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect tab "SEARCH" to be displayed
    #     And   I expect tab "FILTERS" to be displayed
    #     And   I expect tab "DISPLAY COLUMNS" to be displayed
    #     And   I expect tab "PROPERTIES" to be displayed
    #     And   I set the name of the Query to "TC 234934-3"
    #     When  I click on the top right action called "Save"
    #     Then  I expect the "Query Saved" banner appears
    #     # And   I click the tab "FILTERS"
	# 	# When  I delete the default filter when creating a query
    #     # And   I click the button for the filter "Add New Filter"
    #     # And   I set the filter for the value tab with <searchType> Category, <newFilter> field with EXISTS operator and value "Yes" 
    #     # And   I click the button "Save" on the current page
    #     And   I refresh the page
    #     Then  I wait for the page to be properly rendered

    #     And   I click the tab "PROPERTIES"
    #     And   I click the button "Convert To Measure" on the current page
    #     And   I convert this query to a measure with name <convertedQueryName>, Dimension: "Store" and Filters "Order Total"
    #     Then  I expect "Save" button to be enabled
    #     And   I click the switch "Summarize Count" from the queries page
    #     And   I pause for 2000ms
    #     Then  I expect "Save" button to be enabled
    # Examples:
    #     | convertedQueryName | 
    #     | "TC234934" | 
    #     # | "TC234934" | 

    # @RegressionTests34 @TC003 @234934-4
    # Scenario Outline: 234934-4 - TC004 Export All Query Receipts with Grid Grouping 
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 10"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Create New" from the navigation menu
    #     And   I pause for 2000ms
    #     And   I click the option "Query" from the Create New pop up
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect tab "SEARCH" to be displayed
    #     And   I expect tab "FILTERS" to be displayed
    #     And   I expect tab "DISPLAY COLUMNS" to be displayed
    #     And   I expect tab "PROPERTIES" to be displayed
    #     And   I set the name of the Query to "TC 234934-4"
    #     When  I click on the top right action called "Save"
    #     Then  I expect the "Query Saved" banner appears
    #     # And   I click the tab "FILTERS"
	# 	# When  I delete the default filter when creating a query
    #     # And   I click the button for the filter "Add New Filter"
    #     # And   I set the filter for the value tab with <searchType> Category, <newFilter> field with EXISTS operator and value "Yes" 
    #     # And   I click the button "Save" on the current page
    #     And   I refresh the page
    #     Then  I wait for the page to be properly rendered
        
    #     And   I click the tab "PROPERTIES"
    #     And   I click the button "Convert To Measure" on the current page
    #     And   I convert this query to a measure with name <convertedQueryName>, Dimension: "Store" and Filters "Order Total"
    #     And   I click the switch "Summarize Count" from the queries page
    #     Then  I expect "Save" button to be enabled
    #     And   I pause for 2000ms
    #     And   I click the switch "Summarize Count" from the queries page
    #     Then  I expect "Save" button to be enabled
    #     And   I pause for 2000ms
    #     And   I set " " as the number of days to backfill
    #     And   I pause for 2000ms
    #     Then  I expect "Save" button to be enabled
    # Examples:
    #     | convertedQueryName | 
    #     | "TC234934" | 
    #     # | "TC234934" | 

    # @RegressionTestsIP @TC003 @234934-5
    # Scenario Outline: 234934-5 - TC004 Export All Query Receipts with Grid Grouping 
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 11"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Create New" from the navigation menu
    #     And   I pause for 2000ms
    #     And   I click the option "Query" from the Create New pop up
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect tab "SEARCH" to be displayed
    #     And   I expect tab "FILTERS" to be displayed
    #     And   I expect tab "DISPLAY COLUMNS" to be displayed
    #     And   I expect tab "PROPERTIES" to be displayed
    #     And   I set the name of the Query to "TC 234934-5"
    #     When  I click on the top right action called "Save"
    #     Then  I expect the "Query Saved" banner appears
    #     # And   I click the tab "FILTERS"
	# 	# When  I delete the default filter when creating a query
    #     # And   I click the button for the filter "Add New Filter"
    #     # And   I set the filter for the value tab with <searchType> Category, <newFilter> field with EXISTS operator and value "Yes" 
    #     # And   I click the button "Save" on the current page
    #     And   I refresh the page
    #     Then  I wait for the page to be properly rendered

    #     And   I click the tab "PROPERTIES"
    #     And   I click the button "Convert To Measure" on the current page
    #     And   I convert this query to a measure with name <convertedQueryName>, Dimension: "Store" and Filters "Order Total"
    #     And   I set "7" as the number of days to backfill
    #     Then  I expect "Save" button to be enabled
    #     And   I convert this query to a measure with name " ", Dimension: "Store" and Filters "Order Total"
    #     Then  I expect "Save" button to be disabled
    # Examples:
    #     | convertedQueryName | 
    #     | "TC234934" | 
        # | "TC234934" | 

@Working @234946-1
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates that a newly created query can be executed without 
    # additional filters and still return results. It ensures the query engine 
    # runs successfully, results are displayed, and basic execution integrity 
    # is maintained.
    #
    # Purpose:
    # - Verify that users can create and immediately run a query.  
    # - Confirm the query executes without requiring additional filters.  
    # - Ensure results are loaded and returned successfully.  
    # - Validate that the results count is greater than zero.  
    #
    # Features Covered:
    # - Query creation.  
    # - Query execution.  
    # - Content loading validation.  
    # - Basic query result validation (non-empty results).  
    #
    # Application Context:
    # Running queries is the foundation of the analytics application. This 
    # scenario ensures that queries execute correctly even in their simplest 
    # form (without applied filters) and that the system consistently returns 
    # results. It validates core system stability for query execution.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 02 - Test 7 - Run Query 
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 02 - Test 7"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I pause for 2000ms
        And   I click the option "Query" from the Create New pop up
        Then  I wait for the page to be properly rendered

        # Execute the query without filters
        When  I click the tab "FILTERS"
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I expect query results to be more than "0"

    Examples:
        | searchCriteria     |
        | "POS Transactions" |

@Working @234946-2
    # -------------------------------------------------------------------------
    # Summary:
    # This test validates query execution after removing the default filter. 
    # It ensures that queries still return results when no predefined filters 
    # are applied, verifying the robustness of the query engine.
    #
    # Purpose:
    # - Confirm that default filters can be removed when creating a query.  
    # - Ensure queries execute successfully without default filters applied.  
    # - Validate that results are still returned and greater than zero.  
    #
    # Features Covered:
    # - Query creation.  
    # - Deletion of default filters.  
    # - Query execution without predefined filters.  
    # - Result validation (non-empty results).  
    #
    # Application Context:
    # Analysts may want to run queries without default filters to view the full 
    # dataset. This test ensures that removing the default filter does not break 
    # query execution and that the system reliably returns results. It is a key 
    # validation for flexibility in query setup.  
    # -------------------------------------------------------------------------

    Scenario Outline: Feature 02 - Test 8 - Run Query 
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 02 - Test 8"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I click the option "Query" from the Create New pop up
        Then  I wait for the page to be properly rendered

        # Run query after removing default filter
        When  I click the tab "FILTERS"
        And   I pause for 2000ms
        When  I delete the default filter when creating a query
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I expect query results to be more than "0"

    Examples:
        | searchCriteria     |
        | "POS Transactions" |

#     @MNR5 @277830-1a
#     Scenario Outline: 277830-1a - Scenario 1a: Delete a measure thats used within a Dashboard Component Widget
#         Given the user navigates to the designated environment
#         When  I create a note in the Execution Log with text: "Test 14"
#         Then  I wait for the page to be properly rendered
#         When  I select "Create New" from the navigation menu
#         And   I pause for 2000ms
#         And   I click the option "Dashboard" from the Create New pop up
#         Then  I wait for the page to be properly rendered
#         Then  I expect the loading overlay to not appear
#         When  I set the name of the Dashboard to <dashboardName>
#         And   I click on the Settings Tab for "Components"
#         And   I pause for 2000ms
#         And   I set <widgetName> as the name of the "Order Total ($)" widget from the category <measuretodelete> for the dimension "Store" and data element "POS Measures"
#         Then  I wait for the page to be properly rendered
#         Then  I expect the loading overlay to not appear
#         And   I choose the "Standard" calendar for "This Month" range with "Currency" icon and color #7 of color row 1
#         And   I click the button "Add" on the current page
#         And   I pause for 1000ms
#         And   I click on the top right action called "Save"
#         Then  I expect the "Dashboard Saved." banner appears
#         Then  I wait until the banner "Dashboard Saved." dissapears
#         When  I select "Settings" from the navigation menu
#         And   I open the "Manage Measures" link from the Settings page
#         # Then  I wait for the page to be properly rendered
#         Then  I wait on report grid loading gif image to not exist
#         Then  I expect the breadcrumb to show "Manage Measures" as the current item
#         When  I delete all the measures containing the name <measuretodelete>
#         Then  I expect the " used in dashboard widgets or info box widgets." banner appears
#         When  I click the button with the "clear" icon
#         Then  I wait until the banner " used in dashboard widgets or info box widgets." dissapears
#         Then  I expect the breadcrumb to show <measuretodelete> as the current item
#         When  I select "Dashboards" from the navigation menu
#         And   I open the dashboard <dashboardName> from the Dashboards list
#         Then  I wait for the page to be properly rendered
#         Then  I expect the component with name <widgetName> is visible

#     Examples:
#     | dashboardName | measuretodelete | widgetName |
#     | "New Regression Dashboard" | "Automation Measure" | "Widget1" |
#     # | "New Regression Dashboard" | "Automation Measure (1)" | "Widget1" |

#     @MNR31 @277830-1b
#     Scenario Outline: 277830-1b - Scenario 1b: Delete a measure thats used within a Dashboard Component Report
#         Given the user navigates to the designated environment
#         When  I create a note in the Execution Log with text: "Test 15"
#         Then  I wait for the page to be properly rendered
#         When  I select "Settings" from the navigation menu
#         And   I click on the add icon next to "Manage Measures" on the Settings page
#         Then  I wait for the page to be properly rendered
#         And   I set the name <measureName> for the Measure
#         Then  I wait for the page to be properly rendered
#         And   I click the tab "Summation"
#         And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "90" days to backfill
#         And   I click on the top right action called "Save"
#         Then  I expect the "Measure Saved" banner appears       
#         And   I click the button "Run Summation Now" on the current page
#         Then  I expect the dialog to contain title: "Manual Summation" and text "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
#         And   I click the button "Continue" on the current page
#         Then  I wait for the page to be properly rendered
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
        # Then  I expect the Task Manager contains a task created "Today"
#         And   I pause for 2000ms
#         And   I expect the Task Manager to not contain the "Manual summation failed." message
#         And   I click the button with the "close" icon
#         Then  I wait on the dialog container not to be displayed

#         # Report Creation
#         When  I select "Create New" from the navigation menu
#         And   I pause for 2000ms
#         And   I click the option "Report" from the Create New pop up
#         Then  I wait for the page to be properly rendered
#         And   I set the report name to <reportName>
#         When  I click the tab "Data Elements"
#         And   I pause for 3000ms
#         And   I select the data element measure "POS Measures"
#         And   I pause for 3000ms
#         And   I add the data element <measureName> to the report
#         Then  I expect the loading overlay to not appear
#         Then  I wait for the page to be properly rendered
#         And   I click the tab "Time"
#         And   I select the Report Type as Summary with Relative Type and Standard Calendar
#         Then  I wait for the page to be properly rendered
#         And   I set the Range field to "X Months" with X value set to "1" for the Standard Calendar
#         Then  I wait for the page to be properly rendered

#         When  I enable the chart in the report
#         When  I click on the top right action called "Save"
#         Then  I wait for the page to be properly rendered
#         Then  I expect the loading overlay to not appear

#         And   I select "Create New" from the navigation menu
#         And   I pause for 2000ms
#         And   I click the option "Dashboard" from the Create New pop up
#         Then  I wait for the page to be properly rendered
#         Then  I expect the loading overlay to not appear
#         When  I set the name of the Dashboard to <dashboardName>
#         And   I click on the Settings Tab for "Components"
#         And   I choose the <reportName> report from components
#         Then  I wait for the page to be properly rendered
#         Then  I expect the loading overlay to not appear
#         When  I click the button with the "poll" icon
#         And   I pause for 2000ms
#         And   I expect a report graph to be displayed with text <measureName>
#         And   I click on the top right action called "Save"
#         Then  I expect the "Dashboard Saved." banner appears
#         Then  I wait until the banner "Dashboard Saved." dissapears
# # Deletion starts
#         When  I select "Settings" from the navigation menu
#         And   I open the "Manage Measures" link from the Settings page
#         # Then  I wait for the page to be properly rendered
#         Then  I wait on report grid loading gif image to not exist
#         Then  I expect the breadcrumb to show "Manage Measures" as the current item
#         When  I delete all the measures containing the name <measureName>
#         Then  I expect the loading overlay to not appear
#         Then  I expect the breadcrumb to show "Manage Measures" as the current item
#         When  I set <measureName> on the Dashboards filter "Measure Name"
#         Then  I expect the cell #3 of the row #1 to not contain the following text <measureName>
#         When  I select "Dashboards" from the navigation menu
#         And   I open the dashboard <dashboardName> from the Dashboards list
#         Then  I wait for the page to be properly rendered
#         And   I expect to find <reportName> as span text in the page
#         Then  I wait for the page to be properly rendered
#         Then  I expect the loading overlay to not appear
#         And   I expect a report graph to not be displayed with text <measureName>
        
#     Examples:
#     | measureName | dimension | summaryColumn | dashboardName | reportName |
#     | "Measure To Delete 1b" | "Store" | "Order Total" | "A dashboard with a report" | "A Report for Measures" |
#     # | "Measure To Delete 1b" | "Store" | "Order Total" | "A dashboard with a report" | "A Report for Measures" |
    
#     # | dashboardName | measuretodelete | widgetName |
#     # | "New Regression Dashboard" | "Automation Measure (1)" | "Widget1" |


#     @MNR302 @277830-2
#     Scenario Outline: 277830-2 - Scenario 2: Delete a measure thats used within an Infobox Widget
#         Given the user navigates to the designated environment
#         When  I create a note in the Execution Log with text: "Test 16"
#         Then  I wait for the page to be properly rendered
#         When  I select "Settings" from the navigation menu
#         And   I click on the add icon next to "Manage Measures" on the Settings page
#         Then  I wait for the page to be properly rendered
#         And   I set the name <measureName> for the Measure
#         Then  I wait for the page to be properly rendered
#         And   I click the tab "Summation"
#         And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "90" days to backfill
#         And   I click on the top right action called "Save"
#         Then  I expect the "Measure Saved" banner appears       
#         And   I click the button "Run Summation Now" on the current page
#         Then  I expect the dialog to contain title: "Manual Summation" and text "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
#         And   I click the button "Continue" on the current page
#         Then  I wait for the page to be properly rendered
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
        # Then  I expect the Task Manager contains a task created "Today"
#         And   I expect the Task Manager to not contain the "Manual summation failed." message
#         And   I click the button with the "close" icon
#         Then  I wait on the dialog container not to be displayed

#         When  I select "Settings" from the navigation menu
#         And   I open the "Manage Widgets" link from the Settings page
#         Then  I wait on report grid loading gif image to not exist
#         When  I click the button to configure the infobox widget "Store"
#         And   I pause for 3000ms
#         And   I create the Widget with name "Return Risk", type "Goal Widget", data element "POS Measures", measure <measureName> and indicator "Tx Count (#)"
#         And   I click the button "Save" on the current page
#         When  I select "Settings" from the navigation menu
#         And   I open the "Manage Measures" link from the Settings page
#         # Then  I wait for the page to be properly rendered
#         Then  I wait on report grid loading gif image to not exist
#         Then  I expect the breadcrumb to show "Manage Measures" as the current item
#         When  I delete all the measures containing the name <measureName>
#         Then  I expect the " used in dashboard widgets or info box widgets." banner appears
#         When  I click the button with the "clear" icon
#         Then  I wait until the banner " used in dashboard widgets or info box widgets." dissapears
#         Then  I expect the breadcrumb to show <measureName> as the current item

#     Examples:
#     | measureName | dimension | summaryColumn | dashboardName | reportName |
#     | "Measure To Delete 2" | "Store" | "Order Total" | "A dashboard with a report" | "A Report for Measures" |
#     # | "Measure To Delete 2" | "Store" | "Order Total" | "A dashboard with a report" | "A Report for Measures" |

#     @RegressionTests30-3 @277830-3
#     Scenario Outline: 277830-3 - Scenario 3: Delete a measure that is used within a Monitor
#         Given the user navigates to the designated environment
#         When  I create a note in the Execution Log with text: "Test 17"
#         Then  I wait for the page to be properly rendered
#         When  I select "Settings" from the navigation menu
#         And   I click on the add icon next to "Manage Measures" on the Settings page
#         Then  I wait for the page to be properly rendered
#         And   I set the name <measureName> for the Measure
#         Then  I wait for the page to be properly rendered
#         And   I click the tab "Summation"
#         And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "90" days to backfill
#         And   I click on the top right action called "Save"
#         Then  I expect the "Measure Saved" banner appears       
#         And   I click the button "Run Summation Now" on the current page
#         # And   I pause for 5000ms
#         Then  I expect the dialog to contain title: "Manual Summation" and text "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
#         And   I click the button "Continue" on the current page
#         And   I pause for 2000ms
#         And   I open the Task Manager feature
#         Then  I wait on the dialog container to be displayed
        # Then  I expect the Task Manager contains a task created "Today"
#         And   I pause for 2000ms
#         And   I expect the Task Manager to not contain the "Manual summation failed." message
#         And   I click the button with the "close" icon
#         Then  I wait on the dialog container not to be displayed

#         When  I select "Settings" from the navigation menu
#         And   I click on the add icon next to "Manage Compliance Monitors" on the Settings page
#         And   I create the Monitor with name <monitorName>, type "Summary Event", Dimension <dimension>, data element <dataElement>, measure <measureName> and indicator "Tx Count (#)"
#         And   I click the tab "Rules"
#         And   I add a new rule into the monitor with name "Rule with measure to delete" and type "Value" for operator "Greater Than" and value #1 
#         And   I click the button "Apply" on the current page
#         And   I click on the top right action called "Save"
#         Then  I expect the "Compliance Monitor Saved." banner appears       

#         When  I select "Settings" from the navigation menu
#         And   I open the "Manage Measures" link from the Settings page
#         # Then  I wait for the page to be properly rendered
#         Then  I wait on report grid loading gif image to not exist
#         Then  I expect the breadcrumb to show "Manage Measures" as the current item
#         When  I delete all the measures containing the name <measureName>
#         Then  I expect the loading overlay to not appear
#         Then  I expect the breadcrumb to show "Manage Measures" as the current item
#         When  I select "Settings" from the navigation menu
#         And   I open the "Manage Compliance Monitors" link from the Settings page
#         Then  I wait on report grid loading gif image to not exist
#         And   I pause for 3000ms
#         When  I edit the <monitorName> settings item from the displayed list
#         Then  I wait for the page to be properly rendered
#         Then  I expect the breadcrumb to show <monitorName> as the current item
#         And   I expect the switch "Active" to be off
#         And   I expect tab "Actual" not to be displayed
#         And   I expect no measures are shown for <measureName> measure name
#         When  I click on the top right action called "Delete"
#         And   I pause for 2000ms
#         When  I click the button "Continue" on the current page
#         Then  I expect the loading overlay to not appear
#         Then  I expect the breadcrumb to show "Manage Compliance Monitors" as the current item
#     Examples:
#     | measureName | dimension | dataElement | summaryColumn | monitorName |
#     | "Measure To Delete 3" | "Store" | "POS Measures" |"Order Total" | "Delete 277830-3" |
#     # | "Measure To Delete 3" | "Store" | "Order Total" | "Delete 277830-3" |

@Working @277830-4aa
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates system behavior when attempting to delete a measure 
    # that is actively being used within a Report and its Snapshot. It ensures 
    # deletion safeguards, warnings, and eventual cleanup are working correctly.
    #
    # Purpose:
    # - Confirm that a Measure can be created and successfully run through summation.  
    # - Validate that the Measure can be used in a Report and Snapshot.  
    # - Ensure the system prevents accidental deletion by requiring confirmation.  
    # - Validate that once deleted, the Measure is removed from Reports, Snapshots, 
    #   and all related report headers.  
    # - Confirm proper cleanup by deleting associated reports.  
    #
    # Features Covered:
    # - Measure creation, summation, and Task Manager monitoring.  
    # - Report creation with Measure usage.  
    # - Snapshot creation and validation.  
    # - Measure deletion workflow (cancel, confirm).  
    # - Validation of system state after deletion (report headers updated).  
    # - Report cleanup after Measure removal.  
    #
    # Application Context:
    # Analysts and admins may need to deprecate or delete Measures that were once 
    # used in live Reports or Snapshots. This test ensures system consistency by 
    # validating that deleting such a Measure is handled gracefully, prevents data 
    # corruption, and updates dependent reports. It protects against orphaned 
    # references and ensures compliance with lifecycle management practices.
    # ------------------------------------------------------------------------------

    Scenario Outline: Feature 02 - Test 9 - Delete a measure thats used within a Report/Snapshot
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 02 - Test 9"
        Then  I wait for the page to be properly rendered

        # --- Measure Creation and Summation ---
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I click on the add icon next to "Manage Measures" on the Settings page
        Then  I wait for the page to be properly rendered
        And   I set the name <measureName> for the Measure
        Then  I wait for the page to be properly rendered
        And   I click the tab "Summation"
        And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "90" days to backfill
        And   I click on the top right action called "Save"
        Then  I expect the "Measure Saved" banner appears
        And   I click the button "Run Summation Now" on the current page
        Then  I expect the dialog to contain title: "Manual Summation" and text "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
        And   I click the button "Continue" on the current page
        Then  I wait for the page to be properly rendered
        And   I pause for 3000ms
        And   I open the Task Manager feature
        And   I verify the Task Manager is open
        And   I expect the Task Manager to not contain the "Manual summation failed." message
        And   I pause for 1000ms
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed

        # --- Report Creation Using the Measure ---
        When  I select "Create New" from the navigation menu
        And   I pause for 2000ms
        And   I click the option "Report" from the Create New pop up
        Then  I wait for the page to be properly rendered
        And   I set the report name to <reportName>
        Then  I wait for the page to be properly rendered
        When  I click the tab "Data Elements"
        Then  I wait for the page to be properly rendered
        And   I select the data element measure "POS Measures"
        Then  I wait for the page to be properly rendered
        And   I add the data element <measureName> to the report
        Then  I expect the loading overlay to not appear
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Save"
        And   I pause for 3000ms
        And   I refresh the page
        Then  I wait for the page to be properly rendered

        # --- Snapshot Creation ---
        When  I click on the top right action called "Settings"
        Then  I wait for the page to be properly rendered
        Then  I expect the loading overlay to not appear
        And   I pause for 3000ms
        And   I open the menu item "Set Date Range Override" for column <columnName>
        And   I pause for 3000ms
        And   I click the button "Save" on the current page
        And   I pause for 3000ms
        When  I click on the top right action called "Snapshot"
        Then  I wait for the page to be properly rendered
        Then  I wait on report grid loading gif image to not exist
        Then  I expect the "Snapshot saved." banner appears

        # --- Measure Deletion Attempt ---
        When  I select "Settings" from the navigation menu
        And   I open the "Manage Measures" link from the Settings page
        Then  I wait on report grid loading gif image to not exist
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
        When  I click the edit pencil icon for the <measureName> item from the list
        Then  I wait for the page to be properly rendered
        Then  I wait on report grid loading gif image to not exist
        Then  I expect the breadcrumb to show <measureName> as the current item

        # Cancel Deletion
        When  I click on the top right action called "Delete"
        And   I pause for 2000ms
        And   I click the button "Cancel" on the current page
        And   I pause for 2000ms
        Then  I expect to find "Reports" as span text in the page

        # Confirm Deletion
        When  I click on the top right action called "Delete"
        And   I pause for 2000ms
        And   I click the button "Continue" on the current page
        Then  I wait for the page to be properly rendered

        # --- Validation After Deletion ---
        # When  I select "Reports" from the navigation menu
        When  I navigate to "Reports"
        Then  I wait for the page to be properly rendered
        When  I set the filter "Name" for the table with the following value: <reportName>
        Then  I wait for the page to be properly rendered
        Then  I expect the cell #2 of the row #1 to contain the following text <reportName>
        When  I select "Reports" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the report <reportName> from the Reports list
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        Then  I expect the title of the report to be <reportName>
        Then  I expect table header with name <columnName> to not appear

        # --- Cleanup ---
        When  I select "Settings" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the "Manage Reports" link from the Settings page
        Then  I wait for the page to be properly rendered
        When  I delete all the reports containing the name <reportName>

    Examples:
    | measureName          | dimension | summaryColumn  | monitorName          | reportName                 | columnName   |
    | "Measure To Delete 4a" | "Store"   | "Order Total"  | "Delete 277830-4a"   | "A Report for Measures 4a" | "Tx Count (#)" |

    # @RegressionTestsIP @277830-4b
    # Scenario Outline: 277830-4b - Scenario 4b: User is redirected to the "Report Usage" tab upon deletion when a measure is used in a Report
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 19"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Settings" from the navigation menu
    #     And   I click on the add icon next to "Manage Measures" on the Settings page
    #     Then  I wait for the page to be properly rendered
    #     And   I set the name <measureName> for the Measure
    #     Then  I wait for the page to be properly rendered
    #     And   I click the tab "Summation"
    #     And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "90" days to backfill
    #     And   I click on the top right action called "Save"
    #     Then  I expect the "Measure Saved" banner appears       
    #     And   I click the button "Run Summation Now" on the current page
    #     Then  I expect the dialog to contain title: "Manual Summation" and text "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
    #     And   I click the button "Continue" on the current page
    #     Then  I wait for the page to be properly rendered
    #     And   I pause for 3000ms
    #     And   I open the Task Manager feature
    #     Then  I wait on the dialog container to be displayed
    #     Then  I expect the Task Manager contains a task created "Today"
    #     And   I pause for 2000ms
    #     And   I expect the Task Manager to not contain the "Manual summation failed." message
    #     And   I click the button with the "close" icon
    #     Then  I wait on the dialog container not to be displayed

    #     # Report Creation
    #     When  I select "Create New" from the navigation menu
    #     And   I pause for 2000ms
    #     And   I click the option "Report" from the Create New pop up
    #     Then  I wait for the page to be properly rendered
    #     And   I set the report name to <reportName>
    #     When  I click the tab "Data Elements"
    #     And   I pause for 3000ms
    #     And   I select the data element measure "POS Measures"
    #     And   I pause for 3000ms
    #     And   I add the data element <measureName> to the report
    #     Then  I expect the loading overlay to not appear
    #     Then  I wait for the page to be properly rendered
    #     And   I click the tab "Time"
    #     And   I select the Report Type as Summary with Relative Type and Standard Calendar
    #     Then  I wait for the page to be properly rendered
    #     And   I set the Range field to "X Months" with X value set to "1" for the Standard Calendar
    #     Then  I wait for the page to be properly rendered

    #     When  I enable the chart in the report
    #     When  I click on the top right action called "Save"
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect the loading overlay to not appear

    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage Measures" link from the Settings page
    #     # Then  I wait for the page to be properly rendered
    #     Then  I wait on report grid loading gif image to not exist
    #     Then  I expect the breadcrumb to show "Manage Measures" as the current item
    #     When  I click the edit pencil icon for the <measureName> item from the list
    #     Then  I wait for the page to be properly rendered        
    #     Then  I expect the breadcrumb to show <measureName> as the current item
    #     When  I pause for 5000ms
    #     When  I click on the top right action called "Delete"
    #     Then  I wait on report grid loading gif image to not exist
    #     When  I click the button "Cancel" on the current page
    #     Then  I expect to find <reportName> as span text in the page
    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage Measures" link from the Settings page
    #     Then  I wait for the page to be properly rendered        
    #     Then  I wait on report grid loading gif image to not exist
    #     When  I delete all the measures containing the name <measureName>
    #     Then  I wait for the page to be properly rendered        
    #     Then  I wait on report grid loading gif image to not exist
    #     Then  I expect the breadcrumb to show "Manage Measures" as the current item
    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage Reports" link from the Settings page
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect the breadcrumb to show "Manage Reports" as the current item
    #     When  I delete all the reports containing the name <reportName>
    #     Then  I expect the breadcrumb to show "Manage Reports" as the current item

    # Examples:
    # | measureName | dimension | summaryColumn | monitorName | reportName |
    # | "Measure To Delete 4b" | "Store" | "Order Total" | "Delete 277830-4b" | "A Report for Measures 4b" |
    # # | "Measure To Delete 4a" | "Store" | "Order Total" | "Delete 277830-4a" | "A Report for Measures 4b" |

    # @RegressionTests5a @277830-5a
    # Scenario Outline: 277830-5a - Scenario 5a: Delete a measure thats used within a Master KPI
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 20"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Settings" from the navigation menu
    #     And   I click on the add icon next to "Manage Measures" on the Settings page
    #     Then  I wait for the page to be properly rendered
    #     And   I set the name <measureName> for the Measure
    #     Then  I wait for the page to be properly rendered
    #     And   I click the tab "Summation"
    #     And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "90" days to backfill
    #     And   I click on the top right action called "Save"
    #     Then  I expect the "Measure Saved" banner appears       
    #     And   I click the button "Run Summation Now" on the current page
    #     Then  I expect the dialog to contain title: "Manual Summation" and text "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
    #     And   I click the button "Continue" on the current page
    #     Then  I wait for the page to be properly rendered
    #     And   I open the Task Manager feature
    #     Then  I wait on the dialog container to be displayed
    #     Then  I expect the Task Manager contains a task created "Today"
    #     And   I pause for 2000ms
    #     And   I expect the Task Manager to not contain the "Manual summation failed." message
    #     And   I click the button with the "close" icon
    #     Then  I wait on the dialog container not to be displayed

    #     When  I select "Settings" from the navigation menu
    #     And   I click on the add icon next to "Manage Master KPIs" on the Settings page
    #     Then  I wait for the page to be properly rendered
    #     When  I configure a master KPI with name <masterKPIName>, type "Number", dimension "Employee", data element "POS Measures", measure <measureName> and indicator "Tx Count (#)"
    #     And   I configure a master KPI with name <masterKPIName>, type "Number", dimension "Employee", data element "POS Measures", measure <measureName> and indicator "Tx Count (#)"
    #     And   I click on the top right action called "Save"
    #     Then  I expect the "KPI Saved." banner appears
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect the loading overlay to not appear

    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage Measures" link from the Settings page
    #     # Then  I wait for the page to be properly rendered
    #     Then  I wait on report grid loading gif image to not exist
    #     Then  I expect the breadcrumb to show "Manage Measures" as the current item
    #     When  I delete all the measures containing the name <measureName>
    #     Then  I expect the breadcrumb to show "Manage Measures" as the current item

    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage Master KPIs" link from the Settings page
    #     Then  I wait on report grid loading gif image to not exist
    #     When  I set the KPI Name filter to <masterKPIName>
    #     And   I pause for 2000ms
    #     Then  I expect the cell #3 of the row #1 to not contain the following text <masterKPIName>

    # Examples:
    # | measureName | dimension | summaryColumn | masterKPIName |
    # | "Measure To Delete 5a" | "Store" | "Order Total" | "Master KPI 5a" |

    # @RegressionTests5b @277830-5b
    # Scenario Outline: 277830-5b - Scenario 5b: Delete a measure thats used within a Nested Master KPI
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 21"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Settings" from the navigation menu
    #     And   I click on the add icon next to "Manage Measures" on the Settings page
    #     Then  I wait for the page to be properly rendered
    #     And   I set the name <measureName> for the Measure
    #     Then  I wait for the page to be properly rendered
    #     And   I click the tab "Summation"
    #     And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "90" days to backfill
    #     And   I click on the top right action called "Save"
    #     Then  I expect the "Measure Saved" banner appears       
    #     And   I click the button "Run Summation Now" on the current page
    #     Then  I expect the dialog to contain title: "Manual Summation" and text "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
    #     And   I click the button "Continue" on the current page
    #     Then  I wait for the page to be properly rendered
    #     And   I open the Task Manager feature
    #     Then  I wait on the dialog container to be displayed
    #     Then  I expect the Task Manager contains a task created "Today"
    #     And   I pause for 2000ms
    #     And   I expect the Task Manager to not contain the "Manual summation failed." message
    #     And   I click the button with the "close" icon
    #     Then  I wait on the dialog container not to be displayed
    #     # Original
    #     When  I select "Settings" from the navigation menu
    #     And   I click on the add icon next to "Manage Master KPIs" on the Settings page
    #     Then  I wait for the page to be properly rendered
    #     When  I configure a master KPI with name <masterKPIName>, type "Number", dimension "Employee", data element "POS Measures", measure <measureName> and indicator "Tx Count (#)"
    #     And   I configure a master KPI with name <masterKPIName>, type "Number", dimension "Employee", data element "POS Measures", measure <measureName> and indicator "Tx Count (#)"
    #     And   I click on the top right action called "Save"
    #     Then  I expect the "KPI Saved." banner appears
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect the loading overlay to not appear
    #     # Nested
    #     When  I select "Settings" from the navigation menu
    #     And   I click on the add icon next to "Manage Master KPIs" on the Settings page
    #     Then  I wait for the page to be properly rendered
    #     When  I configure a nested master KPI with name <nestedKPIName>, type "Number", dimension "Employee" and master kpi <masterKPIName>
    #     And   I configure a nested master KPI with name <nestedKPIName>, type "Number", dimension "Employee" and master kpi <masterKPIName>
    #     And   I click on the top right action called "Save"
    #     Then  I expect the "KPI Saved." banner appears
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect the loading overlay to not appear

    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage Measures" link from the Settings page
    #     # Then  I wait for the page to be properly rendered
    #     Then  I wait on report grid loading gif image to not exist
    #     Then  I expect the breadcrumb to show "Manage Measures" as the current item
    #     When  I delete all the measures containing the name <measureName>
    #     Then  I expect the breadcrumb to show "Manage Measures" as the current item

    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage Master KPIs" link from the Settings page
    #     Then  I wait on report grid loading gif image to not exist
    #     When  I set the KPI Name filter to <masterKPIName>
    #     And   I pause for 2000ms
    #     Then  I expect the cell #3 of the row #1 to not contain the following text <masterKPIName>

    # Examples:
    # | measureName | dimension | summaryColumn | masterKPIName | nestedKPIName |
    # | "Measure To Delete 5b" | "Store" | "Order Total" | "Master KPI 5b" | "Nested KPI 5b" | 

    # @RegressionTests6 @277830-6
    # Scenario Outline: 277830-6 - Scenario 6: Delete a measure thats used within a DNA Score
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 22"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Settings" from the navigation menu
    #     And   I click on the add icon next to "Manage Measures" on the Settings page
    #     Then  I wait for the page to be properly rendered
    #     And   I set the name <measureName> for the Measure
    #     Then  I wait for the page to be properly rendered
    #     And   I click the tab "Summation"
    #     And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "90" days to backfill
    #     And   I click on the top right action called "Save"
    #     Then  I expect the "Measure Saved" banner appears       
    #     And   I click the button "Run Summation Now" on the current page
    #     Then  I expect the dialog to contain title: "Manual Summation" and text "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
    #     And   I click the button "Continue" on the current page
    #     Then  I wait for the page to be properly rendered
    #     And   I open the Task Manager feature
    #     Then  I wait on the dialog container to be displayed
    #     Then  I expect the Task Manager contains a task created "Today"
    #     And   I expect the Task Manager to not contain the "Manual summation failed." message
    #     And   I click the button with the "close" icon
    #     Then  I wait on the dialog container not to be displayed
    #     # DNA Edit
    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage DNA Scores" link from the Settings page
    #     Then  I wait on report grid loading gif image to not exist
    #     When  I edit the DNA Score "Store DNA Score"
    #     And   I pause for 5000ms
    #     And   I add the data element for the DNA Score with measure name <measureName>, summary value "Tx Count (#)" and improvement is "Higher Value"
    #     And   I pause for 2000ms
    #     # And   I click the button "Add" on the current page
    #     # And   I pause for 2000ms
    #     And   I click on the top right action called "Save"

    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage Measures" link from the Settings page
    #     # Then  I wait for the page to be properly rendered
    #     Then  I wait on report grid loading gif image to not exist
    #     Then  I expect the breadcrumb to show "Manage Measures" as the current item
    #     When  I delete all the measures containing the name <measureName>
    #     Then  I expect the breadcrumb to show "Manage Measures" as the current item

    #     When  I select "Settings" from the navigation menu
    #     And   I open the "Manage DNA Scores" link from the Settings page
    #     Then  I wait on report grid loading gif image to not exist
    #     When  I edit the DNA Score "Store DNA Score"
    #     And   I pause for 2000ms
    #     And   I expect to not find <measureName> as span text in the page
    # Examples:
    # | measureName | dimension | summaryColumn |
    # | "Measure To Delete 6" | "Store" | "Order Total" |


    # @RegressionTestsIP @277830-7
    # Scenario Outline: 277830-7 - Scenario 7: Delete a measure thats used within a Master KPI Dashboard Component Widget
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 23"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Settings" from the navigation menu
    #     And   I click on the add icon next to "Manage Measures" on the Settings page
    #     Then  I wait for the page to be properly rendered
    #     And   I set the name <measureName> for the Measure
    #     Then  I wait for the page to be properly rendered
    #     And   I click the tab "Summation"
    #     And   I set the summation tab with dimension <dimension>, summary columns <summaryColumn>, historical data "On" and "90" days to backfill
    #     And   I click on the top right action called "Save"
    #     Then  I expect the "Measure Saved" banner appears       
    #     And   I click the button "Run Summation Now" on the current page
    #     Then  I expect the dialog to contain title: "Manual Summation" and text "Manually running summation may cause a slowdown in performance for all users. For best performance, it’s recommended to only backfill 7 days."
    #     And   I click the button "Continue" on the current page
    #     Then  I wait for the page to be properly rendered
    #     And   I open the Task Manager feature
    #     Then  I wait on the dialog container to be displayed
    #     Then  I expect the Task Manager contains a task created "Today"
    #     And   I pause for 2000ms
    #     And   I expect the Task Manager to not contain the "Manual summation failed." message
    #     And   I click the button with the "close" icon
    #     Then  I wait on the dialog container not to be displayed

    #     When  I select "Settings" from the navigation menu
    #     And   I click on the add icon next to "Manage Master KPIs" on the Settings page
    #     Then  I wait for the page to be properly rendered
    #     When  I configure a master KPI with name <masterKPIName>, type "Number", dimension "Employee", data element "POS Measures", measure <measureName> and indicator "Tx Count (#)"
    #     And   I configure a master KPI with name <masterKPIName>, type "Number", dimension "Employee", data element "POS Measures", measure <measureName> and indicator "Tx Count (#)"
    #     And   I click on the top right action called "Save"
    #     Then  I expect the "KPI Saved." banner appears
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect the loading overlay to not appear

    #     When  I select "Create New" from the navigation menu
    #     And   I pause for 2000ms
    #     And   I click the option "Dashboard" from the Create New pop up
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect the loading overlay to not appear
    #     When  I set the name of the Dashboard to <dashboardName>
    #     And   I click on the Settings Tab for "Components"
    #     And   I pause for 2000ms
    #     And   I create a widget with name <widgetName> for the dimension "Employee" with KPI <masterKPIName>
    #     Then  I wait for the page to be properly rendered
    #     Then  I expect the loading overlay to not appear
    #     And   I choose the "Standard" calendar for "This Month" range with "Currency" icon and color #7 of color row 1
    #     And   I click the button "Add" on the current page
    #     And   I pause for 1000ms
    #     And   I click on the top right action called "Save"
    #     Then  I expect the "Dashboard Saved." banner appears
    #     # Then  I wait until the banner "Dashboard Saved." dissapears
    #     # When  I select "Settings" from the navigation menu
    #     # And   I open the "Manage Measures" link from the Settings page
    #     # # Then  I wait for the page to be properly rendered
    #     # Then  I wait on report grid loading gif image to not exist
    #     # Then  I expect the breadcrumb to show "Manage Measures" as the current item
    #     # When  I delete all the measures containing the name <measureName>
    #     # Then  I expect the " used in dashboard widgets or info box widgets." banner appears
    #     # When  I click the button with the "clear" icon
    #     # Then  I wait until the banner " used in dashboard widgets or info box widgets." dissapears
    #     # Then  I expect the breadcrumb to show <measureName> as the current item
    # Examples:
    # | measureName | dimension | summaryColumn | widgetName | masterKPIName | dashboardName |
    # | "Measure To Delete 7" | "Store" | "Order Total" | "Widget7" | "Master KPI 7" | "Dashboard Master KPI 7" |

    # @RegressionTests32 @303098
    # Scenario Outline: Scenario 1: "Create Manual Alerts" and "Alerts" permissions are granted at User level
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 24"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Create New" from the navigation menu
    #     And   I pause for 2000ms
    #     And   I click the option "Query" from the Create New pop up
    #     Then  I wait for the page to be properly rendered
    #     When  I change the search type to <searchCriteria>
    #     Then  I wait for the page to be properly rendered
    #     When  I click the tab "FILTERS"
	# 	When  I delete the default filter when creating a query
    #     And   I click the button "Run" on the current page
    #     Then  I wait for the page to be properly rendered
    #     # And   I click on the top right action called "Alert"


    # Examples:
    #     | searchCriteria |
    #     | "POS Transactions" |

    # @RegressionTests33 @303098
    # Scenario Outline: Scenario 2:  "Create Manual Alerts" permission is granted and "Alerts" permission is denied at User level
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "Test 25"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Create New" from the navigation menu
    #     And   I pause for 2000ms
    #     And   I click the option "Query" from the Create New pop up
    #     Then  I wait for the page to be properly rendered
    #     When  I change the search type to <searchCriteria>
    #     Then  I wait for the page to be properly rendered
    #     When  I click the tab "FILTERS"
	# 	When  I delete the default filter when creating a query
    #     And   I click the button "Run" on the current page
    #     Then  I wait for the page to be properly rendered
    #     # And   I click on the top right action called "Alert"
    # Examples:
    #     | searchCriteria |
    #     | "POS Transactions" |
