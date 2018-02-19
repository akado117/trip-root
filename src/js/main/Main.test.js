import Main from './Main';

describe('Main Class', () => {
    let main;
    beforeEach(() => {
        main = new Main();
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
    });
});