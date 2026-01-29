import { execSync } from 'child_process';

/**
 * Grab the query IDs from PowerShell output
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
        const psPublicScriptPath = "./src/support/pws_scripts/Updatequeriestopublic.ps1";
        const psScriptPath = "./src/support/pws_scripts/sqlQueryIdRecentlyRun.ps1";

        // Function to execute PowerShell scripts
        const executePowerShellScripts = (databaseServer) => {
            console.log(`Executing PowerShell scripts for server: ${databaseServer}`);

            // Execute "Updatequeriestopublic.ps1"
            const psPublicOutput = execSync(`powershell.exe -NoProfile -ExecutionPolicy Bypass -File "${psPublicScriptPath}" -DatabaseServer "${databaseServer}" -NumberOfDays "${numberOfDays}"`, { encoding: 'utf-8' });
            console.log(`Output from Updatequeriestopublic.ps1 (Server: ${databaseServer}):`, psPublicOutput);

            // Execute "sqlQueryIdRecentlyRun.ps1"
            const psOutput = execSync(`powershell.exe -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}" -DatabaseServer "${databaseServer}" -NumberOfDays "${numberOfDays}"`, { encoding: 'utf-8' });
            console.log(`Output from sqlQueryIdRecentlyRun.ps1 (Server: ${databaseServer}):`, psOutput);

            // Parse the IDs from the output of sqlQueryIdRecentlyRun.ps1
            const match = psOutput.match(/(\d+(,\d+)*)/);
            if (!match || !match[1]) {
                throw new Error(`Failed to parse IDs from PowerShell output (Server: ${databaseServer}).`);
            }

            const arrayOfStrings = match[1].split(",").map(id => id.trim());
            console.log(`Parsed Query IDs for server ${databaseServer}:`, arrayOfStrings);

            return arrayOfStrings;
        };

        // Execute scripts for dbserver1
        const queriesServer1 = executePowerShellScripts(databaseServer1);

        // Store results for dbserver1 in WebdriverIO shared storage
        await browser.sharedStore.set('queries', queriesServer1);

        // Check and execute scripts for dbserver2 if provided
        if (databaseServer2) {
            console.log(`Executing PowerShell scripts for secondary server (dbserver2): ${databaseServer2}`);
            const queriesServer2 = executePowerShellScripts(databaseServer2);

            // Combine results from both servers if necessary
            // const combinedQueries = [...queriesServer1, ...queriesServer2];
            // await browser.sharedStore.set('queries', combinedQueries);
        } else {
            console.log("No secondary database server (dbserver2) provided. Skipping execution for dbserver2.");
        }
    } catch (err) {
        console.error("Error executing PowerShell scripts:", err.message);
        throw err;
    }
};
