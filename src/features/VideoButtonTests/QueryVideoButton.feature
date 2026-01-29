Feature: Video Button Tests
    As a Developer of Video Button on Queries
    I want to automate testing of the Video Button
    so that we can be made aware of the Video Button feature no longer works properly
   
 Background:
    Given   I am on the reporting page "/reporting/Queries"

@Working @Develop @371129 @TC001
Scenario: Quick Video button is in the correct place, and shows the video overlay when clicked
    Then I expect that the title is "Queries: Create"
    Then  I wait for the page to be properly rendered
    When  I click the tab "FILTERS"
    When  I delete the default filter when creating a query
    And   I click the button "Run" on the current page
    Then  I wait for the page to be properly rendered
    Then I expect to not find "No items to display" as span text in the page
    #Data load successful
    Then I expect the cell #1 of the row #1 to contain the following icon "videocam_button"
    #video icon is visible.
    When I click the quick launch video icon for the transaction #1
    Then  I wait for the page to be properly rendered
    Then I expect the video overlay to appear