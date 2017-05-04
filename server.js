const uuidV4 = require('uuid/v4');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

// Serve static files from the `public` folder
app.use(express.static('public'));

//Accept URL encoded data in the body of the request. Crucial for your POST and PUT requests.
app.use(bodyParser.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api/bucketId', (req, res) => {

  // It would be worth your time at some point to read up on uuid/guid values.
  // Not complicated and common.
  const id = uuidV4();

  res.send({
    bucketId: id
  });
});

const itemRouter = require('./item-routes.js');
app.use(itemRouter);





// This allows Heroku to set the port.
const PORT = process.env.PORT || 5003;

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
