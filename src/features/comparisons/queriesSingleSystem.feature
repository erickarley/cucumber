Feature: 2020 Queries Comparison Tests
    As a Developer in Test
    I want to test if the 2020 Application Queries keep data consistently between environments

@Working
    Scenario Outline: Queries Comparison For Query <queryId>
        Given the user navigates to the designated environment
        Then  I wait for the page to be properly rendered
        When  I select "Home" from the navigation menu
        And   I navigate to query number <queryId>
        Then  I wait for the page to be properly rendered
        And   I click the button "Run" on the current page
        # Then  I wait for the page to be properly rendered
        Then  I wait for the elements to render
        Then  I verify the basic structure of the query is correct
        Examples:
        | queryId | 
		| "10090" |
		| "10468" |
		| "11401" |
		| "11412" |
		| "11420" |
		| "11428" |
		| "11436" |
		| "11449" |
		| "11450" |
		| "11458" |
		| "11463" |
		| "11499" |
		| "11501" |
		| "11508" |
		| "11510" |
		| "11522" |
		| "11524" |
		| "11531" |
		| "11533" |
		| "11540" |
		| "11542" |
		| "11549" |
		| "11551" |
		| "11558" |
		| "11560" |
		| "11567" |
		| "11569" |
		| "11578" |
		| "11585" |
		| "11587" |
		| "11594" |
		| "11596" |
		| "11603" |
		| "11605" |
		| "11612" |
		| "11614" |
		| "11621" |
		| "11623" |
		| "11632" |
		| "11641" |
		| "11648" |
		| "11650" |
		| "11657" |
		| "11659" |
		| "11666" |
		| "11668" |
		| "11675" |
		| "11677" |
		| "11684" |
		| "11686" |
		| "11698" |
		| "11700" |
		| "11707" |
		| "11709" |
		| "11716" |
		| "11718" |
		| "11725" |
		| "11727" |
		| "11734" |
		| "11737" |
		| "11745" |
		| "11754" |
		| "11763" |
		| "11772" |
		| "11781" |
		| "11790" |
		| "11799" |
		| "11808" |
		| "11824" |
		| "11833" |
		| "11842" |
		| "11851" |
		| "11860" |
		| "11869" |
		| "11878" |
		| "11887" |
		| "11896" |
		| "11905" |
		| "11912" |
		| "11914" |
		| "3887" |
		| "4175" |