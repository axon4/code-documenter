import { Cell } from '../';

export const defaultCells: Cell[] = [
	{
		ID: 'default1',
		type: 'text',
		conTent: "# Code-Documenter\n\nWelCome to Code-Documenter, an interActive programming/text environment. You can write JavaScript-code, see its execution in real-time, and comprehensively document in MarkDown.\n\n## Tips\n\n-  click on any text-cell (including this) to edit/preView\n-  the code in each code-cell is amalgamated inTo one file; definitions in earlier cells are accessible in later ones!\n-  you can show any primitive (number, string, array, object, etc), React-component, or anyThing else by calling the `show` function, which is a native-function in this environment. Call `show` multiple times to show multiple values\n-  reSize cells with the horizontal/vertical handles. ReOrder/Delete cells with the action-buttons in the top-right of each cell\n-  forMat code-cells with Prettier by clicking the forMat-button in the top-right of each editor\n-  insert cells by hovering over the divider between cells and choosing a type\n\n## Persistence (Work-in-Progress)\n\nAll your changes get saved to the file you opened Code-Documenter with; if you executed `code-documenter serve document.js`, all of the text/code you write will be saved to `document.js`."
	},
	{
		ID: 'default2',
		type: 'code',
		conTent: "import { useState } from 'react';\r\n\r\nfunction Counter() {\r\n    const [ count, setCount ] = useState(0);\r\n\r\n    return (\r\n        <>\r\n            <h2>Count: {count}</h2>\r\n                <button onClick={() => {setCount(count + 1)}}>Click</button>\r\n        </>\r\n    );\r\n};\r\n\r\n// disPlay any variables / React-components by calling `show`\r\nshow(Counter);"
	},
	{
		ID: 'default3',
		type: 'code',
		conTent: "import { Component } from 'react';\r\n\r\nclass Application extends Component {\r\n    render() {\r\n        return (\r\n            <>\r\n                <h1>Class vs Function?</h1>\r\n                    <i>Counter-Component Will Be Rendered Below</i>\r\n                    <hr/>\r\n                    {/* as `Counter` was declared in the previous cell, we can reference it here */}\r\n                    <Counter />\r\n            </>\r\n        );\r\n    };\r\n};\r\n\r\nshow(<Application />);"
	}
];