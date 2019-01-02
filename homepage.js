window.onload = function () {
	var url = document.location.href,
	params = url.split('?')[1].split('&'),
	params = decodeURIComponent(params);
	params = params.split('=')[1];
	console.log(params);
	document.getElementById('email').innerHTML = params;
}

function startQuiz(){
	url = '/startQuiz.html?email=' + encodeURIComponent(document.getElementById('email').innerHTML);
	document.location.href = url;
}