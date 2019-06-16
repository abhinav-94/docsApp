function toJSONString( form ) {
		var obj = {};
		var elements = form.querySelectorAll( "input, select, textarea" );
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;
			if( name ) {
				obj[ name ] = value;
			}
		}
		console.log(obj);
    return JSON.stringify( obj );
}

document.addEventListener( "DOMContentLoaded", function() {
		var form = document.getElementById( "test" );
		var output = document.getElementById( "output" );
		form.addEventListener( "submit", function( e ) {
			e.preventDefault();
			var json = toJSONString( this );

			var xhr = new XMLHttpRequest();
			var url = "http:localhost:3000/book";
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function () {
    	if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json[0]);
				if(json[0].driverId!=null)
				output.innerHTML = "Driver Allocated : "+json[0].driverId;
				else
				output.innerHTML = "Request taken but No Driver Allocated";
    	}
		};
		// var data = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
		xhr.send(json);

		}, false);

});
