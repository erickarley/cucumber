const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

const checkReportEmail = async (expectedReportName, timeout = 30000) => {
    // console.log('📩 [checkReportEmail] ⏳ Starting email check...');

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
        console.log('📩 INBOX opened');
    } catch (err) {
        console.error('❌ IMAP connection failed:', err.message);
        throw err;
    }

    while (Date.now() < endTime) {
        const searchCriteria = ['UNSEEN'];
        const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: true
        };

        try {
            const messages = await connection.search(searchCriteria, fetchOptions);
            for (const message of messages) {
                const textPart = message.parts.find(part => part.which === 'TEXT');
                const parsed = await simpleParser(textPart.body);

                const body = parsed.text || '';
                if (body.includes(expectedReportName)) {
                    console.log('✅ Email with expected report found!');

                    // Extract Report Name
                    const reportNameMatch = body.match(/Report Name:\s*(.*)/);
                    const reportName = reportNameMatch ? reportNameMatch[1].trim() : '(not found)';

                    // Extract Server URL
                    const urlMatch = body.match(/https?:\/\/([^\s]+)/);
                    const server = urlMatch ? urlMatch[1].trim() : '(server not found)';

                    console.log(`📄 Report Name: ${reportName}`);
                    console.log(`🌐 Server: ${server}`);

                    await connection.end();
                    return { reportName, server };
                }
            }
        } catch (err) {
            console.error('❌ Error reading messages:', err.message);
        }

        await delay(5000);
    }

    await connection.end();
    throw new Error(`❌ Email with report "${expectedReportName}" not found in inbox within timeout`);
};

module.exports = checkReportEmail;
