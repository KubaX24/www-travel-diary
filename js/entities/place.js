export class Place {

    id;
    location;
    name;
    description;
    distanceKm;
    dateStart;
    dateEnd;

    constructor(id, location, name, description, distanceKm, dateStart, dateEnd) {
        this.id = id;
        this.location = location;
        this.name = name;
        this.description = description;
        this.distanceKm = distanceKm;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    getLat() {
        return this.location[0];
    }

    getLng() {
        return this.location[1];
    }
}