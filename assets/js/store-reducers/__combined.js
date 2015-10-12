import { combineReducers } from 'redux';

export default combineReducers( {
    api: require( './api.js' ),
    isGoogleLoggedIn: require( './isGoogleLoggedIn.js' ),
    selectedConditions: require( './selectedConditions.js' ),
    tagManagerAccountsAndContainers: require( './tagManagerAccountsAndContainers.js' ),
    tagManagerContainerVersions: require( './tagManagerContainerVersions.js' ),
    diffResult: require( './diffResult' )
} );

 