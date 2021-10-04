import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
	name: 'fileCache'
});

(async () => {
	await fileCache.setItem('colour', 'green');
	const colour = await fileCache.getItem('colour');
	console.log(colour);
})();
 
export const unpkgPathPlugin = (inputCode: string) => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onResolve({filter: /.*/}, async (args: any) => {
				console.log('onResolve', args);

				if (args.path === 'index.js') {
					return {namespace: 'a', path: args.path};
				};

				if (args.path.includes('./') || args.path.includes('../')) {
					return {
						namespace: 'a',
						path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
					};
				};

				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`
				};
			});
 
			build.onLoad({filter: /.*/}, async (args: any) => {
				console.log('onLoad', args);
 
				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: inputCode
					};
				};

				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
				if (cachedResult) {
					return cachedResult;
				};

				const { data, request } = await axios.get(args.path);
				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname
				};
				await fileCache.setItem(args.path, result);

				return result;
			});
		}
	};
};