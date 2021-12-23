import produce from 'immer';
import { Action } from '../actions';
import { ActionTypes } from '../actionTypes';
import { Cell } from '../cell';

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
			const { direction } = action.payload;
			const index = state.order.findIndex(id => id === action.payload.id);
			const targetIndex = direction === 'up' ? index - 1 : index + 1;

			if (targetIndex < 0 || targetIndex > state.order.length - 1) {return state};

			state.order[index] = state.order[targetIndex];
			state.order[targetIndex] = action.payload.id;

			return state;

		case ActionTypes.UPDATE_CELL:
			const { id, content } = action.payload;

			state.data[id].content = content;

			return state;

		case ActionTypes.DELETE_CELL:
			delete state.data[action.payload];
			state.order = state.order.filter(id => id !== action.payload);

			return state;

		case ActionTypes.INSERT_CELL_AFTER:
			const newCell: Cell = {
				id: Math.random().toString(36).substr(2, 5),
				type: action.payload.type,
				content: ''
			};

			state.data[newCell.id] = newCell;

			const foundIndex = state.order.findIndex(id => id === action.payload.id);
			if (foundIndex < 0) {
				state.order.unshift(newCell.id);
			} else {
				state.order.splice(foundIndex + 1, 0, newCell.id);
			};

			return state;

		case ActionTypes.FETCH_CELLS_START:
			state.loading = true;
			state.error = null;

			return state;

		case ActionTypes.FETCH_CELLS_END:
			state.order = action.payload.map(cell => cell.id);
			state.data = action.payload.reduce((acc, cell) => {
				acc[cell.id] = cell;

				return acc;
			}, {} as CellState['data']);

			return state;
		
		case ActionTypes.FETCH_CELLS_ERROR:
			state.loading = false;
			state.error = action.payload;

			return state;
			
		default:
			return state;
	};
}, initialState);

export default cellReducer;