const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

const showInboxSubjects = async (limit = 10) => {
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

    const foundSubjects = [];

    try {
        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');
        console.log(`📂 INBOX opened successfully`);

        const searchCriteria = ['ALL'];
        const fetchOptions = {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
            struct: true,
            markSeen: false
        };

        const messages = await connection.search(searchCriteria, fetchOptions);
        const recentMessages = messages.slice(-limit);

        for (const message of recentMessages) {
            const headerPart = message.parts.find(part => part.which.startsWith('HEADER'));
            const headers = imaps.getParts(message.attributes.struct)
                .filter(part => part.disposition === null || part.disposition === undefined);

            const subject = headerPart?.body?.subject?.[0] || '(no subject)';
            const from = headerPart?.body?.from?.[0] || '(no sender)';
            const date = headerPart?.body?.date?.[0] || '(no date)';

            const summary = `📧 ${date} | From: ${from} | Subject: ${subject}`;
            console.log(summary);
            foundSubjects.push(summary);
        }

        await connection.end();
        console.log(`✅ Inbox listing completed`);

        return foundSubjects;

    } catch (error) {
        console.error(`❌ Failed to list inbox:`, error.message);
        throw error;
    }
};

module.exports = { showInboxSubjects };
