import { WebElement } from 'protractor';

export async function hasClass(element: WebElement, className: string): Promise<boolean> {
    const classAttribute = await element.getAttribute('class');
    const classes = classAttribute.split(' ');
    return classes.indexOf(className) !== -1;
}
