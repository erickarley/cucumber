Feature: Manual Hierarchy Tests
    As a Developer of Manual Hierachy
    I want to automate testing of the Manual Hierachy Acceptance Criteria
    so that we can be made aware of the Manual Hierachy feature no longer meets the Acceptance Criteria
        
    Background:
        Given   I am on the reporting page "/reporting"

    @Working @develop @18452
    Scenario: The Manual Hierachy Expandable-List is displayed
        Then    I expect that element "#sidebar-settings" is displayed

    @Working @develop @18452 @TC001
    Scenario: TC001 Save Hierarchy without Name
        Given   The Manual Hierarchy dialog is on open
        And     I click on the button "#saveHierarchy"
        Then    When I try to create a hierarchy I expect a overlay message with "Error" as title and with "Please specify a hierarchy name." as a message

    @Working @develop @18452 @TC005
    Scenario: TC005 Save Hierarchy without Description
        Given   The Manual Hierarchy dialog is on open
        And     I set the "input" hierachy "Name" to "Automation testing -Manual Hierarchy"
        And     I click on the button "#saveHierarchy"
        Then    I expect the loading overlay to appear
        Then    I wait on element "#saveNewHierarchy" to be displayed

    @Working @develop @18452 @TC007
    Scenario: TC007 Delete Hierarchy
        When  I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When  I delete all the hierarchies containing the name "Automation testing -Manual Hierarchy"

    @Working @develop @18452 @TC004
    Scenario: TC004 Save Hierarchy with Description
        Given   The Manual Hierarchy dialog is on open
        And     I set the "input" hierachy "Name" to "Automation testing -Manual Hierarchy"
        And     I set the "textarea" hierachy "Description" to "Automation testing -Description"
        And     I click on the button "#saveHierarchy"
        Then    I expect the loading overlay to appear
        Then    I wait on element "#saveNewHierarchy" to be displayed

    @Working @develop @18452 @TC002
    Scenario: TC002 Save Hierarchy with Duplicate Name
        Given   The Manual Hierarchy dialog is on open
        And     I set the "input" hierachy "Name" to "Automation testing -Manual Hierarchy"
        And     I click on the button "#saveHierarchy"
        Then    I expect the loading overlay to appear
        Then    When I try to create a hierarchy I expect a overlay message with "Unique Hierarchy Name Required" as title and with "There is an existing hierarchy with the same name. Please specify a new hierarchy name." as a message

    @Working @develop @18452 @TC006
    Scenario: TC006 Save New Hierarchy
        When    I select "Settings" from the navigation menu
        And     I open the "Manage Hierarchies" link from the Settings page
        Then    I wait for the page to be properly rendered
        Then    I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When    I edit the hierarchy name "Automation testing -Manual Hierarchy"
        Then    I wait for the page to be properly rendered
        And     I click on the button "#saveNewHierarchy"
        Then    I wait for the page to be properly rendered
        Then    I expect that element "#Name" contains the text "Automation testing -Manual Hierarchy (1)"

    @Working @develop @18452 @TC008
    Scenario: TC008 Edit Hierarchy Name
        When    I select "Settings" from the navigation menu
        And     I open the "Manage Hierarchies" link from the Settings page
        Then    I wait for the page to be properly rendered
        Then    I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When    I edit the hierarchy name "Automation testing -Manual Hierarchy (1)"
        Then    I wait for the page to be properly rendered
        And     I set the "input" hierachy "Name" to "Automation testing -Manual Hierarchy-Overriten"
        And     I click on the button "#saveHierarchy"
        Then    When I try to override a hierarchy I expect a overlay message with "Save Confirmation" as title and with "Saving this hierarchy will overwrite the existing hierarchy." as a message
        Then    I wait for the page to be properly rendered
        And     I click on the button "#obConfirmButtonOK"
        Then    I expect the loading overlay to appear

    @Working @develop @18452 @TC037
    Scenario: TC037 Add or Delete node Aggregation level
        When    I add "Aggregation level - 1" as aggregation level in a new Manual Hierarchy
        And     I click on the button "#saveHierarchy"
        Then    I expect the loading overlay to appear