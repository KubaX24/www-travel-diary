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

        const chips = document.createElement('div')
        chips.id = "chips"

        const distanceEl = document.createElement('div')
        distanceEl.classList.add('chip')
        distanceEl.innerHTML = '<i class="fa-solid fa-person-walking"></i><p>' + place.distanceKm + ' km</p>'
        chips.appendChild(distanceEl)

        const timeEl = document.createElement('div')
        timeEl.classList.add('chip')
        timeEl.innerHTML = '<i class="fa-solid fa-calendar"></i><p>' + this.#dateFormat(place.dateStart) + ' - ' + this.#dateFormat(place.dateEnd) + '</p>'
        chips.appendChild(timeEl)

        this.#element.appendChild(chips)

        const descriptionEl = document.createElement('p')
        descriptionEl.innerText = place.description
        this.#element.appendChild(descriptionEl)
    }

    showSelectPlaceText() {
        this.#element.innerText = "Vyberte bod na mapě pro zobraezní detailů."
    }

    /**
     *
     * @param stringDate {String}
     * @returns {String}
     */
    #dateFormat(stringDate) {
        return new Date(stringDate).toLocaleDateString('cs-CZ', {year: 'numeric', month: 'numeric', day: 'numeric'})
    }
}