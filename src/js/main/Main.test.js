import Main from './Main';
import Trip from '../trip/Trip';

jest.mock('../trip/Trip', () => {
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
        const sampleInput = 'Driver Dan\nDriver Alex\nDriver Bob\nTrip Dan 07:15 07:45 17.3\nTrip Dan 06:12 06:32 21.8\n' +
            'Trip Alex 12:01 13:16 42.0';
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
        it('should create a new instance of Trip with the passed in name and add it to trips map by its name', () => {
            main.onDriveCommand('spencer');
            expect(Trip).toHaveBeenCalledTimes(1);
            expect(Trip).toHaveBeenCalledWith('spencer');
        });
    });
});