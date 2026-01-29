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
        if (fs.existsSync('./src/support/constants/' + objectType + 'SingleSystemTemplate.feature')) {
            templateToUse = fs.readFileSync('./src/support/constants/' + objectType + 'SingleSystemTemplate.feature');
        }
    } catch(err) {
        console.error("Template file for " + objectType + " had an error: " + err.message);
        throw new Error("Template file for " + objectType + " had an error");
    }   
    if (templateToUse === undefined) {
        console.log("Empty or nonexistent file for " + objectType );
    }
    let userArguments = process.argv;

    try {
        const hasServer = (element) => element.indexOf('server') !== -1;
        const serverParamIndex = userArguments.findIndex(hasServer);
        // 7 is the first character to read considering the length of the word "server:""
        let environmentURL = userArguments[serverParamIndex].substring(7);
    } catch(err) {
        console.error("Single system Server 1 not specified " + err.message);
        throw new Error("Single system Server 1 not specified " + err.message);
    }   

    try {
        const hasUser = (element) => element.indexOf('user') !== -1;
        const userParamIndex = userArguments.findIndex(hasUser);
        // 5 is the first character to read considering the length of the word "user:""
        let userName = userArguments[userParamIndex].substring(5);
    } catch(err) {
        console.error("User for Single system tests not specified " + err.message);
        throw new Error("User for Single system tests not specified " + err.message);
    }   

    try {
        const hasPassword = (element) => element.indexOf('password') !== -1;
        const passwordParamIndex = userArguments.findIndex(hasPassword);
        // 8 is the first character to read considering the length of the word "password:""
        let password = userArguments[passwordParamIndex].substring(9);
    } catch(err) {
        console.error("Password for Single system tests not specified " + err.message);
        throw new Error("Password for Single system tests not specified " + err.message);
    }   
    
    for (let objectId in tableContent) {
        templateToUse = templateToUse + "\n\t\t\| \"" + tableContent[objectId] + "\" \|";
    }
    console.log(templateToUse);
    fs.writeFileSync('./src/features/comparisons/' + objectType + 'SingleSystem.feature', templateToUse, function (err) {
    });

};
