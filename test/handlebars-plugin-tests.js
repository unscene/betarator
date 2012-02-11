var vows = require('vows'),
    assert = require('assert'),
	flatiron = require('flatiron'),
	app = flatiron.app,
	betarator = require('../lib/index');

vows.describe('Handle bars plugin').addBatch({
	'When using the handlebars plugin' : {
		topic: function() {
			app.use(betarator.plugins.handlebars, {
				templatesDir: 'test/resources/templates',
				partialsDir: 'test/resources/partials'
			});
			app.init(this.callback);
		},
		'it should scan for templates' : function() {
			assert.ok(app.templates.hasOwnProperty('template1'));
			assert.ok(app.templates.hasOwnProperty('template2'));
		},
		'it should scan for partials and register them' : function() {
			assert.ok(app.partials.indexOf('partial1') > -1);
			assert.ok(app.partials.indexOf('partial2') > -1);
		},
		'rendering' : {
			topic: function() {
				return app.render('template1');
			},
			'should render a template with a registered partial' : function(rendered) {
				assert.ok(rendered == "Hello, world")
			}
		}
	}
}).export(module);