var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_abdullai',
  password        : 'ololo11',
  database        : 'cs290_abdullai'
});

module.exports = pool;
