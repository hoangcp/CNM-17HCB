var mssql = require('mssql');

exports.load = function(sql) {
    return new Promise((resolve, reject) => {
        var config = {
            user: 'sa',
            password: '123456',
            server: 'localhost', 
            database: 'TAXI'
        };
        //var connection = new sql.Connection(config);

        mssql.connect(config, function (err) {  
            var request = new mssql.Request();           
            // query to the database and get the records
            request.query(sql, function (error, value) {  
                //console.log(value);          
                if (error) 
                    reject(error);
                else 
                    resolve(value);
                
                mssql.close();
            });
        });
    });
}

exports.write = function(sql) {
    return new Promise((resolve, reject) => {
        var config = {
            user: 'sa',
            password: '123456',
            server: 'localhost', 
            database: 'TAXI'
        };
        //var connection = new sql.Connection(config);

        mssql.connect(config, function (err) {  
            var request = new mssql.Request();           
            // query to the database and get the records
            request.query(sql, function (error, value) {  
                //console.log(value);          
                if (error) 
                    reject(error);
                else 
                    resolve(value);
                
                mssql.close();
            });
        });
    });
}