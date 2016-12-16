import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';

import Landing from './Landing.jsx';

export default function LandingAssembly(store) {
    const { dispatch } = store;

    return compose(
        withProps({ store }),
        connect(state => {
            return {};
        })
    )(Landing);
}
