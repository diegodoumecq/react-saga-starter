import React, { PropTypes } from 'react';

import Header from '../../components/Header.jsx';

const Layout = ({ loggedIn, sending, history, onLogout, clearError, location, children }) => (
    <div className="wrapper">
        <Header
            loggedIn={loggedIn}
            sending={sending}
            history={history}
            onLogout={onLogout}
            clearError={clearError}
            location={location} />
        {children}
    </div>
);

Layout.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
};

export default Layout;
