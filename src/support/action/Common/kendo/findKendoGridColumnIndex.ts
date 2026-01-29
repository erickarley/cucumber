import checkIfElementExists from '../../../lib/checkIfElementExists';

export default async(columnHeader: string, id? :string) : Promise<number> => {

    id = !!id ? id : "";
    let selector = id + " " + 'table[role="grid"] thead[role="rowgroup"] tr[role="row"] th.k-header';

    await checkIfElementExists(selector);

    let elements = await $$(selector);

    var index = 0;

    for (const element of elements) {
        var header = await element.getText();

        if (header == columnHeader) {
            break;
        }
        index++;
    }

    expect(index).toBeLessThan(elements.length);

    return index;
}