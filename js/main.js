function OnLoaded() {
    document.body.onclick = LeftButtonClicked;
    document.body.oncontextmenu = RightButtonClicked;
}

function LeftButtonClicked(event) {
    Logger.WriteFunctionCalledLog();
    const clickedX = event.clientX;
    const clickedY = event.clientY;
    // 音符房選択パネル
    if (NoteSelectMenu.GetMenu().showing) {
        // 表示中パネル外をクリックしたらパネル非表示
        if (!NoteSelectMenu.GetMenu().fresh &&
            !NoteSelectMenu.GetMenu().Bounding(clickedX, clickedY)) {
            NoteSelectMenu.Hide();
        }
    }
    return false;
}

function RightButtonClicked(event) {
    Logger.WriteFunctionCalledLog();
    return false;
}