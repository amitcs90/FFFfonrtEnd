function register(){
	var email = document.getElementById("email").value;
	var fName = document.getElementById("fName").value;
	var lName = document.getElementById("lName").value;
	var password = document.getElementById("password").value;
	var confirmPass = document.getElementById("confirmPass").value;

	if(password!=confirmPass)
		alert("password not matched");
	else
		doRegister(email,fName,lName,password);
}
var baseUrl="http://localhost:8080";
var endPoint= "/register/";
function doRegister(email,fName,lName,password){
	var myData = {"email": email, "fName":fName, "lName":lName,"password":password,"role":"user" };
	console.log("2 "+myData);
	jQuery.ajax({
		url: baseUrl+endPoint,
		type: "POST",
		data: JSON.stringify(myData),
		contentType: 'application/json; charset=utf-8',
		dataType: "json",
		success: function(result) {
			console.log("post done: "+ result);
			if(result.status=="success"){
				url = '/homepage.html?email=' + encodeURIComponent(result.email);
				document.location.href = url;
			}
		}
	}); 
}
