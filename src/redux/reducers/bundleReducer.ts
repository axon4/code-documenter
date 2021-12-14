import produce from 'immer';
import { Action } from '../actions';
import { ActionTypes } from '../actionTypes';

interface BundlesState {
	[key: string]: {
		code: string;
		loading: boolean;
		error: string;
	}
};

const initialState: BundlesState = {};

const reducer = produce((state: BundlesState = initialState, action: Action): BundlesState => {
	switch (action.type) {
		case ActionTypes.BUNDLE_START:
			return state;
		case ActionTypes.BUNDLE_END:
			return state;
		default:
			return state;
	};
});

export default reducer;