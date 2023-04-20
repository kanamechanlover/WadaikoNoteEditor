/** ログ出力関連の補助関数を定義 */
class Logger {
    // ログ出力機能のオンオフ状態
    isOn = false;

    /** ログ出力機能のオンオフ切り替え */
    static Switch(on) {
        Logger.isOn = on;
    }

    /**
     * 関数呼び出し通知ログ
     * この関数を呼び出した側の関数名を沿えて
     * 「called 関数名() : メッセージ」と出力
     * 参考文献：https://qa.atmarkit.co.jp/q/10413
     */
    static WriteFunctionCalledLog(message = "") {
        // ログ出力機能オン時のみ実施
        if (!Logger.isOn) return;

        // エラー出力のスタックトレースから呼び出し元の関数名を取得
        let stack = new Error().stack;
        let caller = stack.split('\n')[2].split('(')[0].trim();
        // 関数名を用いて呼び出しログを表示
        let detailMessage = (message.length == 0) ? "" : " : " + message;
        console.log("called " + caller + "()" + detailMessage);
    }
}