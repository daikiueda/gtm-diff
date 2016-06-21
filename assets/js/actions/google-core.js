export const SET_GOOGLE_CORE_API = 'SET_GOOGLE_CORE_API',
    AUTH_GOOGLE = 'AUTH_GOOGLE',
    SIGN_OUT_FROM_GOOGLE = 'SIGN_OUT_FROM_GOOGLE';

export function loadGoogleCoreAPI(googleCore) {
    return function(dispatch, getState) {
        return googleCore.init()
            .then(api => dispatch({type: SET_GOOGLE_CORE_API, api}));
    };
}

export function authGoogle(immediate) {
    return function(dispatch, getState) {
        return getState().api.googleCore.auth(immediate)
            .then(() => dispatch({type: AUTH_GOOGLE, authorized: true}))
            .fail(() => dispatch({type: AUTH_GOOGLE, authorized: false}));
    };
}

export function signOutFromGoogle() {
    return function(dispatch, getState) {
        getState().api.googleCore.signOut();
        dispatch({type: SIGN_OUT_FROM_GOOGLE});
    };
}