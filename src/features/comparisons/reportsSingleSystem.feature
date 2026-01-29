Feature: 2020 Reports Comparison Tests
    As a Developer in Test
    I want to test if the 2020 Application Reports keep data consistently between environments

    @Working
    Scenario Outline: Single System Execution For Report <reportId>
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        And   I navigate to report number <reportId>
        Then  I wait for Report-<reportId> to be properly rendered
        And   I verify the basic structure of the report is correct
        Examples:
        | reportId |
		| "2622" |
		| "2667" |
		| "4269" |
		| "5377" |