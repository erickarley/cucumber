/**
 * Check the data of the table on a specific cell
 * @param  {String}     filterName   previous env
 */
export default async(filterName) => {
    let listOfOptions = await $$('//*[@class="predefinedValueItem"]/span');

    console.log('Number of Options for filter ' + filterName + ': ' + listOfOptions.length);

    let optionsList = [];
    // listOfOptions.forEach(element => optionsList += element.getText());
    // console.log(optionsList);

    for (let i = 0; i < listOfOptions.length; i++) {
        optionsList[i] = await listOfOptions[i].getText();
    }

    // console.log(optionsList);
    await browser.sharedStore.set('optionsFor'+filterName, optionsList);
};
    