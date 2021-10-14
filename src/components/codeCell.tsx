import { useState } from 'react';
import CodeEditor from './codeEditor';
import Preview from './preview';
import bundler from '../bundler';

const CodeCell = () => {
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

export default CodeCell;