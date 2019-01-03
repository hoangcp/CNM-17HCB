var md5 = require('crypto-js/md5');
var db = require('../fn/mssql');

exports.add = function(req) {
    var md5_pwd = md5(req.Password);
    var sql = `insert into Account(Fullname, Username, Password, CreateDate, Status) 
                values(N'${req.Fullname}','${req.Username}', '${md5_pwd}', GETDATE(), 1)`;
    return db.write(sql);
}

exports.login = reqLogin => {
    var md5_pwd = md5(reqLogin.Password);
    var sql = `EXEC Account_Login @Username = '${reqLogin.Username}', @Password = '${md5_pwd}'`;
    return db.load(sql);
}

exports.updatesocket = function(req) {
    var sql = `update Account set socketid='${req.SocketID}', socketdate=GETDATE() where username='${req.Username}'`;
    return db.write(sql);
}

exports.updatelocation = function(req) {
    var sql = `update Account set Latitude='${req.Latitude}',Longitude='${req.Longitude}', LocationDate=GETDATE() where username='${req.Username}'`;
    return db.write(sql);
}

exports.updateisonline = function(req) {
    var sql = `update Account set isOnline='${req.isOnline}' where username='${req.Username}'`;
    return db.write(sql);
}