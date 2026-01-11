export class Diary {

    id;
    name;
    author;
    goalKm;

    #places;

    constructor(name, author, goalKm, id) {
        this.name = name;
        this.author = author;
        this.goalKm = goalKm;
        this.id = id;
    }

    /**
     * @param places {Array<Place>}
     */
    setPlaces(places) {
        this.#places = places;
    }

    calcTotalKM() {
        return this.#places.reduce((accumulator, value) => accumulator + value.distanceKm, 0)
    }

    placesCount() {
        return this.#places.length
    }

    calcGoalPercentage() {
        return (this.calcTotalKM() / this.goalKm) * 100
    }
}