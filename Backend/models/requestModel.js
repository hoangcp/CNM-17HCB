var db = require('../fn/mssql');

exports.getList = function(current) {
	var sql = `exec Request_getList @Current='${current}'`;
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
	// var sql = `INSERT INTO Request(Fullname, PhoneNumber, Address, Note, CreateBy, CreateDate, Status, Latitude, Longitude, formattedAddress) 
				// VALUES(N'${par.Fullname}','${par.PhoneNumber}', N'${par.Address}', N'${par.Note}', N'${par.Username}', GETDATE(), 0, '${par.Latitude}', '${par.Longitude}', N'${par.formattedAddress}')`;
	var sql = `exec	InsertRequest @FullName='${par.Fullname}', @PhoneNumber ='${par.PhoneNumber}',@Address ='${par.Address}',@Status='0',@UserName ='${par.Username}',@Latitude ='${par.Latitude}',@Longitude ='${par.Longitude}', @formattedAddress = '${par.formattedAddress}',@Assign=NULL`
	return db.write(sql);
}

exports.updateLatLng = function(par) {
	var sql = `UPDATE Request SET Latitude='${par.Latitude}', Longitude='${par.Longitude}', Updatedate=GETDATE(), UpdateBy='${par.updateby}' WHERE id=${par.id}`;
	return db.write(sql);
}

exports.updateassign = function(par) {
	var sql = `UPDATE Request SET Assign='${par.Assign}', Status='${par.Status}', Updatedate=GETDATE(), UpdateBy='${par.Username}' WHERE id=${par.RequestID}`;
	return db.write(sql);
}

exports.assign = function(par) {
	var sql = `exec	GetAssign @RequestID='${par.id}'`
	return db.write(sql);
}
