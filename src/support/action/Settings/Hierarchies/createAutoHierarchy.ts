import getKendoGridColumnElements from '../../Common/kendo/getKendoGridColumnElements'
import clickCreateNew from './clickCreateNew';
import setAutoGenName from './setAutoGenName'
import clickButton from '../../Common/clickButton'
import addAggregationLevel from './addAggregationLevel'
import selectDashboardAction from '../../Dashboards/selectDashboardAction'

export default async(hierachyName: string) => {

    await clickCreateNew('Auto Generated Hierarchy');
    await setAutoGenName(hierachyName, 'Store');
    await clickButton('Add');
    await addAggregationLevel("State", "State");
    await selectDashboardAction('Save');
} 