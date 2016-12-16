import React, { Component, PropTypes } from 'react';

import ErrorMessage from './ErrorMessage.jsx';
import LoadingButton from './LoadingButton.jsx';

export default class AuthForm extends Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        buttonText: PropTypes.string,
        error: PropTypes.string,
        sending: PropTypes.bool
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.props.username, this.props.password);
    };

    handleUsernameChange = event => this.props.onUsernameChanged(event.target.value);
    handlePasswordChange = event => this.props.onPasswordChanged(event.target.value);

    render() {
        const { error, username, password } = this.props;

        return (
            <form className="form" onSubmit={this.onSubmit}>
                {error ? <ErrorMessage error={error} /> : null}
                <div className="form-field-wrapper">
                    <input
                        className="form-field-input"
                        type="text"
                        id="username"
                        value={username}
                        placeholder="username"
                        onChange={this.handleUsernameChange}
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                    <label className="form-field-label" htmlFor="username">
                        Username
                    </label>
                </div>
                <div className="form-field-wrapper">
                    <input
                        className="form-field-input"
                        id="password"
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={this.handlePasswordChange}
                    />
                    <label className="form-field-label" htmlFor="password">
                        Password
                    </label>
                </div>
                <div className="form-submit-button-wrapper">
                    {this.props.sending ? <LoadingButton /> : (
                        <button className="form-submit-button" type="submit">
                            {this.props.buttonText}
                        </button>
                    )}
                </div>
            </form>
        );
    }
}
