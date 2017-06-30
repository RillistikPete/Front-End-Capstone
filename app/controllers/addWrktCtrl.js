"use strict";



app.controller("addWrktCtrl", function (authFactory, dataFactory, $scope, $location, $routeParams, $document) {
	console.log("create workout", $scope, $routeParams);

let user = authFactory.getUser();

	$scope.workout = {
			uid: user,
			Day: $scope.newDay,
			Muscles: $scope.newMuscles,
			Exercises: $scope.newExercise,
			Notes: $scope.newNotes
		};

	// DataFactory.getMyWorkouts(user)
	// .then((workout) => {
	// 	$scope.workout = workout;
	// 	console.log("workout", workout);
	// });



	console.log("$routeParams.workoutid", $routeParams.workoutId);

	$scope.addCreatedWorkout = () => {
		console.log("addworkout");
		dataFactory.addCreatedWorkout($scope.workout)
		.then((response) => {
			console.log("added workout", $scope.workout);
			$location.path('/myWorkouts');
		});
	};

	$document.ready(function(){
		$('select').material_select();
	});

});