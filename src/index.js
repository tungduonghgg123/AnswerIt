import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store'
import { IntlProvider } from 'react-intl';
import { SnackbarProvider } from 'notistack';
import textConfig from './textConfig/en.json'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#82def9',
        },
        secondary: {
            main: '#82def9',
        },
    },
})
// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
};
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <SnackbarProvider
                ref={notistackRef}
                maxSnack={3}
                action={key => (
                    <IconButton onClick={onClickDismiss(key)}>
                        <CloseIcon />
                    </IconButton>
                )}
                preventDuplicate
            >
                <IntlProvider messages={textConfig} locale="en">
                    <App />
                </IntlProvider>
            </SnackbarProvider>
        </Provider>
    </MuiThemeProvider>

    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
