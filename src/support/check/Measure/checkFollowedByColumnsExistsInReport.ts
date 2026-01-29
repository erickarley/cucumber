import waitFor from '../../action/waitFor';
import { bigPause } from '../../constants';
import checkContainsText from '../checkContainsText';
import isExisting from '../isExisting';
import { FollowingMeasureColumns, FollowingMeasureName } from '../../../../followingmeasurename'

export default async() => {

    //
    const superHeaderSelector = '//div[contains(@class, "super-column-flex")]'

    let superHeader = await $$(superHeaderSelector);

    if (superHeader.length == 0) {
        throw Error('Followed By Measure supper header not found.')    
    }

    let superHeaderName = await superHeader[0].getText();
    if (FollowingMeasureName.toUpperCase() != superHeaderName.toUpperCase())
    {
        throw Error('Followed By Measure supper header name does not match excpected value.');
    }

    const columnHeaderSelector = '//*[@id="report-grid"]/div[1]/div[2]/table/thead/tr[2]/th/a[2]';

    let columnHeaders = await $$(columnHeaderSelector);

    if (columnHeaders.length != FollowingMeasureColumns.length)
    {
        throw Error('Followed By Measure Column\'s length does not match.')
    }

    for (let i = 0; i < columnHeaders.length; i++) {
        let nextMeasure = await columnHeaders[i].getText();

        var nextDefined = FollowingMeasureColumns.find((n) => n.toUpperCase() == nextMeasure.toUpperCase());

        if (!nextDefined) {
            throw Error("Could not find column for measure '" + nextMeasure + "'");
        }
    }
};
