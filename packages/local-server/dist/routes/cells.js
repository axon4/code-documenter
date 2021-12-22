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
exports.createCellsRouter = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const express_1 = __importDefault(require("express"));
;
const createCellsRouter = (filename, directory) => {
    const cellsRouter = express_1.default.Router();
    cellsRouter.use(express_1.default.json());
    const fullPath = path_1.default.join(directory, filename);
    cellsRouter.get('/cells', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const file = yield promises_1.default.readFile(fullPath, { encoding: 'utf-8' });
            response.status(200).send(JSON.parse(file));
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                yield promises_1.default.writeFile(fullPath, '[]', 'utf-8');
            }
            else {
                throw error;
            }
            ;
        }
        ;
    }));
    cellsRouter.post('/cells', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const { cells } = request.body;
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        response.status(200);
    }));
    return cellsRouter;
};
exports.createCellsRouter = createCellsRouter;
