## routinejs

RoutineJS is a program that allows people to use simple syntax to create automated browser actions.

It's currently in the ALPHA: 0.0.1 version/phase.

## SimpleScript

To allow the maximum use of simple syntax, a new language was needed. Therefore, I made SimpleScript to serve this purpose.

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

It allows defining complex JS functions as simple plain-english syntax and was inspired by AppleScript and Skript.

You can read about it in [SIMPLESCRIPT.md](SIMPLESCRIPT.md)

## License

SimpleScript is under a MIT license.