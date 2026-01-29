Feature: Test the new framework structure
    As a developer
    I want to be able to test if this works

    @DefectRegression @Critical
    Scenario Outline: Test 0: Open the About page to see the version number
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "Test 0"
        # Then  I wait for the page to be properly rendered
        When  I select "About" from the navigation menu
        And   I wait for the page to be properly rendered
        When  I pause for 5000ms
        Then  I expect a new window has been opened
        When  I focus the last opened window
        When  I pause for 6000ms
        And   I save the information about the version number
        When  I close the last opened window
    Examples:
        | site | 
        | "Prod_Version" | 

    @DefectRegression @FT-2682
    Scenario Outline: FT 2682: Orgill - Problem with Statistic Reporting
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "FT-2682"
        # Then  I wait for the page to be properly rendered
        When  I select "Create New" from the navigation menu
        And   I click on the link "Report"
        Then  I wait for the page to be properly rendered
        And   I set the report name to <reportName>
        When  I click the tab "Data Elements"
        And   I pause for 3000ms
        And   I select the data element measure "POS Measures"
        And   I pause for 3000ms
        And   I add the data element <measureName> to the report
        Then  I expect the loading overlay to not appear
        Then  I wait for the page to be properly rendered
        And   I select the column settings option "Statistics" for column "Detail Amount ($)"
        When  I click the radio button "Percent of Total (%)"
        And   I click the button "Create" on the current page
        Then  I wait for the page to be properly rendered
        And   I click the tab "Time"
        And   I set the Range field to "X Months" with X value set to "3" for the Standard Calendar
        Then  I wait for the page to be properly rendered
        # And   I select the column settings option "Advanced Filter" for column "Detail Amount ($) (%)"
        # Then  I wait for the page to be properly rendered
        When  I set the column advanced filter for measure indicator "Detail Amount ($) (%)" with type "Threshold" and values for top "20" and bottom "0.2"
        # And   I set the Advanced filter to "Threshold" with "Above" value: "" and "Below" value: "" 
        And   I click the button "Save" on the current page
        Then  I wait for the page to be properly rendered
        And   I click on the top right action called "Save"

        And   I refresh the page
        When  I select "Reports" from the navigation menu
        Then  I wait for the page to be properly rendered
        And   I open the report <reportName> from the Reports list
        Then  I wait for the page to be properly rendered
        Then  I expect the title of the report to be <reportName>

        Then  I wait for the page to be properly rendered
        And   I select the column settings option "Advanced Filter" for column "Detail Amount ($) (%)"
        Then  I wait for the page to be properly rendered
        Then  I verify that the top value of the Advanced Filter is set to "0.2"
        And   I click the button "Cancel" on the current page

        # Create verification step for ???

        When  I select "Settings" from the navigation menu
        And   I open the "Manage Reports" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Reports" as the current item
        When  I delete all the reports containing the name <reportName>
        Then  I expect the breadcrumb to show "Manage Reports" as the current item
 

    Examples:
        | site | reportName | measureName | 
        | "Trunk_Version" | "FT-2682" | "Item Discounts" |  

    @DefectRegression @FT-2683
    Scenario Outline: FT 2683: Smart and Final- Functionality of transaction date filter in info Box
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "FT-2683"
        When  I select "Create New" from the navigation menu
        And   I click on the link "Query"
        Then  I wait for the page to be properly rendered
        And   I click the tab "FILTERS"
        And   I pause for 3000ms
		# When  I delete the default filter when creating a query
        And   I click the button for the filter "Add New Filter"
        And   I pause for 3000ms
        And   I set the filter for the value tab with <searchType> Category, <newFilter> field with "=" operator and option "MC/Visa" 
        And   I click the button "Save" on the current page
        Then  I wait for the page to be properly rendered
        And   I click the button "Run" on the current page
        Then  I wait for the page to be properly rendered
        And   I open the info box for the transaction #1
        Then  I wait for the page to be properly rendered
        When  I pause for 15000ms
        When  I focus the last opened window
        And   I click the button "Credit Card" on the current page
        And   I set the Transaction Date-Time filter to date "2/28/2023" with "Is after" filter
        And   I pause for 3000ms
        And   I expect to see a transaction history record in column 2 with value "2/28/2023"
        
        # And   I set the Transaction Date-Time filter to date "3/1/2023" with "Is after" filter
        # And   I pause for 3000ms
        # And   I expect not to see a transaction history record in column 2 with value "3/1/2023"
        And   I pause for 3000ms

        When  I close the last opened window

    Examples:
        | site | searchType | newFilter | 
        | "Trunk_Version" | "POS Transactions" | "Primary Tender Type" | 

    @DefectRegression @FT-2775
    Scenario Outline: FT 2775: Special Characters not properly escaped
        Given the user navigates to the designated environment
        When  I create a note in the Execution Log with text: "FT-2775"
        #Queries Creation
        When  I select "Create New" from the navigation menu
        And   I click on the link "Query"
        Then  I wait for the page to be properly rendered
        When  I set the name of the Query to <queryName>
        When  I click on the top right action called "Save"
        Then  I expect the "Query Saved" banner appears
        And   I refresh the page
        #Reports Creation
        When  I select "Create New" from the navigation menu
        And   I click on the link "Report"
        Then  I wait for the page to be properly rendered
        And   I set the report name to <reportName>
        When  I click on the top right action called "Save"
        Then  I expect the "Report Saved" banner appears
        And   I refresh the page
        #Dashboard Creation
        When  I select "Create New" from the navigation menu
        And   I wait for the page to be properly rendered
        And   I click on the link "Dashboard"
        And   I wait for the page to be properly rendered
        When  I set the name of the Dashboard to <dashboardName>
        When  I click on the top right action called "Save"
        Then  I expect the "Dashboard Saved." banner 
        #Measure Creation
        When  I select "Settings" from the navigation menu
        And   I click on the add icon next to "Manage Measures" on the Settings page
        Then  I wait for the page to be properly rendered
        And   I set the name <measureName> for the Measure
        Then  I wait for the page to be properly rendered
        And   I click the tab "Summation"
        And   I click on the top right action called "Save"
        Then  I expect the "Measure Saved" banner appears       
        # Monitors Creation
        When  I select "Settings" from the navigation menu
        And   I click on the add icon next to "Manage Compliance Monitors" on the Settings page
        And   I create the Monitor with name <monitorName>, type "Summary Event", Dimension <dimension>, data element <dataElement>, measure <measureName> and indicator "Tx Count (#)"
        And   I click the tab "Rules"
        And   I add a new rule into the monitor with name "Rule with measure to delete" and type "Value" for operator "Greater Than" and value #1 
        And   I click the button "Apply" on the current page
        And   I click on the top right action called "Save"
        Then  I expect the "Compliance Monitor Saved." banner appears       

        #Widget Creation
        When  I select "Settings" from the navigation menu
        And   I open the "Manage Widgets" link from the Settings page
        Then  I wait on report grid loading gif image to not exist
        When  I click the button to configure the infobox widget "Store"
        And   I pause for 3000ms
        And   I create the Widget with name "Return Risk", type "Goal Widget", data element "POS Measures", measure <measureName> and indicator "Tx Count (#)"
        And   I click the button "Save" on the current page


        When  I select "Settings" from the navigation menu
        And   I open the "Manage Queries" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I wait on report grid loading gif image to not exist
        Then  I expect the breadcrumb to show "Manage Queries" as the current item
        When  I delete all the queries containing the name <queryName>
        Then  I expect the breadcrumb to show "Manage Queries" as the current item

        When  I select "Settings" from the navigation menu
        And   I open the "Manage Reports" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show "Manage Reports" as the current item
        When  I delete all the reports containing the name <reportName>
        Then  I expect the breadcrumb to show "Manage Reports" as the current item

        When  I select "Settings" from the navigation menu
        And   I open the "Manage Dashboards" link from the Settings page
        Then  I wait for the page to be properly rendered
        Then  I wait on report grid loading gif image to not exist
        Then  I expect the breadcrumb to show "Manage Dashboards" as the current item
        When  I delete all the dashboards containing the name <dashboardName>
        Then  I expect the breadcrumb to show "Manage Dashboards" as the current item

        When  I select "Settings" from the navigation menu
        And   I open the "Manage Measures" link from the Settings page
        # Then  I wait for the page to be properly rendered
        Then  I wait on report grid loading gif image to not exist
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
        When  I delete all the measures containing the name <measureName>
        Then  I expect the loading overlay to not appear
        Then  I expect the breadcrumb to show "Manage Measures" as the current item
        When  I select "Settings" from the navigation menu
        And   I open the "Manage Compliance Monitors" link from the Settings page
        Then  I wait on report grid loading gif image to not exist
        And   I pause for 3000ms
        When  I edit the <monitorName> settings item from the displayed list
        Then  I wait for the page to be properly rendered
        Then  I expect the breadcrumb to show <monitorName> as the current item
        And   I expect the switch "Active" to be off
        And   I expect tab "Actual" not to be displayed
        And   I expect no measures are shown for <measureName> measure name
        When  I click on the top right action called "Delete"
        And   I pause for 2000ms
        When  I click the button "Continue" on the current page
        Then  I expect the loading overlay to not appear
        Then  I expect the breadcrumb to show "Manage Compliance Monitors" as the current item

    Examples:
        | site | queryName | reportName | dashboardName | measureName | monitorName | dimension | dataElement |
        | "Trunk_Version" | "q @ # $ % ^ & automation" | "r @ # $ % ^ & automation" | "d @ # $ % ^ & automation" | "m @ # $ % ^ & automation" | "mo @ # $ % ^ & automation" | "Store" | "POS Measures" |




