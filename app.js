const express = require('express')
const path = require('path');
const routes = require('./routes/api.js');
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.listen(port)