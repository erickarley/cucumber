/**
 * Open the given dashboard
 * @param  {String}   dashboardId The dashboard to navigate to
 */
export default async(dashboardId) => {
    /**
     * The URL to navigate to
     * @type {String}
     */
    const url = await browser.getUrl() + '/Dashboard/' + dashboardId;
    console.log(url);
    await browser.navigateTo(url);
};
