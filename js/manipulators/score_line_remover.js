/**
 * 行削除ボタン
 */
class ScoreLineRemover extends HTMLElement {
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
        this.hoverCanvas = this.createCanvas('red');

        // キャンバス描画
        this.canvas.getContext('2d').drawImage(this.normalCanvas, 0, 0);

        // 削除対象の行要素
        this.target_ = null;

        // クリックされたら行を挿入
        this.onclick = (e) => {
            this.Remove(e.target.target);
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
                    pardding: 2px;
                    line-height: 0px;
                    z-index: ${ZIndexes.Manipulators};
                }
                div:hover {
                    border-color: red;
                }
                canvas {
                    margin: 1px 0px 0px 1px;
                }
                @media print {
                    div {
                        display: none;
                    }
                }
            </style>
            <div id="frame" title="行を削除">
                <canvas id="canvas" width="24" height="24"></canvas>
            </div>
        `;
    }

    /**
     * 1行削除
     */
    Remove(target) {
        // ターゲットが指定されていなければ何もしない
        if (!target) return;

        // 行の後にある行挿入ボタンも合わせて削除
        const inserter = $(target).nextAll('score-line-inserter')[0];
        inserter.remove();
        target.remove();
    }

    /**
     * 色違いなだけなので色を指定してキャンバス生成
     */
    createCanvas(color) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(4, 1);
        context.lineTo(11, 8);
        context.lineTo(18, 1);
        context.lineTo(21, 4);
        context.lineTo(14, 11);
        context.lineTo(21, 18);
        context.lineTo(18, 21);
        context.lineTo(11, 14);
        context.lineTo(4, 21);
        context.lineTo(1, 18);
        context.lineTo(8, 11);
        context.lineTo(1, 4);
        context.lineTo(4, 1);
        context.fill();
        context.closePath();
        return canvas;
    }
}

customElements.define('score-line-remover', ScoreLineRemover);