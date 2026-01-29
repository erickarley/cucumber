import { execSync } from 'child_process';

/**
 * Grab the report IDs from PowerShell output
 */
export default async () => {
    try {
        console.log("Extracting parameters and executing PowerShell scripts...");

        // Extract parameters from process arguments
        const getArguments = () => {
            const args = process.argv.slice(2); // Skip Node.js and script paths
            const argObject = {};
            args.forEach(arg => {
                const [key, value] = arg.split("=");
                argObject[key] = value;
            });
            return argObject;
        };

        const userArguments = getArguments();
        const databaseServer1 = userArguments.dbserver || 'defaultServerName';
        const databaseServer2 = userArguments.dbserver2 || ''; // Check if dbserver2 is present
        const numberOfDays = userArguments.days || '90';

        console.log(`Database Server 1: ${databaseServer1}`);
        console.log(`Database Server 2: ${databaseServer2 ? databaseServer2 : 'Not provided'}`);
        console.log(`Number of Days: ${numberOfDays}`);

        // Paths to your PowerShell scripts
        const psPublicScriptPath = "./src/support/pws_scripts/Updatedashboardstopublic.ps1";
        const psScriptPath = "./src/support/pws_scripts/sqlDashboardIdRecentlyRun.ps1";

        // Function to execute PowerShell scripts
        const executePowerShellScripts = (databaseServer) => {
            console.log(`Executing PowerShell scripts for server: ${databaseServer}`);

            // Execute "Updatedashboardstopublic.ps1"
            const psPublicOutput = execSync(`powershell.exe -NoProfile -ExecutionPolicy Bypass -File "${psPublicScriptPath}" -DatabaseServer "${databaseServer}" -NumberOfDays "${numberOfDays}"`, { encoding: 'utf-8' });
            console.log(`Output from Updatedashboardstopublic.ps1 (Server: ${databaseServer}):`, psPublicOutput);

            // Execute "sqlDashboardIdRecentlyRun.ps1"
            const psOutput = execSync(`powershell.exe -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}" -DatabaseServer "${databaseServer}" -NumberOfDays "${numberOfDays}"`, { encoding: 'utf-8' });
            console.log(`Output from sqlDashboardIdRecentlyRun.ps1 (Server: ${databaseServer}):`, psOutput);

            // Parse the IDs from the output of sqlDashboardIdRecentlyRun.ps1
            const match = psOutput.match(/(\d+(,\d+)*)/);
            if (!match || !match[1]) {
                throw new Error(`Failed to parse IDs from PowerShell output (Server: ${databaseServer}).`);
            }

            const arrayOfStrings = match[1].split(",").map(id => id.trim());
            console.log(`Parsed Dashboard IDs for server ${databaseServer}:`, arrayOfStrings);

            return arrayOfStrings;
        };

        // Execute scripts for dbserver
        const reportsServer1 = executePowerShellScripts(databaseServer1);

        // Store results for dbserver in WebdriverIO shared storage
        await browser.sharedStore.set('dashboards', reportsServer1);

        // Check and execute scripts for dbserver2 if provided
        if (databaseServer2) {
            const reportsServer2 = executePowerShellScripts(databaseServer2);
            // Store results for dbserver2 in WebdriverIO shared storage
            // await browser.sharedStore.set('reports_server2', reportsServer2);
        } else {
            console.log("No secondary database server (dbserver2) provided. Skipping execution for dbserver2.");
        }
    } catch (err) {
        console.error("Error executing PowerShell scripts:", err.message);
        throw err;
    }
};
