import fs from 'fs';

/**
 * Extracts and saves the version number of the app into a file and shared variable.
 */
export default async () => {

    // Best selector for the version line
    const versionSelector = "//div[contains(@class,'about-padding')][contains(text(),'Version')]";

    // Wait until element appears
    await browser.waitUntil(
        async () => (await $(versionSelector).isDisplayed()),
        {
            timeout: 15000,
            timeoutMsg: '[saveVersionNumber FAILED] Version text not found on About page'
        }
    );

    const rawVersionText = await $(versionSelector).getText();

    let extractedVersion;

    // Format: "Version: 2.13.1.92398"
    if (rawVersionText.includes(':')) {
        extractedVersion = rawVersionText.split(':')[1].trim();
    } else {
        extractedVersion = rawVersionText;
    }

    // Normalize to pure numeric version
    extractedVersion = extractedVersion.replace(/[^0-9.]/g, '').trim();

    // console.log("Extracted version:", extractedVersion);

    // Store globally
    global.versionNumber = extractedVersion;
    process.emit('test:log', extractedVersion);

    // Determine report folder based on CLI args
    const serverParam = process.argv.find(arg => arg.startsWith('server='));
    let serverName = serverParam ? serverParam.split('=')[1] : 'unknown';

    const folderPath = `./reports/${serverName}`;
    const filePath   = `${folderPath}/versionNumber.txt`;

    try {
        fs.mkdirSync(folderPath, { recursive: true });
        fs.writeFileSync(filePath, extractedVersion);
        console.log(`Version number saved to: ${filePath}`);
    } catch (err) {
        console.error("Failed to save version number:", err.message);
        throw new Error("Failed to save version number.");
    }
};
