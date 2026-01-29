# Parameters
param(
    [Parameter(Mandatory=$true)]
    [string]$Server,
	[string]$VersionToCheck,
	[string]$emailRecipient,
    [string]$tenantId = "af496bf0-24b7-4bca-8ebc-44281c2e9b48",
    [string]$clientId = "80350bc4-a674-420d-b430-409d6645fd18",
    [string]$tokenFilePath = "C:\Automation\AzureTokenFile.txt",
    [string]$azureKV = "AgAnalyticsTechSupp",
    [string]$user = "techsupp",
    [switch]$QA
)

set-location "C:\Automation\cucumbertests"

# Store the current execution policy
$currentExecutionPolicy = Get-ExecutionPolicy

# Temporarily set the execution policy to Bypass
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

if($QA) {
    # Prompt for user and password (pulling from Azure KV below instead)
    $user = Read-Host -Prompt "Enter the username"
    $password = Read-Host -Prompt "Enter the password" -AsSecureString
    $plainPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))
} else {
    $azAccountsInstalled = Get-Module -ListAvailable -Name "Az.Accounts"
    $azKeyVaultInstalled = Get-Module -ListAvailable -Name "Az.KeyVault"

    # Check for required azure modules
    if (!$azKeyVaultInstalled -or !$azAccountsInstalled) {
        Write-Host "Az.KeyVault or Az.Accounts not found. Attempting to install..."
        try {
            Install-Module -Name "Az.KeyVault" -Force -AllowClobber -ErrorAction Stop
            Write-Host "Az.KeyVault module installed successfully."
        } catch {
            Write-Error "Failed to install Az.KeyVault module. Error: $_"
            exit 1
        }
    }

    # Get the token from the secured file and create a credential object
    $secureClientSecret = Get-Content $tokenFilePath | ConvertTo-SecureString -AsPlainText -Force
    $azureCredential = New-Object System.Management.Automation.PSCredential($ClientId, $secureClientSecret)

    # Connect to Azure KV and retrieve the users password
    Connect-AzAccount -ServicePrincipal -Tenant $tenantId -Credential $azureCredential
    $plainPassword = Get-AzKeyVaultSecret -VaultName $azureKV -Name $user -AsPlainText
}

# Parameters
$TimeReportFolder = 'C:\Automation\cucumbertests\timereport'
#$ReportsFolder = 'C:\Automation\cucumbertests\reports'
$ReportsFolder = 'C:\Automation\cucumbertests\reports\' + $Server
$RootFolder = 'C:\Automation\cucumbertests'

Write-Output 'Server is: ' $Server
Write-Output 'Email recipient is: ' $emailRecipient

# Delete content of reports 
Remove-Item $TimeReportFolder\* -Recurse
Remove-Item $RootFolder\*.xml -Recurse

# Check if the folder exists before attempting to remove its contents
if (Test-Path $ReportsFolder) {
    Remove-Item "$ReportsFolder\*" -Recurse
    Write-Host "Contents of the folder $ReportsFolder have been removed."
} else {
    Write-Host "The folder $ReportsFolder does not exist."
}

#New-Item -Path "$RootFolder\reports\$Server" -ItemType Directory
$folderPath = "$RootFolder\reports\$Server"

# Check if the folder already exists
if (-not (Test-Path -Path $folderPath)) {
    # If it doesn't exist, create the folder
    New-Item -Path $folderPath -ItemType Directory
} else {
    Write-Host "The folder already exists: $folderPath"
}

#$server = "scvl.agilenceinc.com"
#$versionToCheck = "2.12.0.48721"


# Initialize a variable to store test results for this row
$testResults = @()
$overallStatus = $true

$path = "/reporting/Account/LogOn"

# Construct the full URL
$finalUrl = "https://$Server$path"

Write-Host "The final URL is: $finalUrl"

$emailMessageBody = "The URL for server $Server is: $finalUrl"


# Send a failure email
$startEmailCommand = "node send-email-message.js '.\src\features\itops.feature' $emailRecipient '$Server' $env:COMPUTERNAME --body='$emailMessageBody' '$VersionToCheck'"
Write-Output "About to send email at the beginning of the process: $startEmailCommand"
Write-Output "Sending email at the beginning of the process for server $Server" $startEmailCommand
Invoke-Expression $startEmailCommand


# Initialize variables for retry logic
$timeout = 600
$interval = 60
$elapsedTime = 0
$welcomeFound = $false

# Retry logic: keep checking the page content every minute for 10 minutes
while ($elapsedTime -lt $timeout -and -not $welcomeFound) {
    try {
        # Send a request to the final URL
        $response = Invoke-WebRequest -Uri $finalUrl -UseBasicParsing

        # Check if the word "Welcome" is present in the HTML content
        if ($response.Content -match "Welcome") {
            Write-Host "The word 'Welcome' was found on the page."
            $welcomeFound = $true
        } else {
            Write-Host "The word 'Welcome' was not found on the page. Retrying in 1 minute..."
            Start-Sleep -Seconds $interval
            $elapsedTime += $interval
        }
    } catch {
        Write-Host "Error accessing the website: $_"
        Write-Host "The word 'Welcome' was not found on the page. Retrying in 1 minute..."
        Start-Sleep -Seconds $interval
        $elapsedTime += $interval
    }
}

# If the word "Welcome" is not found within 10 minutes, proceed with failure handling
if (-not $welcomeFound) {
    Write-Host "The word 'Welcome' was not found after 10 minutes. Continuing with the script execution."
    $emailBody = "Tests FAILED. Application was not accessible on server $Server."
    $emailSubject = $Server

    # Send a failure email
    $emailCommand = "node send-email-itops.js '.\src\features\itops.feature' $emailRecipient '$emailSubject' $env:COMPUTERNAME --body='$emailBody' '$VersionToCheck'"
    Write-Output "About to run email command: $emailCommand"
    Write-Output "Sending email for server $Server with results..." $emailCommand
    Invoke-Expression $emailCommand
} else {
    # Proceed with the rest of the script if "Welcome" was found
    Write-Host "Proceeding with test execution since 'Welcome' was found on the page."
    $wdioCommand = "npx wdio run wdio.validation.conf.ts --spec '.\src\features\itops.feature' --cucumberOpts.tagExpression=@ITOps server=$Server user=$user password=$plainPassword versionToCheck=$VersionToCheck"
    Write-Output "Executing: $($wdioCommand.Replace("password=$plainPassword ","password=**** "))"
    $wdioResult = Invoke-Expression $wdioCommand | Out-String
    Write-Output "wdio result is:`n$wdioResult"

    if ($wdioResult -like "*Error*" -or $wdioResult -like "*Failed*") {
        $overallStatus = $false
    }

    # Execute the MobileAPI-test.ps1 script and pass the parameters
    Write-Output "Executing Mobile API Tests..."
    $mobileAPIResult = & .\MobileAPI-test.ps1 -Server $server -User $user -Password $plainPassword

    Write-Output "ITOps API Test results:" + $mobileAPIResult

    if ($mobileAPIResult -like "*Error*" -or $mobileAPIResult -like "*Failed*") {
        $testResults += "API Test results:`n" + $mobileAPIResult
        $overallStatus = $false
    } else {
        $testResults += "API Test results:`n" + $mobileAPIResult
    }

    $emailBody = $testResults
    $emailSubject = $server
    Write-Output 'Email recipient is: ' $emailRecipient
    # Send an email with the test results for this row
    $emailCommand = "node send-email-itops.js '.\src\features\itops.feature' $emailRecipient '$emailSubject' $env:COMPUTERNAME --body='$emailBody' '$versionToCheck'"
    #$emailCommand = "node send-emailV2.js '.\src\features\itops.feature' blipski@agilenceinc.com '$emailSubject' $env:COMPUTERNAME --body='$emailBody'"
    # $emailCommand = "node send-email.js '.\src\features\itops.feature' earley@agilenceinc.com '$emailSubject' $env:COMPUTERNAME --body='$emailBody'"
    # $emailCommand = "node send-email.js '.\src\features\itops.feature' earley@agilenceinc.com '$emailSubject' $env:COMPUTERNAME"
    Write-Output "about to run email command: " $emailCommand
    Write-Output "Sending email for server $server with results..." $emailCommand
    Invoke-Expression $emailCommand
}

write-output "about to run set execution policy: " $currentExecutionPolicy
# Restore the previous execution policy
Set-ExecutionPolicy -Scope Process -ExecutionPolicy $currentExecutionPolicy -Force

# To execute the script: .\itops.ps1 -CsvFilePath ".\serverData.csv"