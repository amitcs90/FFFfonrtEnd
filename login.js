function validateNlogin(){
	var uName = document.getElementById("email").value;
	var pwd = document.getElementById("pwd").value;
	console.log("1");
	console.log(uName+"     -->>   "+pwd);
	doLogin(uName,pwd);

}
var baseUrl="http://localhost:8080";
var endPoint= "/login/";
function doLogin(uName,pwd){
	var myData = {"email": uName, "password":pwd };
	console.log("2 "+myData);
	jQuery.ajax({
		url: baseUrl+endPoint,
		type: "POST",
		data: JSON.stringify(myData),
		contentType: 'application/json; charset=utf-8',
		dataType: "json",
		success: function(result) {
			console.log("post done: "+ result);
			if(result.isValid){
				url = '/'+result.page+'.html?email=' + encodeURIComponent(result.email);
				document.location.href = url;
			}
		}
	}); 
}
