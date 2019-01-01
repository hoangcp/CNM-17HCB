var db = require('../fn/mssql');

exports.getList = function(current) {
	var sql = `SELECT [ID],[Fullname],[PhoneNumber],[Address],[Note], CreateDate,FORMAT([CreateDate], 'dd/MM/yyyy HH:mm:ss') CreateDate2,[Status],[Createby]
						,[UpdateBy],[Updatedate],[Latitude],[Longitude],[formattedAddress], CONVERT(varchar,[CreateDate],113) CreateDate3
				FROM Request WHERE CreateDate > '${current}' ORDER BY CreateDate ASC`;
	//console.log(sql);
	return db.load(sql);
}

exports.getID = function(par) {
	var sql = `SELECT [ID],[Fullname],[PhoneNumber],[Address],[Note], CreateDate,FORMAT([CreateDate], 'dd/MM/yyyy HH:mm:ss') CreateDate2,[Status],[Createby]
					,[UpdateBy],[Updatedate],[Latitude],[Longitude],[formattedAddress]
				FROM Request WHERE id=${par.id} ORDER BY CreateDate DESC`;
	return db.load(sql);
}

exports.insert = function(par) {
	var sql = `INSERT INTO Request(Fullname, PhoneNumber, Address, Note, CreateDate, Status, Latitude, Longitude, formattedAddress) 
				VALUES(N'${par.Fullname}','${par.PhoneNumber}', N'${par.Address}', N'${par.Note}', GETDATE(), 0, '${par.Latitude}', '${par.Longitude}', N'${par.formattedAddress}')`;
	return db.write(sql);
}

exports.updateLatLng = function(par) {
	var sql = `UPDATE Request SET Latitude='${par.Latitude}', Longitude='${par.Longitude}', Updatedate=GETDATE(), UpdateBy='${par.updateby}' WHERE id=${par.id}`;
	return db.write(sql);
}

