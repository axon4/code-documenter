import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistMiddleWare } from './middleWare/persistMiddleWare';
import rootReducer from './reducers';

const middleWare: any[] = [persistMiddleWare, thunk];

if (process.env.NODE_ENV === 'development') {
    middleWare.push(logger);
};

const store = createStore(rootReducer, {}, applyMiddleware(...middleWare));

export default store;