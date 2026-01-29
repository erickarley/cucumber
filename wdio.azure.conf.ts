import {config as buildConfig} from './wdio.conf';

buildConfig.maxInstances = 5;

buildConfig.capabilities = [{
    maxInstances: 5,
    browserName: 'MicrosoftEdge',
    'ms:edgeOptions': {
        args: [
        '--headless' 
    ]
    }
}];

export const config = buildConfig;