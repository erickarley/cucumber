import checkAvailability from '../../check/Common/checkAvailability';
import selectDashboardAction from '../Dashboards/selectDashboardAction';
import clickElement from '../clickElement';
import setInputfield from '../setInputField';

/**
 * Performs creation of resolution
 * @param  {String}   resolutionName      The name of the resolution
 * @param  {String}   resolutionDescription      The description of the resolution
 */
export default async(resolutionName, resolutionDescription) => {
    /**
     * Selector for the name
     * @type {String}
     */
    const fieldSelector = "//div[@class[contains(.,'k-grid-content')]]/table[contains(.,'" + resolutionName + "')]";

    let elementToFind = await $$(fieldSelector);

    const createResolutionButtonSelector = "//a[@title='Create Resolution']";
    const resolutionNameSelector = "#resolution-name"
    /**
     * Selector for the description
     * @type {String}
     */
    const descriptionSelector = "#resolution-description";

    if (elementToFind.length == 0) {
        await checkAvailability();
        console.log('Creating resolution');
        clickElement('click', 'selector', createResolutionButtonSelector);
        // await selectDashboardAction('Create Resolution');
        await checkAvailability();
        await setInputfield('set', resolutionName, resolutionNameSelector);
        await checkAvailability();
        await setInputfield('set', resolutionDescription, descriptionSelector);
        await selectDashboardAction('Save');
    }
    else {
        console.log('Resolution with name ' + resolutionName + ' exists.');
    }
};