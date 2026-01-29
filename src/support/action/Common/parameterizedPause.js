import { extraHugePause } from "../../constants";

/**
 * Pause execution for a given number of milliseconds
 */
export default async () => {

    let intentionalPause;
    const userArguments = process.argv;

    const hasPausedParam = (element) => element.indexOf('pause') !== -1;
    const pauseParamIndex = userArguments.findIndex(hasPausedParam);

    if (pauseParamIndex > 0) {
        intentionalPause = userArguments[pauseParamIndex].substring(7);
    } else {
        intentionalPause = 30000; //hardcoded pause in case of omission
    }
    /**
     * Number of milliseconds
     * @type {Int}
     */
    const intMs = parseInt(intentionalPause, 10)  || extraHugePause;

    // await browser.pause(intMs);
    console.log('Setting the timeout to ' + intMs);
    // await browser.setTimeout({ script: intMs });
    await browser.setTimeout({ pageLoad: intMs });
    // await browser.setTimeout({ implicit: intMs }); 
};
