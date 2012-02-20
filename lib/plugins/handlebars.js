var Handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

exports.name = "handlebars-plugin";

var valid = /^.*\.(hb)$/;

function readFiles(at, yield) {
    var files = fs.readdirSync(at);
    files = _.filter(files, function(x) { return valid.test(x) });
    
    files.forEach(function(file){
        var key = file.replace('.hb',''),
            file = fs.readFileSync(path.join(at,file),'utf-8');
            
        yield(key, file);                
    })
}

function expandDir(dir) {
    var root = path.resolve('.'),
        resolved = path.join(root,dir);
    
    try {
        fs.statSync(resolved);
        return resolved;
    } catch (ex) {
        app.log.warn(ex);
    }
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
        if (app.log) app.log.info('Scanning for templates');
        
        var dir = expandDir(options.templatesDir),
            templates = {};
            
        if (!dir) return; 

        readFiles(dir, function(name, body) {
            templates[name] = body;
        })
        
        app.__defineGetter__('templates', function() {
            return templates;
        });
    }
    
    app.scanForPartials = function() {
        if (app.log) app.log.info('Scanning for partials');
        
        var dir = expandDir(options.partialsDir),
            partials = []
        
        if (!dir) return;

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
