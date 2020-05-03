import { After } from 'cucumber';
import { notStrictEqual } from 'assert';
import { browser, logging } from 'protractor';

After(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    for (const log of logs) {
        notStrictEqual(log.level, logging.Level.SEVERE);
    }
});
