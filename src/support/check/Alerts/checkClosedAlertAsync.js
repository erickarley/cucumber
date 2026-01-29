import waitForDisplayed from '../../action/waitForDisplayed';
import select2020DropDown from '../../action/Common/select2020DropDown';
import pause from '../../action/pause';
import clickButton from '../../action/Common/clickButton';
import setInputField from '../../action/setInputField';
import clickElement from '../../action/clickElement';
import { smallPause, mediumPause } from '../../constants';
import checkAvailability from '../Common/checkAvailability';

/**
 * Waits for a numeric value to appear in a selector (handles "--" issue)
 * @param {String} selector - XPath or CSS selector for the element
 * @param {String} label - Label for logging/error messages
 * @returns {Number} - Parsed numeric value
 */
const waitForNumericText = async (selector, label = 'value') => {
    let value = '--';
    await browser.waitUntil(
        async () => {
            value = await $(selector).getText();
            return !isNaN(Number(value));
        },
        {
            timeout: 10000,
            interval: 250,
            timeoutMsg: `[waitForNumericText] Timeout: ${label} never became a number. Last value: "${value}"`
        }
    );
    return Number(value);
};

/**
 * Checks that closing one alert increases the closed alerts number
 * @param  {String}     cause          The cause option
 * @param  {String}     resolution     The resolution option
 */
export default async (cause, resolution) => {
    const selectorForClosedAlerts = "//div[@class='alertCountLabel'][.='Closed']/preceding-sibling::div[@class='alertCount']";

    await waitForDisplayed(selectorForClosedAlerts);
    const numberOfClosedAlerts = await waitForNumericText(selectorForClosedAlerts, 'Closed Alerts count');

    const selectorForOptions = "//div[@id='investigateUtilities']//ag-md-icon[@class='downArrow']";
    const causeDropDownSelector = "//md-select[@ng-model='resolveAlertDialogController.selectedCause']";
    const causeOptionSelector = `//md-option[@ng-repeat='cause in resolveAlertDialogController.causes'][.='${cause}']`;
    const resolutionDropDownSelector = "//md-select[@ng-model='resolveAlertDialogController.selectedResolution']";
    const resolutionOptionSelector = `//md-option[@ng-repeat='resolution in resolveAlertDialogController.resolutions'][.='${resolution}']`;

    await pause(smallPause);
    await clickElement('click', 'selector', selectorForOptions);
    await pause(smallPause);
    await clickElement('click', 'selector', "//md-menu-item//div[.='Closed']");
    await pause(smallPause);

    await select2020DropDown(causeDropDownSelector, causeOptionSelector, cause);
    await pause(mediumPause);
    await select2020DropDown(resolutionDropDownSelector, resolutionOptionSelector, resolution);
    await pause(mediumPause);

    await setInputField('add', "Automation Resolution", '#managerNotes');
    await pause(smallPause);

    await clickElement('click', 'element', '//md-switch[@ng-model="resolveAlertDialogController.alertAcknowledged"]');
    await pause(smallPause);

    const actionPlanSwitchSelector = '//md-switch[@ng-model="resolveAlertDialogController.actionPlanFollowed"]';
    const elements = await $$(actionPlanSwitchSelector);
    if (elements.length > 0) {
        await clickElement('click', 'element', actionPlanSwitchSelector);
        await pause(smallPause);
    }

    await clickButton('Submit');
    await pause(smallPause);

    await browser.refresh();
    await checkAvailability();

    const updatedClosedAlerts = await waitForNumericText(selectorForClosedAlerts, 'Updated Closed Alerts count');
    expect(updatedClosedAlerts).toBeGreaterThan(numberOfClosedAlerts);
};
