import { useState } from 'react';
import CodeEditor from './codeEditor';
import Preview from './preview';
import bundler from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
	const [ input, setInput ] = useState('');
	const [ bundledCode, setBundledCode ] = useState('');

	const onClick = async () => {
		const bundle = await bundler(input);
		setBundledCode(bundle);
	};

	return (
		<Resizable direction='vertical'>
			<div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
				<CodeEditor
					initialValue='const App = () => <h1>Hello, World!</h1>'
					onChange={value => setInput(value)}
				/>
				<Preview code={bundledCode} />
			</div>
		</Resizable>
	);
};

export default CodeCell;