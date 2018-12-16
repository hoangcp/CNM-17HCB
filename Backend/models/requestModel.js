var db = require('../fn/mysql-db');

exports.get = function() {
	var sql = `select * from Request order by id desc`;
	return db.load(sql);
}



