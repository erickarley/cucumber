import clickElement from './clickElement';

export default async (
    fieldName: string
) => {
    /**
     * Element to perform the action on
     * @type {String}
     */

    await clickElement('click', 'selector',  'th[data-field="' + fieldName + '"] a');
};