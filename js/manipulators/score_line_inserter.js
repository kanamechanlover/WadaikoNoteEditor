/**
 * 行挿入ボタン
 */
class ScoreLineInserter extends HTMLElement {
    constructor() {
        super();

        // Shadow DOM 構築
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = this.template();
        const clone = document.importNode(template.content, true);
        shadowRoot.appendChild(clone);

        // 要素を取得
        this.canvas = shadowRoot.querySelector('#canvas');

        // 通常時とホバー時それぞれのコンテキスト生成
        // css 側だけで対応できたらよかったけど出来なかったのでイベントで切り替える
        this.normalCanvas = this.createCanvas('silver');
        this.hoverCanvas = this.createCanvas('green');

        // キャンバス描画
        this.drawCanvas(this.normalCanvas);

        // クリックされたら行を挿入
        this.onclick = () => {
                this.Insert(this);
            }
            // ホバー時
        this.onmouseenter = () => {
            this.drawCanvas(this.hoverCanvas);
        };
        // 非ホバー時
        this.onmouseleave = () => {
            this.drawCanvas(this.normalCanvas);
        };
    }

    /**
     * Shadow DOM テンプレート
     */
    template() {
        return `
            <style>
                div {
                    display: block;
                    border: 1px solid silver;
                    border-radius: 4px;
                    width: 100%;
                    height: 8px;
                    text-align: center;
                    line-height: 0px;
                    cursor: default;
                    position: relative;
                    z-index: ${ZIndexes.Manipulators};
                }
                div:hover {
                    border: 1px solid darkgreen;
                }
                canvas {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translateX(-50%) translateY(-50%);
                }
                @media print {
                    div {
                        visibility: hidden;
                    }
                }
            </style>
            <div id="frame" title="１行挿入">
                <canvas id="canvas" width="16" height="16"></canvas>
            </div>
        `;
    }

    /**
     * 1行挿入
     */
    Insert(self) {
        const jself = $(self);
        // 行挿入ボタンとして自身を複製して追加
        const clone = document.importNode(self, true);
        jself.before(clone);
        // 一つ前の行からパート名を取得
        /*const prevLines = jself.prevAll('score-line');
        console.log(prevLines.get(-1).parts);
        const partNames = prevLines.get(-1).parts.map((elemenet) => {
            return Element.partname;
        });*/
        const partNames = ['', '']
        const line = LightDOMTemplates.Line(partNames);
        // 行要素追加
        jself.before(line);
    }

    /**
     * キャンバス作成
     */
    createCanvas(color) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = color;
        context.fillRect(6, 1, 4, 14);
        context.fillRect(1, 6, 14, 4);
        return canvas;
    }

    /**
     * キャンバス描画
     * @param canvas 描画内容
     */
    drawCanvas(canvas) {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.drawImage(canvas, 0, 0);
    }
}

customElements.define('score-line-inserter', ScoreLineInserter);