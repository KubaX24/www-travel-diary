import {View} from "../view.js";
import {Place} from "../../entities/place.js";
import {Diary} from "../../entities/diary.js";
import {Detail}  from "../../components/detail.js";
import {Map}  from "../../components/map.js";
import {TotalKm} from "../../components/total-km.js";
import {Header} from "../../components/header.js";
import {AddPlace} from "../../components/add-place.js";
import {Dialog, DialogBuilder} from "../../components/dialog.js";
import {Data} from "../../utils/data.js";

export class IndexView extends View {


    body() {
        return `
            <main>
                <div id="header-map-container">
                    <header id="header">
                        <h1>Title</h1>
                    </header>
                    <div id="map"></div>
                </div>
                <div id="km-detail-container">
                    <div id="km"></div>
                    <div id="detail"></div>
                    <div id="add-place"></div>
                </div>
            </main>
        `
    }

    async logic() {
        const detail = new Detail("detail")
        const map = new Map("map", "asd")
        const totalKm = new TotalKm("km")
        const header = new Header("header")
        const addPlace = new AddPlace("add-place")

        const diary = await this.db.getDiaryById(11)
        header.setDiaryName(diary.name)

        const places = await this.db.getPlacesByDiaryId(diary.id)
        places.forEach(place => {
            map.setPlace(place, () => {
                detail.showPlace(place)
            })
        })

        diary.setPlaces(places)
        totalKm.setDiary(diary)

        localStorage.setItem("current.diary.id", diary.id)

        addPlace.addPlaceListener(() => {
            map.addLocationMarker()
        })

        addPlace.addCancelListener(() => {
            map.removeLocationMarker()
        })

        addPlace.addOkListener(() => {
            const addDialog = new Dialog("add-place", "Add place", DialogBuilder.createAddPlace())
            addDialog.addSubmitListener(async () => {
                const newPlace = new Place(
                    [localStorage.getItem("location.lng"), localStorage.getItem("location.lat")],
                    document.getElementById("dialog-place-name").value,
                    document.getElementById("dialog-place-description").value,
                    Number.parseInt(document.getElementById("dialog-place-distance").value),
                    document.getElementById("dialog-place-start-date").value,
                    document.getElementById("dialog-place-end-date").value
                )

                this.db.addPlace(newPlace, Number.parseInt(localStorage.getItem("current.diary.id")))
                map.setPlace(newPlace, () => {detail.showPlace(newPlace)})
                totalKm.addPlace(newPlace)

                addDialog.close()
            })

            addDialog.open()
            map.removeLocationMarker()
        })

        header.setOnClickListener(async () => {
            const diaries = await this.db.getDiaries()
            let template = document.createElement('div')

            template.innerHTML = `
            <form id="create-diary">
                <h3>Create diary</h3>
                <div>
                    <label for="dialog-diary-name">Name</label>
                    <input type="text" id="dialog-diary-name">
                </div>
                <div>
                    <label for="dialog-diary-author">Author</label>
                    <input type="text" id="dialog-diary-author">
                </div>
                <div>
                    <label for="dialog-diary-goal-km">Goal in KM</label>
                    <input type="number" id="dialog-diary-goal-km">
                </div>
                <button type="button" data-select="-1" class="dialog-submit">Create</button>
            </form>
            <form id="import-diary">
                <h3>Import diary</h3>
                <div>
                    <label for="dialog-diary-json">JSON</label>
                    <textarea id="dialog-diary-json"></textarea>
                </div>
                <button type="button" data-select="-2" class="dialog-submit">Import</button>
            </form>
        `

            diaries.forEach(diary => {
                template.innerHTML += `<button class="dialog-submit" data-select="${diary.id}">${diary.name}</button>`
            })

            const selectDiaryDialog = new Dialog("select-diary", "Select diary", template.innerHTML)
            selectDiaryDialog.addSubmitListener(async (id) => {
                if (Number.parseInt(id) === -1) {
                    const newDiary = new Diary(
                        document.getElementById("dialog-diary-name").value,
                        document.getElementById("dialog-diary-author").value,
                        document.getElementById("dialog-diary-goal-km").value
                    )

                    newDiary.id = await this.db.addDiary(newDiary);
                    console.log(newDiary.id)

                    header.setDiaryName(newDiary.name)
                    map.removeAllPlaces()
                    totalKm.setDiary(newDiary)

                    localStorage.setItem("current.diary.id", newDiary.id)
                } else if( Number.parseInt(id) === -2 ) {
                    const json = document.getElementById("dialog-diary-json").value
                    const data = new Data(this.db)
                    const diary = await data.import(json)

                    header.setDiaryName(diary.name)

                    const places = await this.db.getPlacesByDiaryId(diary.id)
                    map.removeAllPlaces()
                    places.forEach(place => {
                        map.setPlace(place, () => {
                            detail.showPlace(place)
                        })
                    })

                    diary.setPlaces(places)
                    totalKm.setDiary(diary)
                    localStorage.setItem("current.diary.id", diary.id)
                } else {
                    const diary = await this.db.getDiaryById(Number.parseInt(id))

                    header.setDiaryName(diary.name)

                    const places = await this.db.getPlacesByDiaryId(diary.id)
                    map.removeAllPlaces()
                    places.forEach(place => {
                        map.setPlace(place, () => {
                            detail.showPlace(place)
                        })
                    })

                    diary.setPlaces(places)
                    totalKm.setDiary(diary)
                    localStorage.setItem("current.diary.id", diary.id)
                }

                selectDiaryDialog.close()
            })

            selectDiaryDialog.open()
        })
    }
}