/* 必要な js ファイルのリンクをまとめる */
[
    // サードパーティの js ファイル
    "js/third_parties/jquery-3.4.1.js",
    // libs のファイル
    "js/libs/logger.js",
    "js/libs/for_bind.js",
    "js/libs/event_trigger.js",
    "js/libs/html_collection_helper.js",
    "js/libs/rewritable_text.js",
    // 共通のファイル
    "js/commons/element_attribute_helper.js",
    "js/commons/note_cluster_drawer.js",
    "js/commons/zindex.js",
    // 楽譜構成要素のファイル
    "js/manipulators/context_menu.js",
    "js/manipulators/note_select_menu.js",
    "js/score/light_dom_templates.js",
    "js/score/score_title.js",
    "js/score/score_author.js",
    "js/score/note_cluster.js",
    "js/score/score_bar.js",
    "js/score/score_measure.js",
    "js/score/score_part.js",
    "js/score/score_line.js",
    "js/score/score_paper.js",
    "js/manipulators/score_part_inserter.js",
    "js/manipulators/score_line_inserter.js",
    "js/manipulators/score_line_remover.js",
    "js/main.js"
].forEach(filePath => {
    let script = document.createElement('script');
    script.src = filePath;
    script.setAttribute('charset', 'utf-8');
    document.getElementsByTagName('head')[0].appendChild(script);
});

var tohka = "tohka value";