var express = require('express');
var jwt = require('jsonwebtoken');
var accountModel = require('../models/accountModel');

var router = express.Router();

router.post('/', (req, res) => {
    accountModel.add(req.body)
        .then(value => {
            //console.log(value);
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
                var account_info = rows.recordset[0];

                var payload = {
                    account: account_info                    
                }

                var acToken_expires = 14400; //second --> 4h
                var acToken = jwt.sign(payload, '17@HCB', {
                    expiresIn: acToken_expires
                });
                
                var rfToken = '';

                res.json({
                    auth: true,
                    account: account_info,
                    access_token: acToken,
                    access_token_expires: acToken_expires,
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

router.post('/updatesocket', (req, res) => {
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

router.post('/updatelocation', (req, res) => {
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

module.exports = router;