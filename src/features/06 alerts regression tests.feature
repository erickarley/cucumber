Feature: Test the Alerts feature
    As a developer
    I want to be able to test the Alerts Functionality
    
    @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates navigation to the Alerts page and ensures 
    # the page renders correctly with the expected title.
    #
    # Purpose:
    # - Validate navigation to the Alerts page from the main menu.
    # - Confirm that the page loads fully without errors.
    # - Verify the page title matches "Alerts".
    #
    # Features Covered:
    # - Alerts navigation
    # - Page rendering
    # - Title verification
    #
    # Application Context:
    # The Alerts page is a critical entry point for monitoring system 
    # notifications and issues. Ensuring proper rendering and navigation 
    # establishes trust in the system’s ability to manage alerts.
    # ------------------------------------------------------------------------------
   Scenario: Feature 06 - Test 1 - Test Alerts Page
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 06 - Test 1 - Alerts page"
        Then  I wait for the page to be properly rendered

        # --- Navigate to Alerts page ---
        When  I select "Alerts" from the navigation menu
        And   I pause for 3000ms
        Then  I wait for the page to be properly rendered

        # --- Validation ---
        Then  I expect that the title is "Alerts"

    @Working @Alert2
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the ability to create a new alert from query results 
    # within the application.
    #
    # Purpose:
    # - Ensure that Quick Query can be launched and executed.
    # - Verify that an alert can be created from selected receipts in the query results.
    # - Confirm that alert details (name, visibility, roles) can be set and saved.
    # - Validate that the newly created alert appears in the "Open" filter list.
    #
    # Features Covered:
    # - Quick Query execution
    # - Create Alert action
    # - Alert configuration (name, visibility, roles)
    # - Alerts page filtering
    #
    # Application Context:
    # Alerts provide a mechanism to monitor and act on critical business events. 
    # Being able to create alerts reliably from query results is fundamental 
    # for operational monitoring and business workflows.
    # ------------------------------------------------------------------------------
    Scenario Outline: Feature 06 - Test 2 - Create Alert
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 06 - Test 2 - Create Alert"
        Then  I wait for the page to be properly rendered

        # --- Open Quick Query ---
        When  I click on the top right action called "Quick Query"
        And   I select "POS Transactions" from the sub action menu
        Then  I wait for the page to be properly rendered
        Then  I expect a new window has been opened
        And   I pause for 3000ms
        When  I focus the last opened window
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered

        # --- Run Query ---
        And   I click the button "Run" on the current page
        Then  I wait on the overlay not to be displayed  

        # --- Create Alert from Query Results ---
        When  I click on the top right action called "Create Alert"
        Then  I wait for the application to be ready
        And   I select receipt #1 from the query results with no grouping
        Then  I wait for the application to be ready
        And   I select receipt #2 from the query results with no grouping
        Then  I wait for the application to be ready
        And   I click the button "Create Alert" on the current page
        Then  I wait for the application to be ready

        # --- Alert Details ---
        When  I set the name to the Alert to <alertName>
        Then  I wait on the dialog container to be displayed
        When  I click the radio button "Public"
        # And   I choose the items "Admin" from the Roles list
        When  I click the button "Save" on the current page
        Then  I wait for the page to be properly rendered

        # --- Verify Alert Window ---
        Then  I expect a new window has been opened
        And   I pause for 3000ms
        When  I focus the last opened window
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I click on the "Open" filter for Alerts

    Examples:
        | alertName          |
        | "Automation Alert" |

    @Working @Alert3
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the review process of alerts, ensuring that an open 
    # alert can be located, expanded, and properly closed with the correct cause 
    # and resolution.
    #
    # Purpose:
    # - Verify that the Alerts page loads and displays correctly.
    # - Confirm that filtering by "Open" status shows open alerts.
    # - Ensure the first alert in the list can be opened and expanded.
    # - Validate that closing an alert updates the Closed Alerts count accordingly.
    #
    # Features Covered:
    # - Alerts page navigation
    # - Filtering by status
    # - Opening alerts and expanding groups
    # - Closing an alert with a cause and resolution
    #
    # Application Context:
    # Alerts are a key monitoring mechanism. Being able to review, expand, and close 
    # alerts ensures that users can manage incident workflows and track resolution 
    # statuses accurately.
    # ------------------------------------------------------------------------------  
    Scenario: Feature 06 - Test 3 - Review the Alert
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 06 - Test 3 - Review the Alert"
        Then  I wait for the page to be properly rendered

        # --- Navigate to Alerts Page ---
        When  I select "Alerts" from the navigation menu
        And   I pause for 3000ms
        Then  I wait for the page to be properly rendered
        Then  I expect that the title is "Alerts"

        # --- Filter and Open First Alert ---
        When  I filter the alerts by the "Status" dropdown and set it to "Open"
        And   I open the item #1 from the listed results on the table
        Then  I wait for the page to be properly rendered

        # --- Expand Alert Group ---
        And   I click on the "Open" filter for Alerts
        Then  I wait for the page to be properly rendered
        And   I open the alert group row #1
        Then  I wait for the page to be properly rendered

        # --- Validate Closing Alert ---
        Then  I expect that closing this alert with cause "Technical Issue" and resolution "No Issue" increases the Closed Alerts

    @Working @Alert4
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the complete lifecycle of creating and closing an alert 
    # from query results.
    #
    # Purpose:
    # - Verify that a Quick Query can be executed successfully.
    # - Confirm that an alert can be created from query results by selecting receipts.
    # - Ensure the alert properties (name, visibility) can be defined and saved.
    # - Validate that the newly created alert appears and can be closed with a cause 
    #   and resolution, increasing the Closed Alerts count.
    #
    # Features Covered:
    # - Quick Query execution
    # - Alert creation from receipts
    # - Alert property configuration
    # - Closing alerts
    #
    # Application Context:
    # Alerts are critical for monitoring exceptions in business processes. This 
    # scenario ensures that users can quickly create alerts from transaction data 
    # and then manage them through closure, maintaining data integrity and 
    # workflow continuity.
    # ------------------------------------------------------------------------------
    Scenario Outline: Feature 06 - Test 4 - Create and Close Alert
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 06 - Test 4 - Create and Close Alert"
        Then  I wait for the page to be properly rendered
        And   I pause for 3000ms

        # --- Open Quick Query ---
        When  I click on the top right action called "Quick Query"
        And   I select "POS Transactions" from the sub action menu
        Then  I wait for the page to be properly rendered
        Then  I expect a new window has been opened
        And   I pause for 3000ms
        When  I focus the last opened window
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered

        # --- Run Query ---
        And   I click the button "Run" on the current page
        Then  I wait for the page to be properly rendered

        # --- Create Alert from Receipts ---
        When  I click on the top right action called "Create Alert"
        And   I pause for 2000ms
        And   I select receipt #1 from the query results with no grouping
        And   I pause for 2000ms
        And   I select receipt #2 from the query results with no grouping
        And   I pause for 2000ms
        And   I click the button "Create Alert" on the current page
        And   I pause for 2000ms

        # --- Define Alert Properties ---
        When  I set the name to the Alert to <alertName>
        Then  I wait on the dialog container to be displayed
        When  I click the radio button "Public"
        # And   I choose the items "Admin" from the Roles list
        When  I click the button "Save" on the current page
        Then  I wait for the page to be properly rendered

        # --- Verify Alert Opens ---
        Then  I expect a new window has been opened
        And   I pause for 3000ms
        When  I focus the last opened window
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered

        # --- Close the Alert ---
        And   I click on the "Open" filter for Alerts
        Then  I wait for the page to be properly rendered
        And   I open the alert group row #1
        Then  I wait for the page to be properly rendered
        Then  I expect that closing this alert with cause "Technical Issue" and resolution "No Issue" increases the Closed Alerts

    Examples:
        | alertName          |
        | "Automation Alert" |

    @Working @Alert5
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates the functionality of reopening a previously closed 
    # alert from the Alerts page.
    #
    # Purpose:
    # - Ensure navigation to the Alerts page works correctly.
    # - Confirm that closed alerts can be located and expanded.
    # - Validate that a closed alert can be reopened with a note.
    # - Verify that reopening the alert increases the Open Alerts count.
    #
    # Features Covered:
    # - Alerts filtering by "Closed"
    # - Opening and expanding alert details
    # - Reopening alerts with a note
    # - Validation of alert count changes
    #
    # Application Context:
    # Reopening alerts is critical when issues previously considered resolved need 
    # further investigation or correction. This ensures the alert workflow supports 
    # iterative investigation without data loss.
    # ------------------------------------------------------------------------------
    Scenario: Feature 06 - Test 5 - Test Reopen Alerts
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 06 - Test 5 - Test Reopen Alerts"
        Then  I wait for the page to be properly rendered

        # --- Navigate to Alerts page ---
        When  I select "Alerts" from the navigation menu
        And   I pause for 3000ms
        Then  I wait for the page to be properly rendered
        Then  I expect that the title is "Alerts"

        # --- Locate a Closed Alert ---
        When  I filter the alerts by the "Status" dropdown and set it to "Closed"
        And   I open the item #1 from the listed results on the table
        Then  I wait for the page to be properly rendered
        And   I click on the "Closed" filter for Alerts
        Then  I wait for the page to be properly rendered
        And   I open the alert group row #1
        Then  I wait for the page to be properly rendered

        # --- Reopen the Alert ---
        When  I change the status of the alert to "Reopen"
        Then  I wait for the page to be properly rendered
        When  I capture the number of Open Alerts
        And   I reopen the alert with the following note "Automation reopen"
        And   I pause for 5000ms

        # --- Validation ---
        Then  I expect the number of Open Alerts has been increased
        
    @Working @Alert6
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates that attempting to close an alert but canceling the 
    # operation does not affect the number of Open Alerts.
    #
    # Purpose:
    # - Ensure navigation to the Alerts page works correctly.
    # - Confirm that an alert can be opened and expanded.
    # - Validate that attempting to close an alert without completing the process 
    #   leaves the alert count unchanged.
    #
    # Features Covered:
    # - Alerts navigation
    # - Alert group expansion
    # - Attempted status change with cancellation
    # - Open Alerts count stability
    #
    # Application Context:
    # In real workflows, users may mistakenly initiate a close action but cancel it 
    # before completion. The system must safeguard alert data integrity and ensure 
    # no unintended state change occurs.
    # ------------------------------------------------------------------------------
Scenario: Feature 06 - Test 6 - Cancel close alert
    Scenario: Feature 06 - Test 6 - Cancel close alert
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 06 - Test 6 - Cancel close alert"
        Then  I wait for the page to be properly rendered

        # --- Navigate to Alerts page ---
        When  I select "Alerts" from the navigation menu
        And   I pause for 3000ms
        Then  I wait for the page to be properly rendered
        Then  I expect that the title is "Alerts"

        # --- Open the first alert ---
        And   I open the item #1 from the listed results on the table
        Then  I wait for the page to be properly rendered
        And   I click on the "Open" filter for Alerts
        Then  I wait for the page to be properly rendered
        And   I open the alert group row #1
        Then  I wait for the page to be properly rendered

        # --- Attempt to close but cancel ---
        When  I change the status of the alert to "Closed"
        When  I capture the number of Open Alerts
        And   I pause for 10000ms

        # --- Validation ---
        Then  I expect the number of Open Alerts has been not changed
