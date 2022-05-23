const express = require('express')
const path = require('path');
const routes = require('./routes/api.js');
const port = process.env.PORT || 3000;
const cors = require('cors');
const promMid = require('express-prometheus-middleware');
// const bodyParser = require('body-parser');

const app = express();
app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
  if (!req.headers.authorization | req.headers.authorization !== 'mysecrettoken') {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  next();
});
app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

app.use('/', routes);

app.listen(port)