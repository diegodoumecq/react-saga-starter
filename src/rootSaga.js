import { hashSync } from 'bcryptjs';
import genSalt from './auth/salt';
import { browserHistory } from 'react-router';
import { take, call, put, fork, race } from 'redux-saga/effects';
import auth from './auth';

function forwardTo(location) {
    browserHistory.push(location);
}

export function* authorize({ username, password, isRegistering }) {
    yield put({ type: 'SENDING_REQUEST', sending: true });

    try {
        const salt = genSalt(username);
        const hash = hashSync(password, salt);
        let response;

        if (isRegistering) {
            response = yield call(auth.register, username, hash);
        } else {
            response = yield call(auth.login, username, hash);
        }

        return response;
    } catch (error) {
        yield put({ type: 'REQUEST_ERROR', error: error.message });

        return false;
    } finally {
        yield put({ type: 'SENDING_REQUEST', sending: false });
    }
}

export function* logout() {
    yield put({ type: 'SENDING_REQUEST', sending: true });

    try {
        const response = yield call(auth.logout);
        yield put({ type: 'SENDING_REQUEST', sending: false });

        return response;
    } catch (error) {
        yield put({ type: 'REQUEST_ERROR', error: error.message });
    }
}

export function* loginFlow() {
    while (true) {
        const request = yield take('LOGIN_REQUEST');
        let { username, password } = request;

        const winner = yield race({
            auth: call(authorize, { username, password, isRegistering: false }),
            logout: take('LOGOUT')
        });

        if (winner.auth) {
            yield put({ type: 'SET_AUTH', loggedIn: true });
            yield put({ type: 'LOGIN_CHANGE_USERNAME', username: '' });
            yield put({ type: 'LOGIN_CHANGE_PASSWORD', password: '' });

            forwardTo('/dashboard');
        } else if (winner.logout) {
            yield put({ type: 'SET_AUTH', loggedIn: false });
            yield call(logout);
            forwardTo('/');
        }
    }
}

export function* logoutFlow() {
    while (true) {
        yield take('LOGOUT');
        yield put({ type: 'SET_AUTH', loggedIn: false });

        yield call(logout);
        forwardTo('/');
    }
}

export function* registerFlow() {
    while (true) {
        const request = yield take('REGISTER_REQUEST');
        const { username, password } = request;
        const wasSuccessful = yield call(authorize, { username, password, isRegistering: true });

        if (wasSuccessful) {
            yield put({ type: 'SET_AUTH', loggedIn: true });
            yield put({ type: 'REGISTER_CHANGE_USERNAME', username: '' });
            yield put({ type: 'REGISTER_CHANGE_PASSWORD', password: '' });
            forwardTo('/dashboard');
        }
    }
}

export default function* root() {
    yield fork(loginFlow);
    yield fork(logoutFlow);
    yield fork(registerFlow);
}


