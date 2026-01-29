import isExisting from '../isExisting';

/**
* Check if the given string appears as a message in the task manager
* @param  {String}   falseCase       Whether to check if the given string is in
* @param  {String}   expectedMessage The string to check for
*/
export default async(falseCase, expectedMessage) => {
    const taskManagerVersionIdentifier = "//div[@class='sectionHeader']/div[contains(.,'In Progress (')]"
    let versionSwitch = await $$(taskManagerVersionIdentifier);
    let messageSelector;
    if (versionSwitch == 0) { 
        messageSelector = "//background-task-manager-task[1]//div[2]/div[3][contains(.,'" + expectedMessage + "')]";
    }
    else {
        messageSelector = "//div[@class='taskRow']/div/div[@class[contains(.,'name')]][contains(.,'" + expectedMessage + "')]";
    }
    let elementToFind = await $$(messageSelector);
    // console.log(falseCase);
    if (elementToFind.length > 0) {
        //Actions of the step
        return true;
    }
    else if ((falseCase != null) && (elementToFind.length == 0)) {
        return true;
    }
    else {
        let screenshotName = 'Task Manager Message-' + expectedMessage + '-NOT-FOUND'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }


};
