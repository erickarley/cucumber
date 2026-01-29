/**
 * @description Sends post-update validation email via Outlook relay (no auth).
 * Designed for CI/CD and WebDriverIO automation environments.
 * Example:
 * node .\send-email-itops.js .src\features\Feature01.feature "earley@agilenceinc.com" base Agent-07 --body="Smoke tests completed successfully" v2025.10.09
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config({ path: './config/.env' });

/**
 * Utility: Check if file exists
 */
const fileExists = (path) => fs.existsSync(path);

/**
 * Utility: Highlight PASS/FAIL/ERROR in HTML
 */
const highlightStatus = (text) =>
    text
        .replace(/FAILED/gi, '<span style="color: red; font-weight: bold;">FAILED</span>')
        .replace(/ERROR/gi, '<span style="color: red; font-weight: bold;">ERROR</span>')
        .replace(/PASSED/gi, '<span style="color: green; font-weight: bold;">PASSED</span>')
        .replace(/SUCCESS/gi, '<span style="color: green; font-weight: bold;">SUCCESS</span>')
        .replace(/VERSION MISMATCH/gi, '<span style="color: red; font-weight: bold;">VERSION MISMATCH</span>')
        .replace(/VERSION OK/gi, '<span style="color: green; font-weight: bold;">VERSION OK</span>');

/**
 * Outlook SMTP relay (no auth)
 */
const outlookTransporter = nodemailer.createTransport({
    host: 'agilenceinc-com.mail.protection.outlook.com',
    port: 25,
    secure: false,
    tls: { rejectUnauthorized: false }
});

/**
 * Main sender
 */
async function main() {
    try {
        const server = process.argv[4];
        const resultsPath = `./reports/${server}`;
        console.log(`📡 Environment: ${server}`);

        const specExecuted = process.argv[2]?.substring(
            process.argv[2].lastIndexOf('\\') + 1,
            process.argv[2].lastIndexOf('.')
        ) || 'Unknown Spec';

        const emailAddress =
            process.argv[3] !== 'NoEmailAddress'
                ? process.argv[3]
                : 'earley@agilenceinc.com,blipski@agilenceinc.com,nkansagara@agilenceinc.com';

        const agent = process.argv[5] || 'Unknown Agent';
        const versionToCheck = process.argv[7] || 'Not provided';

        const emailBodyArg = process.argv.find(arg => arg.startsWith('--body'));
        const emailBody = emailBodyArg ? emailBodyArg.split('=')[1] : '';

        // ───────────────────────────────
        // Read Result Files
        // ───────────────────────────────
        let status = 'UNKNOWN';
        let version = versionToCheck;
        let briefing = '';
        let totalOnReport = 'N/A';

        if (fileExists(`${resultsPath}/SuccessFlag.txt`)) {
            status = fs.readFileSync(`${resultsPath}/SuccessFlag.txt`, 'utf8').trim();
        }

        if (fileExists(`${resultsPath}/versionNumber.txt`)) {
            version = fs.readFileSync(`${resultsPath}/versionNumber.txt`, 'utf8').trim();
        } else {
            version = 'No Version File Found';
        }

        if (fileExists(`${resultsPath}/TestExecutionLog.txt`)) {
            briefing = fs.readFileSync(`${resultsPath}/TestExecutionLog.txt`, 'utf8');
        }

        if (fileExists(`${resultsPath}/TotalOnReport.txt`)) {
            totalOnReport = fs.readFileSync(`${resultsPath}/TotalOnReport.txt`, 'utf8').trim();
        }

        // ───────────────────────────────
        // FAILED/ERROR detection from logs
        // ───────────────────────────────
        const combinedText = `${briefing}\n${emailBody}`.toUpperCase();

        if (combinedText.includes('FAILED') || combinedText.includes('ERROR')) {
            console.log('⚠️ Log contains FAILED or ERROR — marking overall status as FAILED.');
            status = 'FAILED';
        } else if (status.toUpperCase() === 'SUCCESS') {
            status = 'PASSED';
        } else if (!status || status === 'UNKNOWN') {
            console.warn('⚠️ No explicit SuccessFlag found; status remains UNKNOWN.');
        }

        // ───────────────────────────────
        // Version Comparison Logic
        // ───────────────────────────────
        let versionMessage = 'Version check skipped';
        let versionMismatchDetected = false;

        if (versionToCheck !== 'Not provided' && version !== 'No Version File Found') {
            if (version.trim() === versionToCheck.trim()) {
                versionMessage = 'VERSION OK';
            } else {
                versionMessage = `VERSION MISMATCH (Expected ${versionToCheck}, Got ${version})`;
                versionMismatchDetected = true;

                console.warn(`⚠️ VERSION MISMATCH — Expected: ${versionToCheck}, Got: ${version}`);
            }
        }

        // ───────────────────────────────
        // NEW RULE: Version mismatch forces overall FAILED
        // ───────────────────────────────
        if (versionMismatchDetected) {
            status = 'FAILED';
            console.log('❌ Version mismatch detected — setting overall status to FAILED.');
        }

        // ───────────────────────────────
        // Build HTML Email Body
        // ───────────────────────────────
        const emailHtml = `
            <p><b>${server}</b> tests have ${highlightStatus(status)}.</p>
            <p>
                <b>Agent:</b> ${agent}<br>
                <b>Spec Executed:</b> ${specExecuted}<br>
                <b>Expected Version:</b> ${versionToCheck}<br>
                <b>Actual Version:</b> ${version}<br>
                <b>Version Check:</b> ${highlightStatus(versionMessage)}<br>
                <b>Total 1 Week Transaction Count:</b> ${totalOnReport}
            </p>
            <p>🔗 <a href="https://${server}/reporting/account/logon">Open ${server} Manually</a></p>
            ${briefing ? `<p><b>Execution Log:</b></p><pre>${highlightStatus(briefing.replace(/\n/g, '<br>'))}</pre>` : ''}
            ${emailBody ? `<p><b>Additional Notes:</b></p><pre>${highlightStatus(emailBody.replace(/\n/g, '<br>'))}</pre>` : ''}
        `;

        // ───────────────────────────────
        // Mail Options
        // ───────────────────────────────
        const mailDetails = {
            from: 'installvalidation@agilenceinc.com',
            to: emailAddress,
            subject: `Post Update Validation: ${status} - ${server} - ${version}`,
            html: emailHtml
        };

        console.log(`📨 Sending report to: ${emailAddress}`);
        console.log(`🧾 Subject: ${mailDetails.subject}`);

        // ───────────────────────────────
        // Send Email
        // ───────────────────────────────
        await outlookTransporter.sendMail(mailDetails);
        console.log('✅ Email sent successfully via Outlook relay.');

    } catch (error) {
        console.error('❌ Error while sending Outlook email:', error.message);
    }
}

main();
