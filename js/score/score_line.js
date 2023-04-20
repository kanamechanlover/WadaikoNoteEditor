/**
 * 楽譜の行要素要素
 */
class ScoreLine extends HTMLElement {
    constructor() {
        super();
        // Shadow DOM を設定
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = this.template();
        const clone = document.importNode(template.content, true);
        shadowRoot.appendChild(clone);

        // 要素取得
        //   - 配置先のテーブル
        this.table = shadowRoot.querySelector('#content-table');
        //   - パート毎の要素
        this.parts_ = [];
        this.buildParts();

        // 行削除ボタンに自身を設定
        const remover = shadowRoot.querySelector('#remover');
        remover.target = this;

        // 自身が描画領域に干渉しないように調整
        this.style.height = '0px';
        this.style.width = '0px';
    }

    get parts() { return this.parts_; }

    /**
     * 要素が何番目にあるか
     * @param element 
     */
    IndexOf(element) {
        return this.table.indexOf(element);
    }

    /**
     * 先頭にパート追加
     */
    Insert(index) {
        // パート部追加
        const part = document.createElement('score-part');
        this.buildPart(part, index);
        // パート挿入ボタン追加
        this.buildPartSeparator(index);
    }

    /**
     * Shadow Dom 用テンプレート
     */
    template() {
        return `
            <style>
                div {
                    width: 100%;
                    display: inline-block;
                    position: relative;
                    line-height: 0px;
                    z-index: ${ZIndexes.ScoreLine};
                }
                div:hover {
                    background-color: #f0f0f0;
                }
                table {
                    width: 100%;
                    margin: 0px;
                    border-width: 0px;
                    border-collapse: collapse;
                }
                td.part-name {
                    width: auto;
                    white-space: nowrap;
                    padding: 0px 8px 0px 0px;
                }
                rewritable-text {
                    vertical-align: middle;
                }
                td.part-content {
                    width: 100%;
                    border-left: 2px solid black;
                    border-right: 2px solid black;
                    padding: 0px;
                }
                #remover {
                    position: absolute;
                    right: -30px;
                    top: 50%;
                    transform: translateY(-50%);
                    -webkit- transform: translateY(-50%);
                }
                .inserter {
                    position: absolute;
                }
                .first {
                    top: 0px;
                }
                .last {
                    bottom: 0px;
                }
                .part-separator {
                    height: 4px;
                    position: relative;
                }
                .middle {
                    top: 50%;
                    transform: translateY(-50%);
                    -webkit- transform: translateY(-50%);
                }
            </style>
            <div>
                <table id="content-table"></table>
                <score-line-remover id="remover"></score-line-remover>
                <score-part-inserter class="inserter first"></score-part-inserter>
                <score-part-inserter class="inserter last"></score-part-inserter>
            </div>
        `;
    }

    /**
     * パート構築
     */
    buildParts() {
        // Light DOM からパート取得
        const lights = this.getElementsByTagName('score-part');
        // 順にパート要素構築
        while (lights.length) {
            // パート要素構築
            const light = lights.item(0);
            this.buildPart(light);
            // パート間を埋める
            if (lights.length) {
                this.buildPartSeparator();
            }
        }
    }

    /**
     * 1パート分追加
     * @param light 追加する要素
     * @param index 追加する位置（-1 は末尾）
     */
    buildPart(light, index = -1) {
        // テンプレート構築
        const template = document.createElement('template');
        template.innerHTML = `
            <tr>
                <td class="part-name">
                    <rewritable-text class="part-name" placeholder="パート名"></rewritable-text>
                </td>
                <td class="part-content"></td>
            </tr>
        `;
        const partElement = document.importNode(template.content, true);
        if (index >= 0) {
            this.table.insertBefore(partElement, this.table[index]);
        } else {
            this.table.insertBefore(partElement, this.table.lastChild);
        }
        const element = this.table.lastElementChild;

        // パート名構築
        const name = light.partname;
        const partName = element.querySelector('rewritable-text.part-name');
        partName.text = name;

        // パートコンテンツ構築
        const content = element.querySelector('.part-content');
        content.appendChild(light);
        this.parts_ += light;
    }

    /**
     * パート間の区切り要素テンプレート
     */
    buildPartSeparator(index = -1) {
        const template = document.createElement('template');
        template.innerHTML = `
            <tr class="part-separator">
                <td class="part-name">
                    <score-part-inserter class="inserter middle"></score-part-inserter>
                </td>
                <td class="part-content"></td>
            </tr>
        `;
        const element = document.importNode(template.content, true);
        const inserter = element.firstElementChild.querySelector('score-part-inserter');
        console.log(element.firstElementChild);
        // パート挿入ボタンに対象を設定
        inserter.target = element;
        // 行を追加
        if (index >= 0) {
            this.table.insertBefore(element, this.table[index]);
        } else {
            this.table.insertBefore(element, this.table.lastChild);
        }
    }
}

customElements.define('score-line', ScoreLine);