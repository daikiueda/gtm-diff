const INITIAL_STATE = false;

import { AUTH_GOOGLE, SIGN_OUT_FROM_GOOGLE } from '../actions/google-core.js';

export default function googleLoggedIn( state = INITIAL_STATE, action = 0 ){
    switch( action.type ){
        case AUTH_GOOGLE:
            return action.authorized;
        case SIGN_OUT_FROM_GOOGLE:
            return false;
        default:
            return state;
    }
}
