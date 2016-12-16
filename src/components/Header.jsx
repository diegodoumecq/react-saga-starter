import React, { Component, PropTypes } from 'react';

import LoadingButton from './LoadingButton.jsx';
import { Link } from 'react-router';

class Header extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        sending: PropTypes.bool,
        onLogout: PropTypes.func,
        clearError: PropTypes.func
    };

    renderLoggedIn() {
        const { sending, onLogout } = this.props;

        if (sending) {
            return (
                <div>
                    <Link
                        to="/dashboard"
                        className="button header-button"
                    >
                        Dashboard
                    </Link>
                    <LoadingButton className="header-button" />
                </div>
            );
        } else {
            return (
                <div>
                    <Link
                        to="/dashboard"
                        className="button header-button"
                    >
                        Dashboard
                    </Link>
                    <a
                        href="#"
                        className="button header-button"
                        onClick={onLogout}
                    >
                        Logout
                    </a>
                </div>
            );
        }
    }

    renderLoggedOut() {
        const { clearError } = this.props;
        return (
            <div>
                <Link
                    to="/register"
                    className="button header-button"
                    onClick={clearError}
                >
                    Register
                </Link>
                <Link
                    to="/login"
                    className="button header-button"
                    onClick={clearError}
                >
                    Login
                </Link>
            </div>
        );
    }

    render () {
        const { loggedIn } = this.props;

        return (
            <div className="header">
                <div className="header-wrapper">
                    <Link
                        to="/"
                        className="header-logo-wrapper"
                        onClick={this.clearError}
                    >
                        <h1 className="header-logo">Logo</h1>
                    </Link>
                    {loggedIn ? this.renderLoggedIn() : this.renderLoggedOut()}
                </div>
            </div>
        );
    }
}

export default Header;
