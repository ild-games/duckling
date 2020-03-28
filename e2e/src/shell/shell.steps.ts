import { Given, Then, After } from 'cucumber';
import { ShellPage } from './shell.po';
import { deepEqual, notEqual } from 'assert';
import { browser, logging } from 'protractor';

const page = new ShellPage();

Given('the application is opened', async () => {
    await page.navigateTo();
});

Then('the project list is shown', async () => {
    const projects = await page.getProjectList();
    deepEqual(page.projectModels, projects);
});

After(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    for (let log of logs) {
        notEqual(log.level, logging.Level.SEVERE);
    }
});
