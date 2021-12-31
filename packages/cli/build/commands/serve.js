"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const code_documenter_server_1 = require("code-documenter-server");
const isInProduction = process.env.NODE_ENV === 'production';
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('open a file for editing')
    .option('-p,  --port <number>', 'port to run the server on', '4007')
    .action((filename = 'document.js', { port }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const directory = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        yield (0, code_documenter_server_1.serve)(path_1.default.basename(filename), directory, parseInt(port), !isInProduction);
        console.log(`opened ${filename}. navigate to http://localhost:${port} to edit the file.`);
    }
    catch (error) {
        switch (error.code) {
            case 'EADDRINUSE':
                console.log(`port ${port} is already in use. please try another port.`);
                break;
            default:
                console.log(error.message);
                break;
        }
        ;
        process.exit(1);
    }
    ;
}));
