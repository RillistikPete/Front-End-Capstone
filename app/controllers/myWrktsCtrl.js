// console.log("UserDetailsCtrl");

// let user = authFactory.getUserName();
// console.log("",user);
// $scope.currentUser = user;
// // DataFactory.getUserName(user);
// console.log("currentUser: ", $scope.currentUser, $location.path());


"use strict";



app.controller("myWrktsCtrl", function(dataFactory, $scope, $location, authFactory, $document, $routeParams) {
    console.log("myWorkouts control");

    let user = authFactory.getUser();

    $scope.getMyWorkouts = function() {
        let wrkts = [];
        dataFactory.getMyWorkouts($routeParams.workoutId)
            .then((workouts) => {
                //this takes the long key of each object and assigns it to an id property of the object

                // Object.keys(workouts).forEach((workout) => {

                //     workouts[workout].id = workout;
                //  // workouts is the index of all of them, workout singular is an individual one
                //     workouts[workout].Exercises = workouts[workout].Exercises.split(',');
                //     console.log("workouts[workout]", workouts[workout]);


                //     wrkts.push(workouts[workout]);
                // });
                $scope.workouts = wrkts;
                console.log(workouts);
            });
    };

    $scope.deleteWorkout = function(workoutId) {
        console.log("workoutId", workoutId);
        dataFactory.deleteWorkout(workoutId)
            .then((deleteds) => {
                $scope.getMyWorkouts();
            });
    };


    $scope.editWorkout = function(workoutId, edited) {
        console.log("workoutId", workoutId);
        let editedObj = {Day: edited.Day,
        				 Muscles: edited.Muscles,
        				 Exercises: edited.Exercises};

        dataFactory.editWorkout(workoutId, editedObj)
            .then((editeds) => {
                $scope.getMyWorkouts();
            });
    };

    $scope.completeWorkout = function(workoutId) {
        console.log("workoutId", workoutId);
        dataFactory.completeWorkout(workoutId)
            .then((completed) => {
            	$scope.getMyWorkouts();
    		});
    };



    $(document).ready(function() {
    	$('completeModal').modal();
	});

    $document.ready(function() {
        $('select').material_select();
    });

    $(document).ready(function() {
        $('.button-collapse').sideNav({
            closeOnClick: true
        });
    });

    $scope.getMyWorkouts();


});




// 	if($location.path() == "/myWorkouts") {
// 		console.log("peeface");
// 		$('#userBoards')[0].classList.add('btn-success');
// 	} else if($location.path() == "/userPins") {
// 		console.log("peeface");
// 		$('#userPins')[0].classList.add('btn-success');
// 	}
