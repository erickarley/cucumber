Feature: Case Management Tests
    As a Developer of Case Management
    I want to automate testing of the Case Management Acceptance Criteria
    so that we can be made aware of the Case Management feature no longer meets the Acceptance Criteria

    Background:
        # Given   I am on the reporting page "/reporting"
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        
    @Working
    Scenario: The Case Management Expandable-List is displayed
        Then    I expect that element "#sidebar-acm-list" is displayed

    @Working
    Scenario: The Case Management Create New Case List-Item is displayed
        When    I click on the element "#sidebar-acm-list"
        Then    I pause for 500ms
        And     I expect that element "#acm-create" is displayed

    @Working
    Scenario: The Case Management Create New Case List-Item launches Acm Dialog to Create Tab
        When    I click on the element "#acm-create"
        And     I wait on element "#acm-dialog" for 10000ms to be displayed
        And     I wait on element "md-tab-item.acm-create-tab" for 1000ms to be displayed
        Then    I expect that element "md-tab-item.acm-create-tab" has the class "md-active"

    @Working
    Scenario: The Case Management dialog has the title "Agilence Case Management"
        Given   The Case Management dialog is on the "create" tab
        Then    I expect that container "#acm-dialog md-toolbar h1" contains the text "Agilence Case Management"

    @Working
    Scenario: The Case Management dialog's X button closes the dialog
        Given   The Case Management dialog is on the "create" tab
        When    I click on the element "#acm-close"
        And     I wait on element "#acm-dialog" for 1000ms to not be displayed
        Then    I expect that element "#acm-dialog" is not displayed

    @Working
    Scenario: The Case Management dialog has the Create New Case tab
        Given   The Case Management dialog is on the "create" tab
        Then    I expect that container "md-tab-item.acm-create-tab" contains the text "CREATE NEW CASE"

    @Working
    Scenario: The Case Management dialog has the Search Existing Cases tab
        Given   The Case Management dialog is on the "create" tab
        Then    I expect that container "md-tab-item.acm-search-tab" contains the text "SEARCH EXISTING CASES"

    @Working
    Scenario: The Case Management Create New Case tab has a required Project selector
        Given   The Case Management dialog is on the "create" tab
        Then    I expect that element "#acm-project" is displayed
        And     I expect that element "#acm-project md-select" has the attribute "required"

    @Working
    Scenario: The Case Management Create New Case tab has a required Issue Type selector
        Given   The Case Management dialog is on the "create" tab
        Then    I expect that element "#acm-issuetype" is displayed
        And     I expect that element "#acm-issuetype md-select" has the attribute "required"

    @Working    
    Scenario: The Case Management Create New Case tab has a required Summary field
        Given   The Case Management dialog is on the "create" tab
        And     The Case Management Issue Type is set to "Risk Management - QA"
        Then    I expect that element "#acm-summary input" has the attribute "required"

    @Working
    Scenario: The Case Management Create New Case tab's Create button is disabled without a summary
        Given   The Case Management dialog is on the "create" tab
        And     The Case Management Issue Type is set to "Risk Management - QA"
        When    I clear the inputfield "#acm-summary input"
        Then    I expect that element "#acm-summary input" has the class "ng-invalid"
        And     I expect that element "#acm-submit-create" has the attribute "disabled"

    @Working
    Scenario: The Case Management Create New Case tab's Create button is enabled with a summary
        Given   The Case Management dialog is on the "create" tab
        And     The Case Management Issue Type is set to "Risk Management - QA"
        When    I set "My Automated Issue" to the inputfield "md-content.createTab #acm-summary input"
        Then    I expect that element "#acm-summary input" has the class "ng-valid"
        And     I expect that element "#acm-submit-create" does not have the attribute "disabled"

    @Working
    Scenario: The Case Management Create New Case action 
        Given   The Case Management dialog is on the "create" tab
        And     The Case Management Issue Type is set to "Risk Management - QA"
        When    I set "My Automated Issue" to the inputfield "md-content.createTab #acm-summary input"
        And     I click on the element "#acm-submit-create"
        And     I wait on element "#acm-dialog" for 5000ms to not be displayed
        And     I open the Task Manager feature
        And     I verify the Task Manager is open
        Then    I expect the Task Manager Task "My Automated Issue" does not have details "My Automated Issue"
        And     I expect the Task Manager Task "My Automated Issue" has message "Your case is being created in Agilence Case Management."
        And     I expect the Task Manager Task "My Automated Issue" has category "(Case Create)"
