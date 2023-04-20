/**
 * 小節線要素
 */
class ScoreBar extends HTMLElement {
    /**
     * バーの位置
     */
    static BarPosition = {
        Center: 0, // 標準
        Left: 1, // 始点
        Right: 2 // 終点
    };

    /**
     * バーの種類
     */
    static BarType = {
        Normal: 0, // 通常
        Repeat: 1, // 繰り返し
        Fin: 2, // 終了
    }

    constructor(position = null, type = null, measure = null) {
        super();

        // Shadow DOM 構築
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = this.template();
        const clone = document.importNode(template.content, true);
        shadowRoot.appendChild(clone);

        // 音符房部構築
        this.frame = shadowRoot.querySelector('#frame');
        this.canvas = shadowRoot.querySelector('#canvas');

        // 値設定
        InitializeAttribute(this, 'position', position, '0');
        InitializeAttribute(this, 'type', type, '0');

        // キャンバス描画
        this.buildBar();

        // 小節部がクリックされた時
        this.frame.onclick = () => {
            console.log('Bar!');
        };
    }

    get position() {
        return this.getAttribute('position');
    }
    set position(v) {
        this.setAttribute('position', v.toString());
        this.buildBar();
    }

    get type() { return this.getAttribute('type'); }
    set type(v) {
        this.setAttribute('type', v.toString());
        this.buildBar();
    }

    /**
     * Shadow DOM テンプレート
     */
    template() {
        return `
            <style>
                div {
                    width: 100%;
                    height: 100%;
                    margin: 0px;
                    padding: 0px;
                    z-index: ${ZIndexes.ScoreBar};
                }
                canvas {
                    width: 100%;
                    height: 100%;
                    margin: 0px;
                }
            </style>
            <div id="frame">
                <canvas id="canvas" width="8" height="32"></canvas>
            </div>
        `;
    }

    buildBar() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.type == ScoreBar.BarType.Normal) {
            console.log('type: normal');
            // 標準の場合は、ScorePart 側で描画された線だけで十分なのでなにも描画しない
        } else if (this.type == ScoreBar.BarType.Repeat) {
            console.log('type: repeat');
            context.save();
            if (this.position == ScoreBar.BarPosition.Right) {
                // 終点の場合は左右反転
                context.translate(this.canvas.width, 0);
                context.scale(-1, 1);
            }
            context.fillRect(0, 0, 1, 32);
            context.fillRect(2, 0, 1, 32);
            context.fillRect(5, 9, 2, 2);
            context.fillRect(5, 21, 2, 2);
            context.restore();
        } else if (this.type == ScoreBar.BarType.Fin) {
            console.log('type: fin');
            // Fin は配置関係ない構造
            context.fillRect(3, 0, 1, 32);
        }
    }
}

customElements.define('score-bar', ScoreBar);