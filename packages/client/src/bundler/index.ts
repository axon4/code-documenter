import * as ESBuild from 'esbuild-wasm';
import unPKGPathPlugIn from './plugIns/unPKGPathPlugIn';
import fetchPlugIn from './plugIns/fetchPlugIn';

let service: ESBuild.Service;

export default async function bundler(inPut: string) {
	if (!service) {
		service = await ESBuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
		});
	};

	try {
		const bundle = await service.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unPKGPathPlugIn(), fetchPlugIn(inPut)],
			define: {
				global: 'window',
				'process.env.NODE_ENV': '"production"'
			},
			jsxFactory: '_React.createElement',
			jsxFragment: '_React.Fragment'
		});

		return {
			code: bundle.outputFiles[0].text,
			error: ''
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				code: '',
				error: error.message
			};
		};
	};
};