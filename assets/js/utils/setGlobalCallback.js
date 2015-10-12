const GLOBAL_FUNCTION_PREFIX = '__APP_CALLBACK__';

export default function setupGlobalCallBack( func ){
    var callbackName = GLOBAL_FUNCTION_PREFIX + ( new Date() ).getTime();
    window[ callbackName ] = function(){
        func();
        delete window[ callbackName ];
    };
    return callbackName;
}