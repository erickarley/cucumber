import getKendoGridColumnTexts from '../../../action/Common/kendo/getKendoGridColumnTexts'
import findKendoGridColumnIndex from '../../../action/Common/kendo/findKendoGridColumnIndex'

export default async(hierarchyName: string) => {
    const columnIndex = await findKendoGridColumnIndex('Hierarchy');
    const hierarchyNames = await getKendoGridColumnTexts(columnIndex);

    expect(hierarchyNames.includes(hierarchyName)).toBeTruthy();
} 
