import { combineReducers } from 'redux';

import api from './api';
import isGoogleLoggedIn from './isGoogleLoggedIn.js';
import selectedConditions from './selectedConditions.js';
import tagManagerAccountsAndContainers from './tagManagerAccountsAndContainers.js';
import tagManagerContainerVersions from './tagManagerContainerVersions.js';
import diffResult from './diffResult.js';

export default combineReducers( {
    api,
    isGoogleLoggedIn,
    selectedConditions,
    tagManagerAccountsAndContainers,
    tagManagerContainerVersions,
    diffResult
} );
