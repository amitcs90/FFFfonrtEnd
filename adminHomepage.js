window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        params = decodeURIComponent(params);
        params = params.split('=')[1];
        console.log(params);
    document.getElementById('email').innerHTML = params;
}

function submit(){
	// alert("here");
	var qDesc = document.getElementById('ques').value;
	var qOpt1 = document.getElementById('option1').value;
	var qOpt2 = document.getElementById('option2').value;
	var qOpt3 = document.getElementById('option3').value;
	var qOpt4 = document.getElementById('option4').value;

	var qTimeLmt = document.getElementById('time').value;
	var qPnts = document.getElementById('point').value;
	var ans = document.getElementById('ans').value;

	uploadQues(qDesc,qOpt1,qOpt2,qOpt3,qOpt4,qTimeLmt,qPnts,ans);
}

var baseUrl="http://localhost:8080";
var endPoint= "/addQuestion/";
function uploadQues(qDesc,qOpt1,qOpt2,qOpt3,qOpt4,qTimeLmt,qPnts,ans){
	var myData = {"qDesc": qDesc,"qOpt1":qOpt1, "qOpt2":qOpt2, "qOpt3":qOpt3,"qOpt4":qOpt4,"qTimeLmt":qTimeLmt,"qPnts":qPnts,"ans":ans };
	var email  =  document.getElementById('email').innerHTML;
	console.log("2 "+myData);
	$.ajax({
		
        beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("emailid",email);
        },	
		url: baseUrl+endPoint,
		type: "POST",
		data: JSON.stringify(myData),
		contentType: 'application/json; charset=utf-8',
		dataType: "json",
		success: function(response) {
			alert(response.status);
			location.reload();
			}
	}); 
}
