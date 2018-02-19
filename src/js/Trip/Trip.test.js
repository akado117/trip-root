import { cloneDeep } from 'lodash';
import Trip from './Trip';

describe('Trip Class', () => {
    let tripObj;
    beforeEach(() => {
        tripObj = new Trip('Brian');
    })
    describe('Constructor', () => {
        it('should set empty string to this.name if no string fed in', () => {
            const trip = new Trip()
            expect(trip.name).toBe('');
        })
        it('should set variable passed in as this.name', () => {
            const trip = new Trip('Some name')
            expect(trip.name).toBe('Some name');
        })
        it('should initialize trips Map', () => {
            const trip = new Trip()
            expect(trip.trips).toEqual(new Map());
        })
    });
    describe('addTrip', () => {
        const tripData = {
            startTime: "12:45",
            stopTime: "14:45",
            distance: 43,
        }
        it('should return false if any prop missing in tripObj passed in', () => {
            let tripClone = cloneDeep(tripData)
            delete tripClone.startTime;
            expect(tripObj.addTrip(tripClone)).toBe(false)
            tripClone = cloneDeep(tripData)
            delete tripClone.stopTime;
            expect(tripObj.addTrip(tripClone)).toBe(false)
            tripClone = cloneDeep(tripData)
            delete tripClone.distance;
            expect(tripObj.addTrip(tripClone)).toBe(false)
        })
        it('should set trip to map and pass back trip that was set if successful', () => {
            expect(tripObj.addTrip(tripData)).toEqual(tripData)
            expect(tripObj.addTrip(tripData)).not.toBe(tripData)
            expect(tripObj.trips.get(0)).toEqual(tripData)
        })
    })
})