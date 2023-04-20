/**
 * 書き換え可能なテキスト要素
 * ダブルクリックで入力可能になる外見がテキストノードの要素
 * テキストの長さによってサイズも変更される
 * multi 属性を true にすると複数行テキストかけるようになる
 */
class RewritableText extends HTMLElement {
    attrNamePlaceHolder = 'placeholder';
    attrNameFontSize = 'fontsize';
    attrNameTextChanged = 'textchanged';
    attrNameMulti = 'multi'

    static get observedAttributes() {
        return [
            this.attrNamePlaceHolder,
            this.attrNameFontSize,
            this.attrNameTextChanged,
            this.attrNameMulti
        ];
    }

    constructor() {
        super();

        // Shadow DOM を設定
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = this.template(); // 一旦シングルとして構築
        const clone = document.importNode(template.content, true);
        shadowRoot.appendChild(clone);

        // 各要素を取得しておく
        //   - フレーム部
        this.frame = shadowRoot.querySelector('#frame');
        //   - サイズ調整部
        this.dummy = shadowRoot.querySelector('#auto-sizing');
        //   - 入力エリア
        this.input = shadowRoot.querySelector('#text-area');

        // 既に設定されている属性を反映
        //   - 現在のテキスト
        const text = this.innerHTML;
        if (text) {
            this.text = text;
        }
        //   - プレースホルダー
        const placeHolder = this.getAttribute(this.attrNamePlaceHolder);
        if (placeHolder) {
            this.placeholder = placeHolder;
        }
        //   - フォントサイズ
        const fontSize = this.getAttribute(this.attrNameFontSize);
        if (fontSize) {
            this.fontsize = fontSize;
        }
        //   - マルチライン設定 On/Off
        const multi = this.getAttribute(this.attrNameMulti);
        if (multi) {
            this.multi = multi;
        }

        // コールバック設定
        this.setCallbacks();

        // 値が変更されたときのイベントを用意
        this.textChangedEvent = (t) => {};
    }

    // 現在のテキスト
    get text() { return this.input.value; }
    set text(v) {
        const value = (v ? v.toString() : '');
        this.input.value = value;
        if (value) {
            // 値があればそれを設定
            this.dummy.innerHTML = value.replace(/\n/g, '<br />');
        } else {
            // 空になる場合はプレースホールダーを設定
            this.dummy.innerHTML = this.placeholder;
        }
        this.innerHTML = value;
    }

    // プレースホルダー
    get placeholder() { return this.input.getAttribute('placeholder'); }
    set placeholder(v) {
        this.input.setAttribute('placeholder', v.toString());
        if (this.text.length == 0) {
            // 現在のテキストが空の場合はサイズ調整部にも反映
            this.dummy.innerHTML = v.toString();
        }
    }

    // フォントサイズ
    get fontsize() { return this.frame.style.fontSize; }
    set fontsize(v) {
        this.frame.style.fontSize = v.toString();
    }

    // 現在のテキスト変更イベント
    get textchagned() { return this.textChangedEvent; }
    set textchanged(v) { this.textChangedEvent = v; }

    // マルチライン設定 On/Off
    get multi() { return (this.input.tagName == 'textarea'); }
    set multi(v) {
        if (v) {
            // 空文字列でなければマルチラインに対応
            this.toMulti();
        } else {
            // 空文字列ならシングルラインに対応
            this.toSingle();
        }
    }

    /**
     * マルチラインに対応
     */
    toMulti() {
        // 既にマルチライン設定なら何もしない
        if (this.multi) return;

        // input 要素を textarea 要素に置き換える
        const text = this.input.value; // 現在のテキスト取得
        this.input.remove(); // 要素削除
        const textarea = document.createElement('textarea');
        textarea.id = 'text-area';
        textarea.value = text;
        const frame = this.shadowRoot.querySelector('#frame');
        frame.appendChild(textarea);
        // アクセサを切り替え
        this.input = textarea;
    }

    /**
     * シングルラインに対応
     */
    toSingle() {
        // 既にシングルライン設定なら何もしない
        if (!this.multi) return;

        // textarea 要素を input 要素に置き換える
        const text = this.input.value; // 現在のテキスト取得
        this.input.remove(); // 要素削除
        const input = document.createElement('input');
        input.id = 'text-area';
        input.type = 'text';
        input.value = text;
        const frame = this.shadowRoot.querySelector('frame');
        frame.appendChild(input);
        // アクセサを切り替え
        this.input = input;
        // コールバック設定
        this.setCallbacks();
    }

    /**
     * コールバック関数設定
     */
    setCallbacks() {
        // ダブルクリック時のコールバック設定
        this.input.ondblclick = this.OnDoubleClicked;
        // フォーカスを失った時のコールバック設定
        this.input.onblur = this.OnFocusLosted;
        // 入力文字列が変更された時のコールバック
        this.input.onchange = (event) => {
            this.text = event.target.value;
            this.textChangedEvent(event.target.value);
        }
    }

    /**
     * Shadow Dom 用テンプレート
     */
    template() {
        return `
            <style>
                #frame {
                    display: inline-block;
                    position: relative;
                    line-height: 0px;
                    border: 1px solid transparent;
                }
                #frame:hover {
                    border: 1px solid gray;
                    border-radius: 4px;
                    background-color: silver;
                }
                #auto-sizing {
                    display: inline-block;
                    overflow: visible;
                    min-width: 1em;
                    padding: 1px 0px;
                    opacity: 0;
                    margin: 1px;
                    line-height: 1.1em;
                    border-width: 0px;
                    font-family: inherit;
                    font-size: inherit;
                    border: 0px;
                }
                #text-area {
                    display: inline-block;
                    overflow: visible;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    margin: 1px;
                    padding: 1px 0px;
                    top: 0px;
                    left: 0px;
                    cursor: default;
                    line-height: 1.1em;
                    background-color: transparent;
                    border: 1px solid transparent;
                    text-align: center;
                    box-sizing: border-box;
                    font-family: inherit;
                    font-size: inherit;
                    border: 0px;
                    -ms-overflow-style:none;
                }
                #text-area::-webkit-scrollbar {
                    display: none;
                }
                textarea {
                    resize: none;
                }
            </style>
            <div id="frame">
                <div id="auto-sizing"></div>
                <input id="text-area" type="text" />
            </div>
        `;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        Logger.WriteFunctionCalledLog();
        if (attrName == this.attrNamePlaceHolder) {
            // placeholder 属性
            this.placeholder = newValue;
        } else if (attrName == this.attrNameFontSize) {
            // fontsize 属性
            this.fontsize = newValue;
        } else if (attrName == this.attrNameMulti) {
            // multi 属性
            this.multi = newValue;
        }
    }

    // ダブルクリックされた時のコールバック
    OnDoubleClicked(event) {
        Logger.WriteFunctionCalledLog();
        let element = event.target;
        element.style.cursor = "auto";
        element.readOnly = false;
    }

    // フォーカスを失った時のコールバック
    // ※ホバー（Out）時のコールバックもかねている
    OnFocusLosted(event) {
        Logger.WriteFunctionCalledLog();
        let element = event.target;
        element.style.cursor = "default";
        element.readOnly = true;
    }
}
customElements.define("rewritable-text", RewritableText);