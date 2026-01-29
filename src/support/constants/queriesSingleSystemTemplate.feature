Feature: 2020 Queries Comparison Tests
    As a Developer in Test
    I want to test if the Analytics Application Queries work as expected

@Working
    Scenario Outline: Queries Comparison For Query <queryId>
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        And   I navigate to query number <queryId>
        Then  I wait for the page to be properly rendered
        And   I click the button "Run" on the current page
        # Then  I wait for the page to be properly rendered
        Then  I wait for the elements to render
        Then  I verify the basic structure of the query is correct
        Examples:
        | queryId | 