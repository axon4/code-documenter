import express from 'express';

export const serve = (filename: string, directory: string, port: number) => {
    const server = express();

    return new Promise<void>((resolve, reject) => {
        server.listen(port, resolve).on('error', reject)
    });
};