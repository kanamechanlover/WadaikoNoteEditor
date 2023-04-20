/**
 * z-index の順序を決める
 * これを決めておくことで、各要素のイベント発生順を制御でき、
 * 一番手前の要素のイベントのみ発生させることが可能
 * TODO: 出来れば enum 型のように自動カウントアップさせたい。
 */
var ZIndexes = {
    // 楽譜要素
    ScorePaper: 0, // 用紙
    ScoreTitle: 1, // 曲名
    ScoreAuthor: 2, // 著者
    ScoreLine: 3, // 行
    ScorePart: 4, // パート
    ScoreMeasure: 5, // 小節
    ScoreBar: 6, // 小節線
    NoteCluster: 7, // 音符房
    // マニピュレータ
    Manipulators: 8,
};