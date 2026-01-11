import {Dialog} from "../dialog.js";
import {Data} from "../../utils/data.js";
import {Diary} from "../../entities/diary.js";

export class DiariesDialog {

    #db;
    #header;
    #map;
    #detail;
    #totalKm;

    constructor(db, header, map, detail, totalKm) {
        this.#db = db;
        this.#header = header;
        this.#map = map;
        this.#detail = detail;
        this.#totalKm = totalKm;
    }

    async init() {
        const selectDiaryDialog = new Dialog("select-diary", "Select diary", this.dialogBody(await this.getDiaries()).innerHTML)

        selectDiaryDialog.addSubmitListener(async (id) => {
            switch (Number.parseInt(id)) {
                case -2: await this.onDiaryImported(); break;
                case -1: await this.opnDiaryCreated(); break;
                default: await this.onDiarySelected(id); break;
            }

            selectDiaryDialog.close()
        })

        selectDiaryDialog.open()
        this.showAndHideCreateAndImportLogic()
    }

    async getDiaries() {
        const diaries = await this.#db.getDiaries()
        for (const d of diaries) {
            d.setPlaces(await this.#db.getPlacesByDiaryId(d.id))
        }

        return diaries;
    }

    async opnDiaryCreated() {
        const newDiary = new Diary(
            document.getElementById("dialog-diary-name").value,
            document.getElementById("dialog-diary-author").value,
            document.getElementById("dialog-diary-goal-km").value
        )

        newDiary.id = await this.#db.addDiary(newDiary);

        await this.setDiary(newDiary)
    }

    async onDiaryImported() {
        const json = document.getElementById("dialog-diary-json").value
        const data = new Data(this.#db)
        const diary = await data.import(json)

        await this.setDiary(diary)
    }

    async onDiarySelected(id) {
        const diary = await this.#db.getDiaryById(Number.parseInt(id))
        await this.setDiary(diary)
    }

    /**
     * @param diary {Diary}
     */
    async setDiary(diary) {
        this.#header.setDiaryName(diary.name)

        const places = await this.#db.getPlacesByDiaryId(diary.id)
        this.#map.removeAllPlaces()
        places.forEach(place => {
            this.#map.setPlace(place, () => {
                this.#detail.showPlace(place)
            })
        })

        diary.setPlaces(places)
        this.#totalKm.setDiary(diary)
        this.#detail.showSelectPlaceText()

        localStorage.setItem("current.diary.id", diary.id)
    }


    /**
     * @param diaries {Diary[]}
     *
     * @returns {HTMLDivElement}
     */
    dialogBody(diaries) {
        let template = document.createElement('div')

        template.innerHTML = `
                <h3 id="show-create-diary"><i class="fa-solid fa-angle-right"></i> Create diary</h3>
                <form id="create-diary" style="display: none">
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
                
                <h3 id="show-import-diary"><i class="fa-solid fa-angle-right"></i> Import diary</h3>
                <form id="import-diary" style="display: none">
                    <div>
                        <label for="dialog-diary-json">JSON</label>
                        <textarea id="dialog-diary-json"></textarea>
                    </div>
                    <button type="button" data-select="-2" class="dialog-submit">Import</button>
                </form>
            `

        diaries.forEach(diary => {
            template.innerHTML += `
                <button class="dialog-submit dialog-diary-select" data-select="${diary.id}">
                    <div>
                        <h3>${diary.name}</h3>
                        <a href="${window.location.href}&page=export&diaryId=${diary.id}"><i class="fa-solid fa-file-export"></i></a>
                    </div> 
                    <div>
                        <p><i class="fa-solid fa-user"></i> ${diary.author}</p>
                    </div>
                    <div>
                        <p>${diary.calcTotalKM()} km</p>
                        <p>${diary.goalKm} km</p>
                    </div> 
                </button>`
        })

        return template
    }

    showAndHideCreateAndImportLogic() {
        document.getElementById("show-create-diary").addEventListener('click', () => {
            if (document.getElementById("create-diary").style.display === "none") {
                document.getElementById("create-diary").style.display = "flex";
                document.getElementById("show-create-diary").innerHTML = '<i class="fa-solid fa-angle-down"></i> Create diary'
            } else {
                document.getElementById("create-diary").style.display = "none";
                document.getElementById("show-create-diary").innerHTML = '<i class="fa-solid fa-angle-right"></i> Create diary'
            }
        })

        document.getElementById("show-import-diary").addEventListener('click', () => {
            if (document.getElementById("import-diary").style.display === "none") {
                document.getElementById("import-diary").style.display = "flex";
                document.getElementById("show-import-diary").innerHTML = '<i class="fa-solid fa-angle-down"></i> Import diary'
            } else {
                document.getElementById("import-diary").style.display = "none";
                document.getElementById("show-import-diary").innerHTML = '<i class="fa-solid fa-angle-right"></i> Import diary'
            }
        })
    }
}