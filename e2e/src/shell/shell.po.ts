import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class ShellPage {
    projectModels: string[] = [
        'Squatbot',
        'Prospect',
        'Ancona',
        'Raft',
        'Duckling',
        'RogueZ',
        'Untitled Microgame Project',
        'A very long game title which took me ages to figure out how long it really should be',
    ];

    public navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    public async getProjectList(): Promise<string[]> {
        const projectElements = this.getProjectListElements();
        const projectTitles = [];
        for (let i = 0; i < await projectElements.count(); i++) {
            projectTitles.push(await projectElements.get(i).getText());
        }
        return projectTitles;
    }

    public async openFirstProject() {
        const projects = this.getProjectListElements();
        await projects.get(0).click();
    }

    public async hoverOverColorThemeWidget() {
        const widget = this.getColorThemeWidget();

        await browser.actions().mouseMove(widget).perform();
    }

    public getProjectListElements(): ElementArrayFinder {
        return element.all(by.css('dk-shell dk-splash-screen clr-vertical-nav a'));
    }

    public getColorThemeWidget(): ElementFinder {
        return element(by.css('dk-color-theme-widget'));
    }

    public getColorThemeIcon(): ElementFinder {
        const widget: ElementFinder = this.getColorThemeWidget();

        return widget.element(by.css('clr-icon'));
    }
}
