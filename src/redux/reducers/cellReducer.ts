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

const cellReducer = (state: CellState = initialState, action: Action): CellState => state;

export default cellReducer;