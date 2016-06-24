const PREFIX = '__APP_CALLBACK__';

/**
 * グローバルスコープ（window）に任意の関数オブジェクトを配置する。
 * - 関数名（windowインスタンスのプロパティ名）は動的に決定される。
 * - 配置された関数は、実行されるとスコープから削除される。
 * @param func
 * @return {string} 関数名
 */
export default function setupGlobalCallBack(func) {
    const callbackName =
        `${PREFIX}${1 * new Date()}-${Math.random().toString(36).substring(5)}`;

    window[callbackName] = function() {
        func();
        delete window[callbackName];
    };
    return callbackName;
}
