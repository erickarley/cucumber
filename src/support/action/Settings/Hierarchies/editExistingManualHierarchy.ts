import getKendoGridColumnElements from '../../Common/kendo/getKendoGridColumnElements'
import findKendoGridColumnIndex from '../../Common/kendo/findKendoGridColumnIndex'
export default async() => {

    const values = await getKendoGridColumnElements(0);


    for (const element of values) {
        const btn = await element.$('button');

        const attr = await btn.getAttribute('ng-click');

        if (attr.indexOf(', false,') > 0) {
            // this is a manual hierarchy
            await btn.click();
            return;
        }

    }
    throw 'No manual hierarchies detected';
} 