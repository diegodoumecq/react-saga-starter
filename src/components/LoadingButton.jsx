import React from 'react';

import LoadingIndicator from './LoadingIndicator.jsx';

const LoadingButton = ({ className }) => (
    <a href="#" className={className + ' button loading-button'} disabled="true">
        <LoadingIndicator />
    </a>
);

LoadingButton.propTypes = {
    className: React.PropTypes.string
};

export default LoadingButton;
