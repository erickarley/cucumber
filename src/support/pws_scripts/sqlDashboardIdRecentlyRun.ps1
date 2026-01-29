param(
    [string]$DatabaseServer,
    [int]$NumberOfDays = 90
)

$databaseName = 'evGlobalConfig'
$connectionString = "Server=$databaseServer;Database=$databaseName;Integrated Security=True;TrustServerCertificate=True;"

# Write-Output "Number of Days: $NumberOfDays"
# $numberOfDays = '120'

$Query = @"

SELECT d.id
FROM [evGlobalConfig].[dbo].[Dashboard] d
inner join [evGlobalConfig].[dbo].[DashboardLastRun] dlr on d.id = dlr.DashboardId
where dlr.LastRunDate > getdate()- $numberOfDays
group by d.id
order by d.id
"@

try {
    # Write-Output "Executing Dashboard Recently Run SQL statement on server: $databaseServer, database: $databaseName"
    $result = Invoke-Sqlcmd -ConnectionString $connectionString -Query $Query | Select-Object -ExpandProperty id
    Write-Output ($result -join ",")
    # Write-Output "Successfully executed Dashboard Recently Run SQL statement."
} catch {
    Write-Error "An error occurred while executing Dashboard Recently Run SQL statements. Error details: $_"
}