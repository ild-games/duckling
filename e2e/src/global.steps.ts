import { After } from 'cucumber';
import { notEqual } from 'assert';
import { browser, logging } from 'protractor';

After(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    for (const log of logs) {
        notEqual(log.level, logging.Level.SEVERE);
    }
});
