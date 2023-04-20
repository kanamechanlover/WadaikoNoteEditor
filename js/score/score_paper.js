/**
 * 楽譜の用紙要素
 */
class ScorePaper extends HTMLElement {
    constructor() {
        super();

        // Shadow DOM を設定
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = this.template();
        const clone = document.importNode(template.content, true);
        shadowRoot.appendChild(clone);

        // Light DOM の子要素をそのまま入れる
        const frame = shadowRoot.querySelector('#frame');
        while (this.children.length) {
            frame.appendChild(this.children[0]);
        }

        // 用紙設定
        this.settings = {};
    }

    template() {
        return `
            <style>
                div#frame {
                    display: block;
                    width: 800px;
                    height: 1131px;
                    border: 1px solid black;
                    background-color: white;
                    padding: 32px;
                    z-index: ${ZIndexes.ScorePaper};
                }
                @media print {
                    div#frame {
                        border-color: transparent;
                        margin: 0px;
                    }
                }
            </style>
            <div id="frame">
            </div>
        `;
    }
}

customElements.define('score-paper', ScorePaper);