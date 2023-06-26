// SimpleScript

import functions from './exec.js'

const types = [
    {
        input: "%integer%",
        output: "[0-9]"
    },
    {
        input: "%text%",
        output: "[a-zA-Z!@#$%^&*()_+\\-=\\[\\]{};:\\|,.<>\/?]*"
    }
]

const defined_commands = [
    {
        command: "(sleep|wait|stop|pause)[ for] %integer% second[s]",
        function: functions["sleep"],
        async: true,
        database: false
    },
    {
        command: `import (dom|DOM|webpage|website|page) ["]%text%["] from ["]%text%["]`,
        function: functions["importDOM"],
        async: true,
        database: true
    },
    {
        command: `use (dom|DOM|webpage|website|page) ["]%text%["]`,
        function: functions["useDOM"],
        async: false,
        database: true
    },
    {
        command: `(clear|reset) ["]%text%["]`,
        function: functions["resetInput"],
        async: true,
        database: true
    },
    {
        command: `(input|type) ["]%text%["] (into|to) ["]%text%["]`,
        function: functions["input"],
        async: true,
        database: true
    },
    {
        command: `click[ on] ["]%text%["]`,
        function: functions["click"],
        async: true,
        database: true
    }
]

function parse_string(str) {
    let regexpReplaceString;
    // remove optionals
    regexpReplaceString = str.replace(/\[([^\]]+)\]/g, '(?:$1)?');
    for (let i = 0; i < types.length; i++) {
        regexpReplaceString = regexpReplaceString.replace(new RegExp(types[i].input, "gm"), types[i].output);
    }
    return regexpReplaceString;
}

function validate_string(filter, str) {
    return new RegExp(filter).test(str)
}

async function execute(string, database) {
    let m = (performance.now() + performance.timeOrigin)
    for (let i = 0; i < defined_commands.length; i++) {
        let val = defined_commands[i]
        const parsed = parse_string(val.command)
        // show debug regexp and options
        // console.log(parsed)
        if (validate_string(parsed, string)) {
            let regexpString = val.command;

            // add capturing group so optionals aren't matched
            regexpString = regexpString.replace(/\(([^)]+)\)/g, '(?:$1)?');

            // remove optionals
            regexpString = regexpString.replace(/\[([^\]]+)\]/g, '(?:$1)?');
            for (let i = 0; i < types.length; i++) {
                const inputRegexp = new RegExp(types[i].input, "g")
                // regexpString = regexpString.replace(inputRegexp, "(.+)");
                regexpString = regexpString.replace(inputRegexp, `(${types[i].output})`);
            }
            // console.log(regexpString)
            const transformedString = new RegExp(regexpString)
            let matchedString = string.match(transformedString);
            matchedString.shift() // remove first element

            // remove empty (optional) args
            matchedString = matchedString.filter((value) => {
                if(value) return true;
            })

            try {
                let out;
                if (val.async) {
                    if(val.database) {
                        out = await defined_commands[i].function(...matchedString, database)
                    } else {
                        out = await defined_commands[i].function(...matchedString)
                    }
                } else {
                    if(val.database) {
                        out = defined_commands[i].function(...matchedString, database)
                    } else {
                        out = defined_commands[i].function(...matchedString)
                    }
                }
                if (out) {
                    return {
                        error: false,
                        data: out
                    }
                } else {
                    return {
                        error: false,
                        data: null
                    }
                }
            } catch (e) {
                return {
                    error: true,
                    data: e
                }
            }
        }
    }
    return {
        error: true,
        data: "unknown syntax"
    }
}

export default execute