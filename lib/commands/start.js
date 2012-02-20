module.exports = function(app) {
	return function() {
		app.start(8080, function() {
			app.log.info('server started on port 8080');
		});		
	}
}
