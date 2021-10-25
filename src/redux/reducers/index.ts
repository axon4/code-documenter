import { combineReducers } from 'redux';
import cellReducer from './cellReducer';

const rootReducer = combineReducers({
    cell: cellReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;