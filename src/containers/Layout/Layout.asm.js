import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';

import Layout from './Layout.jsx';

export default function LayoutAssembly(store) {
    const { dispatch } = store;

    return compose(
        withProps({
        	store,
        	onLogout: () => dispatch({ type: 'LOGOUT' }),
    		clearError: () => dispatch({ type: 'CLEAR_ERROR' })
        }),
        connect(state => {
        	const { loggedIn, sending } = state;
        	return {
        		loggedIn, sending
        	};
        })
    )(Layout);
}
