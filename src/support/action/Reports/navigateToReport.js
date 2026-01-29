/**
 * Open the given report
 * @param  {String}   reportId The report to navigate to
 */
export default async(reportId) => {
    /**
     * The URL to navigate to
     * @type {String}
     */
    const url = await browser.getUrl() + 'Reports/' + reportId;
    console.log(url);
    await browser.sharedStore.set('reportId', reportId);
    await browser.sharedStore.set('entityType', "Report");
    await browser.navigateTo(url);
    let a = performance.now();
    await browser.sharedStore.set('PerformanceResultA', a);
};
