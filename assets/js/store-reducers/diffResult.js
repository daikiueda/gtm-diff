const INITIAL_STATE = null;

import {
    SET_DIFF_RESULT,
    CLEAR_TAG_MANAGER_CONTAINER
} from '../actions/google-tag-manager.js';

export default function diffResult( state = INITIAL_STATE, action = 0 ){
    switch( action.type ){
        case CLEAR_TAG_MANAGER_CONTAINER:
            return INITIAL_STATE;
        case SET_DIFF_RESULT:
            return action.result;
        default:
            return state;
    }
}