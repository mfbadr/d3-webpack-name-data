'use strict';

//const d3 = require('d3');
import * as d3 from "d3";
import * as randomColor from "randomcolor";
import * as $ from "jquery"
// var randomColor = require('randomcolor');
require ('../css/style.css')

const yob1880 = require('../../static/names_parsed/yob1880.json');

var currentDisplayYear = '1880';
var currentDisplaySex = 'M';

window.onload = function() {
	registerInputListeners();
	loadJSON( function(response) {
		var actual_JSON = JSON.parse(response);
		renderYear(actual_JSON);
	});

	function renderYear(year){
		d3.select(".d3target").selectAll("svg")
		  .data(year)
		  .enter()
		  .append("svg")
		  .text(function(d){return d.name;})
		  .attr("width", function(d){
		  	return getRadius(d) * 2;
		  })
			.attr("height", function(d){
		  	return getRadius(d) * 2;
			})
			.append("circle")
			.attr("cx", function(d){ return getRadius(d)})
			.attr("cy", function(d){ return getRadius(d)})
			.attr("r", function(d){ return getRadius(d)})
			.style("fill", function(d){
				if(d.sex == 'M'){ return 'blue'};
				return 'pink';
			});;

			function getRadius(nameObj){
				var min = 5;
				var max = 500;
				var radius = nameObj.number / 100;

				if (radius > max){ return max.toString() }
				if (radius < min){ return min.toString() }
				return radius.toString();
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
			debugger;
			currentYear = e.currentTarget.value;
			renderYear(currentYear);
		})
	}
}

function loadJSON(callback) {   
	var xobj = new XMLHttpRequest();
			xobj.overrideMimeType("application/json");
	xobj.open('GET', 'static/names_parsed/yob1880.json', true);
	xobj.onreadystatechange = function () {
				if (xobj.readyState == 4 && xobj.status == "200") {
					callback(xobj.responseText);
				}
	};
	xobj.send(null);  
}

