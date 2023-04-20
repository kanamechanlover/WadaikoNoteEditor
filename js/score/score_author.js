/**
 * 著者名欄要素
 */
class ScoreAuthor extends HTMLElement {
    attrNameAlign = 'align';

    static get observedAttributes() {
        return [
            this.attrNameAlign
        ];
    }

    constructor() {
        super();
        // Shadow DOM を設定
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = this.template();
        const clone = document.importNode(template.content, true);
        shadowRoot.appendChild(clone);

        // 要素取得
        //   - カバー
        this.cover = shadowRoot.querySelector('#cover');
        //   - テキストエリア
        this.textArea = shadowRoot.querySelector('#text-area');
        this.textArea.text = this.textContent;

        // 属性設定
        this.align = this.getAttribute(this.attrNameAlign);

        // イベント設定
        this.textArea.textchanged = (text) => {
            this.textContent = text;
        };
    }

    /**
     * 水平方向の配置（left, center, right）
     */
    get align() { return this.getAttribute(this.attrNameAlign); }
    set align(v) {
        const value = v.toString();
        if (this.align != value) {
            this.setAttribute(this.attrNameAlign, v.toString());
        }
        this.cover.style.textAlign = value;
    }

    /**
     * 著者名
     */
    get author() { return this.textArea.text; }
    set author(v) {
        this.textArea.text = v.toString();
        this.textContent = v.toString();
    }

    /**
     * Shadow Dom 用テンプレート
     */
    template() {
        return `
            <style>
                div {
                    width: 100%;
                    margin-top: 4px;
                    text-align: right;
                    z-index: ${ZIndexes.ScoreAuthor};
                }
            </style>
            <div id="cover">
                <rewritable-text id="text-area" placeholder="著者名" fontsize="1em" multi="true"></rewritable-text>
            </div>
        `;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        Logger.WriteFunctionCalledLog();
        if (attrName == this.attrNameAlign) {
            // align 属性
            this.align = newValue;
        }
    }
}
customElements.define("score-author", ScoreAuthor);