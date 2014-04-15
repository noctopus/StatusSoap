var models = require('../models');
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: '9TTmDpr4u1RRTbjfnzE4HDGA6',
    consumerSecret: 'xHGFkIgma0U4aVjlcQZzaUbx8AWmqRNzbGoKH18WoyBPfNZ7jv',
    callback: 'http://status-soap.herokuapp.com/'
});

exports.view = function(req, res) {
	if(req.query.oauth_token != null && req.query.oauth_verifier != null){
		twitter.getAccessToken(req.session.token, req.session.secret, req.query.oath_verifier,
			function(error, accessToken, accessTokenSecret, results){
				req.session.accessToken = accessToken;
				req.session.accessSecret = accessTokenSecret;
				res.render('index', {accessToken : accessToken, accessSecret : accessTokenSecret});
			});
	}else{
		res.render('index');
	}
}

exports.viewFB = function(req, res){
	res.render("fb");
}

exports.deleteImage = function(req, res) {
	models.Img.find({ _id: req.body.id }).remove().exec();
	res.redirect('/');
}