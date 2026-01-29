import waitForDisplayed from '../../action/waitForDisplayed';

/**
 * Stores the number of alerts in memory for the chosen type of alert
 * @param  {String} typeOfAlert - The type of alert to check ("Open", "Closed", etc.)
 */
export default async (typeOfAlert) => {
    const selector = `//div[@class='alertCountLabel'][.='${typeOfAlert}']/preceding-sibling::div[@class='alertCount']`;

    await waitForDisplayed(selector);

    const alertElement = await $(selector);
    const numberOfAlerts = await alertElement.getText();

    // No 'await' needed — sharedStore.set is synchronous
    browser.sharedStore.set('numberOfAlerts', numberOfAlerts);

    // console.log(`[Alert Tracker] Stored '${numberOfAlerts}' alerts for type '${typeOfAlert}'`);
};
