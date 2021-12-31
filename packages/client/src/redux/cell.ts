export type CellTypes = 'code' | 'text';

export interface Cell {
	ID: string;
	type: CellTypes;
	conTent: string;
};