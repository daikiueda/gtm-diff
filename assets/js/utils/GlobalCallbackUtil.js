const PREFIX = '__APP_CALLBACK__';

export default class GlobalCallbackUtil {

    constructor() {
        this.callbackNames = [];
    }

    /**
     * グローバルスコープ（window）に任意の関数オブジェクトを配置する。
     * - 関数名（windowインスタンスのプロパティ名）は動的に決定される。
     * - 配置された関数は、実行されるとスコープから削除される。
     * @param func
     * @return {string} 関数名
     */
    add(func) {
        const callbackName =
            `${PREFIX}${1 * new Date()}-${Math.random().toString(36).substring(5)}`;

        this.callbackNames[func] = callbackName;

        window[callbackName] = () => {
            func();
            this.remove(func);
        };
        return callbackName;
    }

    /**
     * グローバルスコープ（window）に配置した任意の関数オブジェクトを取り除く。
     * @param func
     */
    remove(func) {
        delete window[this.callbackNames[func]];
        delete this.callbackNames[func];
    }
}
