"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCells = void 0;
exports.defaultCells = [
    {
        "id": "default1",
        "type": "text",
        "content": "# Code Documenter\n\nWelcome to Code Documenter, an interactive programming and text environment. You can write JavaScript code, see it's execution, and comprehensively document with MarkDown.\n\n## Tips\n\n-  Click on any text cell (including this one) to edit and preview it.\n-  The code in each code cell is amalgamated into one file; definitions in earlier cells are accessible in the later ones!\n-  You can show any primitive (number, string, array, object, etc), React component, or anything else by calling the `show` function. This is a native function in this environment. Call `show` multiple times to show multiple values.\n-  Resize cells with the horizontal and vertical handles. Re-order/Delete cells with the buttons in the top right of each cell.\n-  Format code cells with Prettier by clicking the 'Format' button in the top right.\n-  Insert cells by hovering over the divider between cells, and choosing a type.\n\n## Persistence\n\nAll your changes get saved to the file you opened Code Documenter with (defaults to `document.js`). So if you ran `npx code-documenter serve notebook.js`, all of the text and code you write will be saved to `notebook.js`."
    },
    {
        "id": "default2",
        "type": "code",
        "content": "import { useState } from 'react';\r\n\r\nconst Counter = () => {\r\n    const [ count, setCount ] = useState(0);\r\n\r\n    return (\r\n        <>\r\n            <h2>Count: {count}</h2>\r\n                <button onClick={() => setCount(count + 1)}>Click</button>\r\n        </>\r\n    );\r\n};\r\n\r\n// display any variables / React components by calling `show`\r\nshow(Counter);"
    },
    {
        "id": "default3",
        "type": "code",
        "content": "import { Component } from 'react';\r\n\r\nclass App extends Component {\r\n    render() {\r\n        return (\r\n            <>\r\n                <h1>Class vs Function?</h1>\r\n                    <i>The Counter Component Will Be Rendered Below</i>\r\n                    <hr/>\r\n                    {/* `Counter` was declared in the previous cell,\r\n                    so we can reference it here */}\r\n                    <Counter />\r\n            </>\r\n        );\r\n    };\r\n};\r\n\r\nshow(<App />);"
    }
];
