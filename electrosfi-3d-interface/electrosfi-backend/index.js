const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const app = express();
const materials = require('./routes/materials');
const simulations = require('./routes/simulations');
const simulations3d = require('./routes/simulations3d');
const mongoose = require('mongoose');
require('dotenv/config');

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1024 * 1024 * 50 }));
//app.use(bodyParser.json({limit: '100gb', extended: false}))
//app.use(bodyParser.urlencoded({limit: '100mb', extended: false}))

app.use('/simulations', simulations);
app.use('/simulations3d', simulations3d);
app.use('/materials', materials);
app.use('/', (req, res) => {
    res.send('Go to materials or simulations');
})

mongoose.connect("" + process.env.DB_CONNECTION + "",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (error) => {
        console.log(error);
    });
app.listen(process.env.PORT || 3000);
