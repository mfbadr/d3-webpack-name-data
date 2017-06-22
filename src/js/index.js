'use strict';

//const d3 = require('d3');
import * as d3 from "d3";
import * as randomColor from "randomcolor";
import * as $ from "jquery"
// var randomColor = require('randomcolor');
require ('../css/style.css')

const yob1880 = require('../../static/names_parsed/yob1880.json');

var currentDisplayYear = '1880';
var currentDisplaySex = 'F';

window.onload = function() {
	registerInputListeners();

	// loadNameJSON(currentDisplayYear, function(response) {
	// 	var actual_JSON = JSON.parse(response);
	// 	renderYear(actual_JSON);
	// });

	d3.json("static/names_parsed/yob" + currentDisplayYear + ".json", function(data) {
		renderYear()
	});




	function renderYear(){
		//just use global display name/ sex vars,
		//get json clear and redraw here
		d3.json("static/names_parsed/yob" + currentDisplayYear + ".json", function(data) {
			//lets do the top 100 for now
			data = data.filter(function(name){
				return name.sex == currentDisplaySex;
			})
			drawYear(data.slice(0,100));
		});
		function drawYear(year){
			var clearAll = d3.select('.d3target').selectAll("*").remove();
		// 	var makeSvgs = d3.select(".d3target").selectAll("svg")
		// 	  .data(year)
		// 	  .enter()
		// 	  .append('p')
		// 	  .text(function(d){return d.name + ' (' + d.number + ')'})
	 //      .attr("class", "name")
	 //      .style("color", function(d){

	 //      })
	 //      .style("font-size", function(d){ return getRadius(d)})

			var makeSvgs = d3.select(".d3target").selectAll("svg")
			  .data(year)
			  .enter()
			  .append("svg")
			  .attr("width", function(d){
			  	return getRadius(d) * 2;
			  })
				.attr("height", function(d){
			  	return getRadius(d) * 2;
				})
				.attr('data-name', function(d){return d.name});

			var makeCircles = makeSvgs.append("circle")
				.attr("cx", function(d){ return getRadius(d)})
				.attr("cy", function(d){ return getRadius(d)})
				.attr("r", function(d){ return getRadius(d)})
				.style("fill", function(d){
	      	return d.sex == 'M' ? randomColor({hue:'blue', luminocity: 'dark'}) : randomColor({hue:'pink', luminocity:'dark'});
				});

			var makeNameLabels = makeSvgs
			  .append("text")
			  .text(function(d){return d.name})
	      .attr("font-family", "sans-serif")
	      .attr("text-anchor", "middle")
	      .attr("font-size", "20px")
				.attr("x", function(d){ return getRadius(d)})
				.attr("y", function(d){ return getRadius(d)})

			var makeNumberLabels = makeSvgs
			  .append("text")
			  .text(function(d){return d.number})
	      .attr("font-family", "sans-serif")
	      .attr("text-anchor", "middle")
	      .attr("font-size", "20px")
				.attr("x", function(d){ return getRadius(d)})
				.attr("x", function(d){ return getRadius(d)})
				.attr("y", function(d){ return getRadius(d) + 20})
		}

		function getRadius(nameObj){
			var min = 10;
			var max = 200;
			// var radius = nameObj.number / 50;
			var radius = Math.sqrt(nameObj.number);


			if (radius > max){ return max }
			if (radius < min){ return min }
			return radius;
		}
	}

	function makeNameCircle(nameObj){
		var color = nameObj.sex == 'F' ? 'pink' : 'blue';
		d3.select(".d3target")
			.append("svg")
			.attr("width", 50)
			.attr("height", 50)
			.text(nameObj.name)
			.append("circle")
			.attr("cx", 25)
			.attr("cy", 25)
			.attr("r", 25)
			.style("fill", color);
	};

	function registerInputListeners(){
		$('#yearSelector').change(function(e){
			//just change 'currentDisplayYear' and call render
			currentDisplayYear = e.currentTarget.value;
			$('#currentYear').html(currentDisplayYear);
			renderYear();

		});

		$('#sexSelector').change(function(e){
			//just change 'currentDisplaySex' and call render
			currentDisplaySex = e.currentTarget.checked ? 'M' : 'F';
			$('#currentSex').html(currentDisplaySex);
			renderYear();

			// d3.json("static/names_parsed/yob" + currentYear + ".json", function(data) {
				// renderYear(data)
			// });
		});

	}

	function loadNameJSON(currentDisplayYear, callback) {
		var xobj = new XMLHttpRequest();
				xobj.overrideMimeType("application/json");
				xobj.open('GET', 'static/names_parsed/yob' + currentDisplayYear + '.json', true);
				xobj.onreadystatechange = function () {
					if (xobj.readyState == 4 && xobj.status == "200") {
						callback(xobj.responseText);
					}
		};
		xobj.send(null);
	}

}



