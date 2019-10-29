var isondata;

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: {
			lat: -35.2366226,
			lng: 149.0828272
		}
	});
	var GPS1 = {
		lat: -35.237437,
		lng: 149.084522,

	};
	var GPS2 = {
		lat: -35.238087,
		lng: 149.083781
	};
	var marker1 = new google.maps.Marker({
		position: GPS1,
		map: map,
		title: 'GPS1'
	});
	var marker2 = new google.maps.Marker({
		position: GPS2,
		map: map,
		title: 'GPS2'
	});

	var contentString1 = '<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		'<div id="bodyContent">' +
		'<h4>GPS 1+Sensor</h4>' +
		'<p><b>GPS+Sensor</b>, also has <b>PP sensor</b>, is a ' +
		' Particulate Matter Sensor ' +
		'on a Raspberry pi </p>' +
		'<p>Attribution: Raspberry pi, <a href="https://www.raspberrypi.org/products/raspberry-pi-4-model-b/">' +
		'Raspberry pi 4</a> ' +
		'(last visited Aug 22, 2019).</p>' +
		'</div>' +
		'</div>';
	var contentString2 = '<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		// '<h3 id="firstHeading" class="firstHeading">GPS 2+Sensor</h3>' +
		'<div id="bodyContent">' +
		'<h4>GPS 2+Sensor</h4>' +
		'<p><b>GPS+Sensor</b>, also has <b>PP sensor</b>, is a ' +
		' Particulate Matter Sensor ' +
		'on a Raspberry pi </p>' +
		'<p>Attribution: Raspberry pi, <a href="https://www.raspberrypi.org/products/raspberry-pi-4-model-b/">' +
		'Raspberry pi 4</a> ' +
		'(last visited Aug 22, 2019).</p>' +
		'</div>' +
		'</div>';

	var infowindow1 = new google.maps.InfoWindow({
		content: contentString1,
		maxWidth: 200,
		maxHighth: 20,
	});
	var infowindow2 = new google.maps.InfoWindow({
		content: contentString2,
		maxWidth: 200,
		maxHighth: 100,
	});
	marker1.addListener('click', function() {
		infowindow1.open(map, marker1);
	});
	marker2.addListener('click', function() {
		infowindow2.open(map, marker2);
	});


	function ison(live) {
			isondata = live;
		}
	
		var valueRef = firebase.database().ref().child('UC-iot');
		var timeStamp = firebase.database().ref().child('UC-iot').child('timestamp');
		// valueRef.on('value', function(snapshot) {
		// 	if(snapshot.exists()==false){
		// 		console.log(snapshot.exists());
		// 		marker2.setMap(null);
		// 	};
		const gpsdata = document.getElementById('gpsdata');
		timeStamp.on('value', function(snapshot) {
			ison(snapshot.val());
			//Change to != to show GPS ON 
			if (snapshot.val() != isondata) {
				// console.log(snapshot.val());
				marker1.setMap(null);
				gpsdata.innerText = 'Off';
			} else gpsdata.innerText = 'On';
			// console.log(snapshot.exists());
	
		});
	};