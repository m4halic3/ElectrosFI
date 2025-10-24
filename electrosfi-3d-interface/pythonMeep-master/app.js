var express = require('express');

const hostname = '127.0.0.1';
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin:'*'}));
app.use('/storage', express.static(__dirname + '/storage'));

app.use(routes);

app.listen(port, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});
