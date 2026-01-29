const imaps = require('imap-simple');
require('dotenv').config();

(async () => {
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

  try {
    const connection = await imaps.connect(config);
    const boxes = await connection.getBoxes();

    console.log('📦 Mailboxes available via IMAP:');
    printBoxes(boxes);
    await connection.end();
  } catch (err) {
    console.error('❌ IMAP error:', err.message);
  }
})();

/**
 * Recursively prints all mailbox names and their hierarchy.
 */
function printBoxes(boxes, indent = '') {
  for (const name in boxes) {
    console.log(`${indent}- ${name}`);
    if (boxes[name].children) {
      printBoxes(boxes[name].children, indent + '  ');
    }
  }
}
