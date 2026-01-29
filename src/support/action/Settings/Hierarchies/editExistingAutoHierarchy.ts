import getKendoGridColumnElements from '../../Common/kendo/getKendoGridColumnElements'

export default async() => {

    const values = await getKendoGridColumnElements(0);
    values.splice(0, 1);  // ignore first (flat)

    for (const element of values) {
        const btn = await element.$('button');

        const attr = await btn.getAttribute('ng-click');

        if (attr.indexOf(', true,') > 0) {
            // this is a auto hierarchy
            await btn.click();
            return;
        }
    }

    throw 'No auto hierarchies detected';
} 