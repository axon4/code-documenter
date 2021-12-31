import produce from 'immer';
import { Action } from '../actions';
import { ActionTypes } from '../actionTypes';
import { Cell } from '../cell';
import { defaultCells } from './defaultCells';

interface CellState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell;
	};
};

const initialState: CellState = {
	loading: false,
	error: null,
	order: [],
	data: {}
};

const cellReducer = produce((state: CellState = initialState, action: Action): CellState => {
	switch (action.type) {
		case ActionTypes.MOVE_CELL:
			const { direction } = action.payLoad;

			const index = state.order.findIndex(ID => ID === action.payLoad.ID);

			const targetIndex = direction === 'up' ? index - 1 : index + 1;

			if (targetIndex < 0 || targetIndex > state.order.length - 1) {
				return state;
			};

			state.order[index] = state.order[targetIndex];
			state.order[targetIndex] = action.payLoad.ID;

			return state;

		case ActionTypes.UPDATE_CELL:
			const { ID, conTent } = action.payLoad;

			state.data[ID].conTent = conTent;

			return state;

		case ActionTypes.DELETE_CELL:
			delete state.data[action.payLoad];

			state.order = state.order.filter(ID => ID !== action.payLoad);

			return state;

		case ActionTypes.INSERT_CELL_AFTER:
			const newCell: Cell = {
				ID: Math.random().toString(36).substr(2, 5),
				type: action.payLoad.type,
				conTent: ''
			};

			state.data[newCell.ID] = newCell;

			const foundIndex = state.order.findIndex(ID => ID === action.payLoad.ID);

			if (foundIndex < 0) {
				state.order.unshift(newCell.ID);
			} else {
				state.order.splice(foundIndex + 1, 0, newCell.ID);
			};

			return state;

		case ActionTypes.FETCH_CELLS_START:
			state.loading = true;
			state.error = null;

			return state;

		case ActionTypes.FETCH_CELLS_END:
			state.loading = false;

			state.order = action.payLoad.map(cell => cell.ID);
			state.data = action.payLoad.reduce((accumulator, cell) => {
				accumulator[cell.ID] = cell;

				return accumulator;
			}, {} as CellState['data']);

			return state;

		case ActionTypes.FETCH_CELLS_ERROR:
			state.loading = false;
			state.error = action.payLoad;

			// load default cells
			state.order = defaultCells.map(cell => cell.ID);
			state.data = defaultCells.reduce((accumulator, cell) => {
				accumulator[cell.ID] = cell;

				return accumulator;
			}, {} as CellState['data']);

			return state;

		case ActionTypes.SAVE_CELLS_ERROR:
			state.error = action.payLoad;

			return state;

		default:
			return state;
	};
}, initialState);

export default cellReducer;