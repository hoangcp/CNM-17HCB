var db = require('../fn/mssql');

exports.get = function() {
	var sql = `select * from Request order by CreateDate desc`;
	return db.load(sql);
}

exports.insert = function(par) {
	var sql = `INSERT INTO Request(Fullname, PhoneNumber, Address, Note, CreateDate, Status) 
				VALUES(N'${par.Fullname}','${par.PhoneNumber}', N'${par.Address}', N'${par.Note}', GETDATE(), 0)`;
	return db.write(sql);
}

