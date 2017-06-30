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
		dataFactory.getSuggestedWorkouts($routeParams.workoutId)
		.then((workouts) => {


			Object.keys(workouts).forEach((workout) => {

                    workouts[workout].id = workout;
                 // workouts is the index of all of them, workout singular is an individual one
                    workouts[workout].Exercises = workouts[workout].Exercises.split(',');
                    console.log("workouts[workout]", workouts[workout]);


                    wrkts.push(workouts[workout]);

			});

			$scope.workouts = workouts;
		});
	 };

	$scope.getSuggestedWorkouts();


});