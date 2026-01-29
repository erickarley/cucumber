import waitFor from '../../action/waitFor';
import { bigPause } from '../../constants';
import checkContainsText from '../checkContainsText';
import isExisting from '../isExisting';
import { FollowingMeasureColumns } from '../../../../followingmeasurename'

export default async() => {

    //
    const measureSelector = '#measureElements md-list-item div button span';

    let elementsToFind = await $$(measureSelector);

    if (elementsToFind.length != FollowingMeasureColumns.length)
    {
        throw Error('Followed By Measure\'s length does not match.')
    }

    for (let i = 0; i < elementsToFind.length; i++) {
        let nextMeasure = await elementsToFind[i].getText();

        var nextDefined = FollowingMeasureColumns.find((n) => n.toUpperCase() == nextMeasure);

        if (!nextDefined) {
            throw Error("Could not find defined measure '" + nextMeasure + "'");
        }
    }
};
