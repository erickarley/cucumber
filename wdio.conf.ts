import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.TEST_EMAIL_USER);

import getServerParam from './src/support/lib/getServerParam'

// Now you can call it with proper type safety
const server: string = getServerParam();
const reportFolder: string = server;

// Timeout setup
const timeoutArg = process.argv.find(arg => arg.startsWith('--timeout='))?.split('=')[1];
const dynamicTimeout = timeoutArg ? parseInt(timeoutArg, 10) : 120000;

// Read --instances=6 from CLI args
const instancesArg = process.argv.find(arg => arg.startsWith('--instances='));
const instances = instancesArg ? parseInt(instancesArg.split('=')[1]) : 1;


// Reporter setup
const cucumberJunitConvert = require('cucumber-junit-convert');
const cucumberJsonFolder = './reports/cucumber_json';
const junitFolder = './reports/junit';

import path from 'path';
import { hooks } from './src/support/hooks';
import { setValue, getValue } from '@wdio/shared-store-service';

export const config: WebdriverIO.Config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        // './src/features/**/*.feature',
        './src/features/00 setup base objects.feature',
        './src/features/01 smoke tests.feature',
        './src/features/02 regression tests.feature',
        './src/features/03 navigation and features.feature',
        './src/features/04 hierarchy.feature',
        './src/features/05 task manager.feature',
        './src/features/06 alerts regression tests.feature',
        './src/features/07 bugs regression.feature',
        './src/features/10 clean up tests.feature',
        // QueryBuilderFollowedBy
    ],

    suites: {
        setup: [
            './src/features/00 setup base objects.feature',
        ],
        features: [
            './src/features/01 smoke tests.feature',
            './src/features/02 regression tests.feature',
            './src/features/03 navigation and features.feature',
            './src/features/04 hierarchy.feature',
            './src/features/05 task manager.feature',
            './src/features/06 alerts regression tests.feature',
            './src/features/07 bugs regression.feature',
        ],
        teardown: [
            './src/features/10 clean up tests.feature',
        ]
    },
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: instances,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{

        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: instances,
        //
        browserName: 'MicrosoftEdge',
        'ms:edgeOptions': {
            args: [
                // '--headless', 
                // '--start-maximized',
            '--window-size=1280,4000',
            '--force-device-scale-factor=1'
        ]
        },
        'wdio:devtoolsOptions': {
            defaultViewport: null
          }
        //  browserName: 'chrome',
        // 'goog:chromeOptions': {
        //     // binary: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        //     args: [
        //         //'--headless', 
        //         '--ignore-certificate-errors', 
        //         'window-size=1920,1080']
        // }
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    outputDir: path.join(__dirname, '/logs'),
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service,
    //   @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'https://autodevelop3.agilenceqa.com',
    //
    // Default timeout for all waitFor* commands.
    // waitforTimeout: 30000,
    waitforTimeout: dynamicTimeout,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: [
        'shared-store',
        ['image-comparison', {
            baselineFolder: './ScreenShots/imageComparison/baseline/',
            formatImageName: '{tag}-{logName}',
            screenshotPath: path.join(process.cwd(), './ScreenShots/'),
            savePerInstance: true,
            autoSaveBaseline: true,
            blockOutStatusBar: true,
            blockOutToolBar: true,
        }],
    ],
    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Whether or not retried specfiles should be retried immediately or deferred
    // to the end of the queue specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: ['spec', 
    ['cucumberjs-json', { jsonFolder: cucumberJsonFolder }],
    // ['timeline', { outputDir: './timereport' }],
    ['junit', {
        outputDir: './reports',
        suiteNameFormat: /[^a-zA-Z0-9@]+/,
        outputFileFormat: function(options) {
            let serverParam = process.argv.find(arg => arg.startsWith('server='));
            if (serverParam) {
                // Extract the server value
                console.log(`Server: ${server}`);
            } else {
                console.log('No server parameter provided.');
            }
            return `results-${reportFolder}.xml`
        }
    }],

    ],
    //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> module used for processing required features
        requireModule: [],
        // <boolean< Treat ambiguous definitions as errors
        failAmbiguousDefinitions: true,
        // <boolean> invoke formatters without executing steps
        // dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> Enable this config to treat undefined definitions as
        // warnings
        ignoreUndefinedDefinitions: false,
        // <string[]> ("extension:module") require files with the given
        // EXTENSION after requiring MODULE (repeatable)
        names: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        // <string[]> (file/dir) require files before executing features
        require: [
            './src/steps/given.ts',
            './src/steps/then.ts',
            './src/steps/when.ts',
            // Or search a (sub)folder for JS files with a wildcard
            // works since version 1.1 of the wdio-cucumber-framework
            // './src/**/*.js',
        ],
        scenarioLevelReporter: false,
        order: 'defined',
        // <string> specify a custom snippet syntax
        snippetSyntax: undefined,
        // <boolean> fail if there are any undefined or pending steps
        strict: true,
        // <string> (expression) only execute the features or scenarios with
        // tags matching the expression, see
        // https://docs.cucumber.io/tag-expressions/
        tagExpression: 'not @activedevelopment',
        // <boolean> add cucumber tags to feature or scenario name
        tagsInTitle: false,
        // <number> timeout for step definitions
        // timeout: 30000,
        timeout: dynamicTimeout,
    } as WebdriverIO.CucumberOpts,
    ...hooks,
    onPrepare: function (config, capabilities) {

        var fs = require('fs');
        const makeDir = require('make-dir');
        const newPath = makeDir.sync('./reports/' + reportFolder);
        fs.writeFileSync('./reports/' + reportFolder + '/versionNumber.txt', "No-Version", function (err) {
        });
        fs.writeFileSync('./reports/' + reportFolder + '/TotalOnReport.txt', "Check Report", function (err) {
        });
        fs.writeFileSync('./reports/execution-log-message.txt', '', function (err) {
        });

        //Create Screenshots folder and save the value in the browser store
        const screenshotPath = makeDir.sync('./ScreenShots/' + reportFolder);
        // setValue('screenshotsFolder', screenshotPath);
    
    },
    onComplete: async function(exitCode, config, capabilities, results) {

        const fs = require('fs');

        // Convert the Cucumber JSON reports to JUnit for the Azure pipeline
        fs.readdirSync(cucumberJsonFolder).forEach((file: any) => {
            console.log(file);
            cucumberJunitConvert.convert({
                inputJsonFile: cucumberJsonFolder + '/' + file,
                outputXmlFile: junitFolder + '/junit-test-results.xml',
                featureNameAsClassName: true
            });
          });

        // Delete the screenshots folder if it's empty
        // const screenshotsFolder = await getValue('screenshotsFolder')
        console.log('Checking for empty screenshots folder at ./Screenshots/' + reportFolder)
        const files = fs.readdirSync('./ScreenShots/' + reportFolder);
        if (files.length === 0) fs.rmdirSync('./ScreenShots/' + reportFolder);
    },
    afterScenario: async function (uri, feature, scenario, result, sourceLocation) {
        console.log("Duration: " + feature.duration);
        const fs = require('fs');
        let status;
        try {
            if (fs.existsSync('./reports/' + reportFolder + '/TestExecutionLog.txt')) {
                status = "foo";
            }
            else {
                fs.writeFileSync('./reports/' + reportFolder + '/TestExecutionLog.txt', reportFolder, function (err) {
                });
            }
        } catch(err) {
            console.error("Report folder file error: " + err.message);
            throw new Error("Errors on report folder file");
        }
        if (feature.passed != true) {
            status = fs.readFileSync('./reports/' + reportFolder + '/TestExecutionLog.txt');
            if (feature.error.indexOf("timed out") > -1) {
                fs.writeFileSync('./reports/' + reportFolder + '/TestExecutionLog.txt', status + "\n" + uri.pickle.name + " - Status: " + 'TIMEDOUT', function (err) {
                });
            }
            else {        
                fs.writeFileSync('./reports/' + reportFolder + '/TestExecutionLog.txt', status + "\n" + uri.pickle.name + " - Status: " + 'FAILED', function (err) {
                });
            }
            const path = require('path');

            let reportId, entityType;
            try {
                reportId = await browser.sharedStore.get('reportId');
                entityType = await browser.sharedStore.get('entityType');
            } catch (e) {
                console.warn('[Screenshot] Could not retrieve sharedStore values:', e.message);
            }

            let screenshotFileName;

            if (reportId && entityType) {
                console.log("*****#### Entity - " + entityType + "-" + reportId);
                screenshotFileName = `timeout-${entityType}-${reportId}.png`;
            } else {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                screenshotFileName = `timeout-or-scenario-failure-${timestamp}.png`;
            }

            const screenshotPath = `./ScreenShots/${server}/${screenshotFileName}`;
            await browser.saveScreenshot(screenshotPath);
            console.log(`[Screenshot] Captured failure screenshot: ${screenshotPath}`);
        }
        else {
            let customMessage;
            try {
                if (fs.existsSync('./reports/execution-log-message.txt')) {
                    customMessage = fs.readFileSync('./reports/execution-log-message.txt');
                }
            } catch(err) {
                console.error("Error reading custom file: " + err.message);
                throw new Error("Error reading custom file");
            }
            status = fs.readFileSync('./reports/' + reportFolder + '/TestExecutionLog.txt');
            if (String(customMessage).length === 0) {
                fs.writeFileSync('./reports/' + reportFolder + '/TestExecutionLog.txt', status + "\n" + uri.pickle.name + " - Status: " + 'PASSED', function (err) {
                });
            }
            else {
                fs.writeFileSync('./reports/' + reportFolder + '/TestExecutionLog.txt', status + "\n" + uri.pickle.name + " - Status: " + customMessage, function (err) {
                });    
            }
        }     
    },
    // afterTest: function (test, context, {error, result, duration, passed, retries}) {
     
    // },
    after: function after(result, capabilities, specs) {
        
        var fs = require('fs');
        try {
            if (!fs.existsSync('./reports/' + reportFolder + '/SuccessFlag.txt')) {
                fs.writeFileSync('./reports/' + reportFolder + '/SuccessFlag.txt', 'SUCCESS', function (err) {
                });
            }
        } catch(err) {
            console.error("Results file error: " + err.message);
            throw new Error("Errors on file");
        }
        const finalDateTime = new Date().toISOString().substring(0, 19).replace('T', ' ');
        console.log("Final Date Time: " + finalDateTime);
    },
    afterStep: async function ({ uri, feature, step }, context, { error, result, duration, passed }) {
        if (!passed) {
            const fs = require('fs');
            const path = require('path');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

            const scenarioName = uri.pickle?.name || 'unknown_scenario';
            const stepName = step?.text?.replace(/[^a-zA-Z0-9]/g, '_') || 'unknown_step';

            const screenshotFileName = `${timestamp}_${scenarioName}_${stepName}.png`;
            const screenshotDir = `./ScreenShots/${reportFolder}/`;

            fs.mkdirSync(screenshotDir, { recursive: true });

            const screenshotPath = path.join(screenshotDir, screenshotFileName);
            console.log(`[Screenshot] Saving failed step screenshot to: ${screenshotPath}`);
            await browser.saveScreenshot(screenshotPath);

            fs.writeFileSync(`./reports/${reportFolder}/SuccessFlag.txt`, 'FAILED');
        }
    },
};
