import { FollowingMeasureColumnNoType } from '../../../../followingmeasurename'

export default async() => {

    const initialSelector = "//div[contains(@class, 'dimensionContainer')][contains(@class, 'measure')]/div[contains(@class, 'measure')][contains(@class, 'active')]";

    const measures = await $$(initialSelector)

    // 'Tx Count' is handled special
    if (measures.length != FollowingMeasureColumnNoType.length-1)
    {
        throw Error('Followed By Measures missing from kpi data elements.')
    }

    for (let i = 0; i < measures.length; i++) {
        let nextMeasure = await measures[i].getText();

        var nextDefined = FollowingMeasureColumnNoType.find((n) => n.toUpperCase() == nextMeasure.toUpperCase());

        if (!nextDefined) {
            throw Error("Could not find column for measure '" + nextMeasure + "' in kpi data elements. Update followingmeasurename.ts or recreate the followed by measure.");
        }
    }

    let itemCountSwitch = await $$("//*[@id='sumarize-count'][contains(@class, 'md-checked')]");

    var itemCount = FollowingMeasureColumnNoType.find((n) => n.toUpperCase() == 'TX COUNT');

    if (itemCountSwitch.length == 1) {
        if (!itemCount) {
            throw Error("Could not find summation measure 'Item Count' although switch is enabled. Update followingmeasurename.ts or recreate the followed by measure.")
        }
    } else if (!!itemCount) {
        throw Error("Summation measure 'Item Count' is defined although although switch is disabled. Update followingmeasurename.ts or recreate the followed by measure.")
    }
};