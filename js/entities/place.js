export class Place {

    id;
    location;
    name;
    description;
    distanceKm;
    dateStart;
    dateEnd;

    constructor(location, name, description, distanceKm, dateStart, dateEnd, id) {
        this.location = location;
        this.name = name;
        this.description = description;
        this.distanceKm = distanceKm;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.id = id;
    }

    getLat() {
        return this.location[0];
    }

    getLng() {
        return this.location[1];
    }
}