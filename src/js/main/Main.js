import Trip from '../driver/Driver';

const commandConstants = {
    DRIVER: 'driver',
    TRIP: 'trip',
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
    getDriverAverages() {
        const driverAverages = [];
        this.drivers.forEach((driver, key) => {
            const totalDistance = driver.getTotalDistance();
            const averageSpeed = driver.getAverageSpeed(totalDistance);

            driverAverages.push({
                name: key,
                totalDistance,
                averageSpeed,
            });
        });
        return driverAverages.length ? driverAverages : false;
    }
    parseDriverAveragesToString(driverAverages) {
        if (typeof driverAverages !== 'object' || !driverAverages.length) return 'No drivers found';
        let driverAveragesString = '';

        driverAverages.forEach((driverAverage, idx) => {
            const { name, totalDistance, averageSpeed } = driverAverage;
            driverAveragesString += `${name}: ${totalDistance} mile @ ${averageSpeed} mph${idx < driverAverages.length - 1 ? '\n' : ''}`;
        });

        return driverAveragesString;
    }
    applyCommandsArray(commandArray) {
        commandArray.forEach((command) => {
            if (command[0] === commandConstants.TRIP) {
                this.onTripCommand(command[1], command[2], command[3], command[4]);
            }
            if (command[0] === commandConstants.DRIVER) {
                this.onDriveCommand(command[1]);
            }
        });
    }
}