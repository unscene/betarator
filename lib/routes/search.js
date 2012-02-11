exports.index = function(req, res){
    res.render('search', {
        results: req.results,
        title: "Betarator"
    })
};