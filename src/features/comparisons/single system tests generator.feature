Feature: Comparison tool Single System
    As a developer
    I want to create dynamically the feature files for single system comparison

    # npx wdio run wdio.conf.ts --spec ".\src\features\pending\single system tests generator.feature" --cucumberOpts.tagExpression=@SingleSystem server:autodevelop3.agilenceqa.com user:a password:a dbserver:10.150.6.164 
    # npx wdio run wdio.conf.ts --spec ".\src\features\pending\single system tests generator.feature" --cucumberOpts.tagExpression=@SingleSystem server:autodevelop3.agilenceqa.com user:a password:a dbserver:10.150.6.164 
    @SingleSystem @Reports
    Scenario: Test 1: Prepare the list of reports for Single System execution
        # When  I update the reports to be public
        And   I capture the list of reports
        And   I build the single system feature file for the reports

    @SingleSystem @Queries
    Scenario: Test 2: Prepare the list of queries for Single System execution
        # When  I update the queries to be public
        And   I capture the list of queries
        And   I build the single system feature file for the queries

    @SingleSystem @Dashboards
    Scenario: Test 3: Prepare the list of dashboards for Single System execution
        # When  I update the dashboards to be public
        And   I capture the list of dashboards
        And   I build the single system feature file for the dashboards