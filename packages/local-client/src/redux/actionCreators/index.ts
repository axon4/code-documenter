import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from '../';
import {
	MoveCellAction,
	UpdateCellAction, 
	DeleteCellAction, 
	InsertCellAfterAction, 
	Direction,
	Action
} from '../actions';
import { ActionTypes } from '../actionTypes';
import { Cell, CellTypes } from '../cell';
import bundler from '../../bundler';

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
	return {
		type: ActionTypes.MOVE_CELL,
		payload: {
			id,
			direction
		}
	};
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
	return {
		type: ActionTypes.UPDATE_CELL,
		payload: {
			id,
			content
		}
	};
};

export const deleteCell = (id: string): DeleteCellAction => {
	return {
		type: ActionTypes.DELETE_CELL,
		payload: id
	};
};

export const insertCellAfter = (
	id: string | null, cellType: CellTypes
): InsertCellAfterAction => {
	return {
		type: ActionTypes.INSERT_CELL_AFTER,
		payload: {
			id,
			type: cellType
		}
	};
};

export const createBundle = (cellID: string, input: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionTypes.BUNDLE_START,
			payload: { cellID }
		});

		const result = await bundler(input);

		dispatch({
			type: ActionTypes.BUNDLE_END,
			payload: { 
				cellID,
				bundle: result!
			}
		});
	};
};

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
	dispatch({type: ActionTypes.FETCH_CELLS_START});

	try {
		const { data }: {data: Cell[]} = await axios.get('/cells');

		dispatch({
			type: ActionTypes.FETCH_CELLS_END,
			payload: data
		});
	} catch (error: any) {
		dispatch({
			type: ActionTypes.FETCH_CELLS_ERROR,
			payload: error.message
		});
	};
};

export const saveCells = () => {
	return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
		const { cell: { order, data } } = getState();
		const cells = order.map(id => data[id]);

		try {
			await axios.post('/cells', { cells });
		} catch (error: any) {
			dispatch({
				type: ActionTypes.SAVE_CELLS_ERROR,
				payload: error.message
			});
		};
	};
};