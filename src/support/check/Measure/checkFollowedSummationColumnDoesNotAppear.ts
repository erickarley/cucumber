import waitFor from '../../action/waitFor';
import { bigPause } from '../../constants';
import checkContainsText from '../checkContainsText';
import isExisting from '../isExisting';


export default async(column: string) => {

    //
    const dimensionNounsSelector = "//div[contains(@class, 'dimensionContainer')]/div[contains(@class, 'list-item')]";

    let elementsToFind = await $$(dimensionNounsSelector);

    if (elementsToFind.length == 0)
    {
        throw Error('No dimension nouns found.')
    }

    for (let i = 0; i < elementsToFind.length; i++) {
        if ((await elementsToFind[i].getText()) == column) 
        {
            throw Error('Summation column "' + column + '" is appears in list')
        }
    }
};
