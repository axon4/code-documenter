"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const serve = (filename, directory, port, useProxy) => {
    const server = (0, express_1.default)();
    if (useProxy === true) {
        server.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent'
        }));
    }
    else {
        const packagePath = require.resolve('local-client/build/index.html');
        server.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    ;
    return new Promise((resolve, reject) => {
        server.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
