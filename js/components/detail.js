export class Detail {

    #element

    /**
     * @param elementId {String}
     */
    constructor(elementId) {
        this.#element = document.getElementById(elementId)
    }

    /**
     * @param place {Place}
     */
    showPlace(place) {
        this.#element.innerText = ""

        const titleEl = document.createElement('h2')
        titleEl.innerText = place.name
        this.#element.appendChild(titleEl)

        const distanceEl = document.createElement('div')
        distanceEl.id = "tag"
        distanceEl.innerText = place.distanceKm + " km"
        this.#element.appendChild(distanceEl)

        const descriptionEl = document.createElement('p')
        descriptionEl.innerText = place.description
        this.#element.appendChild(descriptionEl)
    }

    showSelectPlaceText() {
        this.#element.innerText = "Select place on map to see details."
    }
}