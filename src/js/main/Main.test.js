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
});