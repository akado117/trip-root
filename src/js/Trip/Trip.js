export default class Trip {
    constructor(name) {
        this.name = name || ""
        this.trips = new Map();
    }
}