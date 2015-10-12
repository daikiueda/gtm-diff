const INITIAL_STATE = [];

import { SET_TAG_MANAGER_CONTAINER_VERSIONS } from '../actions/google-tag-manager.js'

export default function tagManagerContainerVersions( state = INITIAL_STATE, action = 0 ){
    switch( action.type ){
        case SET_TAG_MANAGER_CONTAINER_VERSIONS:
            return action.containerVersions;
        default:
            return state;
    }
}
