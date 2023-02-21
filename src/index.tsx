import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import {blue, grey} from '@mui/material/colors';


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
        <App/>
    </CssVarsProvider>
)