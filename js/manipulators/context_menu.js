/**
 * 各コンテキストメニュークラス
 * <context-menu title="コンテキスト">
 *     <context-menu-item onclick="...">アイテム1</context-menu-item>
 *     <context-menu-separator></context-menu-separator>
 * </context-menu>
 */
class ContextMenu extends HTMLElement
{
    constructor(title = "") {
        super();
        // 自身の設定
        this.style.display = "inline-block";
        this.style.position = "absolute";
        this.style.left = 0;
        this.style.top = 0;
        this.style.borderColor = "black";
        this.style.borderWidth = "1px";
        this.style.borderStyle = "solid";
        this.style.borderRadius = "0px 8px 8px 8px";
        this.style.borderRadiusTopLeft = "0px";
        this.style.backgroundColor = "whitesmoke";
        this.style.padding = "4px";
        this.style.fontSize = "0.8em";
        this.style.boxSizing = "border-box";
        this.style.zIndex = 100;
        this.style.backgroundImage = /*'-moz-linear-gradient(45deg, #f00 10px, transparent 0);'
                                   + '-webkit-gradient(45deg, #f00 10px, transparent 0);'
                                   + */'linear-gradient(45deg, #f00 10px, transparent 0);';

        // コンテキストメニューのタイトル要素を生成
        this.buildTitle(title);
    }

    /** コンテキストメニューのタイトル要素を生成 */
    buildTitle(title) {
        this.title = title;
        let attrTitle = this.getAttribute("title")
        if (attrTitle) {
            // アトリビュートから取得した値が空でも null でも無ければそれを使用
            this.title = attrTitle;
        }
        this.titleElement = document.createElement("div");
        this.titleElement.innerHTML = this.title;
        this.titleElement.style.textAlign = "left";
        this.titleElement.style.cursor = "default";
        if (this.children.length == 0) {
            // まだ子がない場合はそのまま追加
            this.appendChild(this.titleElement);
        }
        else {
            // 既に子が居る場合は先頭に追加
            this.insertBefore(this.titleElement, this.children[0]);
        }
    }

    /** アイテム追加 */
    AddItem(name, callback) {
        let item = new ContextMenuItem();
        item.SetItemName(name);
        item.onclick = callback;
        this.appendChild(item);
    }

    /** 指定位置に表示 */
    Show(x, y) {
        Logger.WriteFunctionCalledLog(`x=${x}, y=${y}`);
        this.style.left = x + "px";
        this.style.top = y + "px";
        this.style.visibility = "visible";
    }

    /** 非表示化 */
    Hide() {
        Logger.WriteFunctionCalledLog();
        this.style.visibility = "hidden";
    }
}
customElements.define("context-menu", ContextMenu);

class ContextMenuItem extends HTMLElement
{
    constructor() {
        super();
        this.style.display = "block";
        this.style.cursor = "default";
        this.style.boxSizing = "border-box";

        // ホバー時のコールバック設定
        this.onmouseenter = this.onMouseEnter;
        this.onmouseleave = this.onMouseLeave;
    }

    /** 表示する文字列指定 */
    SetItemName(name) {
        this.innerHTML = name;
    }

    // ホバー(in)時のコールバック
    onMouseEnter(event) {
        Logger.WriteFunctionCalledLog();
        this.style.borderColor = "silver";
        this.style.borderWidth = "1px";
        this.style.backgroundColor = "silver";
    }

    // ホバー(out)時のコールバック
    onMouseLeave(event) {
        Logger.WriteFunctionCalledLog();
        this.style.borderColor = "transparent";
        this.style.borderWidth = "1px";
        this.style.backgroundColor = "transparent";
    }
}
customElements.define("context-menu-item", ContextMenuItem);

/** コンテキストメニュー管理部 */
class ContextMenuHolder {
    /**
     * 管理するコンテキストメニューマップ
     * key=id, value=ContextMenu
     */
    static holder = {};
    /**
     * 現在画面に出ているコンテキストメニューの id
     * 画面に出ていない場合は空文字列
     */
    static selectingId = "";
    /**
     * コンテキストメニュー生成（登録）
     * @param id : アクセス用 id
     * @param title : 表示するコンテキストメニュー名
     * @param items : アイテムマップ（key=表示するアイテム名, value=コールバック関数）
     * @return 作成したコンテキストメニュー
     */
    static Build(id, title, items) {
        let menu = new ContextMenu(title);
        for (let [name, callback] of Object.entries(items)) {
            menu.AddItem(name, callback);
        }
        ContextMenuHolder.holder[id] = menu;
        document.body.appendChild(menu);
        return menu;
    }

    /**
     * 指定 id のコンテキストメニューを表示
     * @param id : 表示するコンテキストメニューの id
     * @param x : 表示位置(x 座標)
     * @param y : 表示位置(y 座標)
     * @detail 表示位置はクライアント座標系
     */
    static Show(id, x, y) {
        Logger.WriteFunctionCalledLog("by id=" + id.toString());
        // 指定 id が登録されていなければログを吐くだけ
        if (! id in ContextMenuHolder.holder) {
            console.log(`Error: Id '${id}' is not found.`);
        }
        // 既にコンテキストメニューが出ている場合は先に非表示にしておく
        if (ContextMenuHolder.selectingId) {
            let menu = ContextMenuHolder.holder[ContextMenuHolder.selectingId];
            menu.Hide();
        }

        // 指定 id のコンテキストメニューをカーソル位置に表示
        let menu = ContextMenuHolder.holder[id];
        menu.Show(x, y);

        // 現在画面に出ているコンテキストメニューの id を更新
        ContextMenuHolder.selectingId = id;
    }
}