import fs from "fs";
import XLSX from "xlsx";

/**
 * Reads all visible text from an Excel file (.xls/.xlsx).
 */
export async function readExcelReport(filePath) {
  const workbook = XLSX.readFile(filePath);

  // Convert every sheet to a CSV-like string
  const combinedText = workbook.SheetNames
    .map(sheetName => XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]))
    .join("\n");

  // Normalize invisible chars (line breaks, tabs, etc.)
  const normalizedText = combinedText
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Save for debugging or inspection
  fs.writeFileSync("./downloads/LastParsedExcel.txt", normalizedText);

  return normalizedText;
}

/**
 * Validates that the Excel report contains the expected report name and header text.
 * Uses same flexible rules as your PDF validator.
 */
export async function validateExcelReport(filePath, expectedReportName, expectedHeaderText) {
  const text = await readExcelReport(filePath);

  // --- Validate report title (case-insensitive)
  const titleRegex = new RegExp(
    expectedReportName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    "i"
  );
  if (!titleRegex.test(text)) {
    throw new Error(`❌ Excel report title missing: expected "${expectedReportName}"`);
  }

  // --- Flexible header validation (e.g., "Order Total" ~ "Order   Total ($)")
  const headerPattern = expectedHeaderText
    .split(/\s+/)
    .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("[\\s\\$\\(\\)\\.,:;_\\-]*");

  const headerRegex = new RegExp(headerPattern, "i");

  if (!headerRegex.test(text)) {
    console.log("📝 Excel text saved to downloads/LastParsedExcel.txt for inspection");
    throw new Error(`❌ Expected Excel header missing or slightly different: "${expectedHeaderText}"`);
  }

  console.log(`✅ Excel report "${expectedReportName}" contains expected header "${expectedHeaderText}"`);
}
