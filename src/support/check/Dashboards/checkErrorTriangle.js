export default async () => {
    
    let objectToCheck = await $$("//button[@class='stats-error md-button md-ink-ripple']");

    if (objectToCheck.length == 0) {
        expect(objectToCheck.length).toEqual(0, 'ERROR: Red triangle appeared');    
    } else {
        let screenshotName = 'Red-Triangle-On-Dashboard-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};
