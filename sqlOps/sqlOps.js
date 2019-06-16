// var {connection}=require('../mysql/mysql.js');
//
// // var createDriverTable = "CREATE TABLE Driver( DriverID int auto_increment, LastName varchar(255), FirstName varchar(255),CustomerID int ,PRIMARY KEY (DriverID))";
// // var createCustomerTable = "CREATE TABLE Customer( CustomerID int auto_increment, LastName varchar(255), FirstName varchar(255), DriverID int, FOREIGN KEY (DriverID) REFERENCES Driver(DriverID),PRIMARY KEY (CustomerID))";
// // var createDashboardTable = "CREATE TABLE Dashboard( requestId int AUTO_INCREMENT PRIMARY KEY, customerId int, timeOfRequest DATETIME, timeOfBooking DATETIME, status varchar(100) default 'Waiting', driverId int default null, CONSTRAINT chk_Status CHECK (status IN ('Waiting', 'Ongoing', 'Complete')))";
// 
// // var insertTest="insert into Dashboard (customerId , timeOfBooking, timeOfRequest) values (34, NOW(),null )"
// // var insertTest2="insert into Dashboard (customerId , timeOfBooking, timeOfRequest) values (35, NOW(),null )"
// // var insertTest3="insert into Dashboard (customerId , timeOfBooking, timeOfRequest) values (36, NOW(),null )"
// // var insertTest4="insert into Dashboard (customerId , timeOfBooking, timeOfRequest) values (37, NOW(),null )"
// var alter="ALTER TABLE Dashboard ADD rideCompletionTime DATETIME";
// // connection.query( createDriverTable, function (err, rows, fields) {
// //       if (err) throw err
// // });
//
// // connection.query( createCustomerTable, function (err, rows, fields) {
// //       if (err) throw err
// // });
//
// // connection.query( createDashboardTable, function (err, rows, fields) {
// //       if (err) throw err
// // });
//
// connection.query( alter, function (err, rows, fields) {
//       if (err) throw err
// });
//
// // connection.query( insertTest2, function (err, rows, fields) {
// //       if (err) throw err
// // });
// //
// // connection.query( insertTest3, function (err, rows, fields) {
// //       if (err) throw err
// // });
// //
// // connection.query( insertTest4, function (err, rows, fields) {
// //       if (err) throw err
// // });
// module.exports={connection};
