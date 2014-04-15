  var viewModel = {
    userInfo : ko.observable({}),
    userPosts : ko.observableArray([])
    }
  ko.applyBindings(viewModel, document.getElementById("app"));

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '854011474615306',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
  // for any authentication related change, such as login, logout or session refresh. This means that
  // whenever someone who was previously logged out tries to log in again, the correct case below 
  // will be handled. 
  FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      testAPI();
    } else if (response.status === 'not_authorized') {
      FB.login(function(response) {
        testAPI();
      }, {scope: 'user_status, read_stream'});
    } else {
      FB.login(function(response) {
        testAPI();
      }, {scope: 'user_status, read_stream'});
    }
  });
  };

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
      console.log(response);
      viewModel.userInfo(response);
      getPosts();
    });
  }

  function getPosts() {
    FB.api('/me/feed', function(response) {
        console.log(response);
        displayPost(response.data);
      }, {perms:'read_stream'})
  }

  function displayPost(response) {
    response = response.filter(function(element){return (element.type == "status" || element.type == "photo")})

    for (var i = 0; i < response.length; i++) {
      if (response[i].story != null) {
        response[i].text = response[i].story;
      }
      else if (response[i].message != null) {
        response[i].text = response[i].message;
      }
    }
    viewModel.userPosts(response);
      

  }

function logout(){
  FB.logout(function(response){});
}

function getUserInfo() {
  FB.api(
          "/me",
          function (response) {
            if (response && !response.error) {
              /* handle the results */
            }
        });
}