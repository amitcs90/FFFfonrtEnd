var myData;
var qCnt = 2;
var emailId;
var result;
function render(){
	getData(aFunc);
}

var baseUrl = "http://localhost:8080";
var endPoint = "/question/";
function getData(aFunc){
	var url = baseUrl+endPoint;
	$.getJSON( url, {
		crossDomain: true,
		format: "json"
	})
	.done(function( data ) {
		myData = data;
		console.log("12-> "+myData.qDesc);
		aFunc(); 
	});
}
function aFunc(){
	console.log("done");
	console.log("here "+myData.qDesc);

	var ele = document.getElementsByName("option");
	for(var i=0;i<ele.length;i++)
		ele[i].checked = false;

	document.getElementById('ques').innerHTML = myData.qDesc;
	document.getElementById('opt1').innerHTML = myData.qOpt1;
	document.getElementById('opt2').innerHTML = myData.qOpt2;
	document.getElementById('opt3').innerHTML = myData.qOpt3;
	document.getElementById('opt4').innerHTML = myData.qOpt4;

	document.getElementById('rd1').disabled = false;
	document.getElementById('rd2').disabled = false;
	document.getElementById('rd3').disabled = false;
	document.getElementById('rd4').disabled = false;

	document.getElementById('rd1').value = myData.qOpt1;
	document.getElementById('rd2').value = myData.qOpt2;
	document.getElementById('rd3').value = myData.qOpt3;
	document.getElementById('rd4').value = myData.qOpt4;
	var radios = document.querySelectorAll("input[type=radio]");
	for (var i = 0, iLen = radios.length; i < iLen; i++) {
		radios[i].onclick = function() {
			showResult(this.name);
		}
	}

	timer(myData.qTimeLmt);

}
function showResult(name) {
	var x = document.getElementsByName(name);
	for (var i = 0; i < x.length; i++) {
		x[i].disabled = true;
	}
	var selctOptn = document.querySelector('input[name="option"]:checked').value;
	console.log("called here  .."+selctOptn);
	var d = new Date();
	var url = document.location.href,
	params = url.split('?')[1].split('&'),
	params = decodeURIComponent(params);
	emailId = params.split('=')[1];
	submitAnswere(d.getTime(),emailId,selctOptn);
}

function submitAnswere(time,emailId,selctOptn){
	console.log("caleed..1");
	var data = {"emailid":emailId};
	$.ajax({
		
		beforeSend: function(xhrObj){
			// xhrObj.setRequestHeader("Content-Type","application/json");
			xhrObj.setRequestHeader("time",time+"");
			xhrObj.setRequestHeader("selctOptn",selctOptn);
			xhrObj.setRequestHeader("emailId",emailId);
			xhrObj.setRequestHeader("quesId",myData.qId+"");
		},	
		url: baseUrl+"/submit/",
		type: "POST",
		data: JSON.stringify(data),
		contentType: 'application/json; charset=utf-8',
		dataType: "json",
		success: function(response) {
			console.log("ans submit  "+selctOptn);
			console.log("ans response  "+response.points);
			result = response.points;
			toast();
		}
	}); 
}

function timer(time){
	var t = new Date();
	t.setSeconds(t.getSeconds() + parseInt(time)+2);
	var x = setInterval(function() {

		var now = new Date().getTime();
		var distance = t - now;
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		document.getElementById("demo").innerHTML = days + "d " + hours + "h "  + minutes + "m " + seconds + "s ";
		if (distance < 0) {
			clearInterval(x);

			if(document.querySelector('input[name="option"]:checked')!=null)
				val = document.querySelector('input[name="option"]:checked').value;
			else
				val ="";
			// var val = document.querySelector('input[name="option"]:checked').value;
			console.log("seclted---> "+val);
			if(qCnt>0){
				console.log($('input[name=option]:checked').val()+"  fff");
				document.getElementById("demo").innerHTML = "Next";
				qCnt--;
				render();
			}else   {
				document.getElementById("demo").innerHTML = "";
				document.getElementById("main").innerHTML = "Complete";
			}
		}
	}, 1000);
}

function toast() {
	var x = document.getElementById("snackbar");
	x.className = "show";
	var resp;
	if(result.points!="0")
		resp="wrong";
	else
		resp="correct";
	x.innerHTML = resp;
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}