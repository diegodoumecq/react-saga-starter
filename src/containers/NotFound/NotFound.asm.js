import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';

import NotFound from './NotFound.jsx';

export default function NotFoundAssembly(store) {
    const { dispatch } = store;

    return compose(
        withProps({ store }),
        connect(state => {
            return {};
        })
    )(NotFound);
}
