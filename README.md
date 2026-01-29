# Agilence Cucumber Framework for 20/20 Application

This framework is based on the Cucumber Boilerplate project to run WebdriverIO tests with Cucumber and brings true BDD to JavaScript. Instead of writing complicated test code that only developers can understand, Cucumber maps an ordinary language to code and allows to start with the test process in the early stages of your product development.

## Requirements

- [Node.js v16.18.0-x64.msi](https://nodejs.org/download/release/v16.18.0/node-v16.18.0-x64.msi)
- [Python v3.11.0-x64.exe](https://www.python.org/ftp/python/3.11.0/python-3.11.0-amd64.exe)
- [Visual Studio Code](https://code.visualstudio.com/)
  - [Cucumber (Gherkin) Full Support Extension](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)
- [Visual Studio 2022](https://my.visualstudio.com/Downloads?PId=8229)
  - Must have the `Desktop development with C++` workload

**Note**: If run `npm install` before installing all dependencies, you may run into an error when npm tries to install canvas. If you get the error, try running `npm cache clean --force`, then remove the `node_modules` folder and the `package-lock.json` file before running `npm install` again.

## Documentation Links

- [Jest Expect](https://jestjs.io/docs/expect)
  - [WebdriverIO Expect](https://webdriver.io/docs/api/expect-webdriverio)
- [WebdriverIO](https://webdriver.io/docs/api) 
- [Cucumber](cucumber.io/docs/cucumber/)
  - [Cucumber: Gherkin](https://cucumber.io/docs/gherkin/reference/)

## Quick start

Choose one of the following options:

1. Clone the git repo - `git clone git@bitbucket.org:agilenceinc/cucumbertests.git`
2. Change directory `cd cucumbertests`
3. Install the dependencies `npm install`

Now you are ready to write your own features.

# How to write a test

Tests are written in [Gherkin syntax](https://cucumber.io/docs/gherkin/)
that means that you write down what's supposed to happen in a real language. All test files are located in
`./src/features/*` and have the file ending `.feature`. You will already find some test files in that
directory. They should demonstrate, how tests could look like. Just create a new file and write your first
test.

__myFirstTest.feature__
```gherkin
Feature:
    In order to keep my product stable
    As a developer or product manager
    I want to make sure that everything works as expected

Scenario: Check title of website after search
    Given I open the url "http://google.com"
    When I set "WebdriverIO" to the inputfield "#lst-ib"
    And I press "Enter"
    Then I expect that the title is "WebdriverIO - Google Search"

Scenario: Another test
    Given ...

```

This test opens the browser and navigates them to google.com to check if the title contains the search
query after doing a search. As you can see, it is pretty simple and understandable for everyone.

# How to run the test

To run your tests just call the [WDIO runner](https://webdriver.io/docs/testrunner):

```sh
$ npx wdio run wdio.conf.ts
```

_please note_ The WDIO runner uses the configuration file `wdio.conf.ts` by default.

# Configurations

To configure your tests, checkout the [`wdio.conf.ts`](https://bitbucket.org/agilenceinc/cucumbertests/src/develop/wdio.conf.ts) file in your test directory. It comes with a bunch of documented options you can choose from.

## Environment-specific configurations

A dev config is provided to extend `wdio.conf.ts` and change the `baseUrl` to a local dev environment:

__wdio.dev.conf.ts__
```ts
import {config as buildConfig} from './wdio.conf';

buildConfig.baseUrl = 'https://localhost';

export const config = buildConfig;
```

To run a test using the dev configuration, specify the configuration file as the first parameter:

```sh
$ npx wdio wdio.dev.conf.ts
```

## Command Line Parameters
The command `wdio run` proivdes several [command line options](https://webdriver.io/docs/testrunner#wdio-run) for overriding values loaded from the configuration file.  

### Using specific URL
If you want to set specific url for your environment, you can specify it as a parameter. This will replace the baseurl value in the configuration file:

```sh
$ npx wdio run wdio.conf.ts --baseUrl "https://autodevelop3.agilenceqa.com"
```

### Running single feature
Sometimes it's useful to only execute a single feature file, to do so use the following command:

```sh
$ npx wdio wdio.conf.ts --spec .\src\features\test.feature
```

### Running a single scenario
While developing a new scenario, it can be useful to run only one scenario within a feature. This can be done by applying a custom tag to the scenario, and then testing only that tag. For example, running only scenarios tagged with '@activedevelopment' can be done with the following command:

```sh
$ npx wdio wdio.conf.ts --cucumberOpts.tagExpression='@activedevelopment'
```

# Using tags

If you want to run only specific tests you can mark your features with tags. These tags will be placed before each feature like so:

```gherkin
@Tag
Feature: ...
```

To run only the tests with specific tag(s) use the `--cucumberOpts.tagExpression=` parameter like so:

```sh
$ npx wdio wdio.conf.ts --cucumberOpts.tagExpression='@Tag or @AnotherTag'
```

For more tag options please see the [Cucumber.js documentation](https://docs.cucumber.io/tag-expressions/)

## Pending test

If you have failing or unimplemented tests you can mark them as "Pending" so they will get skipped.

```gherkin
// skip whole feature file
@Pending
Feature: ...

// only skip a single scenario
@Pending
Scenario: ...
```

# Adding new steps and snippets

The predefined snippets allow you to do a lot of common things but you might need extra snippets which
are better aligned with your aims. To do so you will find all step definitions in `./src/steps`. They
are separated in `given`, `when` and `then`.

You define your snippet using regular expressions. This is pretty powerful as it allows you to create complex
sentences with multiple options. Everything that's within `"([^"]*)?"` gets captured and appended to the
callback. The last argument is always a callback function that you need to call when your step is done.
You can access the browser and your WebdriverIO instance with `browser`.

To assert values this boilerplate project uses WebdriverIOs embedded assertion library called [expect-webdriverio](https://www.npmjs.com/package/expect-webdriverio).

# Comments

You can add additional descriptive comments in your feature files.

```gherkin
###
  This is a
  block comment
###
Feature: As a bystander
    I can watch bottles falling from a wall
    So that I can be mildly amused

# This is a single line comment
Scenario: check if username is present
    Given I login as "roboter" with password "test123"
    Then the username "roboter" should be present in the header
```

# List of predefined steps

Check out all predefined snippets. You can see how they get used in [`sampleSnippets.feature`](https://github.com/webdriverio/cucumber-boilerplate/blob/main/src/features/sampleSnippets.feature).

## Given steps

- `I open the (url|site) "([^"]*)?"` <br>Open a site in the current browser window/tab
- `the element "([^"]*)?" is( not)* displayed` <br>Check the (in)visibility of an element
- `the element "([^"]*)?" is( not)* enabled` <br>Check if an element is (not) enabled
- `the element "([^"]*)?" is( not)* selected` <br>Check if an element is (not) selected
- `the checkbox "([^"]*)?" is( not)* checked` <br>Check if a checkbox is (not) checked
- `there is (an|no) element "([^"]*)?" on the page` <br>Check if an element (does not) exist
- `the title is( not)* "([^"]*)?"` <br>Check the title of the current browser window/tab
- `the element "([^"]*)?" contains( not)* the same text as element "([^"]*)?"` <br>Compare the text of two elements
- `the (button|element) "([^"]*)?"( not)* contains the text "([^"]*)?"` <br>Check if an element contains the given text
- `the (button|element) "([^"]*)?"( not)* contains any text` <br>Check if an element does not contain any text
- `the (button|element) "([^"]*)?" is( not)* empty` <br>Check if an element is empty
- `the page url is( not)* "([^"]*)?"` <br>Check the url of the current browser window/tab
- `the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"` <br>Check the value of an element's (css) attribute
- `the cookie "([^"]*)?" contains( not)* the value "([^"]*)?"` <br>Check the value of a cookie
- `the cookie "([^"]*)?" does( not)* exist` <br>Check the existence of a cookie
- `the element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)` <br>Check the width/height of an element
- `the element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis` <br>Check the position of an element
- `I have a screen that is ([\d]+) by ([\d]+) pixels` <br>Set the browser size to a given size
- `I have closed all but the first (window|tab)` <br>Close all but the first browser window/tab
- `a (alertbox|confirmbox|prompt) is( not)* opened` <br>Check if a modal is opened

## Then steps

- `I expect that the title is( not)* "([^"]*)?"` <br>Check the title of the current browser window/tab
- `I expect that element "([^"]*)?" does( not)* appear exactly "([^"]*)?" times` <br>Checks that the element is on the page a specific number of times
- `I expect that element "([^"]*)?" is( not)* visible` <br>Check if a certain element is visible
- `I expect that element "([^"]*)?" becomes( not)* visible` <br>Check if a certain element becomes visible
- `I expect that element "([^"]*)?" is( not)* within the viewport` <br>Check if a certain element is within the current viewport
- `I expect that element "([^"]*)?" does( not)* exist` <br>Check if a certain element exists
- `I expect that element "([^"]*)?"( not)* contains the same text as element "([^"]*)?"` <br>Compare the text of two elements
- `I expect that (button|element) "([^"]*)?"( not)* contains the text "([^"]*)?"` <br>Check if an element or input field contains the given text
- `I expect that (button|element) "([^"]*)?"( not)* contains any text` <br>Check if an element or input field contains any text
- `I expect that (button|elementelement) "([^"]*)?" is( not)* empty` <br>Check if an element or input field is empty
- `I expect that the url is( not)* "([^"]*)?"` <br>Check if the the URL of the current browser window/tab is a certain string
- `I expect that the path is( not)* "([^"]*)?"` <br>Check if the path of the URL of the current browser window/tab is a certain string
- `I expect the url to( not)* contain "([^"]*)?"` <br>Check if the URL of the current browser window/tab contains a certain string
- `I expect that the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"` <br>Check the value of an element's (css) attribute
- `I expect that checkbox "([^"]*)?" is( not)* checked` <br>Check if a check-box is (not) checked
- `I expect that element "([^"]*)?" is( not)* selected` <br>Check if an element is (not) selected
- `I expect that element "([^"]*)?" is( not)* enabled` <br>Check if an element is (not) enabled
- `I expect that cookie "([^"]*)?"( not)* contains "([^"]*)?"` <br>Check if a cookie with a certain name contains a certain value
- `I expect that cookie "([^"]*)?"( not)* exists` <br>Check if a cookie with a certain name exist
- `I expect that element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)` <br>Check the width/height of an element
- `I expect that element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis` <br>Check the position of an element
- `I expect that element "([^"]*)?" (has|does not have) the class "([^"]*)?"` <br>Check if an element has a certain class
- `I expect a new (window|tab) has( not)* been opened` <br>Check if a new window/tab has been opened
- `I expect the url "([^"]*)?" is opened in a new (tab|window)` <br>Check if a URL is opened in a new browser window/tab
- `I expect that element "([^"]*)?" is( not)* focused` <br>Check if an element has the focus
- `I wait on element "([^"]*)?"( for (\d+)ms)*( to( not)* (be checked|be enabled|be selected|be visible|contain a text|contain a value|exist))*` <br>Wait for an element to be checked, enabled, selected, visible, contain a certain value or text or to exist
- `I expect that a (alertbox|confirmbox|prompt) is( not)* opened` <br>Check if a modal is opened
- `I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "$text"` <br>Check the text of a modal

## When steps

- `I (click|doubleclick) on the (link|button|element) "([^"]*)?"` <br>(Double)click a link, button or element
- `I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"` <br>Add or set the content of an input field
- `I clear the inputfield "([^"]*)?"` <br>Clear an input field
- `I drag element "([^"]*)?" to element "([^"]*)?"` <br>Drag an element to another element
- `I submit the form "([^"]*)?"` <br>Submit a form
- `I pause for (\d+)ms` <br>Pause for a certain number of milliseconds
- `I set a cookie "([^"]*)?" with the content "([^"]*)?"` <br>Set the content of a cookie with the given name to  the given string
- `I delete the cookie "([^"]*)?"` <br>Delete the cookie with the given name
- `I press "([^"]*)?"` <br>Press a given key. You’ll find all supported characters [here](https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions). To do that, the value has to correspond to a key from the table.
- `I (accept|dismiss) the (alertbox|confirmbox|prompt)` <br>Accept or dismiss a modal window
- `I enter "([^"]*)?" into the prompt` <br>Enter a given text into a modal prompt
- `I scroll to element "([^"]*)?"` <br>Scroll to a given element
- `I close the last opened (window|tab)` <br>Close the last opened browser window/tab
- `I focus the last opened (window|tab)` <br>Focus the last opened browser window/tab
- `I log in to site with username "([^"]*)?" and password "([^"]*)?"` <br>Login to a site with the given username and password
- `I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"` <br>Select an option based on it's index
- `I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"` <br>Select an option based on its name, value or visible text
- `I move to element "([^"]*)?"( with an offset of (\d+),(\d+))` <br>Move the mouse by an (optional) offset of the specified element
