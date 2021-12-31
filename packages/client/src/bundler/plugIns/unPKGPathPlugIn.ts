import * as ESBuild from 'esbuild-wasm';

const unPKGPathPlugIn = () => {
	return {
		name: 'unPKGPathPlugIn',
		setup(build: ESBuild.PluginBuild) {
			// root-entry of 'index.js'
			build.onResolve({filter: /(^index\.js$)/}, () => {
				return {namespace: 'code-documenter', path: 'index.js'};
			});

			// relative-path
			build.onResolve({filter: /^\.+\//}, async (buildArguments: any) => {
				return {
					namespace: 'code-documenter',
					path: new URL(buildArguments.path, 'https://unpkg.com' + buildArguments.resolveDir + '/').href
				};
			});

			// main-module
			build.onResolve({filter: /.*/}, async (buildArguments: any) => {
				return {
					namespace: 'code-documenter',
					path: `https://unpkg.com/${buildArguments.path}`
				};
			});
		}
	};
};

export default unPKGPathPlugIn;