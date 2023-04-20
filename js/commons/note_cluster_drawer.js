/**
 * 音符房描画クラス
 */
class NoteClusterDrawer {
    /**
     * 音符房描画
     * キャンバスに音符束を描画する
     */
    static Draw(canvas, type) {
        const drawFunctions = [
            NoteClusterDrawer.drawNone,
            NoteClusterDrawer.drawN4,
            NoteClusterDrawer.drawN8x2,
            NoteClusterDrawer.drawN8dN16,
            NoteClusterDrawer.drawN16N8d,
            NoteClusterDrawer.drawN8N16N16,
            NoteClusterDrawer.drawN16N16N8,
            NoteClusterDrawer.drawN16N8N16,
            NoteClusterDrawer.drawN16x4,
            NoteClusterDrawer.drawR4,
            NoteClusterDrawer.drawN8R8,
            NoteClusterDrawer.drawR8N8,
            NoteClusterDrawer.drawN8dR16,
            NoteClusterDrawer.drawR16N8d,
            NoteClusterDrawer.drawN16R8d,
            NoteClusterDrawer.drawR8dN16
        ];
        drawFunctions[type](canvas);
    }

    /**
     * 音符房「無し」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawNone(canvas) {
        // None は何も描画しない
        canvas.setAttribute("title", "無し");
    }

    /**
     * 音符房「ドン」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN4(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote4(context, 16);
        canvas.setAttribute("title", "ドン");
    }

    /**
     * 音符房「ドコ」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN8x2(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote4(context, 6);
        NoteClusterDrawer.drawNote4(context, 30);
        NoteClusterDrawer.drawBeamFirst(context, 6, 30, 3);
        canvas.setAttribute("title", "ドコ");
    }

    /**
     * 音符房「ドーンコ」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN8dN16(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote4(context, 6);
        NoteClusterDrawer.drawNote4(context, 30);
        NoteClusterDrawer.drawBeamFirst(context, 6, 30, 3);
        NoteClusterDrawer.drawBeamSecond(context, 24, 30, 9);
        canvas.setAttribute("title", "ドーンコ");
    }

    /**
     * 音符房「ドコーン」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN16N8d(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote4(context, 6);
        NoteClusterDrawer.drawNote4(context, 30);
        NoteClusterDrawer.drawBeamFirst(context, 6, 30, 3);
        NoteClusterDrawer.drawBeamSecond(context, 6, 12, 9);
        canvas.setAttribute("title", "ドコーン");
    }

    /**
     * 音符房「ドンドコ」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN8N16N16(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote4(context, 6);
        NoteClusterDrawer.drawNote4(context, 20);
        NoteClusterDrawer.drawNote4(context, 30);
        NoteClusterDrawer.drawBeamFirst(context, 6, 30, 3);
        NoteClusterDrawer.drawBeamSecond(context, 20, 30, 9);
        canvas.setAttribute("title", "ドンドコ");
    }

    /**
     * 音符房「ドコドン」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN16N16N8(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote4(context, 6);
        NoteClusterDrawer.drawNote4(context, 16);
        NoteClusterDrawer.drawNote4(context, 30);
        NoteClusterDrawer.drawBeamFirst(context, 6, 30, 3);
        NoteClusterDrawer.drawBeamSecond(context, 6, 16, 9);
        canvas.setAttribute("title", "ドコドン");
    }

    /**
     * 音符房「ドコンコ」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN16N8N16(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote4(context, 6);
        NoteClusterDrawer.drawNote4(context, 18);
        NoteClusterDrawer.drawNote4(context, 30);
        NoteClusterDrawer.drawBeamFirst(context, 6, 30, 3);
        NoteClusterDrawer.drawBeamSecond(context, 6, 12, 9);
        NoteClusterDrawer.drawBeamSecond(context, 24, 30, 9);
        canvas.setAttribute("title", "ドコンコ");
    }
    
    /**
     * 音符房「ドコドコ」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN16x4(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote4(context, 6);
        NoteClusterDrawer.drawNote4(context, 14);
        NoteClusterDrawer.drawNote4(context, 22);
        NoteClusterDrawer.drawNote4(context, 30);
        NoteClusterDrawer.drawBeamFirst(context, 6, 30, 3);
        NoteClusterDrawer.drawBeamSecond(context, 6, 30, 9);
        canvas.setAttribute("title", "ドコドコ");
    }

    /**
     * 音符房「ウン」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawR4(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawRest4(context, 16);
        canvas.setAttribute("title", "ウン");
    }

    /**
     * 音符房「ドス」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN8R8(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote8(context, 8);
        NoteClusterDrawer.drawRest8(context, 24);
        canvas.setAttribute("title", "ドス");
    }

    /**
     * 音符房「スド」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawR8N8(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawRest8(context, 8);
        NoteClusterDrawer.drawNote8(context, 24);
        canvas.setAttribute("title", "スド");
    }

    /**
     * 音符房「ドンス」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN8dR16(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote8(context, 8, true);
        NoteClusterDrawer.drawRest16(context, 24);
        canvas.setAttribute("title", "ドンス");
    }

    /**
     * 音符房「スドン」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawR16N8d(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawRest16(context, 8);
        NoteClusterDrawer.drawNote8(context, 24, true);
        canvas.setAttribute("title", "スドン");
    }

    /**
     * 音符房「ドッ」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawN16R8d(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawNote16(context, 8);
        NoteClusterDrawer.drawRest8(context, 24, true);
        canvas.setAttribute("title", "ドッ");
    }

    /**
     * 音符房「スッド」描画
     * @param canvas <Canvas> 描画先のキャンバス
     */
    static drawR8dN16(canvas) {
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        NoteClusterDrawer.drawRest8(context, 8, true);
        NoteClusterDrawer.drawNote16(context, 24);
        canvas.setAttribute("title", "スッド");
    }

    /**
     * １つの4分音符を描画
     * @param context <Context> : 描画先のコンテキスト
     * @param xPos <number> 縦棒の描画位置
     */
    static drawNote4(context, xPos) {
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(xPos, 1);
        context.lineTo(xPos, 24);
        context.lineTo(xPos - 5, 30);
        context.stroke();
        context.closePath();
    }

    /**
     * １つの8分音符を描画
     * @param context <Context> : 描画先のコンテキスト
     * @param xPos <number> 縦棒の描画位置
     * @param dot <boolean> 付点か (default=false)
     */
    static drawNote8(context, xPos, dot = false) {
        context.lineWidth = 2;
        // まずは4分音符を描画
        NoteClusterDrawer.drawNote4(context, xPos);
        // その後ポニーテールを描画
        context.beginPath();
        context.moveTo(xPos, 1);
        context.bezierCurveTo(xPos + 1, 9, xPos + 12, 10, xPos + 2, 18);
        context.stroke();
        context.closePath();
        if (dot) {
            context.beginPath();
            context.arc(xPos + 5, 26, 2, 0, Math.PI * 2, false);
            context.fill();
            context.closePath();
        }
    }

    /**
     * １つの16分音符を描画
     * @param context <Context> : 描画先のコンテキスト
     * @param xPos <number> 縦棒の描画位置
     */
    static drawNote16(context, xPos) {
        // まずは4分音符を描画
        NoteClusterDrawer.drawNote4(context, xPos);
        // その後ポニーテールを描画
        context.beginPath();
        context.moveTo(xPos, 1);
        context.bezierCurveTo(xPos + 1, 9, xPos + 12, 10, xPos + 2, 18);
        context.moveTo(xPos, 5);
        context.bezierCurveTo(xPos + 1, 13, xPos + 12, 14, xPos + 2, 18);
        context.stroke();
        context.closePath();
    }

    /**
     * （一番上の）連桁を引く
     * @param context <Context> : 描画先のコンテキスト
     * @param xBegin <number> 始点 x 座標
     * @param xEnd <number> 終点 x 座標
     * @param yPos <number> y 座標
     */
    static drawBeamFirst(context, xBegin, xEnd, yPos) {
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(xBegin, yPos);
        context.lineTo(xEnd, yPos);
        context.stroke();
        context.closePath();
    }

    /**
     * （2つ目の）連桁を引く
     * @param context <Context> : 描画先のコンテキスト
     * @param xBegin <number> 始点 x 座標
     * @param xEnd <number> 終点 x 座標
     * @param yPos <number> y 座標
     */
    static drawBeamSecond(context, xBegin, xEnd, yPos) {
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(xBegin, yPos);
        context.lineTo(xEnd, yPos);
        context.stroke();
        context.closePath();
    }

    /**
     * １つの4分休符を描画
     * @param context <Context> : 描画先のコンテキスト
     * @param xPos <number> 中心描画位置
     */
    static drawRest4(context, xPos) {
        context.lineWidth = 2;
        context.beginPath();
        // 下から書く
        context.moveTo(xPos, 30);
        context.bezierCurveTo(xPos - 8, 28, xPos - 6, 18, xPos + 4, 25);
        context.lineTo(xPos + 4, 24);
        context.lineTo(xPos - 3, 18);
        context.lineTo(xPos + 3, 12);
        context.lineTo(xPos - 4, 3);
        context.stroke();
        context.closePath();
    }

    /**
     * １つの8分休符を描画
     * @param context <Context> : 描画先のコンテキスト
     * @param xPos <number> 中心描画位置
     * @param dot <boolean> 付点か (default=false)
     */
    static drawRest8(context, xPos, dot = false) {
        context.lineWidth = 2;
        context.beginPath();
        // 下から書く
        context.moveTo(xPos, 30);
        context.lineTo(xPos + 6, 16);
        context.lineTo(xPos + 5, 16);
        context.bezierCurveTo(xPos + 1, 23, xPos - 6, 22, xPos - 6, 16);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(xPos - 4, 17, 3, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
        if (dot) {
            context.beginPath();
            context.arc(xPos + 6, 26, 2, 0, Math.PI * 2, false);
            context.fill();
            context.closePath();
        }
    }

    /**
     * １つの16分休符を描画
     * @param context <Context> : 描画先のコンテキスト
     * @param xPos <number> 中心描画位置
     */
    static drawRest16(context, xPos) {
        context.lineWidth = 2;
        context.beginPath();
        // 下から書く
        context.moveTo(xPos, 30);
        context.lineTo(xPos + 6, 10);
        context.lineTo(xPos + 5, 10);
        context.bezierCurveTo(xPos + 2, 23, xPos - 6, 22, xPos - 6, 16);
        context.moveTo(xPos + 5, 10);
        context.bezierCurveTo(xPos, 16, xPos - 3, 16, xPos - 4, 10);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(xPos - 4, 17, 3, 0, Math.PI * 2, false);
        context.arc(xPos - 2, 10, 3, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    }
}
