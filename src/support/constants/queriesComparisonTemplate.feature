Feature: 2020 Queries Comparison Tests
    As a Developer in Test
    I want to test if the 2020 Application Queries keep data consistently between environments

@Working
    Scenario Outline: Queries Comparison For Query <queryId>
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        And   I navigate to query number <queryId>
        Then  I wait for the page to be properly rendered
        And   I click the button "Run" on the current page
        Then  I wait for the page to be properly rendered
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        When  I store the table data from the query on memory
        Given the user navigates to the second environment
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        And   I navigate to query number <queryId>
        Then  I wait for the page to be properly rendered
        And   I click the button "Run" on the current page
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I store the table data from the query on memory
        Then  I expect data stored in memory for query <queryId> to have the same content as previous environment
        Examples:
        | queryId | 