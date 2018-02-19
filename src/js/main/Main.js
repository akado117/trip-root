export default class Main {
    constructor() {
        this.trips = new Map();
    }
    parseFileInput(inputString) {
        const splitCommands = inputString.split(/\r?\n/);

        this.parsedInput = splitCommands;

        return splitCommands;
    }
}