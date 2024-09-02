const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

//Midelware
app.use(bodyParser.json());
app.use(cors());

require('./routs.js')(app);

const Port = 3000;
app.listen(Port, () => console.log("Server started listening on port" + Port));