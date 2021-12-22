"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_server_1 = require("local-server");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('open a file for editing')
    .option('-p,  --port <number>', 'port to run the server on', '4007')
    .action((filename = 'document.js', options) => {
    const directory = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    (0, local_server_1.serve)(path_1.default.basename(filename), directory, parseInt(options.port));
});
