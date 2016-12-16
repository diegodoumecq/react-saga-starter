import { compose, withProps } from 'recompose';

import LayoutAssembly from '../Layout/Layout.asm.js';
import LandingAssembly from '../Landing/Landing.asm.js';
import LoginAssembly from '../Login/Login.asm.js';
import RegisterAssembly from '../Register/Register.asm.js';
import DashboardAssembly from '../Dashboard/Dashboard.asm.js';
import NotFoundAssembly from '../NotFound/NotFound.asm.js';

import Main from './Main.jsx';

export default function MainAssembly(store) {
    const { dispatch } = store;

    return withProps({
        store,
        factories: {
            Layout: LayoutAssembly(store),
            Landing: LandingAssembly(store),
            Login: LoginAssembly(store),
            Register: RegisterAssembly(store),
            Dashboard: DashboardAssembly(store),
            NotFound: NotFoundAssembly(store)
        },
        
        clearError: () => dispatch({ type: 'CLEAR_ERROR' })
    })(Main);
}
