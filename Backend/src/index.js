const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001
const ENV = require("./environment");


// const PORT = process.env.PORT || 8001;
require('dotenv').config();
const db = require('./database/index')


const getBooks = require('./routes/books')(db);
app.use('/', getBooks);

const server = require('http').createServer(app);

// This displays message that the server running and listening to specified port
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });
