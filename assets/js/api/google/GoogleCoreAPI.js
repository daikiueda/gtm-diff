const GOOGLE_LIB_URL = 'https://apis.google.com/js/client.js?onload=';

import GlobalCallbackUtil from '../../utils/GlobalCallbackUtil.js';
import loadScriptAsync from '../../utils/loadScriptAsync.js';

export default class GoogleAPI {
    constructor(credential) {
        this.gapi = null;
        this.credential = credential;
    }

    init() {
        return new Promise((resolve, reject) => {
            const globalCallbackUtil = new GlobalCallbackUtil(),

                callbackFunc = () => {
                    this.gapi = window.gapi;
                    clearTimeout(timer);
                    resolve(this);
                },

                callbackName = globalCallbackUtil.add(callbackFunc);

            let timer = setTimeout(() => {
                globalCallbackUtil.remove(callbackFunc);
                reject(new Error('Google client library loading timed out.'));
            }, 10000);

            loadScriptAsync(`${GOOGLE_LIB_URL}${callbackName}`);
        });
    }

    auth(immediate) {
        return new Promise((resolve, reject) => {
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