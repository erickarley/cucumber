param(
    [string]$DatabaseServer,
    [int]$NumberOfDays = 90
)

$databaseName = 'evGlobalConfig'
$connectionString = "Server=$databaseServer;Database=$databaseName;Integrated Security=True;TrustServerCertificate=True;"

# Write-Output "Number of Days: $NumberOfDays"
# $numberOfDays = '120'

$Query = @"

SELECT r.id
FROM [evGlobalConfig].[dbo].[Report] r 
inner join [evGlobalConfig].[dbo].[ReportLastRun] rlr on r.id = rlr.ReportId
where rlr.LastRunDate > getdate()- $numberOfDays
group by r.id
order by r.id
"@

try {
    # Write-Output "Executing Report Recently Run SQL statement on server: $databaseServer, database: $databaseName"
    $result = Invoke-Sqlcmd -ConnectionString $connectionString -Query $Query | Select-Object -ExpandProperty id
    Write-Output ($result -join ",")
    # Write-Output "Successfully executed Report Recently Run SQL statement."
} catch {
    Write-Error "An error occurred while executing Report Recently Run SQL statement. Error details: $_"
}