import { ShellPage } from './shell.po';
import { browser, logging } from 'protractor';

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

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
