const INITIAL_STATE = [];

import {SET_TAG_MANAGER_ACCOUNTS_AND_CONTAINERS} from '../actions/google-tag-manager.js';

export default function tagManagerAccountsAndContainers(state = INITIAL_STATE, action = 0) {
    switch (action.type) {
        case SET_TAG_MANAGER_ACCOUNTS_AND_CONTAINERS:
            return action.accountsAndContainers;
        default:
            return state;
    }
}
