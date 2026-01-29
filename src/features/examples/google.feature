Feature: Test how to build automated tests
    As a developer
    I want to be able to understand the framework

Background:
        Given I open the url "http://www.google.com/"

    Scenario: The google search page is rendered
        Then I expect that the title is "Google"

    Scenario: Search for Costa Rica
        When  I set "Costa Rica" to the inputfield "/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input"
        And   I press "Enter"
        Then  I expect that element "h3" is displayed

    Scenario: Results stats element exists
        When  I set "Costa Rica" to the inputfield "/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input"
        And   I press "Enter"
        Then  I expect that element "#result-stats" does exist