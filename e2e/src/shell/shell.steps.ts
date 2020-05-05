import { Given, Then, When } from 'cucumber';
import { ShellPage } from './shell.po';
import * as chai from 'chai';
import { hasClass } from '../protractor-extensions';
const expect = chai.expect;

const page = new ShellPage();

Given('the application is open', async () => {
    await page.navigateTo();
});

When('I open the application', async () => {
    await page.navigateTo();
});

Then('I can see the project list', async () => {
    const projects = await page.getProjectList();

    expect(projects).to.deep.equal(page.projectModels);
});

When('I open a project', async () => {
    await page.openFirstProject();
});

Then('I can see the change-theme widget', async () => {
    const colorThemeWidgetElement = page.getColorThemeWidget();

    expect(await colorThemeWidgetElement.isPresent()).to.be.true;
});

Given('The color theme widget starts as a dark color', async () => {
    const icon = page.getColorThemeIcon();

    expect(await hasClass(icon, 'is-solid')).to.be.true;
});

When('I hover over the widget', async () => {
    await page.hoverOverColorThemeWidget();
});

Then('The color theme widget changes to a light color', async () => {
    const icon = page.getColorThemeIcon();

    expect(await hasClass(icon, 'is-solid')).to.be.false;
});
