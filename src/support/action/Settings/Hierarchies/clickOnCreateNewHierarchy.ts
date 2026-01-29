export default async() => {

    const newButton = await $('body > div.main-page > div.main-titlebar > div.titlebar-buttons > div > ag-create-new > button');

    await newButton.click();
} 