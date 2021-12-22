import path from 'path';
import fs from 'fs/promises';
import express from 'express';

interface Cell {
	id: string;
	type: 'code' | 'text';
	content: string;
};

export const createCellsRouter = (filename: string, directory: string) => {
	const cellsRouter = express.Router();
	const fullPath = path.join(directory, filename);
	
	cellsRouter.get('/cells', async (request, response) => {
	
	});
	
	cellsRouter.post('/cells', async (request, response) => {
		const { cells }:{cells: Cell[]} = request.body;

		await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

		response.status(200);
	});

	return cellsRouter;
};