"use strict";


// Authorization (from AuthFactory)
app.controller("authCtrl", function ($scope, authFactory, $window, $location) {
    console.log("authCtrl");

 $scope.loginGoogle = () => {
    console.log("clicked loginGoogle");
    let provider = new firebase.auth.GoogleAuthProvider();
    authFactory.authWithProvider(provider)
      .then(function (result) {
        var user = result.user.uid;
        authFactory.isAuthenticated();
        console.log("logged in user:", user);
        // $http.post(`${FBcreds.databaseURL}/users`, user);
        //Once logged in, go to another view
        $location.path("/homeView");
        $scope.$apply();
      }).catch(function (error) {
        // Handle the Errors.
        console.log("error with google login", error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  $scope.logout = () => {
    console.log("logout clicked");
    authFactory.logoutUser()
      .then(function (data) {
        console.log("logged out", data);
        $window.location.url = "#!/"; //instead of '$location.path' that used to be here
      }, function (error) {
        console.log("error occured on logout");
      });
  };
});