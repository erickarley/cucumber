const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

const checkInboxForEmail = async (expectedSubject, timeout = 30000) => {
    console.log('📩 [checkInboxForEmail] ⏳ Starting email check...');
    console.log(`📩 [checkInboxForEmail] 🔍 Looking for subject containing: "${expectedSubject}"`);
    console.log(`📩 [checkInboxForEmail] 🕒 Timeout set to: ${timeout} ms`);

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

    if (!config.imap.user || !config.imap.password) {
        throw new Error('❌ Email credentials missing: TEST_EMAIL_USER or TEST_EMAIL_PASS not set');
    }

    let connection;
    try {
        connection = await imaps.connect(config);
        console.log('📩 [checkInboxForEmail] ✅ Connected to IMAP server');
        await connection.openBox('INBOX');
        console.log('📩 [checkInboxForEmail] 📂 INBOX opened');
    } catch (err) {
        console.error('📩 [checkInboxForEmail] ❌ Failed to connect or open INBOX:', err.message);
        throw err;
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const endTime = Date.now() + timeout;
    let checkCount = 0;

    while (Date.now() < endTime) {
        checkCount++;
        console.log(`📩 [checkInboxForEmail] 🔄 Check #${checkCount} for unseen messages...`);

        try {
            const searchCriteria = ['UNSEEN'];
            const fetchOptions = {
                bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
                struct: true,
                markSeen: true
            };

            const messages = await connection.search(searchCriteria, fetchOptions);
            console.log(`📩 [checkInboxForEmail] 📬 Found ${messages.length} unseen message(s)`);

            for (const message of messages) {
                const headerPart = message.parts.find(part => part.which.startsWith('HEADER'));
                const subject = headerPart?.body?.subject?.[0] || '';
                console.log(`📩 [checkInboxForEmail] 📨 Found email with subject: "${subject}"`);

                if (subject.includes(expectedSubject)) {
                    console.log('📩 [checkInboxForEmail] ✅ Matching email found!');
                    await connection.end();
                    return subject;
                }
            }
        } catch (err) {
            console.error('📩 [checkInboxForEmail] ❌ Error during email parsing or search:', err.message);
        }

        await delay(5000);
    }

    await connection.end();
    const errorMessage = `📩 [checkInboxForEmail] ❌ Email with subject "${expectedSubject}" not received within timeout.`;
    console.error(errorMessage);
    throw new Error(errorMessage);
};

module.exports = checkInboxForEmail;
