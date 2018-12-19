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
    var sql = `select * from Account where Username = '${reqLogin.Username}' and Password = '${md5_pwd}'`;
    return db.load(sql);
}