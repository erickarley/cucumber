import { FollowingMeasureColumns, FollowingMeasureName } from '../../../../followingmeasurename'


export default async() => {
    /**
     * Selector for the Report type drop down
     * @type {String}
     */
    const initialSortSelector = '//md-option[@ng-repeat="item in addableCtrl.dropdownItems | filter: addableCtrl.filter(selection) | orderBy : \'Text\' "]';

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const initialSortOptionSelectors = await $$(initialSortSelector)

    if (initialSortOptionSelectors.length != FollowingMeasureColumns.length)
    {
        throw Error('Followed By Measure Sort Option\'s length does not match.')
    }

    for (let i = 0; i < initialSortOptionSelectors.length; i++) {
        let nextMeasure = await initialSortOptionSelectors[i].getText();

        var nextDefined = FollowingMeasureColumns.find((n) => (FollowingMeasureName + " - " + n).toUpperCase() == nextMeasure.toUpperCase());

        if (!nextDefined) {
            throw Error("Could not find column for measure '" + nextMeasure + "'");
        }
    }
};