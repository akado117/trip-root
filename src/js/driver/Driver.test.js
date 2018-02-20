import { cloneDeep } from 'lodash';
import Driver from './Driver';

describe('Driver Class', () => {
    let driverObj, tripData;
    beforeEach(() => {
        driverObj = new Driver('Brian');
        tripData = {
            startTime: "12:45",
            stopTime: "14:15",
            distance: 43,
        };
    });
    describe('Constructor', () => {
        it('should set empty string to this.name if no string fed in', () => {
            const driver = new Driver();
            expect(driver.name).toBe('');
        });
        it('should set variable passed in as this.name', () => {
            const driver = new Driver('Some name');
            expect(driver.name).toBe('Some name');
        });
        it('should initialize drivers Map', () => {
            const driver = new Driver();
            expect(driver.drivers).toEqual(new Map());
        });
        it('should initialize totalTravelDistance to 0', () => {
            const driver = new Driver();
            expect(driver.totalTravelDistance).toBe(0);
        });
    });
    describe('getName', () => {
        it('should return name contained within instantiated driver object', () => {
            const driver = new Driver('Some name');
            expect(driver.getName()).toBe('Some name');
        });
    });
    describe('addTrip', () => {
        it('should return false if any prop missing in tripObj passed in', () => {
            let tripClone = cloneDeep(tripData);
            delete tripClone.startTime;
            expect(driverObj.addTrip(tripClone)).toBe(false);
            tripClone = cloneDeep(tripData);
            delete tripClone.stopTime;
            expect(driverObj.addTrip(tripClone)).toBe(false);
            tripClone = cloneDeep(tripData);
            delete tripClone.distance;
            expect(driverObj.addTrip(tripClone)).toBe(false);
        });
        it('should set driver to map and pass back driver that was set if successful', () => {
            let tripClone = cloneDeep(tripData);
            tripClone.travelTime = 90;
            expect(driverObj.addTrip(tripData)).toEqual(tripClone);
            expect(driverObj.addTrip(tripData)).not.toBe(tripData);
            expect(driverObj.drivers.get(0)).toEqual(tripClone);
        });
        it('should added calculated time to travelTime prop before setting to drivers map', () => {
            let tripClone = cloneDeep(tripData);
            tripClone.travelTime = 90;
            expect(driverObj.addTrip(tripData)).toEqual(tripClone);
        });
        it('should convert string distances into numbers', () => {
            let tripClone = cloneDeep(tripData);
            tripClone.distance = '42';
            expect(driverObj.addTrip(tripClone).distance).toBe(42);
        });
    });
    describe('getTotalDistance', () => {
        it('should return total distance of drivers within driver object, and set it to this.totalTravelDistance', () => {
            driverObj.drivers = new Map([[0, tripData], [1, tripData]]);

            expect(driverObj.getTotalDistance()).toBe(86);
            expect(driverObj.totalTravelDistance).toBe(86);
        });
    });
    describe('getAverageSpeed', () => {
        let tripClone;
        beforeEach(() => {
            tripClone = cloneDeep(tripData);
            tripClone.travelTime = 90;
            driverObj.drivers = new Map([[0, tripClone], [1, tripClone]]);
        });
        it('should use internal totalTravelDistance if not passed in', () => {
            driverObj.totalTravelDistance = 180;

            expect(driverObj.getAverageSpeed()).toBe(60);
        });
        it('should use passed in totalTravelDistance when passed in', () => {
            expect(driverObj.getAverageSpeed(90)).toBe(30);
        });
    });
});