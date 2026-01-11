import {Place} from "../entities/place.js";
import {Diary} from "../entities/diary.js";
import {Constants} from "../constants.js";

export class MyDB {

    #dbVersion = 1;
    #osDiary = 'Diary';
    #osPlace = 'Place';
    #db;

    #DB_NAME = 'travel-diary'

    connect() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.#DB_NAME, this.#dbVersion);
            let firstTimeLaunch = false

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if(event.oldVersion < 1) {
                    const osDiary = db.createObjectStore(this.#osDiary, {keyPath: 'id', autoIncrement: true});
                    osDiary.createIndex('nameInd', 'name')

                    const osPlace = db.createObjectStore(this.#osPlace, {keyPath: 'id', autoIncrement: true});
                    osPlace.createIndex('diaryInd', 'diary')

                    firstTimeLaunch = true;
                }
            }

            request.onsuccess = async (event) => {
                this.#db = event.target.result;

                if(firstTimeLaunch) {
                    const defaultDiary = new Diary("Default", "Generated", 100);
                    const defaultDiaryId = await this.addDiary(defaultDiary)
                    localStorage.setItem(Constants.LOCAL_STORAGE_CURRENT_DIARY_ID, defaultDiaryId.toString())
                }

                resolve();
            }
        })
    }

    /**
     * @param diary {Diary}
     *
     * @returns {Promise<Number>} Number of added diary
     */
    addDiary(diary) {
        return new Promise((resolve, reject) => {
            const transaction = this.#db.transaction([this.#osDiary], 'readwrite');

            transaction.onerror = (event) => {
                console.error("Add diary error - " + event.target.errorCode);
            }

            const os = transaction.objectStore(this.#osDiary);
            const query = os.add({
                'name': diary.name,
                'author': diary.author,
                'goalKm': diary.goalKm
            })

            query.onsuccess = (event) => {
                resolve(event.target.result)
            };
        })
    }

    /**
     * @param place {Place}
     * @param diaryId {Number}
     */
    addPlace(place, diaryId) {
        const transaction = this.#db.transaction([this.#osPlace], 'readwrite');

        transaction.onerror = (event) => {
            console.error("Add place error - " + event.target.errorCode);
        }

        const os = transaction.objectStore(this.#osPlace);
        os.add({
            'diary': diaryId,
            'location': place.location,
            'name': place.name,
            'description': place.description,
            'distanceKm': place.distanceKm,
            'startDate': place.dateStart,
            'endDate': place.dateEnd
        });
    }

    /**
     * @returns {Promise<Array<Diary>>}
     */
    getDiaries() {
        return new Promise((resolve, reject) => {
            const transaction = this.#db.transaction([this.#osDiary], 'readonly');

            transaction.onerror = (event) => {
                console.error("Get diaries error - " + event.target.errorCode);
            }

            const os = transaction.objectStore(this.#osDiary);
            os.getAll().onsuccess = (event) => {
                const result = event.target.result;
                const diary = result.map(value => new Diary(value.name, value.author, value.goalKm, value.id));

                resolve(diary);
            }
        })
    }

    /**
     * @param id {Number}
     *
     * @returns {Promise<Diary>}
     */
    getDiaryById(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.#db.transaction([this.#osDiary], 'readonly');

            transaction.onerror = (event) => {
                console.error("Get diary by id error - " + event.target.errorCode);
            }

            const os = transaction.objectStore(this.#osDiary);
            os.get(id).onsuccess = (event) => {
                const result = event.target.result;

                try {
                    const diary = new Diary(result.name, result.author, result.goalKm, result.id);
                    resolve(diary);
                } catch (e) {
                    reject(e);
                }
            }
        })
    }


    /**
     * @param diaryId {Number}
     *
     * @returns {Promise<Array<Place>>}
     */
    getPlacesByDiaryId(diaryId) {
        return new Promise((resolve, reject) => {
            const transaction = this.#db.transaction([this.#osPlace], 'readonly');

            transaction.onerror = (event) => {
                console.error("Get places error - " + event.target.errorCode);
            }

            const os = transaction.objectStore(this.#osPlace).index('diaryInd');
            os.getAll(diaryId).onsuccess = (event) => {
                const result = event.target.result;
                const places = result.map(value => new Place(value.location, value.name, value.description, value.distanceKm, value.startDate, value.endDate, value.id));

                resolve(places);
            }
        })
    }
}
