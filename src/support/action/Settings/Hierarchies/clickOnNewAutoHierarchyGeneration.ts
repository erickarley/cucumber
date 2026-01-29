export default async() => {
    const newButton = await $('#createNew > tbody > tr > td:nth-child(1) > a');

    await newButton.click();
} 