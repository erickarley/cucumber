param(
    [string]$DatabaseServer,
    [int]$NumberOfDays = 90
)
$databaseName = "evGlobalConfig"
$connectionString = "Server=$databaseServer;Database=$databaseName;Integrated Security=True;TrustServerCertificate=True;"

$Query = @"

update [evGlobalConfig].[dbo].[Dashboard]
set [public] = 1
where id in (SELECT d.id
FROM [evGlobalConfig].[dbo].[Dashboard] d
inner join [evGlobalConfig].[dbo].[DashboardLastRun] dlr on d.id = dlr.DashboardId 
where dlr.LastRunDate > getdate()- $NumberOfDays
group by d.id )

"@

try {
    Write-Output "Executing Update Dashboards To Public SQL statement on server: $databaseServer, database: $databaseName"
    Invoke-Sqlcmd -ConnectionString $connectionString -Query $Query
    Write-Output "Successfully executed Update Dashboards To Public SQL statement."
} catch {
    Write-Error "An error occurred while executing Update Dashboards To Public SQL statement. Error details: $_"
}
