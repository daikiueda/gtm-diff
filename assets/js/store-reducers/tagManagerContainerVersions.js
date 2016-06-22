const INITIAL_STATE = [];

import {
    CLEAR_TAG_MANAGER_CONTAINER,
    SET_TAG_MANAGER_CONTAINER_VERSIONS
} from '../actions/google-tag-manager.js';

export default function tagManagerContainerVersions(state = INITIAL_STATE, action = 0) {
    switch (action.type) {
        case CLEAR_TAG_MANAGER_CONTAINER:
            return INITIAL_STATE;
        case SET_TAG_MANAGER_CONTAINER_VERSIONS:
            return action.containerVersions;
        default:
            return state;
    }
}
