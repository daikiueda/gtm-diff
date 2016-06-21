const GOOGLE_LIB_URL = 'https://apis.google.com/js/client.js?onload=';

import Q from 'q';
import setGlobalCallback from '../../utils/setGlobalCallback.js';
import loadScriptAsync from '../../utils/loadScriptAsync.js';

export default class GoogleAPI {
    constructor(credential) {
        this.gapi = null;
        this.credential = credential;
    }

    init() {
        return Q.Promise((resolve, reject) => {
            loadScriptAsync([
                GOOGLE_LIB_URL,
                setGlobalCallback(function() {
                    this.gapi = window.gapi;
                    resolve(this);
                }.bind(this))
            ].join(''));
        });
    }

    auth(immediate) {
        return Q.Promise((resolve, reject) => {
            this.gapi.auth.authorize(
                Object.assign({immediate: immediate}, this.credential),
                function(result) {
                    if (result.error) {
                        reject(new Error(result.error_subtype));
                        return;
                    }
                    resolve();
                }
            );
        });
    }

    signOut() {
        this.gapi.auth.signOut();
    }
}