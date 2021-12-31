import path from 'path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes/cells';

export const serve = (filename: string, directory: string, port: number, useProxy: boolean) => {
	const server = express();

	server.use(createCellsRouter(filename, directory));

	if (useProxy === true) {
		server.use(createProxyMiddleware({
			target: 'http://localhost:3000',
			ws: true,
			logLevel: 'silent'
		}));
	} else {
		const packagePath = require.resolve('code-documenter-client/build/index.html');

		server.use(express.static(path.dirname(packagePath)));
	};	
	return new Promise<void>((resolve, reject) => {
		server.listen(port, resolve).on('error', reject)
	});
};