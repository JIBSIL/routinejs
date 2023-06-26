import { parse } from '../lib/parseDom.js';
import * as fs from 'fs'
// this file contains all functions defined by the checker

function sleep(int) {
    return new Promise((resolve) => {
        const seconds = int * 1000;
        setTimeout(() => {
            resolve({
                message: "Successful"
            });
        }, seconds)
    })
}

async function importDOM(name, file, database) {
    const filedata = fs.readFileSync(file);
    const components = await parse(filedata);
    database.doms[name] = components;
    return {
        message: "Successful",
        data: database
    };
}

function useDOM(name, database) {
    database.activeDOM = name;
    return {
        message: "Successful",
        data: database
    };
}

async function resetInput(name, database) {
    const component = database.doms[database.activeDOM][name];
    await component.type("");
    return {
        message: "Successful"
    }
}

async function input(text, name, database) {
    const component = database.doms[database.activeDOM][name];
    await component.type(text)
    return {
        message: "Successful"
    }
}

async function click(name, database) {
    const component = database.doms[database.activeDOM][name];
    await component.click();
    return {
        message: "Successful"
    }
}

export default {
    importDOM,
    useDOM,
    resetInput,
    sleep,
    click,
    input
}