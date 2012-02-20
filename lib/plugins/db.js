var Sequelize = require('sequelize'),
    fs = require('fs'),
    path = require('path');

exports.name = "sequelize-database-plugin";

exports.attach = function attach(options) {
    var app = this;
	
	app.readConfig = function() {
		var config = path.join(path.resolve('.'), '/config/config.json');
		
		var fp = fs.readFileSync(config);
		var config = JSON.parse(fp);
            
		app.db = new Sequelize(config.database,
		    config.username, config.password, config);	
	},
        
    app.loadModels = function() {
        var root = path.resolve('.'),
            modelDir = root + '/lib/models/',
            files = fs.readdirSync(modelDir),
            self = this;
                        
        files.forEach(function (file) {    
            var modelName = file.replace('.js','').toLowerCase();
                model = app.db.import(modelDir + modelName);
                
            app.db.__defineGetter__(modelName, function(){
                return model;
            })
        });        
    }
}
    
exports.init = function init(done) {
    var app = this;
    app.readConfig();    
    app.loadModels();        
    done();
}