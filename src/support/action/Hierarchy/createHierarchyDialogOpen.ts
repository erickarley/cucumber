import pause from "../pause";

export default async () => {
    const dialog = await $("#createNew");
    if (!(await dialog.isDisplayed())) {
        const addButton = await $('button.addButton');

        await addButton.click();
        await pause('500'); // Animation 0.5s
    }
}