const __DEV__ = true;
const GOOGLE_API_CREDENTIAL = require( './settings/google-api-credential.json' );


import { createStore, applyMiddleware } from 'redux';
import { default as thunk } from 'redux-thunk';
import createLogger from 'redux-logger';
import React from 'react';
import ReactDOM from 'react/lib/ReactDOM'; //react-domモジュールがimportできないので直接参照
import { connect, Provider } from 'react-redux';


import generateConnectMapFromStore from './utils/generateConnectMapFromStore.js';
import reducers from './store-reducers/__combined.js';
import AppRootView from './components/App.js';
import GoogleCoreAPI from './api/google/GoogleCoreAPI.js';
import { loadGoogleCoreAPI, authGoogle } from './actions/google-core.js';
import { initGoogleTagManagerAPI } from './actions/google-tag-manager.js';

var store =
        applyMiddleware( createLogger( { predicate: () => __DEV__ } ), thunk )( createStore )( reducers ),
    AppRootViewConnected =
        connect( generateConnectMapFromStore( store ) )( AppRootView );

function render(){
    ReactDOM.render(
        <Provider store={store}>
            <AppRootViewConnected />
        </Provider>,
        document.getElementById( 'app' )
    );
}

store.dispatch( loadGoogleCoreAPI( new GoogleCoreAPI( GOOGLE_API_CREDENTIAL ) ) )
    .then( () => store.dispatch( authGoogle( true ) ) )
    .then( () => store.dispatch( initGoogleTagManagerAPI() ) )
    .fin( render );

