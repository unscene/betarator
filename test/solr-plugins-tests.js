var vows = require('vows'),
    assert = require('assert'),
	betarator = require('../lib/index'),
	flatiron = require('flatiron'),
	app = flatiron.app,
	fixtures = require('./fixtures/index');

vows.describe('Solr plugin').addBatch({
 	"When using the solr plugin" : {
		topic: function() {
			debugger;
			app.use(betarator.plugins.solr);
			app.init(this.callback);
		},
		"should be able to add multiple documents": {
			topic: function() {
				debugger;
				app.solr.addAll(fixtures.solr, this.callback);
			},
			"and be queryable immediately" : {
				topic: function() {
					app.solr.query("*:*", this.callback);
				},
				"Returns 4 records": function(err, response){
					assert.equal(err, null);
					var obj = JSON.parse(response);
					assert.equal(obj.response.docs.length, 4);
				}
			}
		}		
	}
}).export(module);
