export class Map {

    #element;
    #map;
    #locationMarker;
    #markers = [];

    /**
     * @param elementId {String}
     * @param apiKey {String}
     */
    constructor(elementId, apiKey) {
        this.#element = document.getElementById(elementId)
        this.drawMap()
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
        this.#markers.push(marker)
    }
    
    removeAllPlaces() {
        this.#markers.forEach(marker => marker.remove())
        this.#markers = []
    }

    addLocationMarker() {
        const cameraPosition = this.#map.getCenter()

        this.#locationMarker = new maplibregl.Marker({draggable: true})
            .setLngLat([cameraPosition.lng, cameraPosition.lat])
            .addTo(this.#map);

        localStorage.setItem("location.lat", cameraPosition.lat)
        localStorage.setItem("location.lng", cameraPosition.lng)

        this.#locationMarker.on('dragend', () => {
            const lngLat = this.#locationMarker.getLngLat();

            localStorage.setItem("location.lat", lngLat.lat)
            localStorage.setItem("location.lng", lngLat.lng)
        });
    }

    removeLocationMarker() {
        if (this.#locationMarker !== undefined)
            this.#locationMarker.remove()
    }
}