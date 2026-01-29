/**
 * Open the given query
 * @param  {String}   queryId The query to navigate to
 */
export default async(queryId) => {
    /**
     * The URL to navigate to
     * @type {String}
     */
    const url = (await browser.getUrl()) + 'Queries/' + queryId;
    console.log(url);
    await browser.sharedStore.set('reportId', queryId);
    await browser.sharedStore.set('entityType', "Query");
    await browser.navigateTo(url);
};
