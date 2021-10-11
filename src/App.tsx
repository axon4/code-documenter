import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import unpkgPathPlugin from './plugins/unpkg-path-plugin';
import fetchPlugin from './plugins/fetch-plugin';
import CodeEditor from './components/codeEditor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

function App() {
	const ESBuildRef = useRef<any>();

	const [ input, setInput ] = useState('');

	const startService = async () => {
		ESBuildRef.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
		});
	};
	
	useEffect(() => {
		startService();
	}, []);

	const iframeRef = useRef<any>();
	const iframeHTML = `
		<html>
			<head></head>
			<body>
				<div id='root'></div>
				<script>
					window.addEventListener('message', event => {
						try {
							eval(event.data);
						} catch (error) {
							const root = document.getElementById('root');
							root.innerHTML = '<div>' + error + '</div>';
							console.error(error);
						};
					}, false);
				</script>
			</body>
		</html>
	`;

	const onClick = async () => {
		if (!ESBuildRef.current) {
			return;
		};

		iframeRef.current.srcdoc = iframeHTML;

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

		iframeRef.current.contentWindow.postMessage(bundle.outputFiles[0].text, '*');
	};

	return (
		<>
			<CodeEditor
				initialValue='console.table();'
				onChange={value => setInput(value)}
			/>
			<textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<iframe title='Preview' ref={iframeRef} srcDoc={iframeHTML} sandbox='allow-scripts' />
		</>
	);
};

export default App;