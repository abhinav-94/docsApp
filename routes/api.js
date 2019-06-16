const express=require('express');
var {connection}=require('../mysql/mysql.js');

const router=express.Router();

router.get('/dash',(req,res)=>{

  var getTest="select * from Dashboard";
  connection.query( getTest, function (err, rows, fields) {
        if (err) throw err
        res.send(rows);
  });

});

router.post('/book',(req,res)=>{
  var id=req.body.customerId;
  var bookResult='select customerId, driverId from Dashboard where customerId = ' +id;
  connection.query( bookResult, function (err, rows, fields) {
        if (err) throw err
        else{
          if(rows.length==0){
            var insertRequest="insert into Dashboard (customerId , timeOfBooking, timeOfRequest) values ('"+id+"', NOW(),null )"
            connection.query(insertRequest, function(err,rows,field){
              if(err) throw err
              console.log('request inserted');
              res.send([{"customerId":req.body.customerId,"driverId":null}]);
            });
            }else{
            console.log(rows);
            res.send([{"driverId":rows[0].driverId}]);
          }

        }

  });
});

router.post('/driver',(req,res)=>{
  console.log(req.body.driverId);
  var findResult='select requestId,driverId, customerId, timeOfBooking,status,timeOfRequest,rideCompletionTime from Dashboard where status="Waiting" OR driverId = ' +req.body.driverId;
  connection.query( findResult, function (err, rows, fields) {
        if (err) throw err
        // console.log(rows);
        res.send(rows);
  });
});


router.post('/confirm',(req,res)=>{

  var ld=req.body.requestId.toString();

  var checkRide='select driverId from dashboard where requestId =' +ld  ;
  connection.query( checkRide, function (err, rows, fields) {
        if (err) console.log(err);
        var x="1";
        // console.log(rows[0].driverId==null);
        if(rows[0].driverId==null){
          var checkDriver="select status from dashboard where status='Ongoing' and driverId="+req.body.driverId;
          connection.query(checkDriver,function(err1,rows1,fields){
            if(rows1.length==0){
              var bookRide="update dashboard set status='Ongoing', timeOfRequest=NOW(), driverId= '"+req.body.driverId+"' where requestId = "+req.body.requestId;
              connection.query(bookRide,function(errr,rowss,fieldss){
                if(errr) throw errr;
              });
              x="1";


              var completeRide="update dashboard set status='Complete',rideCompletionTime=NOW() where requestId = "+req.body.requestId;
              setTimeout(function(){
                connection.query(completeRide,function(err,row,fields){
                  if(err) throw error
                  console.log('completing the ride');
                  // res.send('Status updated');
                })
              },300000);


              res.status(200).send(x);
            } else{
              x="-2";
              res.status(200).send(x);
            }
          });

        }else{
          x="-1";
          res.status(200).send(x);
        }
  });
});

// router.post('/completeRide',(req,res)=>{
//   console.log('came inside completing');
//   var completeRide="update dashboard set status='Complete',rideCompletionTime=NOW() where requestId = "+req.body.requestId;
//   connection.query(completeRide,function(err,row,fields){
//     if(err) throw error
//     console.log('completing the ride');
//     res.send('Status updated');
//   });
// });

module.exports=router;
