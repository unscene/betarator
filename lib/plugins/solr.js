var solr = require('solr'),
	util = require('util'),
	async = require('async');

exports.name = 'solr-plugin';

exports.attach = function(options) {
	var app = this;

	debugger;	
	app.solr = new solr.createClient(options);
	
	app.solr.addAll = function(docs, cb) {
	    var list = [];
		
		debugger;
	    docs.forEach(function(doc){
	        list.push(function(callback){
	            client.add(doc, callback);
	        });
	    });		
		
		debugger;
	    async.parallel(list, function(err, res) {
			client.commit();
			cb(err,res);
	    });
	}
	
	app.solr.removeAll = function(cb) {
	    client.del(null, "*:*", cb);
	    client.commit();
	}
}

exports.init = function(done) {
	var app = this;
	done();
}