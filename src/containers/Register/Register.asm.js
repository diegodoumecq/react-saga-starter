import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';

import Register from './Register.jsx';

export default function RegisterAssembly(store) {
    const { dispatch } = store;

    return compose(
        withProps({
        	store,
        	
        	onRegister: (username, password) => dispatch({ type: 'REGISTER_REQUEST', username, password }),
        	onUsernameChanged: username => dispatch({ type: 'REGISTER_CHANGE_USERNAME', username }),
        	onPasswordChanged: password => dispatch({ type: 'REGISTER_CHANGE_PASSWORD', password })
        }),
        connect(state => {
            return {
            	password: state.register.password,
            	username: state.register.username,
            	sending: state.sending,
            	error: state.error
            };
        })
    )(Register);
}
