var models = require('../models');

exports.view = function(req, res) {
	res.render('index');
}

exports.deleteImage = function(req, res) {
	models.Img.find({ _id: req.body.id }).remove().exec();
	res.redirect('/');
}