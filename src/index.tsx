import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
    Experimental_CssVarsProvider as CssVarsProvider,
    experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import {blue, grey} from '@mui/material/colors';
import AppWithReducers from './AppWithReducers';
import AppWithRedux from './AppWithRedux';
import {Provider} from 'react-redux';
import {store} from './state/redux/store';


const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: blue
            },
        },
        dark: {
            palette: {
                primary: {
                    main: grey[400],
                },
            },
        },
    },
});
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <CssVarsProvider theme={theme}>
        {/*<App/>*/}
        {/*<AppWithReducers/>*/}
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>

    </CssVarsProvider>
)