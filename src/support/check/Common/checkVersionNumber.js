/**
 * checkVersionNumber
 * -------------------
 * ✔ Reads the version saved earlier by saveVersionNumber
 * ✔ Reads versionToCheck from command line
 * ✔ Compares them
 * ✔ If mismatch, throws an error containing "FAILED" so the email script detects it
 * ✔ Writes mismatch information into TestExecutionLog.txt
 */

import fs from 'fs';

export default async () => {

    // --------------------------------------------
    // 1. Read versionToCheck from CLI
    // --------------------------------------------
    const args = process.argv;
    const versionArg = args.find(a => a.startsWith('versionToCheck='));

    if (!versionArg) {
        throw new Error('[VersionCheck FAILED] versionToCheck argument missing.');
    }

    let versionToCheck = versionArg.split('=')[1].trim();
    versionToCheck = versionToCheck.replace(/[^0-9.]/g, '').trim();

    if (!versionToCheck) {
        throw new Error('[VersionCheck FAILED] versionToCheck argument empty.');
    }

    // --------------------------------------------
    // 2. Determine server folder
    // --------------------------------------------
    const serverArg = args.find(a => a.startsWith('server='));
    const serverName = serverArg ? serverArg.split('=')[1].trim() : null;

    if (!serverName) {
        throw new Error('[VersionCheck FAILED] Could not determine server folder from CLI.');
    }

    const versionFilePath = `./reports/${serverName}/versionNumber.txt`;
    const logPath = `./reports/${serverName}/TestExecutionLog.txt`;

    if (!fs.existsSync(versionFilePath)) {
        throw new Error(`[VersionCheck FAILED] versionNumber.txt not found at ${versionFilePath}`);
    }

    // --------------------------------------------
    // 3. Read stored UI version
    // --------------------------------------------
    let storedVersion = fs.readFileSync(versionFilePath, 'utf8').trim();
    storedVersion = storedVersion.replace(/[^0-9.]/g, '').trim();

    if (!storedVersion) {
        throw new Error('[VersionCheck FAILED] Stored versionNumber.txt is empty or invalid.');
    }

    // --------------------------------------------
    // 4. Compare versions
    // --------------------------------------------
    if (storedVersion !== versionToCheck) {

        const message = `
            [VersionCheck FAILED] VERSION MISMATCH
            Expected: ${versionToCheck}
            Actual:   ${storedVersion}
            `;

        // Append to TestExecutionLog so email script detects FAILURE
        fs.appendFileSync(logPath, message);

        throw new Error(message); // contains the keyword FAILED
    }

    // --------------------------------------------
    // 5. Version is OK
    // --------------------------------------------

    const okMessage = `[VersionCheck] VERSION OK (${storedVersion})\n`;
    fs.appendFileSync(logPath, okMessage);

    console.log(okMessage);
    process.emit('test:log', okMessage);
};
