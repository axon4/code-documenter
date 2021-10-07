import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import unpkgPathPlugin from './plugins/unpkg-path-plugin';
import fetchPlugin from './plugins/fetch-plugin';

function App() {
	const ESBuildRef = useRef<any>();

	const [ input, setInput ] = useState('');
	const [ code, setCode ] = useState('');

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

		// setCode(bundle.outputFiles[0].text);
		iframeRef.current.contentWindow.postMessage(bundle.outputFiles[0].text, '*');
	};

	const iframeRef = useRef<any>();
	const html = `
		<html>
			<head></head>
			<body>
				<div id='root'></div>
				<script>
					window.addEventListener('message', event => {
						eval(event.data);
					}, false);
				</script>
			</body>
		</html>
	`;

	return (
		<>
			<textarea onChange={e => setInput(e.target.value)}></textarea>
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<pre>{code}</pre>
			<iframe ref={iframeRef} srcDoc={html} sandbox='allow-scripts' />
		</>
	);
};

export default App;