Feature: 2020 Dashboards Single System Validation Tests
    As a Developer in Test
    I want to test if the 2020 Application Dashboards work in this system

    @Working
    Scenario Outline: Dashboards Validation For Dashboard <dashboardId>
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        When  I navigate to dashboard number <dashboardId>
        Then  I wait for the elements to render
        And   I verify the basic structure of the dashboard is correct
        And   I take a screenshot of the dashboard number <dashboardId>
        Examples:
        | dashboardId | 
		| "1203" |