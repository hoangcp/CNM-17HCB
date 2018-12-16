var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors');

var RequestController = require('./controllers/RequestController');

var app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs api'
    });
})

app.use('/request', RequestController);

var port = process.env.port || 6300;
app.listen(port, () => {
    console.log(`api running on port ${port}`);
})