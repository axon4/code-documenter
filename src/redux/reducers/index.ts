import { combineReducers } from 'redux';
import cellReducer from './cellReducer';
import bundleReducer from './bundleReducer';

const rootReducer = combineReducers({
    cell: cellReducer,
    bundle: bundleReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;