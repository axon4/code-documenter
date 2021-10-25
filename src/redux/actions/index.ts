import { ActionTypes } from '../actionTypes';
import { CellTypes } from '../cell';

interface MoveCellAction {
    type: ActionTypes.MOVE_CELL;
    payload: {
        id: string;
        direction: 'up' | 'down';
    }
};

interface UpdateCellAction {
    type: ActionTypes.UPDATE_CELL;
    payload: {
        id: string;
        content: string;
    }
};

interface DeleteCellAction {
    type: ActionTypes.DELETE_CELL;
    payload: string;
};

interface InsertCellBeforeAction {
    type: ActionTypes.INSERT_CELL_BEFORE;
    payload: {
        id: string;
        type: CellTypes;
    }
};

export type Action = MoveCellAction
    | UpdateCellAction
    | DeleteCellAction
    | InsertCellBeforeAction;