var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors');
    

var RequestController = require('./controllers/RequestController');
var AccountController = require('./controllers/AccountController');
var DriverController = require('./controllers/DriverController');

var app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var verifyAccessToken = (req, res, next) => {
    //console.log(req.headers);
    var token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, '17@HCB', (err, payload) => {
            if (err) {
                res.statusCode = 403;
                res.json({
                    msg: 'Hết phiên làm việc \r\nVui lòng đăng nhập lại',
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
            msg: 'Hết phiên làm việc \r\nVui lòng đăng nhập lại'
        });
    }
}

app.use('/account', AccountController);
app.use('/request', verifyAccessToken, RequestController);
app.use('/driver', verifyAccessToken, DriverController);

var port = process.env.port || 6300;
server = app.listen(port, () => {
    console.log(`api running on port ${port}`);
})

const io = require('socket.io')(server);
io.on('connection',(socket)=>{
    console.log('New user');
    socket.username = 'Anonymous'
    
    socket.on('change_username',(data) => {
        console.log(data)
        socket.username=data.username
    })
    socket.on('new_message',(data) => {
        socket.broadcast.emit('EVENT_NAME', data);
        console.log({message: data.message, username: socket.username});
    })
})