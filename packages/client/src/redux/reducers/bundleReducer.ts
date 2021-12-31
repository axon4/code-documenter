import produce from 'immer';
import { Action } from '../actions';
import { ActionTypes } from '../actionTypes';

interface BundleState {
	[key: string]: {
		code: string;
		loading: boolean;
		error: string;
	} | undefined;
};

const initialState: BundleState = {};

const bundleReducer = produce((state: BundleState = initialState, action: Action): BundleState => {
	switch (action.type) {
		case ActionTypes.BUNDLE_START:
			state[action.payload.cellID] = {
				code: '',
				loading: true,
				error: ''
			};

			return state;
		case ActionTypes.BUNDLE_END:
			state[action.payload.cellID] = {
				code: action.payload.bundle.code,
				loading: false,
				error: action.payload.bundle.error
			};

			return state;
		default:
			return state;
	};
});

export default bundleReducer;