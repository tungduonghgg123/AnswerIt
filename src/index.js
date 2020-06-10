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

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <IntlProvider messages={textConfig} locale="en">
                <App />
            </IntlProvider>
        </SnackbarProvider>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
