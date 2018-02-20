import differenceInMinutes from 'date-fns/difference_in_minutes';

export default class Driver {
    constructor(name) {
        this.name = name || '';
        this.drivers = new Map();
        this.totalTravelDistance = 0;
    }
    getName() {
        return this.name;
    }
    addTrip(tripData) {
        const { startTime, stopTime, distance } = tripData;
        if (!startTime || !stopTime || !distance) return false;

        const tripToSet = { startTime, stopTime, distance: parseFloat(distance) };
        tripToSet.travelTime = differenceInMinutes(`2 July 2014 ${stopTime}`, `2 July 2014 ${startTime}`);//using this util as in a real world case it'd likely be dates

        this.drivers.set(this.drivers.size, tripToSet);

        return tripToSet;
    }
    getTotalDistance() {
        let totalDistance = 0;
        this.drivers.forEach((tripObj) => {
            totalDistance += tripObj.distance; //distance should never be undefined because we make sure it exists before adding to this.drivers
        })

        this.totalTravelDistance = totalDistance;

        return totalDistance;
    }

    getAverageSpeed(totalTravelDistance) {
        let totalTime = 0;
        this.drivers.forEach((tripObj) => {
            totalTime += tripObj.travelTime || 0;
        });

        totalTime /= 60; //convert to hours

        return (totalTravelDistance || this.totalTravelDistance) / totalTime;
    }
}