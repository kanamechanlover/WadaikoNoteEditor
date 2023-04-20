/**
 * 小節要素
 */
class ScoreMeasure extends HTMLElement {
    constructor(beginBar = null, endBar = null) {
        super();

        // Shadow DOM 構築
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = this.template();
        const clone = document.importNode(template.content, true);
        shadowRoot.appendChild(clone);

        // 小節線構築
        InitializeAttribute(this, 'beginbar', beginBar, '0');
        this.beginBar = new ScoreBar(ScoreBar.BarPosition.Left, this.getAttribute('beginbar'));
        InitializeAttribute(this, 'endbar', endBar, '0');
        this.endBar = new ScoreBar(ScoreBar.BarPosition.Right, this.getAttribute('endbar'));

        // 音符房部構築
        this.tableRow = shadowRoot.querySelector('#table-row');
        this.buildClusters();

        // 小節部がクリックされた時
        shadowRoot.querySelector('table').onclick = () => {
            console.log('Measure!');
            return false;
        };
    }

    get beginbar() { return this.getAttribute('beginbar'); }
    set beginbar(v) {
        this.setAttribute('beginbar', v.toString());
        this.beginBar.type = v;
    }
    get endbar() { return this.getAttribute('endbar'); }
    set endbar(v) {
        this.setAttribute('endbar', v.toString());
        this.endBar.type = v;
    }

    /**
     * Shadow DOM テンプレート
     */
    template() {
        return `
            <style>
                table {
                    width: 100%;
                    z-index: ${ZIndexes.ScoreMeasure};
                    border-collapse: collapse;
                }
                table:hover {
                    background-color: #b0b0b0;
                }
                tr {
                    vertical-align: middle;
                }
                td {
                    box-sizing: border-box;
                    padding: 0px;
                }
                td * {
                    text-align: center;
                    box-sizing: border-box;
                }
            </style>
            <table>
                <tr id="table-row"></tr>
            </table>
        `;
    }

    /**
     * 音符房部構築
     */
    buildClusters() {
        // Light DOM から小節部取得
        const lights = this.getElementsByTagName('note-cluster');

        // 順次構築
        this.buildBar(this.beginBar);
        while (lights.length) {
            // Light DOM を挿入
            const light = lights.item(0);
            const td = document.createElement('td');
            td.appendChild(light);
            this.tableRow.appendChild(td);
        }
        this.buildBar(this.endBar);
    }

    /**
     * 小節線構築
     */
    buildBar(bar) {
        const td = document.createElement('td');
        td.appendChild(bar);
        this.tableRow.appendChild(td);
    }
}

customElements.define('score-measure', ScoreMeasure);