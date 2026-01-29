import waitFor from '../../action/waitFor';
import { extraLongPause } from '../../constants';
//import textCompare from '../Common/textCompare';

/**
 * Check the data of the table on a specific cell
 * @param  {String}     pageName   Id of the query stored
 * @param  {String}     previousEnvironment   previous env
 * @param  {String}     sensitivity           how sensible the engine should be
 */
export default async(pageName, previousEnvironment, sensitivity) => {
    let sensitivityPixelMatch = 0;
    let sensitivityWDIOImageComparison = 0;

    switch (sensitivity) {
        case "Exact": 
            sensitivityPixelMatch = 0;
            sensitivityWDIOImageComparison = 0;
            break;
        case "High":
            sensitivityPixelMatch = 1;
            sensitivityWDIOImageComparison = 0.2;
            break;
        case "Medium":
            sensitivityPixelMatch = 2.5;
            sensitivityWDIOImageComparison = 0.5;
            break;
        case "Low":
            sensitivityPixelMatch = 4.5;
            sensitivityWDIOImageComparison = 0.8;
            break;
    };

    pageName = pageName.replace(/\s/g, '_');

    previousEnvironment = previousEnvironment.replace(':','-port');

    let keyName1 = pageName + '-' + previousEnvironment + '-';

    let keyName2 = pageName + '-' + previousEnvironment + '-' + 'Actual';

    let screenshotsFolder = browser.sharedStore.get('screenshotsFolder');
    
    browser.saveFullPageScreen(screenshotsFolder + "/" + keyName2);
    //TODO: Image comparison might not find the previous files
    const baselineFile = './ScreenShots/imageComparison/baseline/desktop_chrome/' + keyName1 +'-.png';
    
    const fs = require('fs');
    const PNG = require('pngjs').PNG;
    const pixelmatch = require('pixelmatch');
    let img1;

    if(fs.existsSync(baselineFile)) {
        img1 = PNG.sync.read(fs.readFileSync(baselineFile));
    }
    else {
        //use the same file because if file #1 doesn't exist then there is no logic for comparison
        img1 = PNG.sync.read(fs.readFileSync('./ScreenShots/actual/desktop_chrome/' + screenshotsFolder + '/' + keyName2 +'-.png'));
    }
    const img2 = PNG.sync.read(fs.readFileSync('./ScreenShots/actual/desktop_chrome/' + screenshotsFolder + '/' + keyName2 +'-.png'));
    const {width, height} = img1;
    const diff = new PNG({width, height});

    pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: sensitivityPixelMatch});

    fs.writeFileSync('./ScreenShots/' + screenshotsFolder + '/' + keyName1 + '-' + 'diff.png', PNG.sync.write(diff));

    expect(browser.checkFullPageScreen(screenshotsFolder + '/' + keyName1, { /* some options*/ }),"Too many differences with previous screenshot").to.be.below(sensitivityWDIOImageComparison);
};