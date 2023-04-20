/**
 * 音符房要素
 */
class NoteCluster extends HTMLElement {
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

        // キャンバス描画
        this.canvas.setAttribute("width", 32);
        this.canvas.setAttribute("height", 32);
        const type = this.getAttribute('type');
        NoteClusterDrawer.Draw(this.canvas, parseInt(type, 10));

        // クリックされたときの動作を定義
        this.canvas.onclick = () => { NoteSelectMenu.Show(this); }
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
                    padding: 0px;
                    display: inline-block;
                    border-radius: 2px;
                    position: relative;
                    z-index: ${ZIndexes.NoteCluster};
                }
                canvas {
                    margin: 0px;
                    padding: 2px;
                    vertical-align: middle;
                    border: 1px solid silver;
                    box-sizing: border-box;
                    border-radius: 8px;
                    width: 32px;
                    height: 32px;
                }
                @media print {
                    canvas {
                        border-color: transparent;
                    }
                }
            </style>
            <div>
                <canvas id="canvas" width="32" height="32"></canvas>
            </div>
        `;
    }

    /**
     * 音符房更新
     * @param canvas : 変更後の音符の描かれたキャンバス
     */
    ChangeNote(canvas) {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.drawImage(canvas, 0, 0);
        // ツールチップもコピー
        this.canvas.title = canvas.title;
    }
}

customElements.define('note-cluster', NoteCluster);