/**
 * Builds dashboards, reports or queries dynamically. 
 * @param  {String}     objectType      dashboards, queries or reports
 */
export default async(objectType) => {
    
    let tableContent = await browser.sharedStore.get(objectType);
    console.log(tableContent);

    var fs = require('fs');
    let templateToUse;
    try {
        if (fs.existsSync('./src/support/constants/' + objectType + 'ComparisonTemplate.feature')) {
            templateToUse = fs.readFileSync('./src/support/constants/' + objectType + 'ComparisonTemplate.feature');
        }
    } catch(err) {
        console.error("Template file for " + objectType + " had an error: " + err.message);
        throw new Error("Template file for " + objectType + " had an error");
    }   
    if (templateToUse === undefined) {
        console.log("Empty or nonexistent file for " + objectType );
    }

    for (let objectId in tableContent) {
        templateToUse = templateToUse + "\n\t\t\| \"" + tableContent[objectId] + "\" \|";
    }
    console.log(templateToUse);
    fs.writeFileSync('./src/features/comparisons/' + objectType + 'Comparison.feature', templateToUse, function (err) {
    });

};
