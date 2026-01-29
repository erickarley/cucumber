Feature: 2020 Reports Comparison Tests
    As a Developer in Test
    I want to test if the 2020 Application Reports keep data consistently between environments

    @Working
    Scenario Outline: Reports Comparison For Report <reportId>
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        And   I navigate to report number <reportId>
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I store the table data from the report on memory
        Given the user navigates to the second environment
        Then  I wait for the page to be properly rendered
        Then  I expect the loading overlay to not appear
        When  I select "Home" from the navigation menu
        And   I navigate to report number <reportId>
        Then  I wait for the page to be properly rendered
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        When  I store the table data from the report on memory
        Then  I expect data stored in memory for report <reportId> to have the same content as previous environment
        Examples:
        | reportId |