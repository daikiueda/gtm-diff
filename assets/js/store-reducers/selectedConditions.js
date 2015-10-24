const INITIAL_STATE = {
    tagManagerContainer: null,
    tagManagerContainerVersionAtLeft: null,
    tagManagerContainerVersionAtRight: null
};

import {
    SELECT_TAG_MANAGER_CONTAINER,
    CLEAR_TAG_MANAGER_CONTAINER,
    SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT,
    SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT
} from '../actions/google-tag-manager.js';

export default function selectedConditions( state = INITIAL_STATE, action = 0 ){
    switch( action.type ){
        case SELECT_TAG_MANAGER_CONTAINER:
            return Object.assign( {}, state, { tagManagerContainer: action.container } );
        case CLEAR_TAG_MANAGER_CONTAINER:
            return INITIAL_STATE;
        case SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT:
            return Object.assign( {}, state, { tagManagerContainerVersionAtLeft: action.version } );
        case SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT:
            return Object.assign( {}, state, { tagManagerContainerVersionAtRight: action.version } );
        default:
            return state;
    }
}