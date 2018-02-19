import Trip from '../trip/Trip';

const commandConstants = {
    DRIVER: 'driver',
    TRIP: 'trip',
};

export default class Main {
    constructor() {
        this.trips = new Map();
    }
    parseFileInput(inputString) {
        const splitCommands = inputString.split(/\r?\n/);

        const finalSplitCommands = splitCommands.map(command => command.split(' '));

        this.parsedInput = finalSplitCommands;

        return finalSplitCommands;
    }
    onDriveCommand(name) {
        this.trips.set(name, new Trip(name));
    }
}