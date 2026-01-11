import {ExportView} from "./view/views/export-view.js";
import {IndexView} from "./view/views/index-view.js";

export class Controller {

    #db;

    constructor(db) {
        this.#db = db;

        this.currentPage()
    }

    /**
     * @returns {String}
     */
    currentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');

        switch (pageParam) {
            case 'export': {
                const diaryIdParam = urlParams.get('diaryId');

                const exportView = new ExportView(this.#db, {diaryId: diaryIdParam});
                this.setPageBody(exportView.body())
                exportView.logic();
                break
            }
            default: {
                const indexView = new IndexView(this.#db, {});
                this.setPageBody(indexView.body())
                indexView.logic();
            }
        }
    }

    setPageBody(content) {
        document.body.innerHTML = content;
    }
}