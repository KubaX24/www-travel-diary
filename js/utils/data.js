import {Diary} from "../entities/diary.js";
import {Place} from "../entities/place.js";

export class Data {

    #db;

    constructor(db) {
        this.#db = db;
    }

    /**
     *
     * @param diaryId {Number}
     * @returns {Promise<string>} JSON
     */
    async export(diaryId) {
        const diary = await this.#db.getDiaryById(diaryId);
        const places = await this.#db.getPlacesByDiaryId(diaryId);

        return JSON.stringify({diary, places});
    }

    /**
     * @param json {String}
     * @returns {Promise<Diary>}
     */
    async import(json) {
        const data = JSON.parse(json);

        const diary = new Diary(data.diary.name, data.diary.author, data.diary.goalKm);
        diary.id = await this.#db.addDiary(diary);

        data.places.forEach(place => {
            this.#db.addPlace(new Place(place.location, place.name, place.description, place.distanceKm, place.dateStart, place.dateEnd), diary.id)
        })

        return diary;
    }
}