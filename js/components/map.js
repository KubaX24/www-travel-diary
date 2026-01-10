export class Map {

    #element;
    #map;

    /**
     * @param elementId {String}
     * @param apiKey {String}
     * @param places {Array<Place>}
     */
    constructor(elementId, apiKey, places) {
        this.#element = document.getElementById(elementId)
        this.drawMap()

        places.forEach(value => {
            this.setPlace(value, () => {
                console.log("Test")
            })
        })
    }

    drawMap() {
        this.#map = new maplibregl.Map({
            container: this.#element.id,
            style: 'https://demotiles.maplibre.org/globe.json',
            center: [15.47, 49.80],
            zoom: 7
        })
    }

    /**
     * @param place {Place}
     * @param onClick {Function}
     */
    setPlace(place, onClick) {
        const marker = new maplibregl.Marker()
            .setLngLat(place.location)
            .addTo(this.#map)

        marker.getElement().addEventListener('click', onClick)
    }
}