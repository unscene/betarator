exports.index = function() {
	this.res.end(this.render('main', { title: 'aa'} ));
}
