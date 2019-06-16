var {connection}=require('../mysql/mysql.js');

var createDashboardTable = "CREATE TABLE Dashboard( requestId int AUTO_INCREMENT PRIMARY KEY, customerId int, timeOfRequest DATETIME, timeOfBooking DATETIME, status varchar(100) default 'Waiting', driverId int default null, CONSTRAINT chk_Status CHECK (status IN ('Waiting', 'Ongoing', 'Complete')))";
var alter="ALTER TABLE Dashboard ADD rideCompletionTime DATETIME";

connection.query( createDashboardTable, function (err, rows, fields) {
      if (err) throw err
});

connection.query( alter, function (err, rows, fields) {
      if (err) throw err
});
module.exports={connection};
