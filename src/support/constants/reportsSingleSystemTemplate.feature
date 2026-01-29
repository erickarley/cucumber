Feature: 2020 Reports Single System Tests
    As a Developer in Test
    I want to test if the Analytics Application Reports work as expected

    # npx wdio run wdio.conf.ts --spec ".\src\features\comparisons\reportsSingleSystem.feature" --cucumberOpts.tagExpression=@Working server:autodevelop3.agilenceqa.com user:a password:a dbserver:10.150.6.164
    @Working
    Scenario Outline: Single System Execution For Report <reportId>
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        And   I navigate to report number <reportId>
        Then  I wait for the page to be properly rendered
        And   I verify the basic structure of the report is correct
        Examples:
        | reportId |