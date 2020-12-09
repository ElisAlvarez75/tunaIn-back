const { configSecurity } = require("./src/controllers/jwt");
require('dotenv').config();

const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const podcastRouter = require("./src/controllers/podcastController").podcastRouter;
const buildDataRouter = require('./src/controllers/data').buildRouter;
const trackRouter = require('./src/controllers/trackController').router;

const app = express();
const port = 3300;
app.use(require('easy-livereload')());
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(bodyParser.json());
app.use(morgan('dev'));
configSecurity(app);

app.use('/data', buildDataRouter());

app.use('/track', trackRouter);
app.use('/comment', podcastRouter());


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
