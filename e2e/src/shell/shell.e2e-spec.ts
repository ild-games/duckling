import { ShellPage } from './shell.po';
import { browser, logging, element, by } from 'protractor';

describe('Shell', () => {
    let page: ShellPage;

    beforeEach(() => {
        page = new ShellPage();
    });

    it('should render the recent projects', async () => {
        page.navigateTo();
        const projects = await page.getProjectList();
        expect(projects).toEqual(page.projectModels);
    });

    it('should only show the opened project after a project is clicked', async () => {
        page.navigateTo();

        const contextArea = element(by.css('.content-area'));
        expect(contextArea.isPresent()).toBeFalsy();

        const projects = page.getProjectListElements();
        await projects.get(0).click();
        const firstProjectName = await projects.get(0).getText();

        expect(contextArea.isPresent()).toBeTruthy();
        const contentAreaText = await contextArea.getText();
        expect(contentAreaText).toBe(`${firstProjectName} Is Opened!`);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
