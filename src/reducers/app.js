import { extend } from 'lodash/fp';
import auth from '../auth';

function initialState() {
    return {
        register: {
            username: '',
            password: ''
        },
        login: {
            username: '',
            password: ''
        },
        error: '',
        sending: false,
        loggedIn: auth.loggedIn()
    };
};

export const handlers = {
    ['LOGIN_CHANGE_USERNAME']: (state, { username }) => ({
        login: { ...state.login, username }
    }),
    ['LOGIN_CHANGE_PASSWORD']: (state, { password }) => ({
        login: { ...state.login, password }
    }),
    ['REGISTER_CHANGE_USERNAME']: (state, { username }) => ({
        register: { ...state.register, username }
    }),
    ['REGISTER_CHANGE_PASSWORD']: (state, { password }) => ({
        register: { ...state.register, password }
    }),
    ['SET_AUTH']: (state, { loggedIn }) => ({ loggedIn }),
    ['SENDING_REQUEST']: (state, { sending }) => ({ sending }),
    ['REQUEST_ERROR']: (state, { error }) => ({ error }),
    ['CLEAR_ERROR']: (state) => ({ error: '' })
};

export default function app(state = initialState(), action) {
    const fn = handlers[action.type];
    return fn ? extend(state, fn(state, action)) : state;
}
