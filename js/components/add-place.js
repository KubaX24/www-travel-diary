export class AddPlace {

    #element;

    #addButton
    #okButton
    #cancelButton

    constructor(elementId) {
        this.#element = document.getElementById(elementId);

        this.#addButton = document.createElement('button')
        this.#addButton.innerHTML = '<i class="fa-solid fa-plus"></i> Přidat místo'
        this.#addButton.addEventListener('click', () => this.#hideAddButtonAndShowControl())
        this.#element.appendChild( this.#addButton)

        this.#okButton = document.createElement('button')
        this.#okButton.innerText = "OK"
        this.#okButton.addEventListener('click', () => this.#showAddButtonAndHideControl())
        this.#element.appendChild( this.#okButton)

        this.#cancelButton = document.createElement('button')
        this.#cancelButton.innerText = "Zrušit"
        this.#cancelButton.addEventListener('click', () => this.#showAddButtonAndHideControl())
        this.#element.appendChild( this.#cancelButton)

        this.#showAddButtonAndHideControl()
    }

    addPlaceListener(onClick) {
        this.#addButton.addEventListener('click', onClick)
    }

    addCancelListener(onClick) {
        this.#cancelButton.addEventListener('click', onClick)
    }

    addOkListener(onClick) {
        this.#okButton.addEventListener('click', onClick)
    }

    #hideAddButtonAndShowControl() {
        this.#addButton.style.display = "none"
        this.#okButton.style.display = "block"
        this.#cancelButton.style.display = "block"
    }

    #showAddButtonAndHideControl() {
        this.#addButton.style.display = "block"
        this.#okButton.style.display = "none"
        this.#cancelButton.style.display = "none"
    }
}