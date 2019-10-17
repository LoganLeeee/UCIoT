			let select1 = document.querySelector('#chart1Type');
			
			select1.addEventListener('change', showHide1);
			
			function showHide1() {
				// concat Chart for the canvas ID
				let chart1 = this.options[select1.selectedIndex].value + 'Chart1';
				document.querySelector('.chartClass1').querySelectorAll('canvas')
				// document.querySelectorAll('canvas')
					.forEach(c => {
						c.style.display = (c.id === chart1) ? 'inherit' : 'none';
					})
			};
			
			// For line0Chart
			// var ctx = document.getElementById('line0Chart1').getContext('2d');

			// var line0Chart1 = new Chart(ctx, {

			// 	type: 'line',

			// 	data: {

			// 		datasets: [{
			// 			label: 'Data 1',

			// 			borderColor: 'rgb(255, 99, 132)',

			// 			backgroundColor: 'rgba(255, 99, 132, 0.5)',

			// 			// lineTension: 0,

			// 			// borderDash: [8, 4]
			// 		},
			// 		{

			// 			label: 'Data 2',

			// 			borderColor: 'rgb(54, 162, 235)',

			// 			backgroundColor: 'rgba(54, 162, 235, 0.5)'

			// 		}
			// 		]

			// 	},

			// 	options: {

			// 		scales: {

			// 			xAxes: [{

			// 				type: 'realtime',
			// 				realtime: {
			// 					duration: 60000000,
			// 					refresh: 50000,

			// 					// delay: 200,
			// 					pause:false,
			// 					onRefresh: function(chart) {

			// 						chart.data.datasets.forEach(function(dataset) {

			// 							dataset.data.push({

			// 								x: Date.now(),

			// 								y: Math.random()

			// 							});

			// 						});

			// 					}

			// 				}

			// 			}]

			// 		}

			// 	}
				

			// });
			
			//For line1Chart
			
			var ctx = document.getElementById("line1Chart1").getContext('2d');
			var line1Chart1 = new Chart(ctx, {
				type: 'line',
				data: {
					labels: ["10 June", "11 June", "12 June", "13 June", "14 June", "15 June", "16 June"
					],
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
						
					}]
				},
				options: {
					title: {
						display: true,
						text: "UV Data line2Chart",
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
			
			var ctx = document.getElementById('line0Chart1').getContext('2d');

			var line2Chart1 = new Chart(ctx, {

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
								pause:false,
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
// Code goes here

var $element = document.getElementById("line2Chart1"),
    $btn = document.getElementById("showYear");
    
//create a drawing context on the canvas
var ctx = $element.getContext("2d");

//declare variables
var line2Chart1;
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
  data = {
    labels: processedData.labels,
    datasets: [{
      label: "MSFT Stock - 2018",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: processedData.data
    }]
  };

  line2Chart1 = new Chart(ctx, {
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

    if (orderClosingByMonth[thisMonth]["close"] < jsonVal[item]["4. close"]) {
      orderClosingByMonth[thisMonth]["close"] = jsonVal[item]["4. close"];
    }

    orderClosingByMonth[thisMonth]["allKey"].push(item);
    orderClosingByMonth[thisMonth]["allValue"].push(parseFloat(jsonVal[item]["4. close"]));

    return 0;
  });

  for (var i in orderClosingByMonth) {
    dataSet.push(orderClosingByMonth[i].close);
  }
  ///debugger;
  
  return {
    labels: labels,
    data: dataSet
  }
};

$element.onclick = function(event) {
  var activePoints = line2Chart1.getElementsAtEvent(event);

  if (activePoints.length > 0) {
    //get the internal index of slice on the chart
    var clickedElementindex = activePoints[0]["_index"];

    //get specific label by index 
    var label = line2Chart1.data.labels[clickedElementindex];

    //get value by index      
    var value = line2Chart1.data.datasets[0].data[clickedElementindex];

    
    /* update chart data */
    if(labels.indexOf(label) != -1) {
      line2Chart1.data.labels = orderClosingByMonth[label].allKey.reverse();
      line2Chart1.data.datasets[0].data = orderClosingByMonth[label].allValue.reverse();
      line2Chart1.update();  
      $btn.classList.remove("hide");
    }
    
  }
};
$btn.onclick = function(event) {
  line2Chart1.data.labels = processedData.labels;
  line2Chart1.data.datasets[0].data = processedData.data;
  line2Chart1.update();  
  $btn.classList.add("hide");
}