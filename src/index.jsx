import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { takeLatest }from 'redux-saga';

import appReducer from './reducers/app';
import rootSaga from './rootSaga';

import './styles/main.css';

import MainAssembly from './containers/Main/Main.asm.js';

function* logSaga() {
    yield takeLatest('*', action => console.log(action));
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
sagaMiddleware.run(logSaga);

const Main = MainAssembly(store);

ReactDOM.render(<Main />, document.getElementById('app'));
