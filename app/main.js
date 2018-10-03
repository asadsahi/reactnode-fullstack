/* eslint-disable */
// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./build/assets/images/favicon.ico';
import '!file-loader?name=[name].[ext]!./build/assets/images/android-chrome-192x192.png';
import '!file-loader?name=[name].[ext]!./build/assets/images/android-chrome-512x512.png';
import '!file-loader?name=[name].[ext]!./build/assets/images/apple-touch-icon.png';
import '!file-loader?name=[name].[ext]!./build/assets/images/mstile-150x150.png';
import '!file-loader?name=[name].[ext]!./build/assets/images/favicon-32x32.png';
import '!file-loader?name=[name].[ext]!./build/assets/images/favicon-16x16.png';
import '!file-loader?name=[name].[ext]!./build/assets/site.webmanifest';
import '!file-loader?name=[name].[ext]!./build/assets/.htaccess';

import '!file-loader?name=[name].[ext]!./build/assets/login-redirect.html';
import '!file-loader?name=[name].[ext]!./build/assets/silent-renew.html';

// Other images
import '!file-loader?name=[name].[ext]!./build/assets/images/nodejs.png';
import '!file-loader?name=[name].[ext]!./build/assets/images/react.png';

import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { AppProvider, AppConsumer } from './contexts';
import { history, STS_URL } from './services';
import App from './containers/App';

// Post logout redirect logic
if (window.location.href.indexOf('?postLogout=true') > 0) {
  const { AuthService } = require('../app/services/auth.service');
  const authService = new AuthService(STS_URL);
  authService.signoutRedirectCallback().then(() => {
    // clear the query string
    history.push('/', '');
  });
}

function render() {
  ReactDOM[window.ssrEnabled ? 'hydrate' : 'render'](
    <AppProvider value={{ appData: window.__PRELOADEDSTATE__ }}>
      <AppConsumer>
        {({ appData }) => <Router history={history}><App appData={appData} /></Router>}
      </AppConsumer>
    </AppProvider>,
    document.getElementById('app')
  );
}

render();

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(NextApp);
  });
}

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}
