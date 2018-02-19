import { cloneDeep } from 'lodash';
import Trip from './Trip';

describe('Trip Class', () => {
    let tripObj, tripData;
    beforeEach(() => {
        tripObj = new Trip('Brian');
        tripData = {
            startTime: "12:45",
            stopTime: "14:15",
            distance: 43,
        };
    })
    describe('Constructor', () => {
        it('should set empty string to this.name if no string fed in', () => {
            const trip = new Trip();
            expect(trip.name).toBe('');
        });
        it('should set variable passed in as this.name', () => {
            const trip = new Trip('Some name');
            expect(trip.name).toBe('Some name');
        });
        it('should initialize trips Map', () => {
            const trip = new Trip();
            expect(trip.trips).toEqual(new Map());
        });
        it('should initialize totalTravelDistance to 0', () => {
            const trip = new Trip();
            expect(trip.totalTravelDistance).toBe(0);
        });
    });
    describe('getName', () => {
        it('should return name contained within instantiated Trip object', () => {
            const trip = new Trip('Some name');
            expect(trip.getName()).toBe('Some name');
        });
    });
    describe('addTrip', () => {
        it('should return false if any prop missing in tripObj passed in', () => {
            let tripClone = cloneDeep(tripData);
            delete tripClone.startTime;
            expect(tripObj.addTrip(tripClone)).toBe(false);
            tripClone = cloneDeep(tripData)
            delete tripClone.stopTime;
            expect(tripObj.addTrip(tripClone)).toBe(false);
            tripClone = cloneDeep(tripData);
            delete tripClone.distance;
            expect(tripObj.addTrip(tripClone)).toBe(false);
        });
        it('should set trip to map and pass back trip that was set if successful', () => {
            let tripClone = cloneDeep(tripData);
            tripClone.travelTime = 90;
            expect(tripObj.addTrip(tripData)).toEqual(tripClone);
            expect(tripObj.addTrip(tripData)).not.toBe(tripData);
            expect(tripObj.trips.get(0)).toEqual(tripClone);
        });
        it('should added calculated time to travelTime prop before setting to trips map', () => {
            let tripClone = cloneDeep(tripData);
            tripClone.travelTime = 90;
            expect(tripObj.addTrip(tripData)).toEqual(tripClone);
        });
    })
    describe('getTotalDistance', () => {
        it('should return total distance of trips within Trip object, and set it to this.totalTravelDistance', () => {
            tripObj.trips = new Map([[0, tripData], [1, tripData]]);

            expect(tripObj.getTotalDistance()).toBe(86);
            expect(tripObj.totalTravelDistance).toBe(86);
        });
    });
    describe('getAverageSpeed', () => {
        let tripClone
        beforeEach(() => {
            tripClone = cloneDeep(tripData);
            tripClone.travelTime = 90;
            tripObj.trips = new Map([[0, tripClone], [1, tripClone]]);
        });
        it('should use internal totalTravelDistance if not passed in', () => {
            tripObj.totalTravelDistance = 180

            expect(tripObj.getAverageSpeed()).toBe(60);
        });
        it('should use passed in totalTravelDistance when passed in', () => {
            expect(tripObj.getAverageSpeed(90)).toBe(30);
        });
    });
});