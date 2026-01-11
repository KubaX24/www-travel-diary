import {Dialog, DialogBuilder} from "../dialog.js";
import {Place} from "../../entities/place.js";

export class AddPlaceDialog {

    #db;
    #map;
    #detail;
    #totalKm;

    constructor(db, map, detail, totalKm) {
        this.#db = db;
        this.#map = map;
        this.#detail = detail;
        this.#totalKm = totalKm;
    }

    init() {
        const addDialog = new Dialog("add-place", "Add place", DialogBuilder.createAddPlace())

        addDialog.addSubmitListener(() => {
            this.onPlaceCreate()
            addDialog.close()
        })

        addDialog.open()
        this.#map.removeLocationMarker()
    }

    onPlaceCreate() {
        const newPlace = new Place(
            [localStorage.getItem("location.lng"), localStorage.getItem("location.lat")],
            document.getElementById("dialog-place-name").value,
            document.getElementById("dialog-place-description").value,
            Number.parseInt(document.getElementById("dialog-place-distance").value),
            document.getElementById("dialog-place-start-date").value,
            document.getElementById("dialog-place-end-date").value
        )

        this.#db.addPlace(newPlace, Number.parseInt(localStorage.getItem("current.diary.id")))
        this.#map.setPlace(newPlace, () => {this.#detail.showPlace(newPlace)})
        this.#totalKm.addPlace(newPlace)
    }
}