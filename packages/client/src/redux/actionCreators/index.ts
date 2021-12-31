import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from '../';
import {
	MoveCellAction,
	UpDateCellAction,
	DeleteCellAction,
	InsertCellAfterAction,
	Direction,
	Action
} from '../actions';
import { ActionTypes } from '../actionTypes';
import { Cell, CellTypes } from '../cell';
import bundler from '../../bundler';

export const moveCell = (ID: string, direction: Direction): MoveCellAction => {
	return {
		type: ActionTypes.MOVE_CELL,
		payLoad: { ID, direction }
	};
};

export const upDateCell = (ID: string, conTent: string): UpDateCellAction => {
	return {
		type: ActionTypes.UPDATE_CELL,
		payLoad: { ID, conTent }
	};
};

export const deleteCell = (ID: string): DeleteCellAction => {
	return {
		type: ActionTypes.DELETE_CELL,
		payLoad: ID
	};
};

export const insertCellAfter = (ID: string | null, cellType: CellTypes): InsertCellAfterAction => {
	return {
		type: ActionTypes.INSERT_CELL_AFTER,
		payLoad: {
			ID, 
			type: cellType
		}
	};
};

export const createBundle = (cellID: string, inPut: string) => {
	return async (disPatch: Dispatch<Action>) => {
		disPatch({
			type: ActionTypes.BUNDLE_START,
			payLoad: { cellID }
		});

		const result = await bundler(inPut);

		disPatch({
			type: ActionTypes.BUNDLE_END,
			payLoad: {
				cellID,
				bundle: result!
			}
		});
	};
};

export const fetchCells = () => async (disPatch: Dispatch<Action>) => {
	disPatch({type: ActionTypes.FETCH_CELLS_START});

	try {
		const { data }: {data: Cell[]} = await axios.get('/cells');

		disPatch({
			type: ActionTypes.FETCH_CELLS_END,
			payLoad: data
		});
	} catch (error: any) {
		disPatch({
			type: ActionTypes.FETCH_CELLS_ERROR,
			payLoad: error.message
		});
	};
};

export const saveCells = () => {
	return async (disPatch: Dispatch<Action>, getState: () => RootState) => {
		const { cell: { order, data } } = getState();
		const cells = order.map(ID => data[ID]);

		try {
			await axios.post('/cells', { cells });
		} catch (error: any) {
			disPatch({
				type: ActionTypes.SAVE_CELLS_ERROR,
				payLoad: error.message
			});
		};
	};
};