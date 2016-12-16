import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';

import Dashboard from './Dashboard.jsx';

export default function DashboardAssembly(store) {
    const { dispatch } = store;

    return compose(
        withProps({ store }),
        connect(state => {
            return {};
        })
    )(Dashboard);
}
