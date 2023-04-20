/**
 * 曲名欄要素
 */
class ScoreTitle extends HTMLElement {
    constructor() {
        super();
        // Shadow DOM を設定
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = this.template();
        const clone = document.importNode(template.content, true);
        shadowRoot.appendChild(clone);

        // イベント設定
        this.textArea = shadowRoot.querySelector('#text-area');
        this.textArea.text = this.textContent;
        this.textArea.textchanged = (text) => {
            this.textContent = text;
        };
    }

    /**
     * 曲名
     */
    get title() { return this.textArea.text; }
    set title(v) {
        this.textArea.text = v.toString();
        this.textContent = v.toString();
    }

    /**
     * Shadow Dom 用テンプレート
     */
    template() {
        return `
            <style>
                div#frame {
                    width: 100%;
                    margin: 0px 0px 4px 0px;
                    padding: 0px;
                    text-align: center;
                    z-index: ${ZIndexes.ScoreTitle};
                }
                div#under-measure {
                    width: 50%;
                    height: 1px;
                    background-color: black;
                    margin: 0px auto;
                }
            </style>
            <div id="frame">
                <rewritable-text id="text-area" placeholder="曲名" fontsize="2em"></rewritable-text>
                <div id="under-measure"></div>
            </div>
        `;
    }
}
customElements.define("score-title", ScoreTitle);