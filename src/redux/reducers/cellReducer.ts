import { Action } from '../actions';
import { ActionTypes } from '../actionTypes';
import { Cell } from '../cell';

interface CellState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    }
};

const initialState: CellState = {
    loading: false,
    error: null,
    order: [],
    data: {}
};

const cellReducer = (state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
        case ActionTypes.MOVE_CELL:
            return state;
        case ActionTypes.UPDATE_CELL:
            return state;
        case ActionTypes.DELETE_CELL:
            return state;
        case ActionTypes.INSERT_CELL_BEFORE:
            return state;
        default:
            return state;
    };
};

export default cellReducer;