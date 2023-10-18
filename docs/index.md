# Cypress Automation
Cypress automation of web3/dapps using the Synpress that allows us to test metamask login, authentication and interaction with smart contracts.

### What is Synpress?
Synpress is a wrapper around Cypress and also extending it with the help of Puppeteer . Resulting in custom commands which allow you to interact with MetaMask. 

### How does it work? 
It runs a global cypress before routine, that installs a MetaMask plugin, and configures it.

- passes metmask welcome page
- imports wallet
- changes network (defaults to kovan) or creates custom network and changes to it (depending on your setup)
- switches back to Cypress window and starts testing

#### So remember: 
Synpress allows us to test metamask login, authentication and interaction with smart contracts.

## Synpress Setting up:
#### First setup Cypress
- Create an empty folder having name of your choice.
- Open folder in visual studio code.
- Ceate a package inside that empty folder using ``` npm init -y ```
- Now install cypress using the command ``` npm i cypress``` 
- After that open cypress using the command ```npx cypress open ```
- Cypress will open and ask you to configure it. Just follow the steps and you are done.
- Cypress will then show you the browser to open and you need to select the desire browser.
- You can add a spec file in the cypress browser.
- After that in VS code you can add a test file in the format "fileName.cy.js" under the e2e folder.
- At the top of each file mention ``` /// <reference types="Cypress"/> ``` for autocompleting.
- Now you can write the test cases.

#### Now setup Synpress
- First of all install Synpress using command ``` npm i @synthetixio/synpress ```
- Then install ``` npm install env-cmd ```

**Note: The env-cmd package installs an executable script named env-cmd which can be called before your scripts to easily load environment variables from an external file.**

- Add below script to package.json:
```
"scripts": {
    "test": "env-cmd -f .env npx synpress run -cf synpress.json --config supportFile='cypress/support/e2e.js'"
}
```
**Note: I removed this ``` --config supportFile='cypress/support/e2e.js ``` from the above script because it was not working for me with this part.**

- Now import/paste the following in support/e2e.js
```
import './commands'
import "@synthetixio/synpress/support";
```

#### Add .env file
- Now add the .env file to root level that includes seedphrase and the network name you want to connect in the below format.
```
NETWORK_NAME=kovan
SECRET_WORDS="test, test, test, test, test, test, test, test, test, test, test, test"
```

#### Add synpress.json file
- Now add the synpress.json file at the root level that includes the configuration of synpress having the following the code:
```
{
    "baseUrl": "https://app.unipilot.io/",
    "userAgent": "synpress",
    "retries": { "runMode": 0, "openMode": 0 },
    "integrationFolder": "cypress/e2e",
    "chromeWebSecurity": true,
    "viewportWidth": 1366,
    "viewportHeight": 850,
    "component": {
      "componentFolder": ".",
      "testFiles": "**/*cy.{js,jsx,ts,tsx}"
    },
    "env": {
      "coverage": false
    },
    "defaultCommandTimeout": 30000,
    "pageLoadTimeout": 30000,
    "requestTimeout": 30000,
    "supportFile": "cypress/support/e2e.js"
  }
```

#### Run the test
- As we added scripts to our package.json we can now easily run our test with ``` npm run test ``` which stands for ``` env-cmd -f .env npx synpress run -cf synpress.json ```

## Important things to Remember:

- There is a global before() which runs metamask setup before all tests:
    - passes welcome page
	- imports wallet
	- changes network (defaults to kovan) or creates custom network and changes to it (depending on your setup)
	- switches back to Cypress window and starts testing

- It requires environmental variable called SECRET_WORDS to be present in following format => 'word1, word2, etc..' or private key in an environmental variable called PRIVATE_KEY.

- To change default network (kovan), you can use NETWORK_NAME environmental variable, for example: NETWORK_NAME=rinkeby.

- Available choices are: mainnet, ropsten, kovan, rinkeby, goerli and localhost.

- To create and switch to custom network at metamask setup phase, use these:
    - NETWORK_NAME => ex: synthetix
    - RPC_URL => ex: https://synthetix-node.io
    - CHAIN_ID => ex: 123
    - SYMBOL (optional) => ex: SNX
    - BLOCK_EXPLORER (optional) => ex: https://synthetix-explorer.io
    - IS_TESTNET (optional) => ex: false

- Metamask version is hardcoded. However, you can still override metamask with METAMASK_VERSION environmental variable, for example: METAMASK_VERSION=9.3.0 or METAMASK_VERSION=latest.

- By default the Synpress setup the metamask password "Tester@1234"

### How to use X-Path in Cypress:
- Cypress by default does not support X-Path.
- For x-path to be used in cypress, we have to install a plugin "cypress-xpath".
- The plugin can be found here https://github.com/cypress-io/cypress-xpath

#### Install cypress-xpath: 
- Install with npm ```npm install -D cypress-xpath```
- Install with yarn ```yarn add cypress-xpath --dev```
- After Installation of the plugin, include this ```require('cypress-xpath');``` in your project support file.
- For cypress version 10 the support file can be found under the support folder -> e2e.js.
- Just put the above command in that file.
- To properly load the types for cy.xpath command, add to your spec file the following comment ```/// <reference types="cypress-xpath" />```

#### Usage: 
- After installation your cy object will have xpath command.
```it('finds list items', () => {
  cy.xpath('//ul[@class="todo-list"]//li').should('have.length', 3);
});```

- You can also chain xpath off of another command.
```it('finds list items', () => {
  cy.xpath('//ul[@class="todo-list"]').xpath('./li').should('have.length', 3);
});```

- As with other cy commands, it is scoped by cy.within().
```it('finds list items', () => {
  cy.xpath('//ul[@class="todo-list"]').within(() => {
    cy.xpath('./li').should('have.length', 3);
  });
});```

### Beware the XPath // trap:
- In XPath the expression // means something very specific, and it might not be what you think. Contrary to common belief, // means "anywhere in the document" not "anywhere in the current context". As an example:
```cy.xpath('//body').xpath('//script');```

- You might expect this to find all script tags in the body, but actually, it finds all script tags in the entire document, not only those in the body! What you're looking for is the .// expression which means "any descendant of the current node":
```cy.xpath('//body').xpath('.//script');```

- The same thing goes for within:
```cy.xpath('//body').within(() => {
  cy.xpath('.//script');
});```


## What is XPath:
- Xpath stands for XML Path Language.
- Xpath is a query language used to access or naviagate in XML/HTMl document.
- Xpath basically uses a path expression to select the node from the document.

#### Absolute XPath
- Absolute xpath start with ```/```, that means it will start selection from start or root node.
- Absoulte xpath is lenghty and difficult to maintain.

#### Relative XPath
- Relative xpath start with ```//```, that means it will start selection from the current node that matches the selection.
- Relative xpath is short and can easily handled.
- In automation, mainly the relative xpath is used.

#### How to verify xpath in browser console?
- In order to verify the xpath in the browser console just use the command ```$x("/html/body/div[1]/div/div[1]/a")``` for absolute xpath and this ```$x("//a[@title='Home']")``` for relative xpath.

