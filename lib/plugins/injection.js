var _ = require('underscore');

exports.name = "injection-plugin";

exports.attach = function attach(options) {
	var on = options.on,
		inject = options.inject;
		
	if (typeof on !== 'function') return;
	
	on.call(_.extend(on,inject));
}
	
exports.init = function init(done) {
	done();
}
