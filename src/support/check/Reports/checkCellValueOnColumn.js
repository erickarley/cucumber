import checkAvailability from '../Common/checkAvailability';

/**
 * Check the cellValue of a row with a given header text for desired row
 * @param  {String}   headerText The header to check
 * @param  {Number}   rowToCheck The row to check
 */
export default async (headerText, rowToCheck) => {

    // Ensure overlays are handled before proceeding
    await checkAvailability();
    /**
     * The column name selector
     * @type {String}
     */
    const rowToCheckSelector = "//tr[" + rowToCheck + "]/td[@role='gridcell']";

    let elementToFind = await $$(rowToCheckSelector);
    let cellValue = '';
    if (elementToFind.length > 2) {
        // Get the cellValue of the report
        let elementToFind2 = await $$("//th//span[.='"+ headerText + "']/ancestor::div[@id='report-grid']//tr[" + rowToCheck + "]/td[count(//*[@class='middle-display-name'])][@role='gridcell']");
        if (elementToFind2.length > 0)
            cellValue = await $("//th//span[.='"+ headerText + "']/ancestor::div[@id='report-grid']//tr[" + rowToCheck + "]/td[count(//*[@class='middle-display-name'])][@role='gridcell']//span").getText();
        else
            cellValue = await $("//tr[" + rowToCheck + "]/td[count(//th[.='"+ headerText + "']/preceding-sibling::th)+1][@role='gridcell']").getText();
    
        // console.log("Cellvalue: " + cellValue);
        if (cellValue.length > 1) 
            expect(parseInt(cellValue.replace(/,/g, ''))).toBeGreaterThan(0, 'ERROR: Total on Report Was 0');
        else {
            cellValue = 'No data found. Check the report'
            throw new Error("Please check Report. No Data Found");
        }
    }
    else {
        console.log('Error: Report has no content in row: ' + rowToCheck);
        cellValue = 'No data found. Check the report'
        throw new Error("Please check Report. No Data Found");
    }    
    var fs = require('fs');
    let reportFolder = '';
    let server = ''; 
    let serverParam = process.argv.find(arg => arg.startsWith('server='));
    if (serverParam) {
        // Extract the server value
        server = serverParam.split('=')[1];
        console.log(`Server: ${server}`);
    } else {
        console.log('No server parameter provided.');
    }
    reportFolder = server; 
    try {
        fs.writeFileSync('./reports/' + reportFolder + '/TotalOnReport.txt', cellValue, function (err) {
        });
    } catch(err) {
        console.error("Total on Report error: " + err.message);
        throw new Error("Errors on Total from Report");
    }
};
