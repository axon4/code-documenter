import { Dispatch } from 'redux';
import { RootState } from '..';
import { ActionTypes } from '../actionTypes';
import { Action } from '../actions';
import { saveCells } from '../actionCreators';

export const persistMiddleware = ({
    dispatch,
    getState
}: {
    dispatch: Dispatch<Action>;
    getState: () => RootState;
}) => {
    let timer: NodeJS.Timeout;

    return (next: (action: Action) => void) => {
        return (action: Action) => {
            next(action);

            if ([
                ActionTypes.MOVE_CELL,
                ActionTypes.UPDATE_CELL,
                ActionTypes.DELETE_CELL,
                ActionTypes.INSERT_CELL_AFTER
            ].includes(action.type)) {
                if (timer) {
                    clearTimeout(timer);
                };

                timer = setTimeout(() => {
                    saveCells()(dispatch, getState);
                    console.log('TIMER')
                }, 280);
            };
        };
    };
};