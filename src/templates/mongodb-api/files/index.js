
// load mongoose module to connect to MongoDB
var mongoose = require('mongoose');

// load app.js with express config
var app = require('./app');

// create variable with service's port
var port = 3800;

// tell mongoose to use Promises
mongoose.Promise = global.Promise;

// connect to database
mongoose.connect('mongodb://localhost:DBPORT/DBNAME', { useMongoClient: true })
  .then(() => {

    console.log("Connection to database was successfully completed")

    // CCreate the server with nodejs
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })

  .catch(err => console.log(err));