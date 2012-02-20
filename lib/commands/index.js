module.exports = function(app) {
	return {
		start: require('./start')(app),
		linkConfig: require('./link-config')(app)
	}
}
