/**
 * discrete file simplescript example
 */

import fs from 'fs';
import execute from '../modules/checker.js';

let storage = {
    doms: {}
}

// this is called a "routine" in simplescript

const file = "simplescript/test.ssk"

const simplescript = fs.readFileSync(file, 'utf-8')

const lines = simplescript.split("\n")
for (const item of lines) {
    if (item.split("")[0] === "#") {
        // comment
    // https://stackoverflow.com/questions/1552749/difference-between-cr-lf-lf-and-cr-line-break-types
    // whyy are there so many line endings
    } else if (!item || item === "\r" || item === "\n" || item === "\r\n") {
        // no content
    } else {
        const output = await execute(item, storage)
        if (output.error) {
            console.log(`error at ${item}; ${output.data}`);
        }
        if (output.data.data) {
            storage = output.data.data;
        }
        if (output.message) {
            console.log("command returned: " + output.data.message)
        }
    }
}