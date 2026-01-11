export class TotalKm {

    #diary;
    #element;

    /**
     * @param elementId {String}
     */
    constructor(elementId) {
        this.#element = document.getElementById(elementId);
    }

    /**
     * @param diary {Diary}
     */
    setDiary(diary) {
        this.#diary = diary;
        this.updateKm()
    }

    /**
     *  @param place {Place}
     */
    addPlace(place) {
        this.#diary.addPlace(place)
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

        let percentage = this.#diary.calcGoalPercentage()
        if (percentage > 100) percentage = 100

        this.#element.style.setProperty("--km-percentage",  percentage + "%")
        this.#element.innerHTML = elTemplate
    }

}