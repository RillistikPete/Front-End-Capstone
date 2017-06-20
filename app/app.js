"use strict";

const app = angular.module("Protein", ["ngRoute", "ui.materialize"]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
        templateUrl: 'partials/auth.html',
        controller: 'authCtrl'
    })
    .when('/homeView', {
        templateUrl: 'partials/homeView.html',
        controller: 'homeViewCtrl'
    })
    .when('/addWorkout', {
    	templateUrl: 'partials/addWorkout.html',
    	controller: 'addWrktCtrl'
    })
    .when('/editWorkout', {
    	templateUrl: 'partials/addWorkout.html',
    	controller: 'editWrktCtrl'
    })
    .when('/myWorkouts', {
    	templateUrl: 'partials/myWorkouts.html',
    	controller: 'myWrktsCtrl'
    })
    .when('/suggested', {
    	templateUrl: 'partials/suggested.html',
    	controller: 'suggestedCtrl'
    })
	.otherwise('/');
});

app.run(($location, FBcreds) => {
    let creds = FBcreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);
});