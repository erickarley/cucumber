Feature: Query Builder Followed By Tests
    As a Developer of the Query Builder
    I want to automate testing of the Query Builder Acceptance Criteria
    so that we can be made aware of the Query Builder feature no longer meets the Acceptance Criteria

    Background:
        Given   I am creating a followed by query
        
    @379660 @TC001
    @Working
    Scenario: If the Compare tab is an option, POS Transactions (Following Transaction) should be a Category option in Compare
        When    I click the button for the filter "Add New Filter"
        When    I click on the element "//div[contains(@class, 'list-item')]/descendant::span[contains(text(), 'Cash Back')]"
        And     I pause for 3000ms
        And     I click the tab "Compare"
        Then    I expect the "//*[@class='valueInputContent']//*[@class='labelHeader'][.='Category']/parent::div/md-select" drop down to contain the "POS Transactions (Following Transaction)" option        
    
    @379660 @TC002
    @Working
    Scenario: In the Display Column tab, a category should be added for POS Transactions (Following Transaction)
        When    I click the tab "DISPLAY COLUMNS"
        Then    I expect the "//*[@class='displayColumnEntity']//*[@class='labelHeader'][.='Category']/parent::div/md-select" drop down to contain the "POS Transactions (Following Transaction)" option
    
    @379660 @TC002
    @Working
    Scenario: User can add or remove additional Followed By display columns from the list.
        When    I click the tab "DISPLAY COLUMNS"
        And     I select the "POS Transactions (Following Transaction)" option from the "//*[@class='displayColumnEntity']//*[@class='labelHeader'][.='Category']/parent::div/md-select" drop down
        Then    I expect that element "//th[contains(text(),'Order Total (FollowingTransaction)')]" does appear exactly "1" times
        When    I click on the element "//div[contains(@class,'nounListItem')]//*[.='Order Total']"
        Then    I expect that element "//th[contains(text(),'Order Total (FollowingTransaction)')]" is not displayed
        When    I click on the element "//div[contains(@class,'nounListItem')]//*[.='Order Total']"
        Then    I expect that element "//th[contains(text(),'Order Total (FollowingTransaction)')]" does appear exactly "1" times

    @379660 @TC003
    @Working
    Scenario: Save button is disabled when "Percent of Items" field is empty
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I set "" to the inputfield "//input[@name='percentOfItems']"
        Then    I expect the element "//button[text()='Save']" to be disabled

    @379660 @TC003
    @Working
    Scenario: Save button is enabled when all required fields are met
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I set "100" to the inputfield "//input[@name='percentOfItems']"
        Then    I expect the element "//button[text()='Save']" to be enabled

    @379660 @TC004
    @Working
    Scenario: Only one button can be selected within the "Items to Include" field (excluding Not Rerung/Rerung)
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        And     I expect that element "//*[@id='itemsToInclude']//button[contains(@class, 'radioButtonSelected')]" does appear exactly "1" times
        When    I click the button "Price Check Items" on the current page
        Then    I expect that element "//*[@id='itemsToInclude']//button[contains(@class, 'radioButtonSelected')]" does appear exactly "1" times

    @379660 @TC004
    @Working
    Scenario: Only one button can be selected between Not Rerung/Rerung
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        And     I expect that element "//*[@id='rerungContainer']//button[contains(@class, 'radioButtonSelected')]" does appear exactly "1" times
        When    I click on the element "//*[@id='rerungContainer']//button[.='Rerung']"
        Then    I expect that element "//*[@id='rerungContainer']//button[contains(@class, 'radioButtonSelected')]" does appear exactly "1" times
    
    @379660 @TC004
    @Working
    Scenario: Multiple buttons can be selected within the "Transactions to Include" field
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        And     I expect that element "//*[@id='transactionsToInclude']//button[contains(@class, 'radioButtonSelected')]" does appear exactly "1" times
        When    I click the button "Same Cashier" on the current page
        Then    I expect that element "//*[@id='transactionsToInclude']//button[contains(@class, 'radioButtonSelected')]" does appear exactly "1" times
        When    I click the button "Same Register" on the current page
        Then    I expect that element "//*[@id='transactionsToInclude']//button[contains(@class, 'radioButtonSelected')]" does appear exactly "2" times
        When    I click the button "Same Cashier" on the current page
        Then    I expect that element "//*[@id='transactionsToInclude']//button[contains(@class, 'radioButtonSelected')]" does appear exactly "1" times
    
    @379660 @TC004
    @Working
    Scenario: All values exist within the "Operator" field
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        And     I expect the "//*[contains(@class, 'precentOfItemsOperator')]//md-select" drop down to contain the "Is equal to" option        
        And     I expect the "//*[contains(@class, 'precentOfItemsOperator')]//md-select" drop down to contain the "Is not equal to" option        
        And     I expect the "//*[contains(@class, 'precentOfItemsOperator')]//md-select" drop down to contain the "Is greater than" option        
        And     I expect the "//*[contains(@class, 'precentOfItemsOperator')]//md-select" drop down to contain the "Is greater than or equal to" option        
        And     I expect the "//*[contains(@class, 'precentOfItemsOperator')]//md-select" drop down to contain the "Is less than" option        
        And     I expect the "//*[contains(@class, 'precentOfItemsOperator')]//md-select" drop down to contain the "Is less than or equal to" option        

    @379660 @TC004
    @Working
    Scenario: Minimum number (0) and positive integer validation for "Percent of Items" field
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I set "-" to the inputfield "//input[@name='percentOfItems']"
        Then    I expect the element "//button[text()='Save']" to be disabled
        When    I set "0" to the inputfield "//input[@name='percentOfItems']"
        Then    I expect the element "//button[text()='Save']" to be enabled

    @379660 @TC004
    @Working
    Scenario: Maximum number (100) validation for "Percent of Items" field
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I set "101" to the inputfield "//input[@name='percentOfItems']"
        Then    I expect the element "//button[text()='Save']" to be disabled
        When    I set "100" to the inputfield "//input[@name='percentOfItems']"
        Then    I expect the element "//button[text()='Save']" to be enabled

    @379660 @TC004
    @Working
    Scenario: Whole value validation for "Percent of Items" field
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I set "5.5" to the inputfield "//input[@name='percentOfItems']"
        Then    I expect the "//input[@name='percentOfItems']" input to have the value "55"
        
    @379660 @TC004
    @Working
    Scenario: Character value validation for "Percent of Items" field
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I set "abcdefg" to the inputfield "//input[@name='percentOfItems']"
        Then    I expect the element "//button[text()='Save']" to be disabled
        When    I set "!@#$%^&*()_+" to the inputfield "//input[@name='percentOfItems']"
        Then    I expect the element "//button[text()='Save']" to be disabled
                
    @379660 @TC004
    @Working
    Scenario: Character value validation for "Percent of Items" field
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I set "6" to the inputfield "//input[@name='percentOfItems']"
        When    I pause for 3000ms
        Then    I expect the element "//button[text()='Save']" to be enabled
        When    I press "Backspace"
        When    I pause for 3000ms
        Then    I expect the element "//button[text()='Save']" to be disabled      

    @379660 @TC005
    @Working
    Scenario: Close compare items dialog
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I click on the element "//ag-md-icon[@icon='close']"
        Then    I expect the element "//button[contains(., 'Compare Items')]" to be enabled

    @379660 @TC006
    @Working
    Scenario: Display saved Compare Items in query
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I set "100" to the inputfield "//input[@name='percentOfItems']"
        And     I click on the element "//button[text()='Save']"
        And     I pause for 1000ms
        Then    I expect the element "//button[contains(., 'Compare Items')]" to be disabled
        And     I expect that element "//*[@class='compareItemsHeader']//*[.='Compare Items']" does appear exactly "1" times
        And     I expect that element "//*[@class='link'][.='Edit']" does appear exactly "1" times
        And     I expect that element "//*[@class='link'][.='Delete']" does appear exactly "1" times
        And     I expect that element "//*[@class='itemsToInclude'][contains(.,'Equals 100% Not Rerung Voided Items')]" does appear exactly "1" times
        And     I expect that element "//*[@class='transactionsToInclude'][contains(.,'Same Cashier')]" does appear exactly "1" times

    @379660 @TC006
    @Working
    Scenario: Edit Compare Items
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I set "100" to the inputfield "//input[@name='percentOfItems']"
        And     I click on the element "//button[text()='Save']"
        And     I pause for 1000ms
        Then    I expect the element "//button[contains(., 'Compare Items')]" to be disabled
        And     I expect that element "//*[@class='compareItemsHeader']//*[.='Compare Items']" does appear exactly "1" times
        And     I expect that element "//*[@class='link'][.='Edit']" does appear exactly "1" times
        And     I expect that element "//*[@class='link'][.='Delete']" does appear exactly "1" times
        And     I expect that element "//*[@class='itemsToInclude'][contains(.,'Equals 100% Not Rerung Voided Items')]" does appear exactly "1" times
        And     I expect that element "//*[@class='transactionsToInclude'][contains(.,'Same Cashier')]" does appear exactly "1" times
        When    I click on the element "//*[@class='link'][.='Edit']"
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I click the button "Price Check Items" on the current page     
        And     I click on the element "//button[text()='Save']"
        And     I pause for 1000ms
        Then    I expect that element "//*[@class='itemsToInclude'][contains(.,'Equals 100% Not Rerung Price Check Items')]" does appear exactly "1" times

    @379660 @TC006
    @Working
    Scenario: Delete Compare Items  
        When    I click the button "Compare Items" on the current page
        Then    I expect that element "#compareItemsDialog" does appear exactly "1" times
        When    I set "100" to the inputfield "//input[@name='percentOfItems']"
        And     I click on the element "//button[text()='Save']"
        And     I pause for 1000ms
        Then    I expect the element "//button[contains(., 'Compare Items')]" to be disabled
        And     I expect that element "//*[@class='compareItemsHeader']//*[.='Compare Items']" does appear exactly "1" times
        And     I expect that element "//*[@class='link'][.='Edit']" does appear exactly "1" times
        And     I expect that element "//*[@class='link'][.='Delete']" does appear exactly "1" times
        And     I expect that element "//*[@class='itemsToInclude'][contains(.,'Equals 100% Not Rerung Voided Items')]" does appear exactly "1" times
        And     I expect that element "//*[@class='transactionsToInclude'][contains(.,'Same Cashier')]" does appear exactly "1" times
        When    I click on the element "//*[@class='link'][.='Delete']"
        Then    I expect the element "//button[contains(., 'Compare Items')]" to be enabled
        And     I expect that element "//*[@class='compareItemsHeader']//*[.='Compare Items']" is not displayed

    @379660 @TC007
    @Working
    Scenario: Using Compare Filter
        When    I click the button for the filter "Add New Filter"
        When    I click on the element "//div[contains(@class, 'list-item')]/descendant::span[contains(text(), 'Cash Back')]"
        And     I pause for 1000ms
        And     I click the tab "Compare"
        And     I select the "POS Transactions (Following Transaction)" option from the "//*[@class='valueInputContent']//*[@class='labelHeader'][.='Category']/parent::div/md-select" drop down
        And     I click on the element "//div[contains(@class, 'nounComparisonContainer')]//div[contains(@class, 'list-item')]/descendant::span[text()='Discount Amount']"
        And     I click on the element "//button/span[text()='Save']"        
        And     I pause for 1000ms
        And     I click on the element "//ag-md-icon[@class='delete-btn foreground']"
        Then    I expect that element "//ag-md-icon[@class='delete-btn foreground']" is not displayed
        And     I expect that element "//filter-item//div[@class='displayContainer']//*[contains(text(), 'Cash Back')]" is not displayed
        And     I expect that element "//th[contains(text(),'Discount Amount (FollowingTransaction)')]" is not displayed
        And     I expect that element "//th[contains(text(),'Cash Back (FollowingTransaction)')]" is not displayed
        And     I expect that element "//th[contains(text(),'Discount Amount')]" is not displayed
        And     I expect that element "//th[contains(text(),'Cash Back')]" is not displayed

    @379660 @TC008
    @runThis
    @Working
    Scenario: Not using Compare Filter
        When    I click the button for the filter "Add New Filter"
        When    I click on the element "//div[contains(@class, 'list-item')]/descendant::span[contains(text(), 'Cash Back')]"
        And     I set "6" to the inputfield "//input[@name='value']"
        And     I click on the element "//button[@ng-click='multi.add(item)']"
        And     I pause for 1000ms
        And     I click on the element "//button/span[text()='Save']"        
        And     I pause for 1000ms
        And     I click on the element "//ag-md-icon[@class='delete-btn foreground']"
        Then    I expect that element "//ag-md-icon[@class='delete-btn foreground']" is not displayed
        And     I expect that element "//filter-item//div[@class='displayContainer']//*[contains(text(), 'Cash Back')]" does appear exactly "1" times
        And     I expect that element "//th[contains(text(),'Cash Back (FollowingTransaction)')]" is not displayed
        And     I expect that element "//th[contains(text(),'Cash Back')]" does appear exactly "1" times