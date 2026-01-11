import {Dialog} from "../dialog.js";
import {Place} from "../../entities/place.js";
import {Constants} from "../../constants.js";

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
        const addDialog = new Dialog("add-place", "Přidat místo", this.template())

        addDialog.addSubmitListener(() => {
            this.onPlaceCreate()
            addDialog.close()
        })

        addDialog.open()
        this.#map.removeLocationMarker()
    }

    onPlaceCreate() {
        const name = document.getElementById("dialog-place-name").value;
        const description = document.getElementById("dialog-place-description").value;
        const distanceKm = Number.parseInt(document.getElementById("dialog-place-distance").value);
        const startDate = document.getElementById("dialog-place-start-date").value;
        const endDate = document.getElementById("dialog-place-end-date").value;

        if(name === "" ||
            description === "" ||
            startDate === "" ||
            endDate === "" ||
            isNaN(distanceKm)  ||
            distanceKm < 0) return;

        const newPlace = new Place(
            [localStorage.getItem(Constants.LOCAL_STORAGE_LOCATION_LNG), localStorage.getItem(Constants.LOCAL_STORAGE_LOCATION_LAT)],
            name,
            description,
            distanceKm,
            startDate,
            endDate
        )

        this.#db.addPlace(newPlace, Number.parseInt(localStorage.getItem(Constants.LOCAL_STORAGE_CURRENT_DIARY_ID)))
        this.#map.setPlace(newPlace, () => {this.#detail.showPlace(newPlace)})
        this.#totalKm.addPlace(newPlace)
    }

    template() {
        return `
            <form>
                <div>
                    <label for="dialog-place-name">Jméno</label>
                    <input type="text" placeholder="Výlet..." id="dialog-place-name">
                </div>
                <div>
                    <label for="dialog-place-description">Popis</label>
                    <textarea placeholder="Bylo to..." id="dialog-place-description"></textarea>
                </div>
                <div>
                    <label for="dialog-place-distance">Vzdálenost v km</label>
                    <input type="number" placeholder="10" id="dialog-place-distance">
                </div>
                <div>
                    <label for="dialog-place-start-date">Datum začátku</label>
                    <input type="date" id="dialog-place-start-date" value="${new Date().toISOString().slice(0, 10)}">
                </div>
                <div>
                    <label for="dialog-place-end-date">Datum konce</label>
                    <input type="date" id="dialog-place-end-date" value="${new Date().toISOString().slice(0, 10)}">
                </div>
                <button class="dialog-submit" data-select="0" type="button">Add</button>
            </form>
        `
    }
}