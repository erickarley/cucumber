export default async() => {
    const newButton = await $('#createNew > tbody > tr > td:nth-child(2) > a');

    await newButton.click();
} 