Feature: Tests behavior of several downloads and the Task Manager interaction
    As a developer
    I want to be able to test if task manager handles several downloads

    @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the ability to export Query results multiple times
    # in different formats and selection modes, while monitoring the Task Manager
    # for proper handling of concurrent downloads.
    #
    # Purpose:
    # - Ensure users can repeatedly export Query results as PDF and Excel.
    # - Confirm exports work for both "Full Grid" and "Selected Receipts."
    # - Validate the Task Manager correctly tracks and clears download tasks.
    #
    # Features Covered:
    # - Query execution
    # - Exporting results (PDF, Excel)
    # - Receipt selection for export
    # - Task Manager monitoring
    #
    # Application Context:
    # High-volume exports are common in production environments. 
    # This scenario ensures that repeated downloads do not break 
    # the application, exports complete successfully, and Task Manager 
    # provides accurate status updates.
    # ------------------------------------------------------------------------------    
    Scenario: Feature 05 - Test 1 - Export Query results multiple times 
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 05 - Test 1"
        Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I click the option "Query" from the Create New pop up
        Then  I wait for the page to be properly rendered
        When  I click the tab "FILTERS"
		When  I delete the default filter when creating a query
        And   I click the button "Run" on the current page
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I click the button "Select Receipts" on the current page
        And   I select receipt #1 from the query results with no grouping
        And   I select receipt #2 from the query results with no grouping
        And   I click the button "Export" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I click the button "Select Receipts" on the current page
        And   I select receipt #1 from the query results with no grouping
        And   I select receipt #2 from the query results with no grouping
        And   I select receipt #3 from the query results with no grouping
        And   I select receipt #4 from the query results with no grouping
        And   I select receipt #5 from the query results with no grouping
        And   I select receipt #6 from the query results with no grouping
        And   I select receipt #7 from the query results with no grouping
        And   I select receipt #8 from the query results with no grouping
        And   I select receipt #9 from the query results with no grouping
        And   I select receipt #10 from the query results with no grouping
        And   I click the button "Export" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        When  I change the download type from "Full Grid" to "Selected Receipts"
        And   I click the button "Select Receipts" on the current page
        And   I select receipt #1 from the query results with no grouping
        And   I select receipt #2 from the query results with no grouping
        And   I select receipt #3 from the query results with no grouping
        And   I select receipt #4 from the query results with no grouping
        And   I select receipt #5 from the query results with no grouping
        And   I select receipt #6 from the query results with no grouping
        And   I select receipt #7 from the query results with no grouping
        And   I select receipt #8 from the query results with no grouping
        And   I select receipt #9 from the query results with no grouping
        And   I select receipt #10 from the query results with no grouping
        And   I click the button "Export" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        Then  I wait on the dialog container to be displayed
        When  I change the download format from "PDF" to "Excel"
        And   I click the button "Download" on the current page
        And   I pause for 3000ms
        And   I open the Task Manager feature
        And   I verify the Task Manager is open
        And   I pause for 30000ms
        Then  I expect not to find the message "PDF is currently being generated."
        Then  I expect not to find the message "Exporting to Excel file."
