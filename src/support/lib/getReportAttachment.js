const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const path = require('path');

/**
 * Downloads a PDF or Excel report from Gmail.
 * 
 * @param {string} expectedReportName - Partial subject text to identify the email.
 * @param {string} expectedFileType - 'pdf' or 'excel' (xls/xlsx).
 * @param {number} timeout - Time limit in ms (default 60000).
 * @returns {Promise<string>} The local file path of the downloaded attachment.
 */
module.exports = async function getReportAttachment(expectedReportName, expectedFileType = 'pdf', timeout = 60000) {
  console.log(`📩 [getReportAttachment] Searching Gmail for "${expectedReportName}" expecting ${expectedFileType.toUpperCase()}...`);

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
  let foundFilePath = null;

  async function connectIMAP() {
    const conn = await imaps.connect(config);
    await conn.openBox('INBOX');
    console.log('📥 INBOX opened successfully');
    return conn;
  }

  try {
    connection = await connectIMAP();

    while (Date.now() < endTime && !foundFilePath) {
      try {
        const searchCriteria = ['ALL'];
        const fetchOptions = {
          bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
          struct: true,
          markSeen: false
        };

        const messages = await connection.search(searchCriteria, fetchOptions);
        console.log(`📬 Gmail returned ${messages.length} messages`);

        const candidates = messages.filter(m => {
          const headerPart = m.parts.find(p => p.which.startsWith('HEADER'));
          const subject = headerPart?.body?.subject?.[0] || '';
          const from = headerPart?.body?.from?.[0] || '';
          return (
            from.toLowerCase().includes('reporting@agilenceinc.com') &&
            subject.toLowerCase().includes(expectedReportName.toLowerCase())
          );
        });

        console.log(`🎯 Filtered ${candidates.length} matching candidates`);

        for (const m of candidates) {
          const uid = m.attributes.uid;
          await delay(500);

          const rawMessage = await new Promise((resolve, reject) => {
            let raw = '';
            try {
              const fetcher = connection.imap.fetch([uid], { bodies: [''], struct: true, markSeen: true });
              fetcher.on('message', msg => {
                msg.on('body', stream => {
                  stream.on('data', chunk => (raw += chunk.toString('utf8')));
                });
              });
              fetcher.once('error', reject);
              fetcher.once('end', () => resolve(raw));
            } catch (err) {
              reject(err);
            }
          });

          if (!rawMessage) continue;

          const parsed = await simpleParser(rawMessage);
          const attachments = parsed.attachments || [];

          for (const att of attachments) {
            const filename = att.filename || 'UnnamedAttachment';
            const ext = path.extname(filename).toLowerCase();
            const isExpectedType =
              (expectedFileType.toLowerCase() === 'pdf' && ext === '.pdf') ||
              (expectedFileType.toLowerCase() === 'excel' && ['.xls', '.xlsx'].includes(ext));

            if (isExpectedType) {
              const folder = './downloads';
              if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
              const filePath = path.join(folder, filename);
              fs.writeFileSync(filePath, att.content);
              console.log(`💾 Saved to ${filePath}`);
              foundFilePath = filePath;
              break;
            }
          }

          if (foundFilePath) break;
        }

        if (!foundFilePath) {
          console.log('⏳ No matching attachment yet, retrying...');
          await delay(5000);
        }
      } catch (err) {
        console.error(`⚠️ IMAP read error: ${err.message}`);
        if (err.message.includes('This socket has been ended')) {
          console.log('♻️ Reconnecting to Gmail...');
          try { if (connection) await connection.end(); } catch (_) {}
          connection = await connectIMAP();
        }
        await delay(3000);
      }
    }
  } finally {
    try {
      if (connection) await connection.end();
    } catch (err) {
      console.warn('⚠️ Error closing IMAP connection:', err.message);
    }
  }

  if (!foundFilePath) {
    throw new Error(`❌ No Gmail email for "${expectedReportName}" with a ${expectedFileType.toUpperCase()} attachment found within ${timeout / 1000}s.`);
  }

  console.log(`✅ Found and saved: ${foundFilePath}`);
  return foundFilePath;
};
