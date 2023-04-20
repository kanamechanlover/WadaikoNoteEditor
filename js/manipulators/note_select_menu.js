/**
 * 音符房選択メニュー
 */
class NoteSelectMenu extends HTMLElement {

    static ElementId = 'note-select-frame';

    constructor() {
        super();

        // Shadow DOM を設定
        const template = document.createElement('template');
        template.innerHTML = this.template();
        const clone = document.importNode(template.content, true);
        this.appendChild(clone);

        this.frame = this.querySelector('#note-select-frame');

        // 音符房リスト構築
        this.drawNoteClusters();

        // 非表示状態で初期化
        this.Hide();

        // 表示したてか
        this.fresh_ = false;
    }

    /**
     * 指定されたキャンバスに音符房描画
     */
    drawNoteClusters() {
        const canvases = this.querySelectorAll('canvas.note-select-canvas');
        for (var index = 0; index < canvases.length; index++) {
            NoteClusterDrawer.Draw(canvases[index], index);
        }
    }

    template() {
        const item = `
            <div class="note-list-item" onclick="NoteSelectMenu.NoteSelected(this);">
                <canvas class="note-select-canvas" width="32" height="32"></canvas>
            </div>
        `;
        return `
            <style>
                div#note-select-frame {
                    border: 1px solid black;
                    background-color: silver;
                    display: inline-block;
                    position: absolute;
                    left: 100px;
                    top: 200px;
                    width: auto;
                    height: auto;
                    padding: 4px;
                    margin: 0px;
                    border-radius: 8px;
                    z-index: 100;
                }
                table {
                    border: none;
                }
                td {
                    width: auto;
                    height: auto;
                    padding: 0px;
                }
                td#text {
                    font-size: 1em;
                }
                div.note-list-item {
                    border: 1px solid black;
                    border-radius: 8px;
                    display: inline-block;
                    margin: 0px;
                    padding: 2px;
                    box-sizing: border-box;
                    background-color: silver;
                    line-height: 0px;
                }
                div.note-list-item:hover {
                    background-color: whitesmoke;
                }
            </style>
            <div id="note-select-frame">
                <table>
                    <tr>
                        <td id="text" colspan="7">どのパターンにする？</td>
                        <td>${item}</td>
                    </tr>
                    <tr>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                    </tr>
                    <tr>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                        <td>${item}</td>
                    </tr>
                </table>
            </div>
        `;
    }

    /**
     * 選択中の要素
     */
    get target_element() { return this.target_element_; }

    /**
     * 表示中か
     */
    get showing() { return (this.style.visibility == 'visible'); }

    /**
     * 表示位置（矩形左上 x 座標）
     */
    get show_x() { return this.show_x_; }

    /**
     * 表示位置（矩形左上 y 座標）
     */
    get show_y() { return this.show_y_; }

    /**
     * 選択対象の要素の傍に表示
     * @param element : 選択対象の要素
     */
    Show(element) {
        // 表示位置を選択されている音符房エレメント傍に移動
        const elementRect = element.getBoundingClientRect();
        const menuRect = this.frame.getBoundingClientRect();
        this.show_x_ = elementRect.left + (elementRect.width / 2) - (menuRect.width / 2);
        this.show_y_ = elementRect.bottom + 4;
        const documentRect = document.body.getBoundingClientRect();
        // 表示位置が画面外に出る場合は出ないように制限する
        if (this.show_x_ < 0) {
            this.show_x_ = 0;
        }
        if (this.show_x_ + menuRect.width > documentRect.width) {
            this.show_x_ = documentRect.width - menuRect.width;
        }
        if (this.show_y_ < 0) {
            this.show_y_ = 0;
        }
        if (this.show_y_ + menuRect.height > documentRect.height) {
            this.show_y_ = documentRect.height - menuRect.height;
        }
        this.frame.style.left = this.show_x_.toString() + 'px';
        this.frame.style.top = this.show_y_.toString() + 'px';
        this.style.visibility = 'visible';
        // 変更対象の音符房エレメントを更新
        this.target_element_ = element;

        // 表示したてかの管理
        this.fresh_ = true;
        window.setTimeout(() => {
            this.fresh_ = false;
        }, 100);
    }

    // 非表示にする
    Hide() {
        // 非表示にして選択を解除
        this.style.visibility = 'hidden';
        this.target_element_ = null;
        this.show_x_ = 0;
        this.show_y_ = 0;
    }

    // 出来立てほやほやか
    get fresh() { return this.fresh_; }

    /**
     * 指定座標との当たり判定
     * @param posX : x座標（クライアント）
     * @param posY : y座標（クライアント）
     * @retval true  : 当たってる
     * @retval false : 当たってない
     */
    Bounding(posX, posY) {
        const rect = this.frame.getBoundingClientRect();
        if (posX < rect.left) return false;
        if (posX > rect.right) return false;
        if (posY < rect.top) return false;
        if (posY > rect.bottom) return false;
        return true;
    }

    /**
     * 選択対象の要素の傍に表示
     * @param element : 選択対象の要素
     */
    static Show(element) {
        Logger.WriteFunctionCalledLog();
        const menu = NoteSelectMenu.GetMenu();
        menu.Show(element);
    }

    /**
     * 非表示にする
     */
    static Hide() {
        Logger.WriteFunctionCalledLog();
        const menu = NoteSelectMenu.GetMenu();
        menu.Hide();
    }

    /**
     * 音符房選択時のコールバック
     * @param selected_element : 選択された音符房
     */
    static NoteSelected(selected_element) {
        Logger.WriteFunctionCalledLog();
        const menu = NoteSelectMenu.GetMenu();
        const canvas = selected_element.querySelector('.note-select-canvas');
        menu.target_element.ChangeNote(canvas);
        // メニューは消す
        menu.Hide();
    }

    /**
     * 実体を取得
     */
    static GetMenu() {
        return document.getElementsByTagName('note-select-menu')[0];
    }
}
customElements.define("note-select-menu", NoteSelectMenu);