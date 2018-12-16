var mysql = require('mysql');

exports.load = function(sql) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'sa',
            password: '123456',
            database: 'taxi' 
        });

        connection.connect();

        connection.query(sql, (error, results, fields) => {
            if (error)
                reject(error);
            else resolve(results);

            connection.end();
        });
    });
}

exports.write = function(sql) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'sa',
            password: '123456',
            database: 'taxi'
        });

        connection.connect();

        connection.query(sql, (error, value) => {
            if (error)
                reject(error);
            else resolve(value);

            connection.end();
        });
    });
}