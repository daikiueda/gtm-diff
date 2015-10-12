const INITIAL_STATE = null;

import { SET_DIFF_RESULT } from '../actions/google-tag-manager.js';

export default function diffResult( state = INITIAL_STATE, action = 0 ){
    switch( action.type ){
        case SET_DIFF_RESULT:
            return action.result;
        default:
            return state;
    }
}