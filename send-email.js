/**
 * Final Test Report Email Script (Outlook Relay Version)
 * -----------------------------------------------------
 * Sends test result summaries after automation execution.
 * Compatible with Azure/Jenkins pipelines.
 * Outlook relay is used (port 25, no authentication).
 * Example: node send-email.js .src\features\FeatureXYZ.feature "earley@agilenceinc.com" master Agent-12 --body="Regression suite completed successfully" 
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config({ path: './config/.env' });

// ────────────────────────────────────────────────────────────────
// Utility: Check if file exists safely
// ────────────────────────────────────────────────────────────────
const safeRead = (path) => {
    try {
        return fs.existsSync(path) ? fs.readFileSync(path, 'utf8').trim() : 'N/A';
    } catch {
        return 'N/A';
    }
};

// ────────────────────────────────────────────────────────────────
// Main Execution Block
// ────────────────────────────────────────────────────────────────
try {
    // ─── Resolve Paths and Inputs ───────────────────────────────
    const resultsFolder = safeRead('./reports/reportFolder.txt');
    const status = safeRead(`./reports/${resultsFolder}/SuccessFlag.txt`);
    const version = safeRead(`./reports/${resultsFolder}/versionNumber.txt`);
    const briefing = safeRead(`./reports/${resultsFolder}/TestExecutionLog.txt`);

    const specExecuted = process.argv[2]
        ? process.argv[2].substring(process.argv[2].lastIndexOf('\\') + 1, process.argv[2].lastIndexOf('.'))
        : 'Unknown Spec';

    const emailAddress =
        process.argv[3] !== 'NoEmailAddress'
            ? process.argv[3]
            : 'earley@agilenceinc.com,blipski@agilenceinc.com,nkansagara@agilenceinc.com';

    let server = process.argv[4] !== 'NoServer' ? process.argv[4] : specExecuted;
    const agent = process.argv[5] || 'Unknown Agent';

    const bodyIndex = process.argv.findIndex(arg => arg.startsWith('--body'));
    const emailBody = bodyIndex !== -1 ? process.argv[bodyIndex].split('=')[1] : '';

    // ─── Server Name Normalization ───────────────────────────────
    if (server.indexOf('.') === -1) {
        if (server === 'Smoke-Develop') server = 'autodevelop3.agilenceqa.com';
        else if (server === 'Smoke-Master') server = 'automaster7.agilenceqa.com';
        else server = `Please check the values in the feature file: ${specExecuted}`;
    }

    console.log(`📡 Preparing to send email report`);
    console.log(`🧩 Folder: ${resultsFolder}`);
    console.log(`📨 Recipients: ${emailAddress}`);
    console.log(`💻 Server: ${server}`);
    console.log(`🧾 Version: ${version}`);
    console.log(`👷 Agent: ${agent}`);
    console.log(`📊 Status: ${status}`);

    // ─── Outlook Transporter (No Auth) ───────────────────────────
    const mailTransporter = nodemailer.createTransport({
        host: 'agilenceinc-com.mail.protection.outlook.com',
        port: 25,
        secure: false, // No SSL, internal relay
        tls: {
            rejectUnauthorized: false
        }
    });

    // ─── Build Email Text ────────────────────────────────────────
    let emailText = `
Latest execution of the Agilence Test Automation Framework: ${status}

Feature file executed: ${specExecuted}
Server: ${server}
Version Number: ${version}
QA Agent: ${agent}

Web Application Tests results:
${briefing}
    `.trim();

    if (emailBody) {
        emailText += `\n\nAdditional Information:\n${emailBody}`;
    }

    // ─── Email Details ───────────────────────────────────────────
    const mailDetails = {
        from: 'installvalidation@agilenceinc.com', // Must match relay sender policy
        to: emailAddress,
        subject: `${status} - ${specExecuted} - ${version} - ${agent}`,
        text: emailText
    };

    // Mark as high priority if failed
    if (status.toUpperCase() === 'FAILED') {
        mailDetails.headers = {
            'X-Priority': '1',
            'X-MSMail-Priority': 'High'
        };
    }

    // ─── Send the Email ──────────────────────────────────────────
    mailTransporter.sendMail(mailDetails, (err) => {
        if (err) {
            console.error('❌ Error sending email:', err.message);
        } else {
            console.log('✅ Email sent successfully via Outlook relay.');
        }
    });

} catch (error) {
    console.error('❌ An unexpected error occurred:', error.message);
}
