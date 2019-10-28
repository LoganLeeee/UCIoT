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


var line0Chart0 = new Chart(ctx, {

	type: 'line',

	data: {

		datasets: [{
				label: 'CO2 DataSource 1',

				borderColor: 'rgb(255, 99, 132)',

				backgroundColor: 'rgba(255, 99, 132, 0.5)',

				// lineTension: 0,

				// borderDash: [8, 4]
			},
			// {

			// 	label: 'Data 2',

			// 	borderColor: 'rgb(54, 162, 235)',

			// 	backgroundColor: 'rgba(54, 162, 235, 0.5)'

			// }
		]

	},

	options: {

		scales: {

			xAxes: [{

				type: 'realtime',
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
				label: 'Noise Data1',
				data: [10.22, 11.48, 19.70, 17.06, 24.94, 10.58, 11.18],

				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',

			},
			{
				label: 'Noise Data2',
				data: [17.06, 10.22, 10.58, 11.18, 11.48, 19.70, 24.94],

				borderColor: 'rgb(54, 162, 235)',

				backgroundColor: 'rgba(54, 162, 235, 0.5)'

			}
		]
	},
	options: {
		title: {
			display: true,
			text: "CO2 line2Chart",
			fontSize: 20,
			fontColor: "rgba(20,20,20,1)"
		},
		legend: {
			display: false,
			position: 'right',
			labels: {
				fontColor: '#000'
			},
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
						return value + " ℃"
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

var ctx = document.getElementById('line2Chart0').getContext('2d');

var line2Chart0 = new Chart(ctx, {

	type: 'line',

	data: {

		datasets: [{
				label: 'Data 1',

				borderColor: 'rgb(255, 99, 132)',

				backgroundColor: 'rgba(255, 99, 132, 0.5)',

				// lineTension: 0,

				// borderDash: [8, 4]
			},
			{

				label: 'Data 2',

				borderColor: 'rgb(54, 162, 235)',

				backgroundColor: 'rgba(54, 162, 235, 0.5)'

			}
		]

	},

	options: {

		scales: {

			xAxes: [{

				type: 'realtime',
				realtime: {

					// delay: 200,
					pause: false,
					onRefresh: function(chart) {

						chart.data.datasets.forEach(function(dataset) {

							dataset.data.push({

								x: Date.now(),

								y: Math.random()

							});

						});

					}

				}

			}]

		}

	}


});

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

var valueRef = firebase.database().ref().child('UC-iot').child('CO2');
var timeStamp =firebase.database().ref().child('UC-iot').child('timestamp');
			timeStamp.on('value', function(snap) {
				ison(snap.val());

				if(snap.val()!=isondata){
					valueRef.on('value', function(snapshot) {
						console.log(snapshot.val());
						record(snapshot.val());
					});
					
					console.log(snap.val());

				}
				else record(null);
			});

// valueRef.on('value', function(snapshot) {
// 	console.log(snapshot.val());
// 	record(snapshot.val());
// });
