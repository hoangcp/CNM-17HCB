var express = require('express');
var requestModel = require('../Models/requestModel');

var router = express.Router();

router.post('/', (req, res) => {
    var str = {
        string: req.body.string
    }
    requestModel.get()
        .then(rows => {
            //console.log(rows);
            if (rows.recordset.length > 0) {
                res.json(rows.recordset[0]);
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