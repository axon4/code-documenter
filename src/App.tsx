import { useState } from 'react';

import CodeEditor from './components/codeEditor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from './components/preview';
import bundler from './bundler';

function App() {
	const [ input, setInput ] = useState('');
	const [ bundledCode, setBundledCode ] = useState('');

	const onClick = async () => {
		const bundle = await bundler(input);
		setBundledCode(bundle);
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