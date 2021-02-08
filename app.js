"use strict"
/**
* @name app.js
* @file CE Exercise.
* @author Diego Viquez <dviquez@movableink.com>
* @version 1.0.0
*/

window.addEventListener('load', init, false);

function init() {

	generateBtn.onclick = generateOnClick;
	function generateOnClick() {

		const zipcode = document.getElementById('zip').value;
		let city = document.getElementById('city').value;
		city = city.toUpperCase();
		const today = moment().format('MM/DD/YYYY')

		fetch(`https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${zipcode}`)
			.then(response => response.json())
			.then(coordinates => {

				const lat = coordinates.latitude;
				const long = coordinates.longitude;

				fetch(`https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${lat}&longitude=-${long}&date=${today}`)
					.then(response => response.json())
					.then(data => {
						
						const timeFirst = moment.unix(data.daily.data[0].time).format('dddd')
						const timeSecond = moment.unix(data.daily.data[1].time).format('dddd')
						const timeThird = moment.unix(data.daily.data[2].time).format('dddd')

						const condition1 = data.daily.data[0].icon
						const condition2 = data.daily.data[1].icon
						const condition3 = data.daily.data[2].icon

						const tempHigh1 = data.daily.data[0].temperatureHigh
						const tempHigh2 = data.daily.data[1].temperatureHigh
						const tempHigh3 = data.daily.data[2].temperatureHigh

						const tempLow1 = data.daily.data[0].temperatureLow
						const tempLow2 = data.daily.data[1].temperatureLow
						const tempLow3 = data.daily.data[2].temperatureLow

						document.querySelector('.city').innerText = `WEATHER FORECAST FOR ${city}`

						document.querySelector('.dow1').innerText = `Today`
						document.querySelector('.dow2').innerText = timeSecond
						document.querySelector('.dow3').innerText = timeThird

						document.querySelector('.weather1').innerText = condition1
						document.querySelector('.weather2').innerText = condition2
						document.querySelector('.weather3').innerText = condition3

						document.querySelector('.temp1').innerText = `${tempHigh1}°/${tempLow1}°`
						document.querySelector('.temp2').innerText = `${tempHigh2}°/${tempLow2}°`
						document.querySelector('.temp3').innerText = `${tempHigh3}°/${tempLow3}°`
					}

					);
			}
			);

	}

}
