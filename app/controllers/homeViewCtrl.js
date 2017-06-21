"use strict";



app.controller("homeViewCtrl", function(authFactory, dataFactory, $scope, $location, $routeParams) {
    console.log("home view", $scope, $routeParams);

    let user = authFactory.getUserName();
	    console.log("user", user);
	    $scope.currentUser = user;
	    // DataFactory.getUserName(user);
	    console.log("currentUser: ", $scope.currentUser, $location.path());


	// function getRandom(){
	// 	console.log("clicked getRandom");
	// 	Math.floor(Math.random() * 101);
	// 	$scope.generateQuote();
	// }

	$(document).ready(function(){
    	$('.collapsible').collapsible();
  	});

    $scope.generateQuote = function() {
    	console.log("generateQuote clicked");
        $.ajax({
            url: "https://favqs.com/api/qotd",
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                $("#random_quote").html(data.quote.body);
                $("#random_author").html("<br/>&dash;" + data.quote.author + " &dash;</p>");
            }
        });
        };
});
