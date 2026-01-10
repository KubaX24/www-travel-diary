export class TotalKm {

    #diary;
    #element;

    constructor(elementId, diary) {
        this.#element = document.getElementById(elementId);
        this.#diary = diary;

        this.updateKm()
    }

    /**
     * @param diary {Diary}
     */
    setDiary(diary) {
        this.#diary = diary;
        this.updateKm()
    }

    updateKm() {
        const elTemplate = `
            <div id="km-info">
                <i class="fa-solid fa-person-walking"></i>
                <div id="km-progress">
                    <h3>${this.#diary.calcTotalKM()} km</h3>
                    <div id="km-progress-bar"></div>
                </div>
            </div>
            <div id="km-goal">${this.#diary.goalKm} km</div>
        `

        this.#element.style.setProperty("--km-percentage", this.#diary.calcGoalPercentage())
        this.#element.innerHTML = elTemplate
    }

}