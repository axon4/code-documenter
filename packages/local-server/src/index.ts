import path from 'path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const serve = (filename: string, directory: string, port: number) => {
    const server = express();

    const packagePath = require.resolve('local-client/build/index.html');
    server.use(express.static(path.dirname(packagePath)));

    // server.use(createProxyMiddleware({
    //     target: 'http://localhost:3000',
    //     ws: true,
    //     logLevel: 'silent'
    // }));

    return new Promise<void>((resolve, reject) => {
        server.listen(port, resolve).on('error', reject)
    });
};