/**
 * イベントを発火
 * 参考文献 : https://qiita.com/ryounagaoka/items/a48d3a4c4faf78a99ae5
 */
function TriggerEvent(element, event) {
    if (document.createEvent) {
        // IE以外
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true ); // event type, bubbling, cancelable
        return element.dispatchEvent(evt);
    } else {
        // IE
        var evt = document.createEventObject();
        return element.fireEvent("on"+event, evt)
    }
 }