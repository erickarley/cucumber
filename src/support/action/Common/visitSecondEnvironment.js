// import { Selector } from 'webdriverio';

import openWebsite from '../openWebsite';
import login2020 from '../Login/login2020';
import properties from '../../config/environments';


/**
 * Performs login with the default credentials on arguments environment or default credentials
 */
export default async () => {
    let userName = '';
    let password = '';
    let environmentURL = '';
    let userArguments = process.argv;
  
    // console.log(userArguments);

    const hasServer = (element) => element.indexOf('server2') !== -1;
    const serverParamIndex = userArguments.findIndex(hasServer);

    const hasUser = (element) => element.indexOf('user') !== -1;
    const userParamIndex = userArguments.findIndex(hasUser);

    const hasPassword = (element) => element.indexOf('password') !== -1;
    const passwordParamIndex = userArguments.findIndex(hasPassword);

    if (serverParamIndex > 0) {
        // The first character after the word "server2"
        environmentURL = userArguments[serverParamIndex].substring(8);
    }
    else {
        environmentURL = properties.server;
    }
    environmentURL = 'https://' + environmentURL + '/reporting/Account/LogOff';

    if (userParamIndex > 0) {
        userName = userArguments[userParamIndex].substring(5);
    }
    else {
        userName = properties.user;
    }

    if (passwordParamIndex > 0) {
        password = userArguments[passwordParamIndex].substring(9);
    }
    else {
        password = properties.password;
    }

    await openWebsite('url', environmentURL);
    await login2020(userName,password);
};

