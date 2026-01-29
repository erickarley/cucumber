param(
    [string]$DatabaseServer,
    [int]$NumberOfDays = 90
)
$databaseName = "evGlobalConfig"
$connectionString = "Server=$databaseServer;Database=$databaseName;Integrated Security=True;TrustServerCertificate=True;"

$Query = @"

update [evGlobalConfig].[dbo].[Query]
set [public] = 1, AutoRun = 0
where id in (SELECT q.id
FROM [evGlobalConfig].[dbo].[Query] q
inner join [evGlobalConfig].[dbo].[QueryLastRun] qlr on q.id = qlr.QueryId
where qlr.LastRunDate > getdate()- $NumberOfDays and q.[deleted] = 0 and q.[disabled] = 0
group by q.id )

"@

try {
    Write-Output "Executing Update Queries To Public SQL statement on server: $databaseServer, database: $databaseName"
    Invoke-Sqlcmd -ConnectionString $connectionString -Query $Query
    Write-Output "Successfully executed Update Queries To Public SQL statement."
} catch {
    Write-Error "An error occurred while executing Update Queries To Public SQL statement. Error details: $_"
}
