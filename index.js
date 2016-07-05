var urls = ["http://stackshare.io/airbnb/airbnb", "http://stackshare.io/dropbox/dropbox", "http://stackshare.io/linkedin/linkedin", "http://stackshare.io/pinterest/pinterest", "http://stackshare.io/instacart/instacart", "http://stackshare.io/medium/medium-com", "http://stackshare.io/stack-exchange/stack-overflow", "http://stackshare.io/vine-labs/vine", "http://stackshare.io/shopify/shopify", "http://stackshare.io/keen-io/keen-io", "http://stackshare.io/esa/esa", "http://stackshare.io/codecademy/codecademy", "http://stackshare.io/udemy/udemy", "http://stackshare.io/docker/docker", "http://stackshare.io/500px/500px", "http://stackshare.io/thoughtbot/thoughtbot", "http://stackshare.io/bodybuilding-com/bodybuilding-com", "http://stackshare.io/swat-io/swat-io", "http://stackshare.io/new-yorker/new-yorker", "http://stackshare.io/asana/asana", "http://stackshare.io/groupon/groupon-com", "http://stackshare.io/pubu/pubu", "http://stackshare.io/mailgun/mailgun", "http://stackshare.io/zenefits/zenefits", "http://stackshare.io/pitchfork/pitchfork", "http://stackshare.io/bitnet/bitnet", "http://stackshare.io/clever/clever", "http://stackshare.io/teespring/teespring", "http://stackshare.io/paypal/paypal", "http://stackshare.io/webbylab/webbylab", "http://stackshare.io/codecombat/codecombat", "http://stackshare.io/wix/jvm-stack", "http://stackshare.io/slate-fr/reader-fr", "http://stackshare.io/timehop/timehop", "http://stackshare.io/astrolab/astrolab", "http://stackshare.io/hootsuite/hootsuite", "http://stackshare.io/sentry/sentry", "http://stackshare.io/fitbit/fitbit", "http://stackshare.io/grooveshark/grooveshark", "http://stackshare.io/lookout/lookout", "http://stackshare.io/soylent/soylent", "http://stackshare.io/99designs/99designs", "http://stackshare.io/sendgrid/sendgrid", "http://stackshare.io/deveo/deveo", "http://stackshare.io/teleport/teleport", "http://stackshare.io/fashionunited/fashionunited", "http://stackshare.io/dollar-shave-club/dollar-shave-club", "http://stackshare.io/yammer/yammer", "http://stackshare.io/musixmatch/musixmatch", "http://stackshare.io/hinge/hinge", "http://stackshare.io/circlesix/car-throttle", "http://stackshare.io/zumba/zumba", "http://stackshare.io/packet/packet", "http://stackshare.io/hugo-events/hugo-events", "http://stackshare.io/zalando/zalando", "http://stackshare.io/trotter/trotter", "http://stackshare.io/harvest/harvest", "http://stackshare.io/imgix/imgix", "http://stackshare.io/tilt/tilt", "http://stackshare.io/twilio/twilio", "http://stackshare.io/storyful/storyful", "http://stackshare.io/rainist/banksalad", "http://stackshare.io/myntra/myntra", "http://stackshare.io/surveymonkey/surveymonkey", "http://stackshare.io/coderus/coderus", "http://stackshare.io/new-relic/new-relic", "http://stackshare.io/increments/qiita", "http://stackshare.io/infeedo/infeedo", "http://stackshare.io/arabiaweather-inc-/arabiaweather-inc", "http://stackshare.io/edify/edify", "http://stackshare.io/flipkart/flipkart", "http://stackshare.io/algolia/algolia"];
var Xray = require('x-ray');
var x = Xray();
var fs = require('fs');
var async = require('async');
var resultFile = require('./results.json');
var newArr = [];


async.each(urls, function(url, callback){
	console.log(url + ' requested \n');
	x(url, 'div.tagline-hover', [{
		title: 'a.stack-service-name-under',
		image: 'a.stack-service-logo img[src]@src',
		category: 'a.function-name-under'
	}])(function(err, objs){
		if(!err){
			console.log(url + ' complete \n')
			newArr = newArr.concat(objs);
			callback();
		} else {
			callback(err);
		}
	});
}, function(){
	var unique = {};
	var distinct = [];
	for( var i in newArr ){
		if( typeof(unique[newArr[i].title]) == "undefined"){
			distinct.push(newArr[i]);
		}
		unique[newArr[i].title] = '';
	}
	fs.writeFile('results.json', JSON.stringify(distinct, null, 4), function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("JSON saved to results2.json");
		}
	}); 
});
