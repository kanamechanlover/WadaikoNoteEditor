/**
 * カスタム要素の属性操作ヘルパー関数群
 */

/**
 * 属性初期化
 * @param self : カスタム要素自身
 * @param attrName : 属性名
 * @param value : 初期値（null の場合はカスタム要素自身の属性値を参照
 * @param defaultValue : 初期値もカスタム要素自身の属性も無い場合に使用する値(String)
 */
function InitializeAttribute(self, attrName, value, defaultValue) {
    if (value != null) {
        // 初期値がちゃんと入っていれば、現在の属性値を更新
        if (self.getAttribute(attrName) != value) {
            self.setAttribute(attrName, value);
        }
    } else if (!self.hasAttribute(attrName)) {
        // 初期値が入っておらず、カスタム要素自身の属性も無い場合はデフォルト値を使用する
        self.setAttribute(attrName, defaultValue);
    }
}