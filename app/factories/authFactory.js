"use strict";

app.factory("authFactory", function() {

    let currentUser = null,
        currentUserName = null;


    let getUser = function() {
        return currentUser;
    };

    let authWithProvider = function(provider) {
        return firebase.auth().signInWithPopup(provider);
    };

    let getUserName = function() {
        return currentUserName;
    };

    let createUser = function(userObj) {
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error:", errorCode, errorMessage);
            });
    };

    let loginUser = function(userObj) {
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error:", errorCode, errorMessage);
            });
    };


    let logoutUser = function() {
        console.log("logoutUser");
        return firebase.auth().signOut();
    };

    let isAuthenticated = function() {
        console.log("authFactory: isAuthenticated");
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    currentUser = user.uid;
                    currentUserName = user.displayName;
                    console.log("user", user.uid);
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };

    return {
    		 authWithProvider,
    		 logoutUser,
    		 getUser,
    		 getUserName,
    		 isAuthenticated,
    		 loginUser,
    		 createUser
    		};

});
