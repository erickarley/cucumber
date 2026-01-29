import isExisting from '../isExisting';

/**
 * Check if the given string is in the MenuItem name path
 * @param  {String}   switchLabel     The label of the switch 
 * @param  {String}   status       Whether to check if the switch is off or on
 */
export default async(switchLabel, status) => {
    /**
     * The switch name selector
     * @type {String}
     */
    const switchStatusSelector = "//md-switch[.='" + switchLabel +"'][@aria-checked='false']";
    
    let falseCase = undefined;

    if (status === 'on') {
        falseCase = 'not';
    }
    await isExisting(switchStatusSelector,falseCase);
};
