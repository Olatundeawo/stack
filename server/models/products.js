const mysql = require('mysql2');


const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'olatunde@1995T',
    database: 'data',
});


pool.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
})
module.exports = pool;