import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { ActionTypes } from './actionTypes';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;

store.dispatch({
	type: ActionTypes.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: 'code'
	}
});

store.dispatch({
	type: ActionTypes.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: 'text'
	}
});

store.dispatch({
	type: ActionTypes.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: 'code'
	}
});

store.dispatch({
	type: ActionTypes.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: 'text'
	}
});