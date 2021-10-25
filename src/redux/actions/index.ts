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

export interface InsertCellBeforeAction {
	type: ActionTypes.INSERT_CELL_BEFORE;
	payload: {
		id: string | null;
		type: CellTypes;
	}
};

export type Action = MoveCellAction
	| UpdateCellAction
	| DeleteCellAction
	| InsertCellBeforeAction;