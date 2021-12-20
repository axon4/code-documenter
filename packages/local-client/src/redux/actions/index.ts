import { ActionTypes } from '../actionTypes';
import { CellTypes } from '../cell';

export type Direction = 'up' | 'down';

export interface MoveCellAction {
	type: ActionTypes.MOVE_CELL;
	payload: {
		id: string;
		direction: Direction;
	}
};

export interface UpdateCellAction {
	type: ActionTypes.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	}
};

export interface DeleteCellAction {
	type: ActionTypes.DELETE_CELL;
	payload: string;
};

export interface InsertCellAfterAction {
	type: ActionTypes.INSERT_CELL_AFTER;
	payload: {
		id: string | null;
		type: CellTypes;
	}
};

export interface BundleStartAction {
	type: ActionTypes.BUNDLE_START,
	payload: {cellID: string}
};

export interface BundleEndAction {
	type: ActionTypes.BUNDLE_END,
	payload: {
		cellID: string,
		bundle: {
			code: string,
			error: string
		}
	}
}

export type Action = MoveCellAction
	| UpdateCellAction
	| DeleteCellAction
	| InsertCellAfterAction
	| BundleStartAction
	| BundleEndAction;