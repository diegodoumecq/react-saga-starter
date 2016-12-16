import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';

import Login from './Login.jsx';

export default function LoginAssembly(store) {
    const { dispatch } = store;

    return compose(
        withProps({
            store,
            
            onLogin: (username, password) => dispatch({ type: 'LOGIN_REQUEST', username, password }),
            onUsernameChanged: username => dispatch({ type: 'LOGIN_CHANGE_USERNAME', username }),
            onPasswordChanged: password => dispatch({ type: 'LOGIN_CHANGE_PASSWORD', password })
        }),
        connect(state => {
            return {
                password: state.login.password,
                username: state.login.username,
                sending: state.sending,
                error: state.error
            };
        })
    )(Login);
}
