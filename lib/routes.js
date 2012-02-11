var app;
var routes = module.exports = function(app){
	app = this;
	return {}
}

routes.index = function() {
	this.res.writeHead(200, { 'Content-Type': 'text/plain' })
	this.res.end(app.render('main'));
}
