Feature: Comparison tool to generate the comparison tests dynamically
    As a developer
    I want to grab the objects of the queries

    # How to run the comparison tests and execute the comparisons automatically
    # npx wdio run wdio.comparisons.conf.ts  server:automaster7.agilenceqa.com user:a password:a server2:autodevelop3.agilenceqa.com dbserver:automaster7 dbserver2:autodevelop3 days:60
    
    # npx wdio run wdio.conf.ts --spec ".\src\features\pending\comparison tests generator.feature" --cucumberOpts.tagExpression=@Comparison server:autodevelop3.agilenceqa.com user:a password:a server2:automaster7.agilenceqa.com dbserver:10.150.6.164 dbserver2:autodevelop3 days:120
    @Comparison @Reports
    Scenario: Test 1: Grab the object identifiers from the list of reports ran in the last days
        # When  I update the reports to be public
        And   I capture the list of reports
        And   I build the comparison Feature files for the reports

    @Comparison @Dashboards
    Scenario: Test 2: Grab the object identifiers from the list of dashboards ran in the last "<numberOfDays>" days
        # When  I update the dashboards to be public
        And   I capture the list of dashboards
        And   I build the comparison Feature files for the dashboards

    @Comparison @Queries
    Scenario: Test 3: Grab the object identifiers from the list of queries ran in the last "<numberOfDays>" days
        # When  I update the queries to be public
        And   I capture the list of queries
        And   I build the comparison Feature files for the queries

#    @Comparison 
#     Scenario: Test 1: Grab the object identifiers from the list of reports
#         Given the user navigates to the designated environment
#         When  I create a note in the Execution Log with text: "Test 1 - Reports"
#         Then  I wait for the page to be properly rendered
#         # Then  I wait for the page to be properly rendered
#         When  I select "Reports" from the navigation menu
#         Then  I wait for the page to be properly rendered
#         When  I capture the list of reports to compare in the system
#         And   I build the comparison Feature files for the reports

#    @Comparison 
#     Scenario: Test 2: Grab the object identifiers from the list of queries
#         Given the user navigates to the designated environment
#         When  I create a note in the Execution Log with text: "Test 2 - queries"
#         Then  I wait for the page to be properly rendered
#         # Then  I wait for the page to be properly rendered
#         When  I select "Queries" from the navigation menu
#         Then  I wait for the page to be properly rendered
#         When  I capture the list of queries to compare in the system
#         And   I build the comparison Feature files for the queries

#    @Comparison 
#     Scenario: Test 3: Grab the object identifiers from the list of dashboards
#         Given the user navigates to the designated environment
#         When  I create a note in the Execution Log with text: "Test 3 - dashboards"
#         Then  I wait for the page to be properly rendered
#         # Then  I wait for the page to be properly rendered
#         When  I select "Dashboards" from the navigation menu
#         Then  I wait for the page to be properly rendered
#         When  I capture the list of dashboards to compare in the system
#         And   I build the comparison Feature files for the dashboards