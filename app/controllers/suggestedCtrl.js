"use strict";

//get and show all pins belonging to user from FB. remove unwanted pins

app.controller("suggestedCtrl", function (dataFactory, $scope, $location, authFactory, $routeParams) {
	console.log("suggested ctrl");

	$scope.addSuggestedWorkout = (saved) => {
		//(saved) is same as (key) in partial

		let user = authFactory.getUser();

		// this object below is necessary to pull info from FB objects
		let suggObject = {
			uid: user,
			Day: saved.Day,
			Muscles: saved.Muscles,
			Exercises: saved.Exercises
		};
		console.log("add suggested workout");
		dataFactory.addSuggestedWorkout(suggObject)
		.then((response) => {
			console.log("added workout", response);
			$location.path('/myWorkouts');
		});
	};

	$scope.getSuggestedWorkouts = function(){
		let wrkts = [];
		dataFactory.getSuggestedWorkouts()
		.then((workouts) => {


			Object.keys(workouts).forEach(function(workout) {
			// 	console.log("the workouts", workouts);
			// 	workouts[workout].id = workout;
			console.log("our workouts", workouts);
		 	workout = workout.split(',');
			// 	console.log("workout[workout]", workouts[workout]);

   			   wrkts.push(workout);

			});

			$scope.workouts = workouts;
		});
	 };

	$scope.getSuggestedWorkouts();


});