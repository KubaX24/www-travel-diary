export class Header {

    #element;

    /**
     * @param elementId {String}
     */
    constructor(elementId) {
        this.#element = document.getElementById(elementId);
    }

    setDiaryName(diaryName) {
        this.#element.getElementsByTagName('h1')[0].innerText = diaryName;
    }
}