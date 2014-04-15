var models = require('../models');

exports.view = function(req, res) {
	res.render('index');
}

exports.viewFB = function(req, res){
	res.render("fb");
}

exports.deleteImage = function(req, res) {
	models.Img.find({ _id: req.body.id }).remove().exec();
	res.redirect('/');
}