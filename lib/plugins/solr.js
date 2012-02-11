var solr = require('solr'),
	util = require('util'),
	async = require('async');

exports.name = 'solr-plugin';

exports.attach = function(options) {
	var app = this;
	
	app.solr.addAll = function(docs, cb) {
	    var list = [];
	    docs.forEach(function(doc){
	        list.push(function(callback){
	            client.add(doc, callback);
	        });
	    });		
	    async.parallel(list, function(err, res) {
			if (err) throw err;
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
	app.solr = new solr.createClient(options);
	done();
}