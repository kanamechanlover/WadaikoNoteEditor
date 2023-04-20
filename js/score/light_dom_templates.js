/**
 * 楽譜の Light DOM のテンプレート
 */

class LightDOMTemplates {
    static Title(title) {
        return `
            <score-title>${title}</score>
        `;
    }
    static Author(author) {
        return `
            <score-author>${author}</score-author>
        `;
    }
    static Line(partNames) {
        const partTemplates = partNames.reduce((output, name) => {
            return output + `${LightDOMTemplates.Part(name)}`;
        }, '');
        return `
            <score-line>
                ${partTemplates}
            </score-line>
        `;
    }
    static Part(name) {
        return `
            <score-part partname="${name}">
                ${LightDOMTemplates.Measure()}
                ${LightDOMTemplates.Measure()}
                ${LightDOMTemplates.Measure()}
                ${LightDOMTemplates.Measure()}
            </score-part>
        `;
    }
    static Measure() {
        return `
            <score-measure beginbar="0" endbar="0">
                ${LightDOMTemplates.NoteCluster('0', '', '')}
                ${LightDOMTemplates.NoteCluster('0', '', '')}
                ${LightDOMTemplates.NoteCluster('0', '', '')}
                ${LightDOMTemplates.NoteCluster('0', '', '')}
            </score-measure>
        `;
    }
    static NoteCluster(type, accent, song) {
        return `<note-cluster type="${type}" accent="${accent}" song="${song}"></note-cluster>`;
    }
};