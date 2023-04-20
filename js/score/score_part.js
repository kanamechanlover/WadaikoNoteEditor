/**
 * パート要素
 */
class ScorePart extends HTMLElement {
    attrNamePartName = 'partname';

    static get observedAttributes() {
        return [
            this.attrNamePartName
        ];
    }
    constructor() {
        super();

        // 初期値を入れておく
        this.name = this.getAttribute(this.attrNamePartName);

        // Shadow DOM 構築
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = this.template();
        const clone = document.importNode(template.content, true);
        shadowRoot.appendChild(clone);

        // 小節部分を構築
        this.tableRow = shadowRoot.querySelector('#table-row');
        this.buildMeasures();

        // パート部がクリックされた時
        shadowRoot.querySelector('table').onclick = () => {
            console.log('Part!');
            return false;
        };
    }
    get partname() { return this.name; }
    set partname(v) {
        this.name = v.toString();
        this.setAttribute(this.attrNamePartName, v.toString());
    }

    template() {
        return `
            <style>
                table {
                    width: 100%;
                    z-index: ${ZIndexes.ScorePart};
                    border-collapse: collapse;
                }
                table:hover {
                    background-color: #d0d0d0;
                }
                tr {
                    padding: 0px;
                }
                td {
                    height: 100%;
                    padding: 0px;
                }
                div.measure-frame {
                    margin: 0px;
                    padding: 0px;
                    height: 100%;
                }
                canvas.measure {
                    margin: 0px;
                    height: 100%;
                }
            </style>
            <table id="table">
                <tr id="table-row"></tr>
            </table>
        `;
    }

    /**
     * 小節部構築
     */
    buildMeasures() {
            // Light DOM から小節部取得
            const lights = this.getElementsByTagName('score-measure');
            // 順次構築
            while (lights.length) {
                // Light DOM の内容を挿入
                const light = lights.item(0);
                const td = document.createElement('td');
                td.width = '*';
                td.appendChild(light);
                this.tableRow.appendChild(td);
                // 間に小節線を入れる
                if (lights.length) {
                    this.buildBarLine();
                }
            }
        }
        /**
         * 小節線構築
         */
    buildBarLine() {
        const td = document.createElement('td');
        td.width = '1';
        td.style.backgroundColor = 'black';
        this.tableRow.appendChild(td);
    }
}

customElements.define('score-part', ScorePart);