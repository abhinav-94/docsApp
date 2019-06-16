const app = document.getElementById('root');
const table = document.createElement('table');
// app.appendChild(container);
table.style.width = '100%';
table.setAttribute('border', '1');
table.setAttribute("id","mainTable");

var tbody = document.createElement('tbody');
var tr = document.createElement('tr');

var th1 = document.createElement('th');
th1.appendChild(document.createTextNode('Waiting'));
tr.appendChild(th1);

var th2 = document.createElement('th');
th2.appendChild(document.createTextNode('Ongoing'));
tr.appendChild(th2);

var th3 = document.createElement('th');
th3.appendChild(document.createTextNode('Complete'));
tr.appendChild(th3);

tbody.appendChild(tr);
table.appendChild(tbody);
app.appendChild(table);



function toJSONString( form ) {
		console.log('came inside toJSON String');
		var obj = {};
		var elements = form.querySelectorAll( "input, select, textarea" );
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;
			console.log(name);
			console.log(value);
			if( name ) {
				obj[ name ] = value;
			}
		}
		console.log("dekho object");
		console.log(obj);
		console.log(JSON.stringify( obj ));
    return JSON.stringify( obj );
}
// function clicked(){
// 	console.log('Came inside clicked');
// 	console.log('thereeee');
// }
document.addEventListener( "DOMContentLoaded", function() {
		var form = document.getElementById( "test" );
		var output = document.getElementById( "output" );
		var currStatus=0;
		form.addEventListener( "submit", function( e ) {
			console.log('dom loaded');


			e.preventDefault();
			$("#mainTable").find("tr:gt(0)").remove();
			var jsonData = toJSONString(this);
			console.log(jsonData+"getting from function result");

			var xhr = new XMLHttpRequest();
			var url = "http:localhost:3000/driver";
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function () {
    	if (xhr.readyState === 4 && xhr.status === 200) {
				console.log(xhr.responseText+"answer from backend");
        var json = JSON.parse(xhr.responseText);
        console.log(json+"after parsing the backend result");
				console.log(json.length);
				json.forEach(ride=>{
					var tr = document.createElement('tr');
					var td1 = document.createElement('td');
					var td2 = document.createElement('td');
					var td3 = document.createElement('td');
					if(ride.status=='Waiting'){
						td1.appendChild(document.createTextNode('Request Id: '+ride.requestId +' Customer Id: '+ride.customerId + ' Time of booking: '+ride.timeOfBooking));
						td1.appendChild(document.createElement('br'));
						var but=document.createElement('button');

						but.onclick=function(){
							// console.log("current status of driver"+currStatus);


							if(confirm('You want to book this ride')){
								var reqBook = new XMLHttpRequest();
								 	var jsonDataTemp=JSON.parse(jsonData);
									// console.log(jsonDataTemp+"value add karne se pehle ki parsing");
								 	jsonDataTemp['requestId']=ride.requestId;
									// console.log(jsonDataTemp+"final test after adding value");
									jsonDataTemp=JSON.stringify(jsonDataTemp);
									// console.log("send karne ke just pehle stringify");
								reqBook.open('POST', "http:localhost:3000/confirm", true);
								reqBook.setRequestHeader("Content-Type", "application/json");
								reqBook.onload = function () {
									if(reqBook.status>=200 && reqBook.status<400){
										console.log((this.response));
										if(this.response==1){
											console.log('came inside correct one x=1');
											alert('Ride Booked');
											currStatus=1;
											// var busyReq=new XMLHttpRequest();
											// busyReq.open('POST',"http:localhost:3000/completeRide",true);
											// busyReq.setRequestHeader("Content-Type","application/json");
											// busyReq.onload=function(){
											// currStatus=0;
											// };
											//
											// setTimeout(function(){
											// 	busyReq.send(jsonDataTemp);
											// },60000);

										}
										else if(this.response==-1){
										console.log(this.response);
										alert('Ride booked by someone else');
										}else{
											alert('you are already riding');
									}
									}else{

									}
								};

								reqBook.send(jsonDataTemp);

							}else{
							 	alert('you cancelled');
							}


						// else{
						// 	// currStatus=0;
						// 	alert('already riding');
						// }
						};
						but.appendChild(document.createTextNode('Select'));
						td1.appendChild(but);
						td2.appendChild(document.createTextNode(''));
						td3.appendChild(document.createTextNode(''));
						tr.appendChild(td1);
						tr.appendChild(td2);
						tr.appendChild(td3);

						// document.getElementById("selectButton").addEventListener("click", function(){
						//   alert('hey there');
						// });
					}else if (ride.status=='Ongoing') {
						td2.appendChild(document.createTextNode('Request Id: '+ride.requestId +' Customer Id: '+ride.customerId + ' Time of booking: '+ride.timeOfBooking +'Time of booking by driver :'+ride.timeOfRequest));
						td1.appendChild(document.createTextNode(''));
						td3.appendChild(document.createTextNode(''));
						tr.appendChild(td1);
						tr.appendChild(td2);
						tr.appendChild(td3);
					}else{
						td3.appendChild(document.createTextNode('Request Id: '+ride.requestId +' Customer Id: '+ride.customerId + ' Time of booking: '+ride.timeOfBooking+'Time of booking by driver :'+ride.timeOfRequest+'Time of ride completion :'+ride.rideCompletionTime));
						td2.appendChild(document.createTextNode(''));
						td1.appendChild(document.createTextNode(''));
						tr.appendChild(td1);
						tr.appendChild(td2);
						tr.appendChild(td3);
					}
					tbody.appendChild(tr);
				});

				}
		};
		// var data = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
		xhr.send(jsonData);

		}, false);

});
