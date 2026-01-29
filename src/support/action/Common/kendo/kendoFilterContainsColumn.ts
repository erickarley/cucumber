import { smallPause } from '../../../constants';
import pause from '../../pause';
import findColumnIndex from './findKendoGridColumnIndex';
import getKendoGridColumnTexts from './getKendoGridColumnTexts';
import setKendoGridColumnFilters from './setKendoGridColumnFilter'

export default async(textType: ('alphabetical'|'numerical'|'special'), columnHeader: string) => {
    const index = await findColumnIndex(columnHeader);

    const values = await getKendoGridColumnTexts(index);
    await pause(smallPause.toString());
    let filterText  = '';
    switch (textType) {
        case 'alphabetical':
            filterText = createAlphabeticalFilter(values);
            break;
        case 'numerical':
            filterText = createRegExFilter(/\d+/g, values);
            break;

        case 'special':
            filterText = createRegExFilter(/[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g, values)
            break;

        default:
            throw 'Invalid text type';

    }

    await setKendoGridColumnFilters(filterText, columnHeader);
} 


function createAlphabeticalFilter(values: Array<string>): string {
    if (!values || values.length === 0) {
        throw new Error('No values found in the specified column to create an alphabetical filter.');
    }

    const longestValue = values.reduce((a, b) => a.length > b.length ? a : b);
    expect(longestValue.length).toBeGreaterThan(4);

    const filterValue = longestValue.substring(2, Math.floor(longestValue.length / 2));
    return filterValue;
}


function createRegExFilter(regEx: RegExp, values: Array<string>): string
{
    let numbers = new Array<string>;
    for (const value of values) {
        for (const match of value.matchAll(regEx)) {
            numbers.push(match[0]);
        }
    }

    expect(numbers.length).toBeGreaterThan(0);

    const filterValue = numbers.reduce((a, b) => a.length > b.length ? a : b);

    return filterValue;
}