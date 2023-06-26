# simplescript

SimpleScript is a scripting language designed to be used with basic English language.

Instead of writing something like this:

```javascript
const domMappings = await loadDomMappings("test.yaml")
await getDOM(domMappings.url)
    .input("Test", domMappings.query)
    .click(domMappings.search)
```

You could instead write this in SimpleScript syntax:

```
import page "Google" from "test.yaml"
use page "Google"

input "Test" into query
click "Search"
```

Each "command" is defined using a simplified RegExp syntax and compiled to normal RegExp at runtime. It is then executed through JavaScript functions, meaning that the user likely will never have to touch normal code or RegExp.

## Method

SimpleScript definitions should be added to support the greatest amount of possible statements by the user. A statement should encompass all major ways of saying a statement so that the user's SimpleScript code doesn't error unexpectedly.

For example, `(sleep|wait|stop|pause)[ for] %integer% second[s]` allows for plurals, extra words and different ways of saying `sleep` for the most compatibility.

## Syntax

SimpleScript functions are defined in checker.js using JSON. Here's an example:
```javascript
{
    command: "(sleep|wait|stop|pause)[ for] %integer% second[s]",
    function: functions["sleep"],
    async: true,
    database: false
},
```

Parentheses () are OR statements. 
* For example, the statement (this|that) would be interpeted as this OR that.
* This means that the user can input either one for the command to work.

Square brackets [] are optionals.
* For example, this[ or that] would work for both "this" and "this or that"
* They are not required statements but simply added for compatibility.

Percent signs %% are types.
* They resolve to RegExp and are considered input groups.
* For example %integer% resolves to the RegExp [0-9]
* They can be defined in the checker.js file.
* As a SimpleScript example: `send signal 1 to process 5` with a cooresponding JS function sendSignal(number, process) with a SimpleScript definition of `send signal %integer% to process %integer%` would result in 1, 5 being passed into the sendSignal function.

Hashtags # are comments
* They are treated the same as blank lines and are simply there to inform the user and other users about a porton of the code.

## Extending

SimpleScript, its types and its syntax can be easily extended simply by modifying the `checker.js` file in a fork. If you have a lot of extra syntax that you think should be added, make a PR!

## Translations

Translations are not available currently as I (JIBSIL, the only current maintainer) do not know other languages confidently enough to rewrite the engine in them. However modifying the commands is always supported and I would like to add translations in the future.

The most urgently needed translations are Spanish, Mandarin Chinese, French, Hindi and Russian although all contributions are welcome.