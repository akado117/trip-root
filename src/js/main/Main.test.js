import { cloneDeep } from 'lodash';
import Main from './Main';
import Trip from '../driver/Driver';
const mockAddTrip = jest.fn();
const mockGetTotalDistance = jest.fn().mockReturnValue(25);
const mockGetAverageSpeed = jest.fn().mockReturnValue(60);

jest.mock('../driver/Driver', () => {
    return jest.fn().mockImplementation(() => {
        return {
            addTrip: mockAddTrip,
            getTotalDistance: mockGetTotalDistance,
            getAverageSpeed: mockGetAverageSpeed,
        };
        // Now we can track calls to playSoundFile
    });
});


describe('Main Class', () => {
    let main;
    beforeEach(() => {
        main = new Main();
        Trip.mockClear();
        mockAddTrip.mockClear();
        mockGetTotalDistance.mockClear();
        mockGetAverageSpeed.mockClear();
    });
    describe('constructor', () => {
        it('instantiating the class should initialize drivers to be a map', () => {
            expect(main.drivers).toEqual(new Map());
        });
    });
    describe('parseFileInput', () => {
        const sampleInput = 'Driver Dan\nDriver Alex\nDriver Bob\nDriver Dan 07:15 07:45 17.3\nDriver Dan 06:12 06:32 21.8\n' +
            'Driver Alex 12:01 13:16 42.0';
        it('should parse input so each new line is a new string in an array and set it to internal state', () => {
            expect(main.parseFileInput(sampleInput).length).toBe(6);
            expect(main.parsedInput.length).toBe(6);
        });
        it('should parse each line of commands into an array of values', () => {
            expect(main.parseFileInput(sampleInput)[0].length).toBe(2);
            expect(main.parseFileInput(sampleInput)[4].length).toBe(5);
            expect(main.parsedInput.length).toBe(6);
        });
    });
    describe('onDriveCommand', () => {
        it('should create a new instance of Driver with the passed in name and add it to drivers map by its name', () => {
            main.onDriveCommand('spencer');
            expect(Trip).toHaveBeenCalledTimes(1);
            expect(Trip).toHaveBeenCalledWith('spencer');
        });
        it('should add created driver object to internal drivers object', () => {
            main.onDriveCommand('spencer');
            expect(main.drivers.size).toBe(1);
            main.onDriveCommand('bob');
            expect(main.drivers.size).toBe(2);
        });
        it('added check to make sure onDriveCommand doesn\'t overwrite members that already exist', () => {
            main.onDriveCommand('spencer');
            const firstTrip = main.drivers.get('spencer');
            main.onDriveCommand('spencer');
            expect(main.drivers.get('spencer')).toBe(firstTrip);
        });
    });
    describe('onTripCommand', () => {
        it('should return false if driver doesn\'t exist then ', () => {
            expect(main.onTripCommand('john', 'doe', 'tho', 'beu')).toBe(false);
        });
        it('should call add trip on driver object with data passed in', () => {
            const fakeData = {
                startTime: 'bob',
                stopTime: 'the',
                distance: 'builder',
            };
            main.drivers.set('bob', new Trip('bob'));
            expect(main.onTripCommand('bob', fakeData.startTime, fakeData.stopTime, fakeData.distance)).toEqual(fakeData);
            expect(mockAddTrip).toHaveBeenCalledWith(fakeData);
            expect(main.onTripCommand('bob', fakeData.startTime, fakeData.stopTime, fakeData.distance)).toEqual(fakeData);
            expect(mockAddTrip).toHaveBeenCalledTimes(2);
        });
    });
    describe('getDriverAverages', () => {
        it('should call getTotalDistance and getDriverAverages on each driver in drivers', () => {
            const expectedOutput = [{
                name: 'ben',
                totalDistance: 25,
                averageSpeed: 60,
            },{
                name: 'bob',
                totalDistance: 25,
                averageSpeed: 60,
            }];
            main.drivers = new Map([['ben', new Trip()], ['bob', new Trip()]]);

            expect(main.getDriverAverages()).toEqual(expectedOutput);

            expect(mockGetTotalDistance).toHaveBeenCalledTimes(2);
            expect(mockGetAverageSpeed.mock.calls[0][0]).toBe(25);
            expect(mockGetAverageSpeed.mock.calls[1][0]).toBe(25);
        });
    });
    describe('parseTripAveragesToString', () => {
        const input = [{
            name: 'ben',
            totalDistance: 14,
            averageSpeed: 30,
        },{
            name: 'bob',
            totalDistance: 25,
            averageSpeed: 60,
        }];
        it('should return "No drivers found" if there are no driverAverage objects passed in', () => {
            expect(main.parseDriverAveragesToString()).toBe('No drivers found');
            expect(main.parseDriverAveragesToString('adasdasd')).toBe('No drivers found');
            expect(main.parseDriverAveragesToString([])).toBe('No drivers found');
        });
        it('should return string with new lines for each driverAverage object it parses', () => {

            const parsedOutput = main.parseDriverAveragesToString(input);

            expect(parsedOutput.split('\n').length).toBe(2);
            expect(parsedOutput).toBe('ben: 14 miles @ 30 mph\nbob: 25 miles @ 60 mph');
        });
        it('should handle when there is no distance or speed', () => {
            const clonedInput = cloneDeep(input);
            clonedInput[0].totalDistance = 0;
            const parsedOutput = main.parseDriverAveragesToString(clonedInput);
            expect(parsedOutput).toBe('ben: 0 miles\nbob: 25 miles @ 60 mph');
        });
    });
    describe('applyCommandsArray', () => {
        beforeEach(() => {
            main.onDriveCommand = jest.fn();
            main.onTripCommand = jest.fn();
        });
        it('should not call any commands if the commands fed in don\'t exist', () => {
            main.applyCommandsArray([]);
            main.applyCommandsArray([['any', 'value']]);

            expect(main.onDriveCommand).toHaveBeenCalledTimes(0);
            expect(main.onTripCommand).toHaveBeenCalledTimes(0);
        });
        it('should call onTripCommand for any commands that contain the trip command', () => {
            const input = [['trip', 'dan', 'davito', 'is', 'sunny']];
            main.applyCommandsArray(input);

            for (let i = 0; i < 4; i++) {
                expect(main.onTripCommand.mock.calls[0][i]).toBe(input[0][i + 1]);
            }
        });
        it('should call onTripCommand for any commands that contain the trip command even if case is different', () => {
            const input = [['tRiP', 'dan', 'davito', 'is', 'sunny']];
            main.applyCommandsArray(input);

            for (let i = 0; i < 4; i++) {
                expect(main.onTripCommand.mock.calls[0][i]).toBe(input[0][i + 1]);
            }
        });
        it('should call onDriveCommand for any commands that contain the driver command', () => {
            const input = [['driver', 'dan']];
            main.applyCommandsArray(input);

            expect(main.onDriveCommand.mock.calls[0][0]).toBe(input[0][1]);
        });
        it('should call onDriveCommand for any commands that contain the driver command even if case is different', () => {
            const input = [['Driver', 'dan']];
            main.applyCommandsArray(input);

            expect(main.onDriveCommand.mock.calls[0][0]).toBe(input[0][1]);
        });
    });
    describe('main', () => {
        beforeEach(() => {
            main.parseFileInput = jest.fn().mockReturnValue('parsed File');
            main.applyCommandsArray = jest.fn();
            main.getDriverAverages = jest.fn().mockReturnValue(['driver', 'averages']);
            main.parseDriverAveragesToString = jest.fn();
        });
        it('should call all internal commands needed to run program', () => {
            main.main('hot sauce');
            expect(main.parseFileInput).toHaveBeenCalledWith('hot sauce');
            expect(main.applyCommandsArray).toHaveBeenCalledWith('parsed File');
            expect(main.getDriverAverages).toHaveBeenCalledTimes(1);
            expect(main.parseDriverAveragesToString).toHaveBeenCalledWith(['driver', 'averages']);
        });
    });
});