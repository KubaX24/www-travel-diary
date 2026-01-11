import {MyDB} from "./utils/my-db.js";
import {Controller} from "./controller.js";

const db = new MyDB();

db.connect().then(()  => {
    new Controller(db);
});