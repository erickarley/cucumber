Feature: Analytics Email Verification
    As a Developer or QA Engineer
    I want to check the emails and their attachments

Scenario Outline: Feature Email - Test 1 - Test Email Arrival and PDF attachment
    Given the user navigates to the designated environment
    When  I create a note in the Execution Log with text: "Feature Email - Test 1 - Test Email Arrival and PDF attachment"
    Then  I wait for the page to be properly rendered
    When  I select "Reports" from the navigation menu
    Then  I wait for the page to be properly rendered
    When  I set the filter "Name" for the table with the following value: <reportName>
    When  I open the item <reportName> from the listed results on the table
    Then  I wait for the page to be properly rendered
    When  I click on the top right action called "Email"
    Then  I wait on the dialog container to be displayed
    And   I pause for 3000ms
    And   I set the email field with <email>
    And   I pause for 1000ms
    And   I click the button "Email" on the current page
    Then  I wait on the dialog container not to be displayed
    And   I pause for 10000ms
    Then I download the <reportName> PDF report from email
    Then I validate the downloaded PDF report contains <textToFind>
    Then I validate the downloaded PDF report contains <storeToFind>
    Then I validate the downloaded PDF report contains "0003"
Examples:
    | reportName | textToFind  | storeToFind | downloadType | email |
    | "Automation Base Report" | "Order Total" | "0001" | PDF | "agilence123@gmail.com" |
    
Scenario Outline: Feature Email - Test 2 - Test Email Arrival and Excel attachment
    Given the user navigates to the designated environment
    When  I create a note in the Execution Log with text: "Feature Email - Test 1 - Test Email Arrival and Excel attachment"
    Then  I wait for the page to be properly rendered
    When  I select "Reports" from the navigation menu
    Then  I wait for the page to be properly rendered
    When  I set the filter "Name" for the table with the following value: <reportName>
    When  I open the item <reportName> from the listed results on the table
    Then  I wait for the page to be properly rendered
    When  I click on the top right action called "Email"
    Then  I wait on the dialog container to be displayed
    Then  I wait on the dialog container to be displayed
    When  I change the download format from "PDF" to "Excel"
    And   I pause for 3000ms
    And   I set the email field with <email>
    And   I pause for 1000ms
    And   I click the button "Email" on the current page
    Then  I wait on the dialog container not to be displayed
    And   I pause for 10000ms
    Then I download the <reportName> Excel report from email
    Then I validate the downloaded Excel report contains <textToFind>
    Then I validate the downloaded Excel report contains <storeToFind>
    Then I validate the downloaded Excel report contains "0003"
  Examples:
    | reportName | textToFind | storeToFind | downloadType | email |
    | "Automation Base Report" | "Order Total" | "0001" | PDF | "agilence123@gmail.com" |

   # Scenario: Send email after form submission
    # Then I should receive an email with subject "Agilence: Automation Base Report"
    # Then I check the recent emails

  # Scenario: Validate content and link in report email
  #   Then the report email should contain report "Automation Base Report" and link to the server

  # Scenario: Validate content and PDF attachment type in report email
  #   Then the report email should contain report "Automation Base Report" with a "PDF" attachment

  # Scenario: Validate content and Excel attachment type in report email
  #   Then the report email should contain report "BL report" with a "Excel" attachment

  # Scenario: Validate content and Excel attachment type in report email
  #   Then I validate the "Automation Base Report" Excel contains "Order Total"
