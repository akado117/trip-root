# Node Trip Aggregator

### General Architecture
1. No database or service calls. All data will be stored in memory. Trip class contains driver name, and an array of trips user has taken. Also contains functions to return average speed and total miles driven
2. File IO handled with npm package fs. Assumed to be using input files small enough to be handled in memory.
3. A main class will be used to house functionality performed on multiple trip objects.
4. Webpack used to transpile class code into a npm package. 
5. A non-transpiled file will be used to consume transpiled npm package and expose to node command line
6. Jest is used in a TDD methodology to build out this project.
7. Project has very minor type checking. Typescript can aid in javascripts lack of typing, but tests/variable names/ and readme are fairly clear on types expected.
8. Majority of class structure laid out in README before implementation began.

### Driver Class Outline
* name - Name of trip owner
* trips - Map of trip objects (in order of read, but if there was some better index available to store by. Store by said index for easier referencing)
  * tripObjects - startTime, stopTime, distance, travelTime (calculated when added)
* addTrip - adds tripObject to this.trips map
* constructor - Sets name fed in to this.Name
* getName - Gets this.name
* getTotalDistance - Iterates through trips to get total distance travelled
* getAverageSpeed - Takes optional totalDistance (so if its already been calculated no need to calculate again), and iterates through trips to get total time on the road. Then distance/time gives average speed

### Main Class Outline
* trips - A map of trip objects keyed by Trip owner name (this.trips)
* parseFileInput - Parses through string returned from file read in
* onDriveCommand - Creates new Trip and adds to internal Map, keyed by name
* onTripCommand - Returns false if Trip owner isn't in map, otherwise sets Trip entry within Trip Object (this means any trip commands without a valid owner are discarded)
* getDriverAverages - Returns array of driverAverage objects (name, totalDistance, averageSpeed) based upon trips within this.drivers
* parseDriverAveragesToString - Returns a string based upon the tripAverage objects fed into it.
* applyCommandsArray - Takes parsedFileInput and runs calls mains functions based on commands in the array 

### Scripts and Running
Built using node version v8.9.4 and npm version 5.6.0
* `runDriverCommands` - Runs command line program. Follow onscreen prompt to enter file path and press enter. Then watch the magic!
* `npm install` - Installs needed dependencies for commands other than `runDriverCommands` to work 
* `test` - Runs any tests within any files that have .test in their name. Will continue to watch files for updates and will rerun any tests that would be impacted by these changes.
* `buildCMD` - Used to transpile main.js and its dependencies into a single npm package that can be consumed by a command line utility for node.
* `buildAndRun` - Runs both `buildCMD` then `runDriverCommands` in one simple script. Used when making code changes and running a final test. 