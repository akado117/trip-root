import differenceInMinutes from 'date-fns/difference_in_minutes'

export default class Trip {
    constructor(name) {
        this.name = name || ""
        this.trips = new Map();
    }
    addTrip(tripData) {
        const { startTime, stopTime, distance } = tripData;
        if (!startTime || !stopTime || !distance) return false

        const tripToSet = { startTime, stopTime, distance };
        tripToSet.travelTime = differenceInMinutes(`2 July 2014 ${stopTime}`, `2 July 2014 ${startTime}`);//using this util as in a real world case it'd likely be dates

        this.trips.set(this.trips.size, tripToSet);

        return tripToSet;
    }
}