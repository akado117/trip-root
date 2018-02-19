export default class Trip {
    constructor(name) {
        this.name = name || ""
        this.trips = new Map();
    }
    addTrip(tripData) {
        const { startTime, stopTime, distance } = tripData;
        if (!startTime || !stopTime || !distance) return false
    }
}