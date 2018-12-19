var express = require('express');
var jwt = require('jsonwebtoken');
var accountModel = require('../models/accountModel');

var router = express.Router();

router.post('/', (req, res) => {
    accountModel.add(req.body)
        .then(value => {
            console.log(value);
            res.statusCode = 201;
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

router.post('/login', (req, res) => {
    accountModel.login(req.body)
        .then(rows => {
            if (rows.recordset.length > 0) {
                var userEntity = rows.recordset[0];

                var payload = {
                    user: userEntity,
                    info: 'more info'
                }
                var acToken = jwt.sign(payload, '17@HCB', {
                    expiresIn: 600 // seconds
                });
                
                var rfToken = '';

                res.json({
                    auth: true,
                    user: userEntity,
                    access_token: acToken,
                    refresh_token: rfToken
                })
            } else {
                res.json({
                    auth: false,
                    message: 'Tên đăng nhập hoặc mật khẩu không chính xác'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

module.exports = router;