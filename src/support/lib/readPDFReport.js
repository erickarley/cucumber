import fs from 'fs';
import PDFParser from 'pdf2json';

/**
 * Reads text from a PDF file using pdf2json (CommonJS-safe)
 */
export async function readPDFReport(filePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(this, 1);

    pdfParser.on('pdfParser_dataError', err => reject(err.parserError));
    pdfParser.on('pdfParser_dataReady', pdfData => {
      const text = pdfParser.getRawTextContent();
      resolve(text);
    });

    pdfParser.loadPDF(filePath);
  });
}

/**
 * Validates that the PDF report contains the expected header and section text.
 * Tolerant to spacing, punctuation, case, and currency symbols.
 */
export async function validatePDFReport(filePath, expectedReportName, expectedHeaderText) {
  const text = await readPDFReport(filePath);

  // Normalize spaces and invisible characters
  const normalizedText = text
    .replace(/[\r\n\t]+/g, ' ')   // collapse line breaks and tabs
    .replace(/\s+/g, ' ')         // collapse multiple spaces
    .trim();

  // Always save to debug
  fs.writeFileSync('./downloads/LastParsedReport.txt', normalizedText);

  // --- Validate report title (case-insensitive)
  const titleRegex = new RegExp(
    expectedReportName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'i'
  );
  if (!titleRegex.test(normalizedText)) {
    throw new Error(`❌ Report header missing: expected "${expectedReportName}"`);
  }

  // --- Flexible header validation
  // Example: "Order Total" should match "Order   Total", "Order Total ($)", "Order-Total$"
  const headerPattern = expectedHeaderText
    .split(/\s+/)
    .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('[\\s\\$\\(\\)\\.,:;_\\-]*');

  const headerRegex = new RegExp(headerPattern, 'i');

  if (!headerRegex.test(normalizedText)) {
    console.log('📝 PDF text saved to downloads/LastParsedReport.txt for inspection');
    throw new Error(`❌ Expected content header missing or slightly different: "${expectedHeaderText}"`);
  }

  console.log(`✅ Report "${expectedReportName}" contains expected header "${expectedHeaderText}"`);
}
