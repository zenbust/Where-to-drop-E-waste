/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

use('mongodbVSCodePlaygroundDB');

db.createCollection('geodata');

db.geodata.insertOne({
  name: 'E-Waste Disposal Center',
  location: {
    type: 'Point',
    coordinates: [100.5018, 13.7563] // [longitude, latitude]
  }
});

db.geodata.createIndex({ location: '2dsphere' });

db.geodata.find({
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [100.5018, 13.7563] // [longitude, latitude]
      },
      $maxDistance: 5000 // Max distance in meters
    }
  }
});
