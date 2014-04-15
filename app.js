//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var app = express();
app.use(express.cookieParser('S3CRE7'));
app.use(express.cookieSession());
app.use(app.router);

var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: '9TTmDpr4u1RRTbjfnzE4HDGA6',
    consumerSecret: 'xHGFkIgma0U4aVjlcQZzaUbx8AWmqRNzbGoKH18WoyBPfNZ7jv',
    callback: 'http://status-soap.herokuapp.com'
});

//route files to load
var index = require('./routes/index');

//load environment variables
var dotenv = require ('dotenv');
dotenv.load();

//Configures the Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

//routes
app.all('/', index.view);
app.all('/main', index.viewFB);
app.get("/twitter/auth", function(req,res){

	twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    	if (error) {
        	console.log("Error getting OAuth request token : " + error);
    	} else {
    		req.session.token = requestToken;
    		req.session.secret = requestTokenSecret;
    		res.redirect("https://twitter.com/oauth/authenticate?oauth_token="+requestToken);
        //store token and tokenSecret somewhere, you'll need them later; redirect user
    	}
	});
});



//set environment ports and start application
app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});