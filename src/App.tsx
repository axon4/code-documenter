import { useState, useEffect, useRef } from 'react';

import CodeEditor from './components/codeEditor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from './components/preview';

function App() {
	const ESBuildRef = useRef<any>();

	const [ input, setInput ] = useState('');
	const [ bundledCode, setBundledCode ] = useState('');



	const onClick = async () => {
		if (!ESBuildRef.current) {
			return;
		};

		const bundle = 

		setBundledCode(bundle.outputFiles[0].text)
	};

	return (
		<>
			<CodeEditor
				initialValue='const App = () => <h1>Hello, World!</h1>'
				onChange={value => setInput(value)}
			/>
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<Preview code={bundledCode} />
		</>
	);
};

export default App;