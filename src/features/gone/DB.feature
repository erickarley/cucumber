Feature: Test the DB framework capabilities
    As a developer
    I want to be able to run db queries

    @DB
    Scenario: Test SQL: Grab the report numbers in the DB
        When I run the DB Query "SELECT r.id FROM [evGlobalConfig].[dbo].[Report] r "