/**
 * Check if a Task Manager Task's property matches the desired text
 * @param {String}  taskName        The Name of the Task Manager Task
 * @param {String}  falseCase       Whether to check if the property is equal or not
 * @param {String}  property        The name of the property to validate (details|message|category)
 * @param {String}  expetedValue    The string to check for
 */
 export default async (taskName, falseCase, property, expectedValue) => {
    const task = await GetTaskByName(taskName);
    expect(task).not.toBeNull();

    const propSelector = GetPropertySelector(property);
    expect(propSelector).not.toBeNull();

    const propText = await task.$(propSelector).getText();
    if (falseCase == 'does not have') {
        expect(propText).not.toEqual(expectedValue);
    }
    else {
        expect(propText).toEqual(expectedValue);
    }
};

function GetPropertySelector(propertyType) {
    switch (propertyType) {
        case 'details':
            return 'div.details';
        case 'message':
            return 'div.info';
        case 'category':
            return 'div.category';
        default:
            return null;
    }
}

async function GetTaskByName(taskName) {
    const tasks = await $$('background-task-manager-task');
    for (let key in tasks) {
        let task = tasks[key];
        if (task.index == null) {
            continue;  // Skip Browser object
        }
        if (await task.$('div.name').getText() == taskName) {
            return task;
        }
    }
    return null;
}
