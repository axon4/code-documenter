import { ActionTypes } from '../actionTypes';
import { Cell, CellTypes } from '../cell';

export type Direction = 'up' | 'down';

export interface MoveCellAction {
	type: ActionTypes.MOVE_CELL;
	payLoad: {
		ID: string;
		direction: Direction;
	};
};

export interface UpDateCellAction {
	type: ActionTypes.UPDATE_CELL;
	payLoad: {
		ID: string;
		conTent: string;
	};
};

export interface DeleteCellAction {
	type: ActionTypes.DELETE_CELL;
	payLoad: string;
};

export interface InsertCellAfterAction {
	type: ActionTypes.INSERT_CELL_AFTER;
	payLoad: {
		ID: string | null;
		type: CellTypes;
	};
};

export interface BundleStartAction {
	type: ActionTypes.BUNDLE_START;
	payLoad: {cellID: string};
};

export interface BundleEndAction {
	type: ActionTypes.BUNDLE_END;
	payLoad: {
		cellID: string,
		bundle: {
			code: string,
			error: string
		}
	};
};

export interface FetchCellsStartAction {
	type: ActionTypes.FETCH_CELLS_START;
};

export interface FetchCellsEndAction {
	type: ActionTypes.FETCH_CELLS_END;
	payLoad: Cell[];
};

export interface FetchCellsErrorAction {
	type: ActionTypes.FETCH_CELLS_ERROR;
	payLoad: string;
};

export interface SaveCellsErrorAction {
	type: ActionTypes.SAVE_CELLS_ERROR;
	payLoad: string;
}

export type Action = MoveCellAction
	| UpDateCellAction
	| DeleteCellAction
	| InsertCellAfterAction
	| BundleStartAction
	| BundleEndAction
	| FetchCellsStartAction
	| FetchCellsEndAction
	| FetchCellsErrorAction
	| SaveCellsErrorAction;