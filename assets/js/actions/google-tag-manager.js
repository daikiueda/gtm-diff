export const SET_GOOGLE_TAG_MANAGER_API = 'SET_GOOGLE_TAG_MANAGER_API',
    SET_TAG_MANAGER_ACCOUNTS_AND_CONTAINERS = 'SET_TAG_MANAGER_ACCOUNTS_AND_CONTAINERS',
    SELECT_TAG_MANAGER_CONTAINER = 'SELECT_TAG_MANAGER_CONTAINER',
    CLEAR_TAG_MANAGER_CONTAINER_SELECTION = 'CLEAR_TAG_MANAGER_CONTAINER_SELECTION',
    SET_TAG_MANAGER_CONTAINER_VERSIONS = 'SET_TAG_MANAGER_CONTAINER_VERSIONS',
    SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT = 'SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT',
    SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT = 'SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT',
    SET_DIFF_RESULT = 'SET_DIFF_RESULT';

import GoogleTagManagerAPI from '../api/google/GoogleTagManagerAPI.js';
import diffTagManagerContainerVersions from '../logics/diffTagManagerContainerVersions.js';

export function initGoogleTagManagerAPI(){
    return function( dispatch, getState ){
        var api = new GoogleTagManagerAPI( getState().api.googleCore );
        return api.init()
            .then( () => dispatch( { type: SET_GOOGLE_TAG_MANAGER_API, api } ) )
            .then( () => { return api.fetchAccountsAndContainers(); } )
            .then( ( accountsAndContainers ) => dispatch( { type: SET_TAG_MANAGER_ACCOUNTS_AND_CONTAINERS, accountsAndContainers } ) );
    };
}

export function selectTagManagerContainer( container ){
    return function( dispatch, getState ){
        var api = getState().api.googleTagManager;

        dispatch( { type: SELECT_TAG_MANAGER_CONTAINER, container } );

        return api.fetchContainerVersions( container )
            .then( ( containerVersions ) => { dispatch( { type: SET_TAG_MANAGER_CONTAINER_VERSIONS, containerVersions } ) } )
    };
}

export function clearTagManagerContainerSelection(){
    return { type: CLEAR_TAG_MANAGER_CONTAINER_SELECTION };
}

export function selectTagManagerContainerVersion( version, role ){
    return function( dispatch, getState ){
        switch( role ){
            case SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT:
            case SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT:
                dispatch( { type: role, version } );
        }

        var selectedConditions = getState().selectedConditions,
            versionAtLeft = selectedConditions.tagManagerContainerVersionAtLeft,
            versionAtRight = selectedConditions.tagManagerContainerVersionAtRight,
            diffResult;

        if( versionAtLeft && versionAtRight ){
            diffResult = diffTagManagerContainerVersions( versionAtLeft, versionAtRight );
            dispatch( { type: SET_DIFF_RESULT, result: diffResult } );
        }
    }
}