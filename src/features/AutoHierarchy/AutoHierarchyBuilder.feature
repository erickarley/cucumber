Feature: Auto Hierarchy Builder Tests
    As a Developer of the Auto Hierarchy Builder
    I want to automate testing of the Auto Hierarchy Builder Acceptance Criteria
    so that we can be made aware of the Auto Hierarchy Builder feature no longer meets the Acceptance Criteria

    @18454
    @Working
    Scenario: The Create Hierarchies button is available
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu

        Then    I expect that element "button.addButton" is displayed

    @18454
    @Working
    Scenario: The Create Hierarchy Dialog is displayed
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        When    I click on the element "button.addButton"
        Then    I pause for 500ms
        And     I expect that element "#createNew" is displayed

    @18454
    @Working
    Scenario: The Create New AutoHierarchy button navigates to the Auto Hierarchy Builder
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        Given   The Create Hierarchy dialog is open
        When    I click on the element "#createNew a"
        Then    I expect the url to contain "Settings/Hierarchies/AutoHierarchyBuilder/Create"

    @18454 @TC001
    @Working
    Scenario: Unable to Save without Name
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When    I click on the button "//*[@title='Create New']"
        And     I click on the element "#create-dialog-hierachy-auto"
        # And     I click on the add icon next to "Manage Hierarchies" on the Settings page
        # Given   I am on the reporting page "/reporting/Settings/Hierarchies/AutoHierarchyBuilder/Create"
        # And     I click on the link "Auto Generated Hierarchy"
        When    I set "" to the inputfield "#hierarchyName"
        # Then    I wait on element "#dataSetAggLevels button" for 500ms to be enabled
        Then    I expect the element "//*[@title='Save']" to be disabled
    
    @18454 @TC002
    @Working
    Scenario: Unable to Save with Only Base Aggregation Level
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And     I open the "Manage Hierarchies" link from the Settings page
        And     I wait for the page to be properly rendered
        Then    I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When    I click on the button "//*[@title='Create New']"
        And     I click on the element "#create-dialog-hierachy-auto"
        When    I refresh the page 
        When    I set "Hierarchy Name" to the inputfield "#hierarchyName"
        Then    I expect the element "//*[@title='Save']" to be disabled

    @18454 @TC003
    @Working
    Scenario: Unable to Remove Base Aggregation Level
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When    I click on the button "//*[@title='Create New']"
        And     I click on the element "#create-dialog-hierachy-auto"
        When    I refresh the page
        # Then    I wait on element "#dataSetAggLevels button" for 500ms to be enabled
        And   I click the button "Add" on the current page
        Then    I expect that element ".remove" does appear exactly "1" times

    @18454 @TC004
    @Working
    Scenario: Unable to Save when Aggregation Level is Changed
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        And   I wait for the page to be properly rendered
        When    I click on the element "//div[@ng-hide='false']/button[@ng-click[contains(.,'edit')]]"
        When    I select the Hierarchy Aggregation Level with the text as "Department Description" as "Manufacturer"
        Then    I expect the element "//*[@title='Save']" to be disabled
       
    @18454 @TC005
    @Working
    Scenario: Unable to Save when Data Set is Changed
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        And   I wait for the page to be properly rendered
        When    I click on the element "//div[@ng-hide='false']/button[@ng-click[contains(.,'edit')]]"
        When    I select the Hierarchy Data Set as "Employee"
        Then    I expect the element "//*[@title='Save']" to be disabled

    @18454 @TC006
    @Working
    Scenario: Unable to Save and Save New without Aggregation Level Name
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        And   I wait for the page to be properly rendered
        When    I click on the element "//div[@ng-hide='false']/button[@ng-click[contains(.,'edit')]]"
        When    I click on the element "(//div[contains(@class, 'aggregationLevelFieldsContainer')]//input)[1]"
        And     I set "  " to the inputfield "(//div[contains(@class, 'aggregationLevelFieldsContainer')]//input)[1]"
        Then    I expect the element "//*[@title='Save']" to be disabled
        And     I expect the element "//*[@title='Save New']" to be disabled

    @18454 @TC007
    @Working
    Scenario: Unable to Save New without Name
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        And   I wait for the page to be properly rendered
        When    I click on the element "//div[@ng-hide='false']/button[@ng-click[contains(.,'edit')]]"
        When    I set "  " to the inputfield "#hierarchyName"
        # Then    I wait on element "#dataSetAggLevels button" for 500ms to be enabled
        When    I click the button "Add" on the current page
        Then    I expect the element "//*[@title='Save New']" to be disabled
    
    @18454 @TC008
    @Working
    Scenario: Unable to Save New with Only Base Aggregation Level
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        And   I wait for the page to be properly rendered
        When    I click on the element "//div[@ng-hide='false']/button[@ng-click[contains(.,'edit')]]"
        When    I click on every remove element "//div[contains(@class, 'aggregationLevelFieldsContainer')]//button"
        Then    I expect the element "//*[@title='Save New']" to be disabled

    @18454 @TC014
    @Working
    Scenario: Change Data Set Clears Aggregate Levels
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        And   I wait for the page to be properly rendered
        When    I click on the element "//div[@ng-hide='false']/button[@ng-click[contains(.,'edit')]]"
        When    I select the Hierarchy Data Set as "Store"
        Then    I expect that element ".remove" does not exist
       
    @18454 @TC016
    @Working
    Scenario: The Create New AutoHierarchy button navigates to the Auto Hierarchy Builder
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When    I click on the button "//*[@title='Create New']"
        And     I click on the element "#create-dialog-hierachy-auto"
        When    I select the Hierarchy Data Set as "Item"
        Then    I wait on element "#dataSetAggLevels button" for 500ms to be enabled
        When    I click the button "Add" on the current page
        And     I click the button "Add" on the current page
        And     I click the button "Add" on the current page
        And     I click the button "Add" on the current page
        And     I click the button "Add" on the current page
        And     I click the button "Add" on the current page
        And     I click the button "Add" on the current page
        And     I click the button "Add" on the current page
        And     I click the button "Add" on the current page
        Then    I expect the element "//button[.='Add']" to be disabled
        And     I expect that element ".remove" does appear exactly "9" times
        
    @18454 @TC010
    @Working
    Scenario: Unable to Save Hierarchy with Duplicate Name
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Settings" from the navigation menu
        And   I open the "Manage Hierarchies" link from the Settings page
        And   I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Hierarchies" as the current item
        When    I click on the button "//*[@title='Create New']"
        And     I click on the element "#create-dialog-hierachy-auto"
        When    I set "Type - Employee" to the inputfield "#hierarchyName"
        # Then    I wait on element "#dataSetAggLevels button" for 500ms to be enabled
        When    I click the button "Add" on the current page
        And     I click on the button "//*[@title='Save']"
        Then    I expect that element "//md-toast[contains(@class, 'error')]/descendant::span[contains(text(), 'There is an existing hierarchy with the same name. Please specify a new hierarchy name.')]" does appear exactly "1" times