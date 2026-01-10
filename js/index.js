import {Place} from "./entities/place.js";
import {Diary} from "./entities/diary.js";
import {Detail}  from "./components/detail.js";
import {Map}  from "./components/map.js";
import {TotalKm} from "./components/total-km.js";

const place = new Place(0, [15.00, 49.70], "Test", "asdmaksd", 10.3, new Date("10-12-2025"), new Date("11-12-2025"));
const diary = new Diary(0, "Test", "Ja", 1000)

const detail = new Detail("detail", place)
const map = new Map("map", "asd", [place])
const totalKm = new TotalKm("km", diary)