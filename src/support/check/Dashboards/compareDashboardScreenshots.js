import pause from '../../action/pause';
import { bigPause, extraLongPause, mediumPause } from '../../constants';
import fs from 'fs-extra';
import resemble from 'resemblejs';
import Tesseract from 'tesseract.js';
import getServerParam from '../../lib/getServerParam';

import { MAX_VISUAL_DIFFERENCE, MIN_TEXT_SIMILARITY } from '../../config/comparisonSettings.js';

/**
 * Check the data of the table on a specific cell
 * @param  {String}     numberOfPreviousDashboard   Id of the query stored
 */
export default async (numberOfPreviousDashboard) => {
    try {
        let currentUrl = (await browser.getUrl()).replace(/http(s?):\/\//, '');
        console.log(currentUrl);
        
        let domain = `${currentUrl.split('/')[0]}`.replace(':', '-port');

        let userArguments = process.argv;
        const hasServer = (element) => element.indexOf('server') !== -1;
        const serverParamIndex = userArguments.findIndex(hasServer);
        let environmentURL = userArguments[serverParamIndex].substring(7);
        let previousSystem = environmentURL.replace(':', '-port');

        let keyName1 = `Dashboard-${numberOfPreviousDashboard}-${previousSystem}`;
        let keyName2 = `Dashboard-${numberOfPreviousDashboard}--${domain}`;

        // let screenshotsFolder = await browser.sharedStore.get('screenshotsFolder');
        const screenshotsFolder = getServerParam();
        console.log(screenshotsFolder);

        // Report file setup
        const reportDir = `./reports/${screenshotsFolder}`;
        const reportPath = `${reportDir}/comparison_report.txt`;
        fs.ensureDirSync(reportDir);
        if (!fs.existsSync(reportPath)) {
            fs.writeFileSync(reportPath, `📊 Dashboard Comparison Report - ${new Date().toLocaleString()}\n\n`, { flag: 'a' });
        }

        const section = await $('#dashboard-container'); 
        const newScreenshotPath = `./ScreenShots/${screenshotsFolder}/${keyName2}.png`;
        await section.saveScreenshot(newScreenshotPath);
        console.log('📸 Dashboard Section screenshot saved!');
        
        const previousScreenshotPath = `./ScreenShots/${screenshotsFolder}/${keyName1}.png`;
        const diffScreenshotPath = `./ScreenShots/${screenshotsFolder}/Dashboard-${numberOfPreviousDashboard}-diff.png`;

        pause(bigPause);

        if (!fs.existsSync(previousScreenshotPath)) {
            console.error(`❌ Previous screenshot not found: ${previousScreenshotPath}`);
            fs.appendFileSync(reportPath, `Dashboard "${numberOfPreviousDashboard}" - Status: FAILED (Previous Screenshot Not Found)\n`);
            return; // Prevents script from throwing and stopping execution
        }

        console.log('🔍 Comparing screenshots using Resemble.js...');
        
        let visualMismatch = 0;
        let status = "PASSED"; // Default status
        let ocrSimilarity = 1; // Default similarity to 100%

        await new Promise((resolve) => {
            resemble(previousScreenshotPath)
                .compareTo(newScreenshotPath)
                .ignoreAntialiasing()
                .ignoreColors()
                .scaleToSameSize()
                .outputSettings({
                    errorType: "movement",
                    errorColor: { red: 255, green: 0, blue: 255 },
                    transparency: 0.3,
                    largeImageThreshold: 1200,
                })
                .onComplete(async (data) => {
                    visualMismatch = parseFloat(data.misMatchPercentage);
                    console.log(`Visual Mismatch Percentage: ${visualMismatch.toFixed(2)}%`);

                    if (visualMismatch > MAX_VISUAL_DIFFERENCE) {                        console.log("🔍 DETECTED VISUAL DIFFERENCES IN SCREENSHOTS");
                        if (data.getImageDataUrl) {
                            const base64Data = data.getImageDataUrl().replace(/^data:image\/png;base64,/, "");
                            fs.writeFileSync(diffScreenshotPath, base64Data, "base64");
                            console.log(`🔍 Difference image saved as: ${diffScreenshotPath}`);
                        } else {
                            console.error("❌ Error: No diff image available.");
                        }
                        status = "FAILED";
                    } else {
                        console.log("✅ The section is visually similar!");
                    }

                    // **Text Comparison**
                    try {
                        ocrSimilarity = await compareText(previousScreenshotPath, newScreenshotPath);
                        if (ocrSimilarity < MIN_TEXT_SIMILARITY) {
                            console.error("❌ TEXT CONTENT IS DIFFERENT!");
                            status = "FAILED";
                        }
                    } catch (error) {
                        console.error("❌ OCR Error:", error);
                        status = "FAILED";
                    }

                    // ✅ **Always Append Result to Report**
                    fs.appendFileSync(reportPath, 
                        `Dashboard "${numberOfPreviousDashboard}" - Status: ${status}\n` +
                        `  🔍 Visual Difference: ${visualMismatch.toFixed(2)}%\n` +
                        `  🔤 OCR Similarity: ${(ocrSimilarity * 100).toFixed(2)}%\n` +
                        `  🔧 Thresholds => Visual < ${MAX_VISUAL_DIFFERENCE}%, OCR ≥ ${(MIN_TEXT_SIMILARITY * 100).toFixed(0)}%\n\n`
                    );


                    resolve();
                });
        });

        pause(bigPause);
    } catch (error) {
        console.error(`❌ Unexpected Error in Dashboard "${numberOfPreviousDashboard}":`, error);
        fs.appendFileSync(`./reports/${screenshotsFolder}/comparison_report.txt`, 
            `Dashboard "${numberOfPreviousDashboard}" - Status: FAILED (Unexpected Error: ${error.message})\n\n`
        );
    }
};

/**
 * Extract text from an image using OCR
 */
async function extractText(imagePath) {
    if (!fs.existsSync(imagePath)) {
        console.error(`❌ Image not found: ${imagePath}`);
        return null;
    }

    console.log(`🔍 Extracting text from: ${imagePath}`);
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,.',
        tessedit_pageseg_mode: 6
    });

    return text.trim()
        .replace(/\s+/g, ' ')
        .replace(/[\r\n]+/g, ' ')
        .toLowerCase(); 
}

/**
 * Compare extracted text from two images
 */
async function compareText(previousImage, currentImage) {
    try {
        const text1 = await extractText(previousImage);
        const text2 = await extractText(currentImage);

        if (!text1 || !text2) {
            console.error("❌ Error extracting text from one or both images.");
            return 0; // Return lowest similarity to indicate failure
        }

        const similarity = textSimilarity(text1, text2);
        console.log(`🔤 OCR Similarity: ${(similarity * 100).toFixed(2)}%`);
        return similarity;
    } catch (error) {
        console.error("❌ OCR Error:", error);
        return 0;
    }
}

/**
 * Calculate text similarity
 */
function textSimilarity(str1, str2) {
    const lev = (a, b) => {
        let tmp;
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        if (a.length > b.length) tmp = a, a = b, b = tmp;
        const row = Array(a.length + 1).fill().map((_, i) => i);
        for (let i = 1; i <= b.length; i++) {
            let prev = i;
            for (let j = 1; j <= a.length; j++) {
                let val;
                if (b[i - 1] === a[j - 1]) val = row[j - 1];
                else val = Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
                row[j - 1] = prev;
                prev = val;
            }
            row[a.length] = prev;
        }
        return row[a.length];
    };
    
    return 1 - (lev(str1, str2) / Math.max(str1.length, str2.length));
}
