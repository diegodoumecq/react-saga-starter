import React from 'react';

import AuthForm from '../../components/AuthForm.jsx';

export default class Register extends React.Component {
    static propTypes = {
        history: React.PropTypes.object
    };

    render() {
        const { username, password, sending, error, onRegister } = this.props;

        return (
            <div className="form-page-wrapper">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h2 className="form-heading">
                            Register
                        </h2>
                    </div>
                    <AuthForm
                        username={username}
                        password={password}
                        onUsernameChanged={this.props.onUsernameChanged}
                        onPasswordChanged={this.props.onPasswordChanged}
                        history={this.props.history}
                        onSubmit={onRegister}
                        buttonText="Register"
                        error={error}
                        sending={sending}
                    />
                </div>
            </div>
        )
    }
}
