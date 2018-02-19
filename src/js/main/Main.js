import Trip from '../driver/Driver';

const commandConstants = {
    DRIVER: 'driver',
    TRIP: 'driver',
};

export default class Main {
    constructor() {
        this.drivers = new Map();
    }
    parseFileInput(inputString) {
        const splitCommands = inputString.split(/\r?\n/);

        const finalSplitCommands = splitCommands.map(command => command.split(' '));

        this.parsedInput = finalSplitCommands;

        return finalSplitCommands;
    }
    onDriveCommand(name) {
        if (!this.drivers.get(name)) this.drivers.set(name, new Trip(name));
    }

    onTripCommand(name, startTime, stopTime, distance) {
        const driver = this.drivers.get(name);
        if (!driver) return false;
        const tripObj = {
            startTime,
            stopTime,
            distance,
        };

        driver.addTrip(tripObj);
        return tripObj;
    }
}