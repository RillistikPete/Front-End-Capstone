
"use strict";

app.factory("dataFactory", function($q, $http, FBcreds, authFactory, $window, $routeParams, $route) {

let addCreatedWorkout = function(workoutObject) {
	return $q(function(resolve, reject){
		// let newObject = {
		// 	uid: authFactory.getUser(),
		// 	Muscles: newMuscles,
		// 	Exercises: newExercise,
		// 	Notes: newNotes
		// }
		console.log(workoutObject);
		workoutObject = JSON.stringify(workoutObject);
		$http.post(`${FBcreds.databaseURL}/Created.json`, workoutObject)
		.then(function(response){
			resolve(response.data);
		})
		.catch(function(error){
			reject(error);
		});
	});
};
let getCreatedWorkouts = function() {

	//this craziness allows you to target each long key in FB for each wrkt,
	// which is the "name" so to speak of the individual workout

	// creates the attribute "id:" in the console for the object

	let wrkts = [];
	return $q(function(resolve, reject){
		$http.get(`${FBcreds.databaseURL}/Created.json`)
		.then(function(wrktObject){
			console.log("get created workouts data", wrktObject);
			let allTheWorkouts = wrktObject.data;
			console.log("alltheworkouts", allTheWorkouts);
			Object.keys(allTheWorkouts).forEach((key) => {

				allTheWorkouts[key].workoutId = key;

				wrkts.push(allTheWorkouts[key]);
			});
			resolve(wrkts);
			$window.location.url = "#!/myWorkouts";
		}).catch(function(error){
			reject(error);
		});
	});
};

let addSuggestedWorkout = function(object){
	// function(object) <-- refers to the one I clicked "save" on suggested //
	return $q(function(resolve, reject){
		let JSONstring = JSON.stringify(object);
		console.log("jsonstring", JSONstring);
		$http.post(`${FBcreds.databaseURL}/Created.json`, JSONstring)
		.then(function(response){
			resolve(response.data);
		})
		.catch(function(error){
			reject(error);
		});
	});
};

let deleteWorkout = function(workoutId){
	console.log("clicked deleteWorkout");
	return $q(function(resolve, reject){
		$http.delete(`${FBcreds.databaseURL}/Created/${workoutId}.json`)
		.then(function(response){
			resolve(response);
		})
		.catch(function(error){
			reject(error);
		});
	});
};

let editWorkout = function(workoutId, edited){

	return $q(function(resolve, reject){
		console.log("edited", edited);
		let newObj = JSON.stringify(edited);
		console.log("newObj", newObj);
		$http.patch(`${FBcreds.databaseURL}/Created/${workoutId}.json`, newObj)
		.then(function(response){
			resolve(response);
		})
		.catch(function(error){
			reject(error);
		});
	});
};

let completeWorkout = function (workoutId) {
	console.log("clicked complete Workout");
	return $q(function(resolve, reject){
		$http.delete(`${FBcreds.databaseURL}/Created/${workoutId}.json`)
		.then(function(response){
			resolve(response);
			$route.reload();
		})
		.catch(function(error){
			reject(error);
		});
	});
};

let getSuggestedWorkouts = function () {
	return $q(function(resolve, reject){
		$http.get(`${FBcreds.databaseURL}/Workouts.json`)
		.then( function(data){
			console.log("data", data);
			resolve(data.data);
		}).catch(function(error){
			reject(error);
		});

	});
};



let getMyWorkouts = function() {
	return $q(function(resolve, reject){
		$http.get(`${FBcreds.databaseURL}/Created.json`)
		.then(function(data){
			console.log("data", data);
			resolve(data.data);
		}).catch(function(error){
			reject(error);
		});
	});
};

// let getWorkoutToEdit = function() {
// 	return $q(function(resolve, reject){
// 		$http.get(`${FBcreds.databaseURL}/Workouts/Created.json`)
// 	})
// }



return {
	getSuggestedWorkouts,
	getMyWorkouts,
	addCreatedWorkout,
	addSuggestedWorkout,
	getCreatedWorkouts,
	deleteWorkout,
	editWorkout,
	completeWorkout
};

});