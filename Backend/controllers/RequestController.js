var express = require('express');
var requestModel = require('../Models/requestModel');

var router = express.Router();

router.post('/', (req, res) => {
    var par = {
        Fullname: req.body.Fullname,
        PhoneNumber: req.body.PhoneNumber,
        Address: req.body.Address,
        Note: req.body.Note
    }
    requestModel.insert(par)
        .then(value => {
            console.log(value);
            res.statusCode = 201;
            res.json({
                msg: 'request inserted queue'
            })
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})


router.post('/getlist', (req, res) => {
    var str = {
        string: req.body.string
    }
    requestModel.get()
        .then(rows => {
            //console.log(rows);
            if (rows.recordsets.length > 0) {
                res.json(rows.recordset);
            } else {
                res.statusCode = 204;
                res.end('NO DATA');
            }
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

module.exports = router;