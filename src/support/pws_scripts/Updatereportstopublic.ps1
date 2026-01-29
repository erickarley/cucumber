param(
    [string]$DatabaseServer,
    [int]$NumberOfDays = 90
)
$databaseName = "evGlobalConfig"
$connectionString = "Server=$databaseServer;Database=$databaseName;Integrated Security=True;TrustServerCertificate=True;"

$Query = @"

update [evGlobalConfig].[dbo].[Report]
set [public] = 1
where id in (SELECT r.id
FROM [evGlobalConfig].[dbo].[Report] r
inner join [evGlobalConfig].[dbo].[ReportLastRun] rlr on r.id = rlr.ReportId 
where rlr.LastRunDate > getdate()- $NumberOfDays
group by r.id )

"@

try {
    Write-Output "Executing Update Reports To Public SQL statement on server: $databaseServer, database: $databaseName"
    Invoke-Sqlcmd -ConnectionString $connectionString -Query $Query
    Write-Output "Successfully executed Update Reports To Public SQL statement."
} catch {
    Write-Error "An error occurred while executing Update Reports To Public SQL statement. Error details: $_"
}
