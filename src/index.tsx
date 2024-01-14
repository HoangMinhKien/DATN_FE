/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Notifications } from '@mantine/notifications';

// Use consistent styling

// Import root app
import './locales/i18n';
import { App } from 'app/App';
import 'sanitize.css/sanitize.css';
import reportWebVitals from 'reportWebVitals';
import { GlobalStyle } from 'styles/global-styles';
import { persistor, store } from 'store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

// Initialize languages

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <MantineProvider>
          <BrowserRouter>
            <Notifications zIndex={999999} position="top-right" />
            <App />
            <GlobalStyle />
          </BrowserRouter>
        </MantineProvider>
      </HelmetProvider>
    </PersistGate>
  </Provider>,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
