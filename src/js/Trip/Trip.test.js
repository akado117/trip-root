import Trip from './Trip';

describe('Trip Class', () => {
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
})