var vows = require('vows'),
    assert = require('assert'),
    db = require('../lib/plugins/db'),
    flatiron = require('flatiron'),
    app = flatiron.app,
    path = require('path'),
    fs = require('fs');

vows.describe('Database plugin').addBatch({
    "Initialzing the plugin" : {
	topic: function(){
	    app.use(db);
	    app.init(this.callback);
	},
	"should return a valid db instance" : function() {
	    assert.ok(app.db !== undefined);
	    assert.ok(app.db.connectorManager instanceof Object)
	},
	"should load all models": function() {
	    var root = path.resolve('.'),
		modelDir = root + '/lib/models/',
		files = fs.readdirSync(modelDir),
		self = this;

	    files.forEach(function (file) {
		var modelName = file.replace('.js','').toLowerCase();
		assert.ok(app.db[modelName] instanceof Object);
	    });
	}
    }
}).export(module);