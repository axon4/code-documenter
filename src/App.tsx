import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';

function App() {
	const ref = useRef<any>();

	const [ input, setInput ] = useState('');
	const [ code, setCode ] = useState('');

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm'
		});
	};
	
	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		if (!ref.current) {
			return;
		};

		const transformation = await ref.current.transform(input, {
			loader: 'jsx',
			target: 'es2015'
		});

		setCode(transformation.code);
	};

	return (
		<>
			<textarea onChange={e => setInput(e.target.value)}></textarea>
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<code>{code}</code>
		</>
	);
};

export default App;