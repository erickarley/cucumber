Feature: Followed By Summation Tests
    As a Developer of the Followed By measures
    I want to automate testing of the Measure Builder Acceptance Criteria
    so that we can be made aware of the Measure Builder feature no longer meets the Acceptance Criteria

    Background:
        Given   I am on the reporting page "/reporting"

    @activedevelopment
    Scenario: Verify that the 'Followed By Measure' exists and has the appropriate summation measures.  If this fails all other test scenarios will fail in this feature
        When  I am on the reporting page "/reporting/Settings/Measures"
        And   I wait for the page to be properly rendered
        And   I open the measure "Followed By Measure" from the Measures list
        And   I wait for the page to be properly rendered
        And   I click the tab "Summation" 
        Then  I expect all followed by measures to be available and selected

    Scenario: Display followed by measure summary value within report
        When  I select "Create New" from the navigation menu
        And   I click the option "Report" from the Create New pop up
        Then  I wait for the page to be properly rendered
        When  I click on the element "//ag-md-icon[@icon='StoreMapping']"
        And   I click the tab "Data Elements" 
        And   I set "Followed By Measure" to the inputfield "//*[@id='measure-query-selection-area']/div/div[1]/span/input"
        And   I select the data element "Followed By Measure"
        Then  I expect all followed by measures to be available

    Scenario: Add a measure summary value to the report grid
        When  I select "Create New" from the navigation menu
        And   I click the option "Report" from the Create New pop up
        Then  I wait for the page to be properly rendered
        When  I click on the element "//ag-md-icon[@icon='StoreMapping']"
        And   I click the tab "Data Elements" 
        And   I set "Followed By Measure" to the inputfield "//*[@id='measure-query-selection-area']/div/div[1]/span/input"
        And   I select the data element "Followed By Measure"
        And   I add the single data element "Order Total (Following Transaction) ($)" to the report 
        Then  I expect column name "Followed By Measure (Order Total) (Following Transaction) ($)" to appear in the report
        And   I click the tab "Properties" 
        And   I click the button "Add" on the current page
        And   I select the initial sort of the report based in indicator "Followed By Measure (Order Total) (Following Transaction) ($)"
        Then  I expect the first initial sort option to be "Followed By Measure (Order Total) (Following Transaction) ($)"
        And   I click the tab "Graph Properties" 
        Then  I expect the first graphable column to be "Followed By Measure (Order Total) (Following Transaction) ($)"


    Scenario: Add all measure summary values to the report grid
        When  I select "Create New" from the navigation menu
        And   I click the option "Report" from the Create New pop up
        Then  I wait for the page to be properly rendered
        When  I click on the element "//ag-md-icon[@icon='StoreMapping']"
        And   I click the tab "Data Elements" 
        And   I set "Followed By Measure" to the inputfield "//*[@id='measure-query-selection-area']/div/div[1]/span/input"
        And   I select the data element "Followed By Measure"
        And   I add the data element "Followed By Measure" to the report 
        Then  I expect all followed by column names to appear in the report
        And   I click the tab "Properties" 
        And   I click on the element "//div/ng-form/div/div/div/ag-addable-dropdown/ng-form/div/md-content/button"
        And   I click on the element "//div/ng-form/div/div/div/ag-addable-dropdown/ng-form/div/div[2]/md-select[1]"
        Then  I expect all followed by column names to appear in report initial sort
        And   I click the tab "Graph Properties" 
# Have to do this twice for some unknown reason        
        And   I click the tab "Graph Properties" 
        Then  I expect all followed by column names to appear as graphable in the report
    

    Scenario: Display measure summary value within rKPI
        When  I select "Create New" from the navigation menu
        And   I click the option "Report" from the Create New pop up
        Then  I wait for the page to be properly rendered
        When  I click on the element "//ag-md-icon[@icon='StoreMapping']"
        And   I click the tab "Data Elements" 
        And   I select the data element measure "KPIs - Report"
        And   I click on the element "//button[@title='Create KPI']"
        And   I pause for 500ms
        And   I set "Followed By Measure" to the inputfield "//input[@ng-model='itemListWithSearchController.searchBoxValue']"
        And   I pause for 500ms
        And   I select kpi data element "Followed By Measure"
        Then  I expect all followed by measures to be available

    Scenario: Display measure summary value within rKPI
        Given  I am on the reporting page "/reporting/Settings/MasterKpi/Create"
        Then  I wait for the page to be properly rendered
        And   I set "Followed By Measure" to the inputfield "//input[@ng-model='itemListWithSearchController.searchBoxValue']"
        And   I select kpi data element "Followed By Measure"
        Then  I expect all followed by measures to be available
        And   I pause for 5000ms
