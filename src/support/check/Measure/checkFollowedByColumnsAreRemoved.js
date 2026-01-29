import waitFor from '../../action/waitFor';
import { bigPause } from '../../constants';
import checkContainsText from '../checkContainsText';
import isExisting from '../isExisting';
import checkFollowedByColumnExist from './checkFollowedByColumnExist'
export default async() => {
    const dimensionNounsSelector = "//div[contains(@class, 'dimensionContainer')]/div[contains(@class, 'list-item')]";

    let elementsToFind = await $$(dimensionNounsSelector);

    if (elementsToFind.length == 0)
    {
        throw Error('No dimension nouns found.')
    }

    var texts = [];

    for (let i = 0; i < elementsToFind.length; i++) {
        texts.push(await elementsToFind[i].getText());
    }

    for (let i = 0; i < texts.length; i += 1) {
        if (texts[i].endsWith('(Following Transaction)')) {
            throw Error('Following transaction was not removed for "' + texts[i] + '" ');
        }
    }
};
