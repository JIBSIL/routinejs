/**
 * parser :D
 * parses a yaml DOM file into an object
 * uses js-yaml for parsing
 * 
 * although now it has playwright for node compatibility
 */

import yaml from 'js-yaml';
import util from '../modules/util.js';
import { chromium } from 'playwright';

async function parse(file) {
    const domInstructions = yaml.load(file);

    const components = domInstructions.components;

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(domInstructions.meta.url);
    // await browser.close();

    // node compatibility stuff
    for (const item of Object.values(components)) {
        const key = util.getKeyByValue(components, item);

        let element;
        if (item.attributes) {
            for (const item2 of Object.values(item.attributes)) {
                const key2 = util.getKeyByValue(item.attributes, item2)
                try {
                    element = page.locator(`[${key2}="${item2}"]`).first()
                } catch(e) {
                    console.log("DEBUG: caught error " + e)
                }
            }
            // if (item.attributes.value) element = page.locator(`text=${item.attributes.value}`)
        } else if (item.xpath) element = page.locator(`xpath=/${item.xpath}`).first();
        else if (item.id) element = page.locator(`#${item.id}`).first();

        if (item.type === "button") {
            item.click = async () => {
                await element.click();
                console.log(`Clicked ${key}`);
            }
        } else if (item.type === "input") {
            item.type = async (text) => {
                if (text === "") {
                    await element.clear()
                    console.log(`Reset ${key}`)
                } else {
                    await element.type(text)
                    console.log(`Typed ${text} to ${key}`);
                }
            }
        }
    };
    return components;
}

export {
    parse
}