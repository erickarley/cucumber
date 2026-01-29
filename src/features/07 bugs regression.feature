Feature: Tests behavior of several bugs 
    As a developer
    I want to be able to test if bugs are not reappearing in the code

    @Working
    # ------------------------------------------------------------------------------
    # Summary:
    # This scenario validates that Store Report hierarchy selections 
    # persist correctly after saving and reopening a report.
    #
    # Purpose:
    # - Ensure hierarchy checkbox selections are not lost after reopening.  
    # - Confirm that previous bugs related to hierarchy persistence 
    #   in Store Reports do not reappear.
    #
    # Features Covered:
    # - Store Report creation
    # - Hierarchy configuration
    # - State persistence across save & reload
    #
    # Application Context:
    # Store Reports are frequently reopened by business users for review 
    # and analysis. Bugs in persistence of hierarchy selections can lead 
    # to incorrect reporting, loss of trust in the system, and repeated 
    # manual corrections. This test ensures hierarchy state integrity.
    # ------------------------------------------------------------------------------
    Scenario Outline: Feature 07 - Test 1 - Validate reopening of "Enter A Store" Store reports
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Feature 07 - Test 1"
        Then  I wait for the page to be properly rendered

        # --- Create new report ---
        When  I select "Create New" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I click the option "Report" from the Create New pop up
        Then  I wait for the page to be properly rendered
        And   I set the report name to <reportName>
        And   I select "Store" as the report category
        And   I pause for 3000ms

        # --- Configure hierarchy ---
        When  I click the tab "Hierarchy"
        And   I expand the Hierarchy element called "All"
        And   I click the checkbox for the Hierarchy element called "All"
        And   I click the checkbox for the Hierarchy element called "0002"
        And   I pause for 3000ms

        # --- Save & reopen ---
        When  I click on the top right action called "Save"
        Then  I wait for the page to be properly rendered
        And   I refresh the page
        Then  I wait for the page to be properly rendered

        # --- Validate hierarchy state after reopening ---
        When  I click on the top right action called "Settings"
        Then  I wait for the page to be properly rendered
        Then  I expect the loading overlay to not appear
        When  I click the tab "Hierarchy"
        And   I pause for 3000ms
        And   I expect that hierarchy checkbox "All" is not checked
        And   I expect that hierarchy checkbox "0002" is checked 

    Examples:
        | reportName   |
        | "bug QA-44"  |



