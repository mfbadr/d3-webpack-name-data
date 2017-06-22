'use strict';

//const d3 = require('d3');
import * as d3 from "d3";
import * as randomColor from "randomcolor";
import * as $ from "jquery"
// var randomColor = require('randomcolor');
require ('../css/style.css')

const yob1880 = require('../../static/names_parsed/yob1880.json');

var currentDisplayYear = 1880;
var currentDisplaySex = 'M'

window.onload = function() {
	// console.log(yob1880);
	registerInputListeners();
		loadJSON( function(response) {
			var actual_JSON = JSON.parse(response);
			renderYear(actual_JSON);
	 });

	function renderYear(year){
		for (var i = year.length - 1; i >= 0; i--) {
			makeNameCircle(year[i]);
		}
	}


	function makeNameCircle(nameObj){
		var color = nameObj.sex == 'F' ? 'pink' : 'blue';
		d3.select(".d3target")
			.append("svg")
			.attr("width", 25)
			.attr("height", 25)
			.text(nameObj.name)
			.append("circle")
			.attr("cx", 10)
			.attr("cy", 10)
			.attr("r", 10)
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
	xobj.open('GET', 'static/names_parsed/yob1880.json', true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
				if (xobj.readyState == 4 && xobj.status == "200") {
					// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
					callback(xobj.responseText);
				}
	};
	xobj.send(null);  
}

