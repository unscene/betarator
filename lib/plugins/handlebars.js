var Handlebars = require('handlebars'),
	fs = require('fs'),
	path = require('path');

exports.name = "handlebars-plugin";

function readFiles(at, yield) {
	var root = path.resolve('.'),
		resolved = path.join(root,at);
		files = fs.readdirSync(resolved);

	files.forEach(function(file){
		var key = file.replace('.hb',''),
			file = fs.readFileSync(path.join(resolved,file),'utf-8');
			
		yield(key, file);				
	})
}

function checkDir(dir, name) {
	if (dir === null) {
		throw new Error(name + ' is not defined');			
	}
	
	return dir;
}

exports.attach = function attach(options) {
	var app = this;
	var options = options;
	
	app.render = function(template, data) {	
		if (app.templates.hasOwnProperty(template)) {
			var source = app.templates[template]
				compiled = Handlebars.compile(source);
			return compiled(data);			
		} else {
			throw new Error(template + ' is undefined');
		}
	}
	
	app.scanForTemplates = function() {
		app.log.info('Scanning for templates');

		var dir = checkDir(options.templatesDir, 'templatesDir'),
			templates = {}

		readFiles(dir, function(name, body) {
			templates[name] = body;
		})
		
		app.__defineGetter__('templates', function() {
			return templates;
		});
	}
	
	app.scanForPartials = function() {
		app.log.info('Scanning for partials');
		
		var dir = checkDir(options.partialsDir, 'partialsDir'),
			partials = []

		readFiles(dir, function(name, body) {
			partials.push(name);
			Handlebars.registerPartial(name, body);
		});
		
		app.__defineGetter__('partials', function() {
			return partials;
		});
	}
}
	
exports.init = function init(done) {
	var app = this;
	app.scanForTemplates();
	app.scanForPartials();
	
	app.__defineGetter__('handlebars', function() {
		return Handlebars;
	});
	
	done();
}