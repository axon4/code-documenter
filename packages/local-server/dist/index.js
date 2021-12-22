"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const serve = (filename, directory, port) => {
    const server = (0, express_1.default)();
    const packagePath = require.resolve('local-client/build/index.html');
    server.use(express_1.default.static(path_1.default.dirname(packagePath)));
    // server.use(createProxyMiddleware({
    //     target: 'http://localhost:3000',
    //     ws: true,
    //     logLevel: 'silent'
    // }));
    return new Promise((resolve, reject) => {
        server.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
