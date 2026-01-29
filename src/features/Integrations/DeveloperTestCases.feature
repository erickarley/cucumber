Feature: Developer Test Cases
    As a Developer of the new TLOG parsers and AMS converters
    I want to automate testing of the Developer test cases
    so that we can be made aware of the parser or converter not meeting Acceptance Criteria

    Background:
        Given   I am creating a query

    @TC3791
    @Working
    Scenario: Discounts on Voided Items are Tagged as Voided
        When I click on the element "//ag-search-selection-tab//ag-md-icon[@icon='ag_querySearchType_POS_Lines']"
        When I click the tab "FILTERS"
        And I click on the element "//span[text()='Delete']"
        And I set the filter for the value tab with "POS Lines" Category, "Void Item" field with option "True"
        And I click on the element "//button[contains(.,'Followed By')][contains(@ng-show, 'item')]"
        And I set the filter for the value tab with "POS Lines" Category, "Void Discount" field with option "True"
        And I drag element "//ag-simple-filter-token/span[text()='2']" to element "//*[@id='tab-content-1']/div/div/ag-filter-tab/ag-advanced-builder//ag-bracket-filter-token[@index=7]"
        And I click the button "+ NOT" on the current page
        And I drag element "//div[text()='NOT']" to element "//*[@id='tab-content-1']/div/div/ag-filter-tab/ag-advanced-builder//ag-bracket-filter-token[@index=3]"
        And I click the button for the filter "Add New Filter"
        And I compare the filter "Item Amount" for category "POS Lines" with filter "Item Net Price" for category "POS Lines" using operator "<>"
        And I click the button "Save" on the current page
        And I click the button "Run" on the current page
        Then I expect that element "//div[@class='secondaryToolbar']//span[contains(text(),'Results: 0')]" becomes displayed

    @TC3778
    @Working
    Scenario: Empty Transactions
        When I click the tab "FILTERS"
        And I click on the element "//span[text()='Delete']"
        And I set the filter for the value tab with "POS Transactions" Category, "Transaction Type" field with option "Normal"
        And I create a new filter for the value tab with "POS Transactions" Category, "Item Count" field with operator "=" and value of "0"
        And I create a new filter for the value tab with "POS Transactions" Category, "Order Total" field with operator "=" and value of "0"
        And I set the filter for the value tab with "POS Transactions" Category, "Voided Order" field with option "False"
        And I create a new filter for the value tab with "POS Transactions" Category, "Voids" field with operator "=" and value of "0"
        And I set the filter for the value tab with "POS Transactions" Category, "Suspended" field with option "False"
        And I create a new filter for the value tab with "POS Transactions" Category, "Refund/Return Count" field with operator "=" and value of "0"
        And I click the button "Run" on the current page
        Then I expect that element "//div[@class='secondaryToolbar']//span[contains(text(),'Results: 0')]" becomes displayed
        
    @TC3784
    @Working
    Scenario: ##LOOKUP## Doesn't Exist as a Description
        When I click on the element "//ag-search-selection-tab//ag-md-icon[@icon='ag_querySearchType_POS_Lines']"
        And I click the tab "FILTERS"
        And I click on the element "//span[text()='Delete']"
        And I create a new filter for the value tab with "POS Lines" Category, "Description" field with operator "CONTAINS" and value of "##"
        And I click the button "Run" on the current page
        Then I expect that element "//div[@class='secondaryToolbar']//span[contains(text(),'Results: 0')]" becomes displayed