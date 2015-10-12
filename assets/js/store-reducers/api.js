const INITIAL_STATE = {
    googleCore: null,
    googleTagManager: null
};

import { SET_GOOGLE_CORE_API } from '../actions/google-core.js';
import { SET_GOOGLE_TAG_MANAGER_API } from '../actions/google-tag-manager.js';

export default function api( state = INITIAL_STATE, action = 0 ){
    switch( action.type ){
        case SET_GOOGLE_CORE_API:
            return Object.assign( {}, state, { googleCore: action.api } );
        case SET_GOOGLE_TAG_MANAGER_API:
            return Object.assign( {}, state, { googleTagManager: action.api } );
        default:
            return state;
    }
}