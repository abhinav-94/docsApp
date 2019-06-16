# docsApp
There are three URLs: Dashboard.html, CustomerApp.html and DriverApp.html
Dashboard - will give all the requests that have ever come, be it in Waiting, Ongoing or Complete status
CustomerApp - Allows the customers to enter an Id and request for a driver to be allocated to them.
DriverApp- Dashboard for the drivers where they see all the waiting requests, ongoing request of theirs and completed requests of theirs.

For Dashboard, to get all the requests, the backend route supporting it is localhost:3000/dash

For Customer App, to request for a ride, the backend route supporting it is localhost:3000/book
Here I am also checking if the request already exists or not, if it exists then simply return the driver allocated
if not then insert the request into the database

For Driver App, there are 3 columns - Waiting, Ongoing, Complete- Driver can only book one request at a time.
Because while booking, I am firstly checking if the driver has any Ongoing request or not. If the request is already booked 
by one driver, it cannot be booked by any other driver. routes supporting it are /driver and /confirm.

I have attached 3 PNG files also as a reference. 

---------------------FOR SETTING UP THE APPLICATION--------------------------------

1) Please start a local mysql server on the default port.
   I have given my connection details in the mysql.js file to establish the connection and 
   then have created table through sqlOps.js file. Please give your local connection details to establish the connection.
2) Run node server.js to start the backend server.
3) You can access the urls by going to 
  localhost:3000/customerApp.html
  localhost:3000/driverApp.html
  localhost:3000/dashboard.html
  
-------------------------------------------------------------------------------------
