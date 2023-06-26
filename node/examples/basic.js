/**
 * basic example using javascript (no simplescript!)
 */

import { parse } from '../lib/parseDom.js';
import fs from 'fs';

const filedata = fs.readFileSync("../test-doms/Google.yaml")
const components = await parse(filedata);

await components.query.type("Gooooooooooooooogle");
await components.search.click();