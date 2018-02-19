import Trip from '../driver/Driver';

const commandConstants = {
    DRIVER: 'driver',
    TRIP: 'driver',
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
        if (!this.trips.get(name)) this.trips.set(name, new Trip(name));
    }
}