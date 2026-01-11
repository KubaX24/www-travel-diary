import {Place} from "./entities/place.js";
import {Diary} from "./entities/diary.js";
import {Detail}  from "./components/detail.js";
import {Map}  from "./components/map.js";
import {TotalKm} from "./components/total-km.js";
import {Header} from "./components/header.js";

import {MyDB} from "./my-db.js";

const db = new MyDB();

const place = new Place([15.00, 49.70], "Test", "asdmaksd", 10.3, new Date("10-12-2025"), new Date("11-12-2025"));
const place2 = new Place([15.10, 49.50], "It is a test", "sd3fsd sd023023s dfsd023", 20.3, new Date("11-01-2025"), new Date("12-01-2025"));
const diary = new Diary("Testasd", "Ja", 1000)

const detail = new Detail("detail")
const map = new Map("map", "asd")
const totalKm = new TotalKm("km")
const header = new Header("header")

db.connect().then(async () => {
    // db.addDiary(diary).then(id => {
    //     db.addPlace(place, id)
    // })
    // db.addPlace(place2, 11)

    const diary = await db.getDiaryById(11)
    header.setDiaryName(diary.name)

    const places = await db.getPlacesByDiaryId(diary.id)
    places.forEach(place => {
        map.setPlace(place, () => {
            detail.showPlace(place)
        })
    })

    diary.setPlaces(places)
    totalKm.setDiary(diary)
});
