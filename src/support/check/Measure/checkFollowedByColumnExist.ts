import waitFor from '../../action/waitFor';
import { bigPause } from '../../constants';
import checkContainsText from '../checkContainsText';
import isExisting from '../isExisting';


export default async() => {

    //
    const dimensionNounsSelector = "//div[contains(@class, 'dimensionContainer')]/div[contains(@class, 'list-item')]";

    let elementsToFind = await $$(dimensionNounsSelector);

    if (elementsToFind.length == 0)
    {
        throw Error('No dimension nouns found.')
    }

    if (elementsToFind.length % 2 != 0)
    {
        throw Error('Not all dimension nouns were duplicated.')
    }

    var texts = [];

    for (let i = 0; i < elementsToFind.length; i++) {
        texts.push(await elementsToFind[i].getText());
    }

    for (let i = 0; i < texts.length; i += 2) {
        if (texts[i] + ' (Following Transaction)' !== texts[i+1]){
            throw Error('Following transaction missing for "' + texts[i] + '" ');
        }
    }
};
