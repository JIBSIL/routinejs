/**
 * embedded simplescript example
 */

import execute from '../modules/checker.js';

let storage = {
    doms: {}
}

// this is called a "routine" in simplescript
const simplescript = `
import dom "Google" from "../test-doms/Google.yaml"

use dom "Google"

input "Test" into query
clear query
type "Goooogle" into query
click search
`

const lines = simplescript.split("\n")
for (const item of lines) {
    if (item.split("")[0] === "#") {
        // comment
    } else if (!item) {
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