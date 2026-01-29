Feature: 2020 ITOps Tests
    As an ITOps Team Member
    I want to verify the version number and basic functionality in the application

    @ITOps @Critical
    Scenario: Test 0: Open the About page to see the version number
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Test 0"
        Then  I wait for the page to be properly rendered
        When  I select "About" from the navigation menu
        # And   I wait until a new window has been opened
        When  I focus the last opened window
        Then  I wait for the version info to appear
        And   I save the information about the version number
        When  I close the last opened window
        Then  I check the version number in the server

    @ITOps 
    Scenario: Test 1: Run TechSupp Sales report and send it via email
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "ITOps Test 1"
        Then  I wait for the page to be properly rendered
        When  I select "Reports" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the report <reportName> from the Reports list
        And   I wait for the content to finish loading
        Then  I wait for the page to be properly rendered
        Then  I expect the title of the report to be <reportName>
        Then  I wait for the page to be properly rendered
        And   I check the value of the cell under "Total" header at row "1" 
        When  I click on the top right action called "Email"
        Then  I wait on the dialog container to be displayed
        And   I pause for 3000ms
        # And   I set the email field with "blipski@agilenceinc.com"
        # And   I set the email field with "earley@agilenceinc.com"
		And   I set the email field with "itops@agilenceinc.com"
        And   I pause for 1000ms
        And   I click the button "Email" on the current page
    Examples:
        | reportName |
        | "TechSupp Sales" |

    # @ITOps 
    # Scenario: Test 1: Run Last Report Run by TechSupport and send it via email
    #     Given the user navigates to the designated environment
    #     When  I create a note in the Execution Log with text: "ITOps Test 1"
    #     Then  I wait for the page to be properly rendered
    #     When  I select "Reports" from the navigation menu
    #     Then  I wait for the page to be properly rendered
    #     When  I click on the link "Last Run"
    #     When  I click on the link "Last Run"
    #     # When  I sort on "([^"]*)?" column
    #     And   I open the report #1 from the Reports list
    #     When  I click on the top right action called "Email"
    #     Then  I wait on the dialog container to be displayed
    #     And   I pause for 3000ms
    #     # And   I set the email field with "blipski@agilenceinc.com"
    #     And   I set the email field with "earley@agilenceinc.com"
    #     And   I pause for 1000ms
    #     And   I click the button "Email" on the current page
    
    @ITOps 
    Scenario: Test 2: Check the Community link
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "ITOps Test 1"
        Then  I wait for the page to be properly rendered
        When  I select "Help" from the navigation menu
        When  I click the sub item "Community" from "Help"
        And   I wait for the page to be properly rendered
        When  I pause for 5000ms
        Then  I expect a new window has been opened
        When  I focus the last opened window
        Then  I expect that the title is "Community"
        # And   I wait for the page to be properly rendered
        And   I expect the url to not contain "Error"
        When  I pause for 2000ms    
        And   I check the "Feed" header in the Community Page
        # And   I open the url "https://watercooler.agilenceinc.com/"


