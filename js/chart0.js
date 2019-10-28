let select0 = document.querySelector('#chart0Type');

select0.addEventListener('change', showHide0);

function showHide0() {
	// concat Chart for the canvas ID
	let chart0 = this.options[select0.selectedIndex].value + 'Chart0';
	document.querySelector('.chartClass0').querySelectorAll('canvas')
		.forEach(a => {
			a.style.display = (a.id === chart0) ? 'inherit' : 'none';
		})
};

// For line0Chart
var ctx = document.getElementById('line0Chart0').getContext('2d');
var livedata;
// carbon.on('value',snap=>{
// 	console.log(snap.val())

var line0Chart0 = new Chart(ctx, {

	type: 'line',

	data: {

		datasets: [
			// {
			// 	label: 'CO2 Data 1',

			// 	borderColor: 'rgb(255, 99, 132)',

			// 	backgroundColor: 'rgba(255, 99, 132, 0.5)',

			// 	// lineTension: 0,

			// 	// borderDash: [8, 4]
			// },
			{

				label: 'CO2 Data 1',

				borderColor: 'rgb(54, 162, 235)',

				backgroundColor: 'rgba(54, 162, 235, 0.5)'

			}
		]

	},

	options: {

		scales: {


			xAxes: [{

				type: 'realtime',
				fontColor: '#ddd',
				// gridLines: { color: '#ddd', },
				realtime: {
					duration: 60000,
					refresh: 12000,

					delay: -1200,
					pause: false,
					onRefresh: function(chart) {

						chart.data.datasets.forEach(function(dataset) {

							dataset.data.push({

								x: Date.now(),

								y: livedata


							});

						});

					}

				}

			}]

		}

	}


});
// });
//For line1Chart

var ctx = document.getElementById("line1Chart0").getContext('2d');
var line1Chart0 = new Chart(ctx, {
	type: 'line',
	data: {
		labels: ["10 June", "11 June", "12 June", "13 June", "14 June", "15 June", "16 June"],
		datasets: [{
				label: 'CO2 Data1',
				data: [210.22, 211.48, 219.70, 217.06, 224.94, 210.58, 211.18],

				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',

			},
			{
				label: 'CO2 Data2',
				data: [217.06, 210.22, 210.58, 211.18, 211.48, 219.70, 224.94],

				borderColor: 'rgb(54, 162, 235)',

				backgroundColor: 'rgba(54, 162, 235, 0.5)'

			}
		]
	},
	options: {
		title: {
			display: false,
			text: "CO2 line2Chart",
			fontSize: 20,
			fontColor: "#ddd"
		},
		legend: {
			// display: false,
			// position: 'right',
			// labels: {
			// 	fontColor: '#000'
			// },
		},
		elements: {
			line: {
				// tension: 0, //disables bezier curves
			}
		},
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true,
					callback: function(value, index, values) {
						return value
						// + " ℃"
					}
				}

			}]
		},
		/*animation: {
		    duration:0, // general animation time
		},*/
		hover: {
			animationDuration: 0, // duration of animations when hovering an item
		},
		responsiveAnimationDuration: 0, // animation duration after a resize
	}
});


//For line2Chart


var $element0 = document.getElementById("line2Chart0"),
	$btn0 = document.getElementById("co2showYear");

//create a drawing context on the canvas
var ctx0 = document.getElementById("line2Chart0").getContext("2d");

//declare variables
var line2Chart0;
var data = {},
	processedData = {},
	orderClosingByMonth = {};
var labels = [];

//using jQuery ajax method get data from the external file. ( while using react you will do it differently)
var jsonData = $.ajax({
	url: 'data.json',
	dataType: 'json',
}).done(function(results) {
	//get values that only needed

	processedData = processData(results);
	// console.log(results);
	data = {
		labels: processedData.labels,
		datasets: [{
			label: 'Data 1',

			borderColor: 'rgb(54, 162, 235)',

			backgroundColor: 'rgba(54, 162, 235, 0.5)',

			data: processedData.data
		}]
	};

	line2Chart0 = new Chart(ctx0, {
		type: 'line',
		data: data,
		options: {
			"scales": {
				"yAxes": [{
					"ticks": {
						"beginAtZero": true
					}
				}]
			}
		}
	});
});

var processData = function(jsonData) {

	var jsonVal = jsonData["Time Series (Daily)"]

	var dataSet = [];

	var date;
	var locale = "en-us";
	var months = Object.keys(jsonVal).map(function(item) {
		date = new Date(item);

		return date.toLocaleDateString(locale, {
			month: "long"
		});
	}).filter(function(elem, index, self) {
		return index == self.indexOf(elem);
	});

	function sortByMonth(arr) {
		var exactMonths = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		arr.sort(function(a, b) {
			return exactMonths.indexOf(a) - exactMonths.indexOf(b);
		});
		return arr;
	};

	labels = sortByMonth(months);

	for (var i = 0, total = labels.length; i < total; i++) {
		orderClosingByMonth[labels[i]] = {
			close: 0,
			allValue: [],
			allKey: []
		}
	}

	var thisMonth;
	Object.keys(jsonVal).filter(function(item) {
		date = new Date(item + " 00:00:00");
		thisMonth = date.toLocaleDateString(locale, {
			month: "long"
		});

		if (orderClosingByMonth[thisMonth]["close"] < jsonVal[item]["4. close"] + 120) {
			orderClosingByMonth[thisMonth]["close"] = jsonVal[item]["4. close"] + 120;
		}

		orderClosingByMonth[thisMonth]["allKey"].push(item);
		orderClosingByMonth[thisMonth]["allValue"].push(parseFloat(jsonVal[item]["4. close"]) + 120);

		return 0;
	});

	for (var i in orderClosingByMonth) {
		dataSet.push(orderClosingByMonth[i].close + 120);
	}
	// console.log(i, orderClosingByMonth[i].close);
	///debugger;

	return {
		labels: labels,
		data: dataSet
	}
};

$element0.onclick = function(event) {

	var activePoints = line2Chart0.getElementsAtEvent(event);

	if (activePoints.length > 0) {
		//get the internal index of slice on the chart
		var clickedElementindex = activePoints[0]["_index"];

		//get specific label by index 
		var label = line2Chart0.data.labels[clickedElementindex];

		//get value by index      
		var value = line2Chart0.data.datasets[0].data[clickedElementindex];


		/* update chart data */
		if (labels.indexOf(label) != -1) {
			line2Chart0.data.labels = orderClosingByMonth[label].allKey.reverse();
			line2Chart0.data.datasets[0].data = orderClosingByMonth[label].allValue.reverse();
			line2Chart0.update();
			$btn0.classList.remove("hide");
		}

	}
};
$btn0.onclick = function(event) {
	line2Chart0.data.labels = processedData.labels;
	line2Chart0.data.datasets[0].data = processedData.data;
	line2Chart0.update();
	$btn0.classList.add("hide");
};


function record(live) {
	livedata = live;
}

function ison(live) {
	isondata = live;
}
var config = {
	"apiKey": "AIzaSyBhtDrarSwfkST07CdAzUZo1FHXM_L-9hE",
	"authDomain": "uc-iot-45075.firebaseapp.com",
	"databaseURL": "https://uc-iot-45075.firebaseio.com",
	"projectId": "uc-iot-45075",
	"storageBucket": "uc-iot-45075.appspot.com",
	"messagingSenderId": "1069887823922",
	"appId": "1:1069887823922:web:866fbd90dbc0eafbc4dc2b",
};

firebase.initializeApp(config);

// return null when disconnected

var valueRef = firebase.database().ref().child('UC-iot').child('CO2');
var timeStamp = firebase.database().ref().child('UC-iot').child('timestamp');
timeStamp.on('value', function(snap) {
	ison(snap.val());

	if (snap.val() != isondata) {

		valueRef.on('value', function(snapshot) {

			record(snapshot.val());
		});

		// console.log(snap.val());

	} else {
		record(null);

	}
});

// return last data when disconnected

// const co2data = document.getElementById('co2data');
// var valueRef = firebase.database().ref().child('UC-iot').child('CO2');
valueRef.on('value', function(snapshot) {
	co2data.innerText = JSON.stringify(snapshot.val(), null, 1);
	// record(snapshot.val());
});
