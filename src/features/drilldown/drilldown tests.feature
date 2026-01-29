Feature: Test the drilldwon capability
    As a developer
    I want to be able to test the drillable capability

    @SmokeTests  @SmokeTests5 @Drilldown2
    Scenario Outline: Test 5: Test Drilldown Page
        Given the user navigates to the designated environment
        And   I wait for the page to be properly rendered
        When  I create a note in the Execution Log with text: "Test 5"
        When  I select "Reports" from the navigation menu
        Then  I expect the cell #2 of the row #1 to not contain the following text ""
        When  I set the filter "Name" for the table with the following value: <reportName>
        When  I open the item <reportName> from the listed results on the table
        And   I wait for the page to be properly rendered
        And   I click on the Data Elements content table cell #1 for row #1
        Then  I wait for the report to render the results count
        Then  I expect the cell #4 of the row #1 to not contain the following text ""
        When  I click on the top right action called "Settings"
        And   I wait for the page to be properly rendered
        And   I click the tab "PROPERTIES"
        And   I click the tab "FILTERS"
        And   I pause for 4000ms
        And   I click the button "Advanced" on the current page
        And   I pause for 2000ms
        And   I click the button with the "close" icon
        And   I pause for 2000ms
        When  I click on the top right action called "Settings"
        Then  I wait for the page to be properly rendered
        When  I click on the top right action called "Download"
        And   I pause for 2000ms
        And   I click the button "Download" on the current page
        Then  I wait on the dialog container not to be displayed
        And   I open the Task Manager feature
        And   I verify the Task Manager is open
        And   I pause for 4000ms
        # Then  I wait on the dialog container to be displayed
        # Then  I expect the Task Manager contains a task created "Today"
        And   I click the button "Remove All Finished" on the current page
        And   I click the button with the "close" icon
        And   I verify the Task Manager is closed
        # Then  I wait on the dialog container not to be displayed
        When  I close the last opened window
    Examples:
        | reportName | 
        | "Automation Base Report" |

    @Drilldown 
    Scenario Outline: Test 5.1: Test Drilldown on Report - <reportId>
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        And   I navigate to report number <reportId>
        Then  I wait for the page to be properly rendered
        # Then  I wait for the page to be properly rendered
        # When  I create a note in the Execution Log with text: "Drilldown Tests"
        And   I wait for the content to finish loading
        When  I verify that all drillable cells from summary report <reportId> in row #1 generate no error
        Examples:
        | reportId | 
		| "29" |		
  		| "2284" |     
  		| "113" | 	
 		| "2920" | 
        | "91" |
        | "112" |
        | "113" |
        | "115" |
        | "126" |
        | "129" |
        | "1147" |
        | "2167" |
        | "2175" |
        | "2176" |
        | "2213" |
        | "2214" |
        | "2217" |
        | "2219" |
        | "2225" |
        | "2226" |
        | "2227" |
        | "2228" |
        | "2229" |
        | "2230" |
        | "2231" |
        | "2234" |
        | "2237" |
        | "2243" |
        | "2244" |
        | "2249" |
        | "2250" |
        | "2252" |
        | "2253" |
        | "2255" |
        | "2256" |
        | "2257" |
        | "2265" |
        | "2266" |
        | "2271" |
        | "2279" |
        | "2280" |
        | "2284" |
        | "2287" |
        | "2288" |
        | "2289" |
        | "2295" |
        | "2296" |
        | "2300" |
        | "2306" |
        | "2309" |
        | "2316" |
        | "2317" |
        | "2322" |
        | "2327" |
        | "2328" |
        | "2335" |
        | "2339" |
        | "2343" |
        | "2347" |
        | "2349" |
        | "2350" |
        | "2351" |
        | "2354" |
        | "2384" |
        | "2386" |
        | "2389" |
        | "2400" |
        | "2401" |
        | "2419" |
        | "2435" |
        | "2449" |
        | "2457" |
        | "2461" |
        | "2540" |
        | "2542" |
        | "2546" |
        | "2569" |
        | "2611" |
        | "2803" |
        | "2833" |
        | "2859" |
        | "2920" |
        | "3003" |
        | "3008" |
        | "3028" |
        | "3032" |
        | "3155" |
        | "3199" |
        | "3421" |
        | "3453" |
        | "4599" |
        | "4618" |
        | "4644" |
        | "4645" |
        | "4659" |
        | "4664" |
        | "4665" |
        | "4691" |
        | "4705" |
        | "4771" |
        | "4785" |
        | "4797" |
        | "4798" |
        | "4802" |
        | "4803" |
        | "4809" |
        | "4813" |
        | "4818" |