import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import unpkgPathPlugin from './plugins/unpkg-path-plugin';
import fetchPlugin from './plugins/fetch-plugin';
import CodeEditor from './components/codeEditor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from './components/preview';

function App() {
	const ESBuildRef = useRef<any>();

	const [ input, setInput ] = useState('');
	const [ bundledCode, setBundledCode ] = useState('');

	const startService = async () => {
		ESBuildRef.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
		});
	};
	
	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		if (!ESBuildRef.current) {
			return;
		};

		const bundle = await ESBuildRef.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [
				unpkgPathPlugin(),
				fetchPlugin(input)
			],
			define: {
				global: 'window',
				'process.env.NODE_ENV': '"production"'
			}
		});

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