var db = require('../fn/mssql');

exports.get = function() {
	var sql = `select * from Account order by accountid desc`;
	return db.load(sql);
}



