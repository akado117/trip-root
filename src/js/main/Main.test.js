import Main from './Main';
import Trip from '../driver/Driver';

jest.mock('../driver/Driver', () => {
    return jest.fn().mockImplementation(() => {
        return {};
        // Now we can track calls to playSoundFile
    });
});


describe('Main Class', () => {
    let main;
    beforeEach(() => {
        main = new Main();
        Trip.mockClear();
    });
    describe('constructor', () => {
        it('instantiating the class should initialize trips to be a map', () => {
            expect(main.trips).toEqual(new Map());
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
        it('should create a new instance of Driver with the passed in name and add it to trips map by its name', () => {
            main.onDriveCommand('spencer');
            expect(Trip).toHaveBeenCalledTimes(1);
            expect(Trip).toHaveBeenCalledWith('spencer');
        });
        it('should add created driver object to internal trips object', () => {
            main.onDriveCommand('spencer');
            expect(main.trips.size).toBe(1);
            main.onDriveCommand('bob');
            expect(main.trips.size).toBe(2);
        });
        it('added check to make sure onDriveCommand doesn\'t overwrite members that already exist', () => {
            main.onDriveCommand('spencer');
            const firstTrip = main.trips.get('spencer');
            main.onDriveCommand('spencer');
            expect(main.trips.get('spencer')).toBe(firstTrip);
        });
    });
});