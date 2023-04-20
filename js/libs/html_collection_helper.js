/**
 * HTMLCollection の操作ヘルパー関数群
 */

/**
 * 最初の要素以外全て削除する
 * @param collection : 操作対象の HTMLCollection
 */
function ToFirstOnly(collection) {
    while (collection.length > 1) {
        collection[-1].remove();
    }
}

/**
 * 末尾の要素以外全て削除する
 * @param collection : 操作対象の HTMLCollection
 */
function TolastOnly(collection) {
    while (collection.length > 1) {
        collection[0].remove();
    }
}