var vows = require('vows'),
    assert = require('assert'),
	betarator = require('../lib/index'),
	_ = require('underscore'),
	injection = betarator.plugins.injection;
	
function noop() {};

function ContextObject() {
	this.a = 'a';
}

ContextObject.prototype.someMethod = function() {
	return this;
}

vows.describe('Injection plugin').addBatch({
	'Injection should' : {
		topic: function() {
			var context = new ContextObject();
				
			injection.init(noop);
			injection.attach({ on: context, inject: { b: "b" }});
			
			return context;
		},
		'inject additional values as func args' : function(context) {
			var that = context.someMethod();
			
			assert.equal(that.a, "a");
			assert.equal(that.b, "b");
		}
	}

}).export(module);