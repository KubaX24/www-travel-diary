import {View} from "../view.js";
import {Detail}  from "../../components/detail.js";
import {Map}  from "../../components/map.js";
import {TotalKm} from "../../components/total-km.js";
import {Header} from "../../components/header.js";
import {AddPlace} from "../../components/add-place.js";
import {DiariesDialog} from "../../components/dialogs/diaries-dialog.js";
import {AddPlaceDialog} from "../../components/dialogs/add-place-dialog.js";

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

        addPlace.addPlaceListener(() => { map.addLocationMarker() })
        addPlace.addCancelListener(() => { map.removeLocationMarker() })

        addPlace.addOkListener(() => { new AddPlaceDialog(this.db, map, detail, totalKm).init() })
        header.setOnClickListener(async () => { await new DiariesDialog(this.db, header, map, detail, totalKm).init() })
    }
}