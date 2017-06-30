"use strict";

//Authorization and SearchTermData... and other stuff?

app.controller("navCtrl", function($scope, authFactory, dataFactory, $location) {
    console.log("navCtrl");

    $scope.userObj = {
        name: "",
        uid: "",
    };

    $scope.isLoggedIn = false;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.isLoggedIn = true;
            console.log("currentUser logged in", $scope.isLoggedIn);

            $scope.userObj.name = user.displayName;
            $scope.userObj.uid = user.uid;


            dataFactory.addUser(user.uid, $scope.userObj);
            $scope.$apply();
        } else {
            $scope.isLoggedIn = false;
            console.log("currentUser logged in", $scope.isLoggedIn);
            $location.path("/");
        }
    });

    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );


});
