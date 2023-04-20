/**
 * パート削除ボタン
 */
class ScorePartInserter extends HTMLElement {
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
        this.canvas.getContext('2d').drawImage(this.normalCanvas, 0, 0);

        // 挿入先の対象のパート要素
        this.target_ = null;

        // クリックされたら行を挿入
        this.onclick = (e) => {
            this.Insert();
        };
        // ホバー時
        this.onmouseenter = () => {
            const context = this.canvas.getContext('2d');
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.drawImage(this.hoverCanvas, 0, 0);
        };
        // 非ホバー時
        this.onmouseleave = () => {
            const context = this.canvas.getContext('2d');
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.drawImage(this.normalCanvas, 0, 0);
        };
    }

    /**
     * 削除対象の行要素
     */
    get target() { return this.target_; }
    set target(v) { this.target_ = v; }

    /**
     * Shadow DOM テンプレート
     */
    template() {
        return `
            <style>
                div {
                    display: inline-block;
                    border: 1px solid silver;
                    border-radius: 4px;
                    text-align: center;
                    cursor: default;
                    line-height: 0px;
                    z-index: ${ZIndexes.Manipulators};
                }
                div:hover {
                    border-color: green;
                }
                @media print {
                    div {
                        display: none;
                    }
                }
            </style>
            <div id="frame" title="パート挿入">
                <canvas id="canvas" width="24" height="10"></canvas>
            </div>
        `;
    }

    /**
     * パート挿入
     */
    Insert() {
        const line = $(this).closest('score-line');
        console.log(line);
        if (this.target == null) {
            // 対象が無ければ先頭か末尾挿入なのでクラス名から判定
            if ('first' in this.className) {
                // 先頭に挿入
                line.Insert(0);
            } else if ('last' in this.className) {
                // 末尾に挿入
                line.Insert();
            }
        } else {
            // 途中に挿入
            const index = line.IndexOf(this.target);
            line.Insert();
        }
    }

    /**
     * 色違いなだけなので色を指定してキャンバス生成
     */
    createCanvas(color) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.fillStyle = color;
        context.fillRect(8, 4, 8, 2);
        context.fillRect(11, 1, 2, 8);
        context.beginPath();
        context.moveTo(18, 1);
        context.lineTo(19, 1);
        context.lineTo(22, 4);
        context.lineTo(22, 5);
        context.lineTo(18, 8);
        context.lineTo(17, 8);
        context.fill();
        context.closePath();
        return canvas;
    }
}

customElements.define('score-part-inserter', ScorePartInserter);