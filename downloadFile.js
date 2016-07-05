var fs = require('fs'),
request = require('request');
var async = require('async');
var urls = require('./results.json');



var series = [];

urls.forEach(function(item){
	series.push(function(callback){
		console.log(item.image + ' requested \n');
		var ext = item.image.split('.').pop();
		request(item.image).pipe(fs.createWriteStream('./images/' + item.title  + '.' + ext)).on('close', callback);
	});
});


async.series(series, function(err){
	 if(err){
	   console.log(err);
	 } else {
	   console.log("Complete");
	 }
});
