const app = document.getElementById('root');

const table = document.createElement('table');
// app.appendChild(container);
table.style.width = '100%';
table.setAttribute('border', '1');

var tbody = document.createElement('tbody');

// const firstRow  = document.createElement('tr');
// const firstHeader  = document.createElement('th');
// const secondHeader  = document.createElement('th');
// firstHeader.textContent='Request ID';
// secondHeader.textContent='Customer ID';
// firstRow.appendChild(firstHeader);
// firstRow.appendChild(secondHeader);
// container.setAttribute('class', 'container');



var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/dash', true);
request.onload = function () {

  var tr = document.createElement('tr');

  var th1 = document.createElement('th');
  th1.appendChild(document.createTextNode('Request ID'));
  tr.appendChild(th1);

  var th2 = document.createElement('th');
  th2.appendChild(document.createTextNode('Customer ID'));
  tr.appendChild(th2);

  var th3 = document.createElement('th');
  th3.appendChild(document.createTextNode('Time Elapsed'));
  tr.appendChild(th3);

  var th4 = document.createElement('th');
  th4.appendChild(document.createTextNode('Status'));
  tr.appendChild(th4);

  var th5 = document.createElement('th');
  th5.appendChild(document.createTextNode('Driver'));
  tr.appendChild(th5);


  tbody.appendChild(tr);

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(ride => {
      var tr = document.createElement('tr');
      // card.setAttribute('class', 'card');
      var td1 = document.createElement('td');
      td1.appendChild(document.createTextNode(ride.requestId));
      tr.appendChild(td1);

      var td2 = document.createElement('td');
      td2.appendChild(document.createTextNode(ride.customerId));
      tr.appendChild(td2);

      var td3 = document.createElement('td');
      td3.appendChild(document.createTextNode(ride.timeOfBooking));
      tr.appendChild(td3);

      var td4 = document.createElement('td');
      td4.appendChild(document.createTextNode(ride.status));
      tr.appendChild(td4);

      var td5 = document.createElement('td');
      td5.appendChild(document.createTextNode(ride.driverId));
      tr.appendChild(td5);

      tbody.appendChild(tr);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

table.appendChild(tbody);
app.appendChild(table);



request.send();
