const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const path = require('path');

const checkReportAttachment = async (expectedReportName, expectedFileType, timeout = 60000) => {
    // console.log(`📩 [checkReportAttachment] ⏳ Looking for "${expectedReportName}" email expecting a ${expectedFileType.toUpperCase()} attachment...`);

    const config = {
        imap: {
            user: process.env.TEST_EMAIL_USER,
            password: process.env.TEST_EMAIL_PASS,
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            authTimeout: 10000,
            tlsOptions: { rejectUnauthorized: false }
        }
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const endTime = Date.now() + timeout;
    let connection;

    try {
        connection = await imaps.connect(config);
        await connection.openBox('INBOX');
        console.log('📥 INBOX opened');
    } catch (err) {
        throw new Error(`❌ Failed to connect to Gmail: ${err.message}`);
    }

    while (Date.now() < endTime) {
        const searchCriteria = ['UNSEEN'];
        const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true, markSeen: true };

        try {
            const messages = await connection.search(searchCriteria, fetchOptions);

            for (const message of messages) {
                const textPart = message.parts?.find(p => p.which === 'TEXT');
                if (!textPart) continue;

                const raw = await connection.getPartData(message, textPart);
                const parsed = await simpleParser(raw);

                const body = parsed.text || '';
                const subject = parsed.subject || '';
                const attachments = parsed.attachments || [];

                if (subject.includes(expectedReportName) || body.includes(expectedReportName)) {
                    console.log(`✅ Found matching email for "${expectedReportName}"`);

                    const reportNameMatch = body.match(/Report Name:\s*(.*)/);
                    const reportName = reportNameMatch ? reportNameMatch[1].trim() : expectedReportName;

                    const urlMatch = body.match(/https?:\/\/([^\s]+)/);
                    const server = urlMatch ? urlMatch[1].trim() : '(server not found)';

                    // --- Assertions ---
                    if (!attachments.length) {
                        throw new Error(`❌ No attachments found in the "${expectedReportName}" email.`);
                    }

                    // Determine expected extensions
                    const type = expectedFileType.toLowerCase();
                    let expectedExtensions = [];
                    if (type === 'pdf') expectedExtensions = ['.pdf'];
                    else if (type === 'excel' || type === 'xlsx' || type === 'xls')
                        expectedExtensions = ['.xls', '.xlsx'];
                    else throw new Error(`❌ Unsupported file type "${expectedFileType}". Use "PDF" or "Excel".`);

                    let foundExpected = false;
                    for (const attachment of attachments) {
                        const fileName = attachment.filename || '(unnamed file)';
                        const ext = path.extname(fileName).toLowerCase();
                        console.log(`📎 Attachment: ${fileName}`);

                        if (fileName.includes(reportName)) {
                            if (expectedExtensions.includes(ext)) {
                                console.log(`✅ Attachment type matches expected ${expectedFileType.toUpperCase()}`);
                                foundExpected = true;

                                // Optional: save attachment for evidence
                                const folder = './downloads';
                                if (!fs.existsSync(folder)) fs.mkdirSync(folder);
                                const filePath = path.join(folder, fileName);
                                fs.writeFileSync(filePath, attachment.content);
                                console.log(`💾 Saved to ${filePath}`);
                            } else {
                                console.warn(`⚠️ Attachment has wrong format: ${ext}`);
                            }
                        } else {
                            console.warn(`⚠️ Attachment name does not match report name (${reportName})`);
                        }
                    }

                    if (!foundExpected) {
                        throw new Error(`❌ No ${expectedFileType.toUpperCase()} attachment found for "${expectedReportName}".`);
                    }

                    console.log(`🎯 Email validated successfully for "${expectedReportName}" (${expectedFileType.toUpperCase()})`);
                    await connection.end();
                    return { reportName, server };
                }
            }
        } catch (err) {
            console.error('❌ Error while reading messages:', err.message);
        }

        await delay(5000);
    }

    await connection.end();
    throw new Error(`❌ Email with report "${expectedReportName}" not found within timeout`);
};

module.exports = checkReportAttachment;
