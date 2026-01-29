/**
 * Open the given environment
 */
export default async () => {
    /**
     * The URL to navigate to
     */
    const url = browser.options.baseUrl + '/reporting/Account/LogOff';
    await browser.navigateTo(url);
};
