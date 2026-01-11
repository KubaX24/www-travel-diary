import {Constants} from "../constants.js";

export class Map {

    #element;
    #map;
    #locationMarker;
    #markers = [];

    #API_KEY = "hoWx1wjtgsv1EawbFPeJI8gkz83f3GQWUWEYyik2IW0"

    /**
     * @param elementId {String}
     * @param apiKey {String}
     */
    constructor(elementId) {
        this.#element = document.getElementById(elementId)
        this.drawMap()
    }

    drawMap() {
        this.#map = new maplibregl.Map({
            container: this.#element.id,
            style: {
                version: 8,
                sources: {
                    'basic-tiles': {
                        type: 'raster',
                        url: `https://api.mapy.com/v1/maptiles/basic/tiles.json?apikey=${this.#API_KEY}`,
                        tileSize: 512,
                    },
                },
                layers: [{
                    id: 'tiles',
                    type: 'raster',
                    source: 'basic-tiles',
                }],
            },
            center: [15.47, 49.80],
            zoom: 7
        })
    }

    /**
     * @param place {Place}
     * @param onClick {Function}
     */
    async setPlace(place, onClick) {
        const el = document.createElement('div')
        el.className = 'marker'
        el.style.backgroundImage = `url(imgs/pin.svg)`
        el.style.backgroundSize = "contain"
        el.style.backgroundRepeat = "no-repeat"
        el.style.width = `35px`
        el.style.height = `40px`

        const marker = new maplibregl.Marker({
            element: el,
            anchor: "bottom",
            offset: [0, 17]
        }).setLngLat(place.location).addTo(this.#map)

        marker.getElement().addEventListener('click', () => {
            for (let m of this.#markers) {
                m.getElement().style.backgroundImage = `url(imgs/pin.svg)`
            }

            el.style.backgroundImage = `url(imgs/pin-selected.svg)`
            onClick()
        })
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

        localStorage.setItem(Constants.LOCAL_STORAGE_LOCATION_LAT, cameraPosition.lat)
        localStorage.setItem(Constants.LOCAL_STORAGE_LOCATION_LNG, cameraPosition.lng)

        this.#locationMarker.on('dragend', () => {
            const lngLat = this.#locationMarker.getLngLat();

            localStorage.setItem(Constants.LOCAL_STORAGE_LOCATION_LAT, cameraPosition.lat)
            localStorage.setItem(Constants.LOCAL_STORAGE_LOCATION_LNG, cameraPosition.lng)
        });
    }

    removeLocationMarker() {
        if (this.#locationMarker !== undefined)
            this.#locationMarker.remove()
    }
}