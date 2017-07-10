'use strict';

//const d3 = require('d3');
import * as d3 from "d3";
import * as randomColor from "randomcolor";
import * as $ from "jquery"
require ('../css/style.scss')
// var randomColor = require('randomcolor');

// const yob1880 = require('../../static/names_parsed/yob1880.json');
var currentDisplayYear = '1880';
var currentDisplaySex = 'F';
var currentMinOccurances = 0;
var currentMaxOccurances = Infinity;

window.onload = function() {
	registerInputListeners();
	renderYear()

	function renderYear(){
		var mostPopularNameNumber;
		enterLoadingState();
		d3.json("static/names_parsed/yob" + currentDisplayYear + ".json", function(error, data) {
			var filteredData = filterData(data);
			exitLoadingState();
			drawYear(filteredData);
		});
		//////
		function drawYear(year){
			mostPopularNameNumber = year[0].number;
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
					// return d.sex == 'M' ? randomColor({hue:'blue', luminocity: 'dark'}) : randomColor({hue:'pink', luminocity:'dark'});
					return d.sex == 'M' ? '#AFf0f7' : '#FFC9EC';
				});

			var makeNameLabels = makeSvgs
				.append("text")
				.text(function(d){return d.name})
				.attr("font-family", "sans-serif")
				.attr("text-anchor", "middle")
				.attr("font-size", function(d){
					const min = 10;
					if (getRadius(d)/3 < min){ return min }
					return getRadius(d)/3;
				})
				.attr("x", function(d){ return getRadius(d)})
				.attr("y", function(d){ return getRadius(d)})


			var tooltip = makeCircles
				.append('div')
		    .style("position", "absolute")
		    .style("z-index", "10")
		    .style("visibility", "hidden")
		    .text("a simple tooltip");

		    makeCircles
		    .on("mouseover", function(){return tooltip.style("visibility", "visible");})
				.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
				.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

			var makeNumberLabels = makeSvgs
				.append("text")
				.text(function(d){return d.number})
				.attr("font-family", "sans-serif")
				.attr("text-anchor", "middle")
				.attr("font-size", function(d){
					const min = 10;
					if (getRadius(d)/4 < min){ return min }
					return getRadius(d)/4;
				})
				.attr("x", function(d){ return getRadius(d)})
				.attr("x", function(d){ return getRadius(d)})
				.attr("y", function(d){
					if(getRadius(d) > 30){
					 return getRadius(d)*1.25;
					}
				  return getRadius(d)*1.5;
				})
		}

		function getRadius(nameObj){
			const relativePoplarity = nameObj.number/mostPopularNameNumber;
			const mostPopularNameArea = 75000;
			const min = 20;
			const radius = Math.sqrt(((relativePoplarity * mostPopularNameArea)/Math.PI));
			// var radius = 200 * relativePoplarity;

			// if (radius > max){ return max }
			if (radius < min){ return min }
			return radius;
		}
	}

	function enterLoadingState(){
		var clearAll = d3.select('.d3target').selectAll("*").remove();
		$('#renderYearButton').hide();
		$('.spinner-wrapper').show();
	}
	function exitLoadingState(){
		var clearAll = d3.select('.d3target').selectAll("*").remove();
		$('#renderYearButton').show();
		$('.spinner-wrapper').hide();
	}

	function filterData(data, limit){
		var filteredData = data.filter(function(name){
			if( currentMaxOccurances == Infinity){
				return name.sex == currentDisplaySex &&
						 name.number >= currentMinOccurances;
			} else{
				return name.sex == currentDisplaySex &&
						 name.number >= currentMinOccurances &&
						 name.number <= currentMaxOccurances;
			}
		});
		// filteredData = filteredData.slice(0, limit || 1000);
		return filteredData;
	}

	// function makeNameCircle(nameObj){
	// 	var color = nameObj.sex == 'F' ? 'pink' : 'blue';
	// 	d3.select(".d3target")
	// 		.append("svg")
	// 		.attr("width", 50)
	// 		.attr("height", 50)
	// 		.text(nameObj.name)
	// 		.append("circle")
	// 		.attr("cx", 25)
	// 		.attr("cy", 25)
	// 		.attr("r", 25)
	// 		.style("fill", color);
	// };

	function registerInputListeners(){
		$('#yearSelector').change(function(e){
			currentDisplayYear = e.currentTarget.value;
			$('#currentYear').html(currentDisplayYear);
		});

		$('#sexSelector').change(function(e){
			currentDisplaySex = e.currentTarget.value;
			$('#currentSex').html(currentDisplaySex);
		});

		$('#maxOccurancesInput').change(function(e){
			if(e.currentTarget.value == ''){
				currentMaxOccurances = Infinity;
				// $('#currentMaxOccurances').html('Unlimited');
			} else {
				currentMaxOccurances = e.currentTarget.value;
				$('#currentMaxOccurances').html(currentMaxOccurances);
			}
		});

		$('#renderYearButton').click(function(e){
			renderYear();
		})

		$('#minOccurancesInput').blur(function(e){
			if(e.currentTarget.value == ''){
				currentMinOccurances = '0';
				$('#currentMinOccurances').html(currentMinOccurances);
			} else {
				currentMinOccurances = e.currentTarget.value;
				$('#currentMinOccurances').html(currentMinOccurances);
			}
		});
	}
}
