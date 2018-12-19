var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors');

var RequestController = require('./controllers/RequestController');
var AccountController = require('./controllers/AccountController');

var app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var verifyAccessToken = (req, res, next) => {
    // console.log(req.headers);
    var token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, '17@HCB', (err, payload) => {
            if (err) {
                res.statusCode = 403;
                res.json({
                    msg: 'INVALID TOKEN',
                    error: err
                });
            } else {                
                req.token_payload = payload;
                next();
            }
        })
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'NO TOKEN FOUND'
        });
    }
}

app.use('/account', AccountController);
app.use('/request', verifyAccessToken, RequestController);

var port = process.env.port || 6300;
app.listen(port, () => {
    console.log(`api running on port ${port}`);
})