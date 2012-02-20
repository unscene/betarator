module.exports = function(app) {
	return {
		plugins: require('./plugins/index'),
		commands: require('./commands/index')(app)
	}
}