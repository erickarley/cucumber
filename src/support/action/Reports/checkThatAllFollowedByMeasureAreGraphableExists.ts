import { FollowingMeasureColumns, FollowingMeasureName } from '../../../../followingmeasurename'


export default async() => {
    /**
     * Selector for the Report type drop down
     * @type {String}
     */
    const selector = '//*[@id="graphable-columns-grid-container"]/md-list-item/div/div[1]/div/button/span';

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const graphable = await $$(selector)

    if (graphable.length != FollowingMeasureColumns.length)
    {
        throw Error('Followed By Graphable Option\'s length does not match.')
    }

    for (let i = 0; i < graphable.length; i++) {
        let nextMeasure = await graphable[i].getText();

        var nextDefined = FollowingMeasureColumns.find((n) => (FollowingMeasureName + " - " + n).toUpperCase() == nextMeasure.toUpperCase());

        if (!nextDefined) {
            throw Error("Could not find graphable for measure '" + nextMeasure + "'");
        }
    }
};