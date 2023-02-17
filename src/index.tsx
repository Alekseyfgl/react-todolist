import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThemeProvider, createTheme, Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';
import {lightBlue, pink, red} from '@mui/material/colors';


const theme = createTheme({
    palette: {
        primary: lightBlue,
        mode: 'dark'
    },
});


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <ThemeProvider theme={theme}>
    <CssVarsProvider><App/></CssVarsProvider>

    // </ThemeProvider>
)