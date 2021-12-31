import * as ESBuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({name: 'fileCache'});

const fetchPlugIn = (inPutCode: string) => {
	return {
		name: 'fetchPlugIn',
		setup(build: ESBuild.PluginBuild) {
			build.onLoad({filter: /(^index\.js$)/}, () => {
				return {
					loader: 'jsx',
					contents: inPutCode
				};
			});

			build.onLoad({filter: /.*/}, async (buildArguments: any) => {
				const cachedResult = await fileCache.getItem<ESBuild.OnLoadResult>(buildArguments.path);

				if (cachedResult) {
					return cachedResult;
				};
			});

			build.onLoad({filter: /.css$/}, async (buildArguments: any) => {
				const { data, request }: {data: any, request: any} = await axios.get(buildArguments.path);
				const escapedData = data
					.replace(/\n/g, '')
					.replace(/'/g, "\\'")
					.replace(/"/g, '\\"');
				const contents = `
					const style = document.createElement('style');

					style.innerText = '${escapedData}';

					document.head.appendChild(style);
				`;

				const result: ESBuild.OnLoadResult = {
					loader: 'jsx',
					contents,
					resolveDir: new URL('./', request.responseURL).pathname
				};

				await fileCache.setItem(buildArguments.path, result);

				return result;
			});

			build.onLoad({filter: /.*/}, async (buildArguments: any) => {
				const { data, request } = await axios.get(buildArguments.path);

				const result: ESBuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname
				};

				await fileCache.setItem(buildArguments.path, result);

				return result;
			});
		}
	};
};

export default fetchPlugIn;