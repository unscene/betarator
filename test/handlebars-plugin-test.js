var vows = require('vows'),
    assert = require('assert'),
    betarator = require('../lib/index')(),
	_ = require('underscore');

var context = {};	
vows.describe('Handle bars plugin').addBatch({
    'When using the handlebars plugin' : {
        topic: function() {
			var plugin = betarator.plugins.handlebars;
			
			_.bind(plugin.attach, context)({
                templatesDir: 'test/resources/templates',
                partialsDir: 'test/resources/partials'
            });
			
			_.bind(plugin.init, context)(this.callback);
        },
        'it should scan for templates' : function(plugin) {
            assert.ok(context.templates.hasOwnProperty('template1'));
            assert.ok(context.templates.hasOwnProperty('template2'));
        },
        'it should scan for partials and register them' : function(plugin) {
            assert.ok(context.partials.indexOf('partial1') > -1);
            assert.ok(context.partials.indexOf('partial2') > -1);
        },
        'rendering' : {
            topic: function(plugin) {
                return context.render('template1');
            },
            'should render a template with a registered partial' : function(rendered) {
                assert.ok(rendered == "Hello, world")
            }
        }
    }
}).export(module);