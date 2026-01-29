import { mediumPause, smallPause } from '../../constants';
import clickElement from '../clickElement';
import pause from '../pause';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Clicks a category on the table on 2020
 * @param  {String}   filterName           Name of the filter
 * @param  {String}   filterValue          Value of the filter
 */
export default async (filterName, filterValue) => {
    // Correctly quoted attribute selector
    const filterDropDownSelector = `//th/span[@data-field='${filterName}']//span[@class='k-icon k-i-arrow-60-down']`;
    const ddOptionSelector = `//ul[@aria-label='${filterName}']/li[.='${filterValue}']`;

    const dropdowns = await $$(filterDropDownSelector);
    if (dropdowns.length === 0) {
        const screenshotName = `Dropdown-${filterName}-NOT-EXISTS.png`.replace(/\//g, '-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName);
        throw new Error(`[Dropdown] Filter "${filterName}" not found. Screenshot saved as ${screenshotName}`);
    }

    await waitForDisplayed(filterDropDownSelector);
    await clickElement('click', 'element', filterDropDownSelector);
    await pause(smallPause);

    const option = await $(ddOptionSelector);
    const isOptionDisplayed = await option.isDisplayed();

    if (!isOptionDisplayed) {
        const screenshotName = `DDOption-${filterValue}-NOT-VISIBLE.png`.replace(/\//g, '-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName);
        throw new Error(`[Dropdown] Option "${filterValue}" not visible. Screenshot saved as ${screenshotName}`);
    }

    await waitForDisplayed(ddOptionSelector);
    await clickElement('click', 'element', ddOptionSelector);
    await pause(mediumPause);
};
