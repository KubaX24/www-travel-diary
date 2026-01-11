import {View} from "../view.js";
import {Data} from "../../utils/data.js";

export class ExportView extends View {

    body() {
        return `
            <div id="export-content"></div>
        `
    }

    async logic() {
        let diaryId = 0;

        if (!isNaN(this.params.diaryId))
            diaryId = Number.parseInt(this.params.diaryId);

        await new Data(this.db).export(diaryId)
            .then(content => this.setContent(content))
            .catch(() => this.setContent("Deník nebyl nalezen!"))
    }

    setContent(content) {
        document.getElementById('export-content').innerText = content
    }
}