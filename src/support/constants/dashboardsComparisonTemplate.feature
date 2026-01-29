Feature: 2020 Dashboards Validation Tests
    As a Developer in Test
    I want to test if the 2020 Application Dashboards keep data consistently between environments

    @Working
    Scenario Outline: Dashboards Validation For Dashboard <dashboardId>
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        When  I navigate to dashboard number <dashboardId>
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        And   I take a screenshot of the dashboard number <dashboardId>
        Given the user navigates to the second environment
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        And   I navigate to dashboard number <dashboardId>
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        Then  I compare visually the current dashboard <dashboardId> with the screenshot of the dashboard from the previous environment
        Examples:
        | dashboardId |