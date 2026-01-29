/**
 * File to upload
 * @param {String}      fileName     The name of File to upload
 */

export default async(fileName) => {
    const path = require('path');
    
    const fileUploadControl = await $("//*[@id='imageFile']");

    browser.execute(
        // assign style to elem in the browser
        (el) => el.style.visibility = 'visible',
        // pass in element so we don't need to query it again in the browser
        fileUploadControl
    );
    browser.execute(
        // assign style to elem in the browser
        (el) => el.style.display = 'block',
        // pass in element so we don't need to query it again in the browser
        fileUploadControl
    );
    //fileUploadControl.waitForDisplayed();

    // const filePath = path.join(__dirname, '../../../../../filesToUse/ImportHierarchyBaseFile.csv');
    // const remoteFilePath = browser.uploadFile(filePath);
    // await $("//*[@id='imageFile']").setValue(remoteFilePath);
    
    // /**
    //  * Selector for the upload button
    //  * @type {String}
    //  */
    // const fileUploadControl = await $("//*[@id='imageFile']");

    // browser.execute(
    //     // assign style to elem in the browser
    //     (el) => el.style = 'block',
    //     // pass in element so we don't need to query it again in the browser
    //     fileUploadControl
    // );
    // fileUploadControl.waitForDisplayed();
    
    // const path = require('path');

    const filePath = path.join(__dirname, '../../../../../filesToUse/ImportHierarchyBaseFile.csv');
    fileUploadControl.setValue(filePath);
}