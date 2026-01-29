import { FollowingMeasureColumns, FollowingMeasureName } from '../../../../followingmeasurename'

export default async() => {

    const initialSelector = '//*[@id="measureElements"]/md-list/md-list-item/div[1]/button/span';

    const measures = await $$(initialSelector)

    if (measures.length != FollowingMeasureColumns.length)
    {
        throw Error('Followed By Measures missing from kpi data elements.')
    }

    for (let i = 0; i < measures.length; i++) {
        let nextMeasure = await measures[i].getText();

        var nextDefined = FollowingMeasureColumns.find((n) => n.toUpperCase() == nextMeasure.toUpperCase());

        if (!nextDefined) {
            throw Error("Could not find column for measure '" + nextMeasure + "' in kpi data elements.");
        }
    }
};