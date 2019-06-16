var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sqlserver@700',
  database: 'world'
})

connection.connect()

// connection.query('select * from city where `Name` like "%er%" ', function (err, rows, fields) {
//   if (err) throw err
//   console.log(rows.length);
//   for(var i=0;i<=rows.length-1;i++){
//     console.log(rows[i].Name);
//   }
// })




module.exports={connection};
