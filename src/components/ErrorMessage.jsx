import React from 'react';

const ErrorMessage = ({ error }) => (
    <div className="form-error-wrapper">
        <p className="form-error">
            {error}
        </p>
    </div>
);

ErrorMessage.propTypes = {
    error: React.PropTypes.string
};

export default ErrorMessage;
