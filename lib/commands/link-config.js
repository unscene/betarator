var fs = require('fs'),
    path = require('path');

module.exports = function(app) {
	return function() {
		var root = path.resolve('.');
		var to = root + '/config/config.json';
		var from = root + '/config/' + app.env + '-config.json';
	
		try {
		    fs.unlinkSync(to);
		} finally {
		    fs.symlinkSync(from, to);
		}
		app.log.info('Linked database configuration'); 			
	}
}
