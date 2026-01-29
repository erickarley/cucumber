Feature: Video Button Tests
    As a Developer of Video Button on Quick Queries
    I want to automate testing of the Video Button
    so that we can be made aware of the Video Button feature no longer works properly
   
 Background:
    Given   I am on the reporting page "/reporting"
    
@Working @Develop @371131 @TC001
    Scenario: Quick Video button is in the correct place, and shows the video overlay when clicked
      Then  I wait for the page to be properly rendered  
        And   I pause for 3000ms
        When  I click on the top right action called "Quick Query"
        And   I select "POS Transactions" from the sub action menu
        And   I pause for 10000ms
        Then  I wait for the page to be properly rendered
        Then  I expect a new window has been opened
        And   I pause for 3000ms
        When  I focus the last opened window
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered  
        And   I click the button "Run" on the current page
        Then  I wait for the page to be properly rendered  
        Then I expect to not find "No items to display" as span text in the page
        #Data load successful
        Then I expect the cell #1 of the row #1 to contain the following icon "videocam_button"
        #video icon is visible.
        When I click the quick launch video icon for the transaction #1
        Then  I wait for the page to be properly rendered
        Then I expect the video overlay to appear
