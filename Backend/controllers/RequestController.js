var express = require('express');
var requestModel = require('../Models/requestModel');
var Geocoder = require('../fn/Geocoder');
var NodeGeocoder = require('node-geocoder');
var router = express.Router();

router.post('/', (req, res) => {
    Geocoder.geocode(req.body.Address)
        .then(GeoAddress => {
            var par = {
                Fullname: req.body.Fullname,
                PhoneNumber: req.body.PhoneNumber,
                Address: req.body.Address,
                Note: req.body.Note,
                formattedAddress: GeoAddress.formattedAddress,
                Latitude: GeoAddress.latitude,
                Longitude: GeoAddress.longitude,
            }  

            requestModel.insert(par)
                .then(value => {
                    //console.log(value);
                    res.statusCode = 201;
                    res.json({
                        msg: 'Yêu cầu đã được thêm vào danh sách'
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.statusCode = 500;
                    res.end('View error log on server console');
                })
        })
        .catch(err => {
            console.log(err);           
        })    
})

router.post('/getlist', (req, res) => {
    var current = "2018-12-01 00:00:00";
    if (req.body.current) {
        current = req.body.current;
    }

    var loop = 0;
    var fn = () => {
        requestModel.getList(current)
            .then(rows => {                
                if (rows.recordset.length > 0) {
                    res.json(rows.recordset);
                } else {
                    loop++;      
                    console.log(loop);              
                    if (loop < 10) {
                        setTimeout(fn, 3000);
                    } else {
                        res.statusCode = 204;
                        res.end('no data');
                    }
                }
            })
            .catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end('View error log on server console');
            })
    }

    fn();    
})

router.post('/getID', (req, res) => {
    var par = {
        id: req.body.id
    }
    requestModel.getID(par)
        .then(rows => {
            //console.log(rows);
            if (rows.recordset.length > 0) {
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

router.post('/updatelatlng', (req, res) => {
    var par = {        
        Latitude: req.body.latitude,
        Longitude: req.body.longitude,
        updateby: req.body.updateby,
        id:  req.body.id
    }

    requestModel.updateLatLng(par)
        .then(value => {
            //console.log(value);
            res.statusCode = 201;
            res.json({
                msg: 'Cập nhật vị trí thành công'
            })
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })  
})

module.exports = router;