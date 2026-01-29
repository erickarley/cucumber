Feature: Followed By Summation Tests
    As a Developer of the Followed By measures
    I want to automate testing of the Measure Builder Acceptance Criteria
    so that we can be made aware of the Measure Builder feature no longer meets the Acceptance Criteria

    Background:
        Given   the user navigates to the designated environment
        Then    I wait for the page to be properly rendered
        # And     I am on the reporting page "/reporting/settings"
        When    I select "Queries" from the navigation menu
        Then    I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I click on the link "Query"
        Then  I wait for the page to be properly rendered
        # Given   I am creating a followed by measure

    @Working
    Scenario: Adding Followed By operator automatically adds or removes the equivalent Following Transaction summary columns
        When I click the tab "FILTERS"
        And I click the button for the filter "Add New Filter"
        And I set the filter for the value tab with "POS Transactions" Category, "Order Total" field with operator ">" and amount value of "1"
        And   I wait for the page to be properly rendered
        And I click the span button "Save" on the current page
        And I click the button "Followed By" on the current page
        And I pause for 1000ms
        # And I click the tab "Summation"
        # And I pause for 1000ms
        # Then I expect the defaulted summary columns within the "Summation" tab to be automatically added with the equivalent Following Transaction columns
        # And I click the tab "FILTERS"
        # When I click on the element "//ag-md-icon[@icon='cancel']"
        # And I click the tab "Summation"
        # Then I expect the added followed by summary columns to be removed
   

    @Working
    Scenario: Removing Following Transaction display column automatically removes the equivalent summary column
        When I click the tab "FILTERS"
        And I click the button for the filter "Add New Filter"
        And I set the filter for the value tab with "POS Transactions" Category, "Order Total" field with operator ">" and amount value of "1"
        And I click the span button "Save" on the current page
        And I click the button "Followed By" on the current page
        And I pause for 1000ms
        And I click the tab "DISPLAY COLUMNS"
        # And I pause for 1000ms
        # When I click on the element "//div/span[text()='Item Count']"
        # And I click the tab "Summation"
        # And I pause for 3000ms
        # Then I expect summary column "Item Count" to be removed   

    @Working
    Scenario: Removing Following Transaction display column automatically removes the equivalent summary column
        When I click the tab "FILTERS"
        And I click the button for the filter "Add New Filter"
        And I set the filter for the value tab with "POS Transactions" Category, "Order Total" field with operator ">" and amount value of "1"
        And I click the span button "Save" on the current page
        And I click the button "Followed By" on the current page
        And I pause for 1000ms
        And I click the tab "DISPLAY COLUMNS"
        And I pause for 1000ms
        And I select "POS Transactions (Following Transaction)" option from category
        And I pause for 1000ms
        When I click on the element "//div/span[text()='Item Count']"
        # And I click the tab "Summation"
        # And I pause for 3000ms
        # Then I expect summary column "Item Count (Following Transaction)" to be removed   

    @Working
    Scenario: Save Measure with POS Transactions (Following Transaction) (Compare Items)
        When I click the tab "FILTERS"
        And I click the button for the filter "Add New Filter"
        And I set the filter for the value tab with "POS Transactions" Category, "Order Total" field with operator ">" and amount value of "1"
        And I click the span button "Save" on the current page
        And I click the button for the filter "Add New Filter"
        And I set the filter for the value tab with "POS Transactions" Category, "Item Count" field with operator ">" and amount value of "1"
        And I click the span button "Save" on the current page
        And I click the button "Followed By" on the current page
        And I drag element "//ag-simple-filter-token/span[text()='2']" to element "//*[@id='tab-content-1']/div/div/ag-filter-tab/ag-advanced-builder/div/div[10]/ag-bracket-filter-token/div"
        And I click the button "Compare Items" on the current page
        And I click the button "Other Items" on the current page
        And I click the button "Not Rerung" on the current page
        And I set "30" to the inputfield "//input[@name='percentOfItems']"
        And I click the button "Same Cashier" on the current page
        And I click the button "Save" on the current page
        And I set "//input[@name='name']" input to random guid
        # And I click the tab "Summation"
        # And I set the summation tab with dimension "Store", summary columns "Item Count", historical data "Off" and "90" days to backfill
        # And I click on the element "//ag-md-icon[@icon='save']"


    @Working
    Scenario: Save Measure with POS Transactions (Following Transaction) (Filter Compare tab)
        When I click the tab "FILTERS"
        And I click the button for the filter "Add New Filter"
        And I set the filter for the value tab with "POS Transactions" Category, "Order Total" field with operator ">" and amount value of "1"
        And I click the span button "Save" on the current page
        And I click the button "Followed By" on the current page
        And I click the button for the filter "Add New Filter"
        And I set the filter for the value tab with "POS Transactions" Category, "Item Count" field with operator ">" and amount value of "1"
        And I click the tab "Compare"
        And I set "40" to the inputfield "//input[@name='percentof']"
        And I click on the element "//span[text()='Duration']"
        And I pause for 1000ms
        And I click the span button "Save" on the current page
        And I drag element "//ag-simple-filter-token/span[text()='2']" to element "//*[@id='tab-content-1']/div/div/ag-filter-tab/ag-advanced-builder/div/div[8]/ag-bracket-filter-token"
        And I set "//input[@name='name']" input to random guid
        # And I click the tab "Summation"
        # And I set the summation tab with dimension "Store", summary columns "Item Count", historical data "Off" and "90" days to backfill
        # And I click on the element "//ag-md-icon[@icon='save']"

