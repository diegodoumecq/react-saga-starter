import React from 'react';

import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

function makeCheckAuth(store, clearError) {
    return (nextState, replace) => {
        const { loggedIn } = store.getState();

        clearError();

        if (nextState.location.pathname !== '/dashboard') {
            if (loggedIn) {
                if (nextState.location.state && nextState.location.pathname) {
                    replace(nextState.location.pathname);
                } else {
                    replace('/');
                }
            }
        } else {
            if (!loggedIn) {
                if (nextState.location.state && nextState.location.pathname) {
                    replace(nextState.location.pathname);
                } else {
                    replace('/');
                }
            }
        }
    };
}

export default ({ store, factories, clearError }) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={factories.Layout}>
                <Route path="/" component={factories.Landing} />
                <Route onEnter={makeCheckAuth(store, clearError)}>
                    <Route path="/login" component={factories.Login} />
                    <Route path="/register" component={factories.Register} />
                    <Route path="/dashboard" component={factories.Dashboard} />
                </Route>
                <Route path="*" component={factories.NotFound} />
            </Route>
        </Router>
    </Provider>
);
