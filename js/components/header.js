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
        this.#element.getElementsByTagName('h1')[0].innerHTML = `<i class="fa-solid fa-book"></i> <p>${diaryName}</p>`;
    }

    setOnClickListener(onClick) {
        this.#element.getElementsByTagName('h1')[0].addEventListener('click', onClick)
    }
}