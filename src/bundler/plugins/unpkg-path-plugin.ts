import * as esbuild from 'esbuild-wasm';
 
const unpkgPathPlugin = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			// root entry file of 'index.js'
			build.onResolve({filter: /(^index\.js$)/}, () => {
				return {namespace: 'a', path: 'index.js'};
			});

			// relative path
			build.onResolve({filter: /^\.+\//}, async (args: any) => {
				return {
					namespace: 'a',
					path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
				};
			});

			// main module
			build.onResolve({filter: /.*/}, async (args: any) => {
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`
				};
			});
		}
	};
};

export default unpkgPathPlugin;