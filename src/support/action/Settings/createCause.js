import checkAvailability from '../../check/Common/checkAvailability';
import { smallPause } from '../../constants';
import clickButton from '../Common/clickButton';
import selectDashboardAction from '../Dashboards/selectDashboardAction';
import clickElement from '../clickElement';
import pause from '../pause';
import selectOption from '../selectOption';
import setInputfield from '../setInputField';

/**
 * Performs creation of the Cause
 * @param  {String}   causeName      The name of the cause
 * @param  {String}   causeDescription      The description of the cause
 * @param  {String}   resolutionName      The resolution
 */
export default async(causeName, causeDescription, resolutionName) => {
    /**
     * Selector for the name
     * @type {String}
     */
    const fieldSelector = "//div[@class[contains(.,'k-grid-content')]]/table[contains(.,'" + causeName + "')]";

    let elementToFind = await $$(fieldSelector);

    // Timeout setup
    const timeoutArg = process.argv.find(arg => arg.startsWith('--timeout='))?.split('=')[1];
    const dynamicTimeout = timeoutArg ? parseInt(timeoutArg, 10) : 120000;


    const createcauseButtonSelector = "//a[@title='Create Cause']";
    const causeNameSelector = "#cause-name"
    /**
     * Selector for the description
     * @type {String}
     */
    const descriptionSelector = "#cause-description";

    const addResolutionButtonSelector = "#add-cause-resolution";

    const inputResolutionName = "#add-resolution-search-box";

    const resolutionOptionSelector = "//*[@id='Resolutions']/option[1]";

    const okButtonSelector = "//button[contains(.,'OK')]";

    if (elementToFind.length == 0) {
        await checkAvailability();
        console.log('Creating cause');
        clickElement('click', 'selector', createcauseButtonSelector);
        // await selectDashboardAction('Create cause');
        await checkAvailability();
        await setInputfield('set', causeName, causeNameSelector);
        await checkAvailability();
        await setInputfield('set', causeDescription, descriptionSelector);
        //The reason why we need to repeat this is because the element is very hard to click
        const confirmationSelector = "//div[@class='data']//td[.='Automation Resolution']";
        const popupOkButtonSelector = '//*[@id="overlay-ok-message"]';
        const popupCloseButtonSelector = '//*[@id="generic-agilence-popup-dialog"]/div/div[1]/input';

        let retryCount = 0;
        const maxTimeMs = dynamicTimeout;
        const startTime = Date.now();

        while (true) {
            retryCount++;
            try {
                await clickElement('click', 'selector', addResolutionButtonSelector);
                await pause(smallPause);
                await setInputfield('set', resolutionName, inputResolutionName);
                await pause(smallPause);
                await clickElement('click', 'selector', resolutionOptionSelector);
                await clickElement('click', 'selector', okButtonSelector);
                await pause(smallPause);

                // Handle popup if it appears
                const popupOkBtn = await $(popupOkButtonSelector);
                if (await popupOkBtn.isDisplayed()) {
                    console.warn(`Error popup detected (attempt ${retryCount})`);
                    if (await popupOkBtn.isClickable()) {
                        await popupOkBtn.click();
                        console.warn('Clicked OK on popup.');
                    } else {
                        const popupCloseBtn = await $(popupCloseButtonSelector);
                        if (await popupCloseBtn.isDisplayed() && await popupCloseBtn.isClickable()) {
                            await popupCloseBtn.click();
                            console.warn('Clicked Close on popup.');
                        } else {
                            throw new Error('Popup appeared but neither OK nor Close were clickable.');
                        }
                    }

                    await pause(smallPause);
                    continue; // retry
                }

                // Check if resolution was added
                const found = await browser.waitUntil(
                    async () => {
                        const el = await $(confirmationSelector);
                        return await el.isExisting();
                    },
                    {
                        timeout: 5000,
                        interval: 500,
                        timeoutMsg: `[Resolution] "Automation Resolution" not detected after attempt #${retryCount}`,
                    }
                );

                if (found) {
                    console.log(`Resolution successfully added after ${retryCount} attempt(s).`);
                    break;
                }

            } catch (err) {
                console.warn(`Attempt #${retryCount} failed: ${err.message}`);
            }

            if (Date.now() - startTime > maxTimeMs) {
                throw new Error(`[Resolution] Giving up after ${retryCount} attempts (${maxTimeMs}ms)`);
            }
        }




        await pause(smallPause);
        await selectDashboardAction('Save');
    }
    else {
        console.log('cause with name ' + causeName + ' exists.');
    }
};