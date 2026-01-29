param(
    [string]$DatabaseServer,
    [int]$NumberOfDays = 90
)

$databaseName = 'evGlobalConfig'
$connectionString = "Server=$databaseServer;Database=$databaseName;Integrated Security=True;TrustServerCertificate=True;"

# Write-Output "Number of Days: $NumberOfDays"
# $numberOfDays = '120'

$Query = @"

SELECT q.id
FROM [evGlobalConfig].[dbo].[Query] q
inner join [evGlobalConfig].[dbo].[QueryLastRun] qlr on q.id = qlr.QueryId
where qlr.LastRunDate > getdate()- $numberOfDays
     and q.[deleted] = 0
     and q.[disabled] = 0
     and q.querytype = 6
group by q.id
order by q.id

"@

try {
    # Write-Output "Executing Query Recently Run SQL statement on server: $databaseServer, database: $databaseName"
    $result = Invoke-Sqlcmd -ConnectionString $connectionString -Query $Query | Select-Object -ExpandProperty id
    Write-Output ($result -join ",")
    # Write-Output "Successfully executed Query Recently Run SQL statement."
} catch {
    Write-Error "An error occurred while executing Query Recently Run SQL statements. Error details: $_"
}