var vows = require('vows'),
    assert = require('assert'),
	betarator = require('../lib/index'),
	flatiron = require('flatiron'),
	app = flatiron.app,
	fixtures = require('./fixtures/index');

vows.describe('Solr plugin').addBatch({
 	"The solr plugin extensions" : {
		topic: function() {
			app.use(betarator.plugins.solr);
			app.init(this.callback);
		},
		"allow you to add multiple documents": {
			topic: function() {
				app.solr.addAll(fixtures.solr, this.callback);
			}
		},
		"allow you to remove multiple documents": {
			topic: function() {
				app.solr.removeAll(this.callback);
			}
		}		
	},
	"When searching with the solr plugin" : {
		
	}
}).export(module);
