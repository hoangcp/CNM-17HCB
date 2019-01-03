var express = require('express');
var jwt = require('jsonwebtoken');
var accountModel = require('../models/accountModel');

var router = express.Router();

router.post('/updatesocket', (req, res) => {
    accountModel.updatesocket(req.body)
        .then(value => {
            res.statusCode = 200
            var result = {
                status: 0,
                message: 'Cập nhật socket không thành công'
            }
            if (value.rowsAffected > 0)
            {
                result = {
                    status: 1,
                    message: 'Cập nhật socket thành công'
                }
            }
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

router.post('/updatelocation', (req, res) => {
    accountModel.updatelocation(req.body)
        .then(value => {
            res.statusCode = 200
            var result = {
                status: 0,
                message: 'Cập nhật toạ độ không thành công'
            }
            if (value.rowsAffected > 0)
            {
                result = {
                    status: 1,
                    message: 'Cập nhật toạ độ thành công'
                }
            }
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

router.post('/updateisonline', (req, res) => {
    accountModel.updateisonline(req.body)
        .then(value => {
            res.statusCode = 200
            var result = {
                status: 0,
                message: 'Cập nhật tình trạng online thành công'
            }
            if (value.rowsAffected > 0)
            {
                result = {
                    status: 1,
                    message: 'Cập nhật tình trạng online thành công'
                }
            }
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

module.exports = router;