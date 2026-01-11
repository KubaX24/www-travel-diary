import {Dialog} from "../dialog.js";
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
        const addDialog = new Dialog("add-place", "Add place", this.template())

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
            [localStorage.getItem("location.lng"), localStorage.getItem("location.lat")],
            name,
            description,
            distanceKm,
            startDate,
            endDate
        )

        this.#db.addPlace(newPlace, Number.parseInt(localStorage.getItem("current.diary.id")))
        this.#map.setPlace(newPlace, () => {this.#detail.showPlace(newPlace)})
        this.#totalKm.addPlace(newPlace)
    }

    template() {
        return `
            <form>
                <div>
                    <label for="dialog-place-name">Name</label>
                    <input type="text" placeholder="Name" id="dialog-place-name">
                </div>
                <div>
                    <label for="dialog-place-description">Description</label>
                    <textarea placeholder="Description" id="dialog-place-description"></textarea>
                </div>
                <div>
                    <label for="dialog-place-distance">Distance in KM</label>
                    <input type="number" placeholder="Distance" id="dialog-place-distance">
                </div>
                <div>
                    <label for="dialog-place-start-date">Start date</label>
                    <input type="date" id="dialog-place-start-date" value="${new Date().toISOString().slice(0, 10)}">
                </div>
                <div>
                    <label for="dialog-place-end-date">End date</label>
                    <input type="date" id="dialog-place-end-date" value="${new Date().toISOString().slice(0, 10)}">
                </div>
                <button class="dialog-submit" data-select="0" type="button">Add</button>
            </form>
        `
    }
}