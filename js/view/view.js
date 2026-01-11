export class View {

    db;
    params;

    constructor(db, params) {
        this.db = db;
        this.params = params;
    }

    /**
     * returns {String} HTML body
     */
    body(){};

    async logic(){};
}