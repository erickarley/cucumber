import {config as buildConfig} from './wdio.conf';

buildConfig.baseUrl = 'https://localhost';

export const config = buildConfig;