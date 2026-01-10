export class Diary {

    id;
    name;
    author;
    goalKm;

    constructor(id, name, author, goalKm) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.goalKm = goalKm;
    }

    calcTotalKM() {
        return 0
    }

    placesCount() {
        return 0
    }

    calcGoalPercentage() {
        return 50
    }
}