import { useState, useEffect } from 'react';
import bundler from '../bundler';
import Resizable from './resizable';
import CodeEditor from './codeEditor';
import Preview from './preview';

const CodeCell = () => {
	const [ input, setInput ] = useState('');
	const [ bundledCode, setBundledCode ] = useState('');
	const [ error, setError ] = useState('');

	useEffect(() => {
		const bundleTimer = setTimeout(async () => {
			const bundle = await bundler(input);
			setBundledCode(bundle!.code);
			setError(bundle!.error);
		}, 1000);

		return () => clearTimeout(bundleTimer);
	}, [input]);

	return (
		<Resizable direction='vertical'>
			<div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue='const App = () => <h1>Hello, World!</h1>'
						onChange={value => setInput(value)}
					/>
				</Resizable>
				<Preview code={bundledCode} error={error} />
			</div>
		</Resizable>
	);
};

export default CodeCell;