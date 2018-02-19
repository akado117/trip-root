import Trip from './Trip';

describe('Trip Class', () => {
    describe('Constructor', () => {
        it('should set empty string to this.name if no string fed in', () => {
            const trip = new Trip()
            expect(trip.name).toBe('');
        })
    });
})