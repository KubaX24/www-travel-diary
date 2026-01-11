export class Header {

    #element;

    /**
     * @param elementId {String}
     */
    constructor(elementId) {
        this.#element = document.getElementById(elementId);
    }

    /**
     * @param diaryName {String}
     */
    setDiaryName(diaryName) {
        this.#element.getElementsByTagName('h1')[0].innerText = diaryName;
    }

    setOnClickListener(onClick) {
        this.#element.addEventListener('click', onClick)
    }
}