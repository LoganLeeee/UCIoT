			let select2 = document.querySelector('#chart2Type');
			
			select2.addEventListener('change', showHide2);
			
			function showHide2() {
				// concat Chart for the canvas ID
				let chart2 = this.options[select2.selectedIndex].value + 'Chart2';
				document.querySelector('.chartClass2').querySelectorAll('canvas')
				// document.querySelectorAll('canvas')
					.forEach(c => {
						c.style.display = (c.id === chart2) ? 'inherit' : 'none';
					})
			};
			
			// For line0Chart
			var ctx = document.getElementById('line0Chart2').getContext('2d');

			var line0Chart2 = new Chart(ctx, {

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
								duration: 60000*3,
								refresh: 5000,

								// delay: 200,
								pause:false,
								onRefresh: function(chart) {

									chart.data.datasets.forEach(function(dataset) {

										dataset.data.push({

											x: Date.now(),

											y: Math.random()*10+10

										});

									});

								}

							}

						}]

					}

				}
				

			});
			
			//For line1Chart
			
			var ctx = document.getElementById("line1Chart2").getContext('2d');
			var line1Chart2 = new Chart(ctx, {
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
						text: "Noise Chart",
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
									return value + " dB"
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
			
			var ctx = document.getElementById('line2Chart2').getContext('2d');

			var line2Chart2 = new Chart(ctx, {

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
