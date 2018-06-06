var config = {

  apiKey: "AIzaSyDhMmjz_lhMwMcDdzNf9dG0iph0TUiaSro",
  authDomain: "train-schedule-8158f.firebaseapp.com",
  databaseURL: "https://train-schedule-8158f.firebaseio.com",
  projectId: "train-schedule-8158f",
  storageBucket: "",
  messagingSenderId: "756493648812"
  
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {

  event.preventDefault();

  var trainName = $("#train-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var firstTrain = moment($("#first-input").val().trim(), "HH:mm").subtract(10, "years").format("X");;

  database.ref().push({

    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstTrain: firstTrain,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  });

});

database.ref().on("child_added", function (childSnapshot) {

  var firebaseTrainName = childSnapshot.val().trainName;
  var firebaseDestination = childSnapshot.val().destination;
  var firebaseFrequency = childSnapshot.val().frequency;
  var firebaseFirstTrain = childSnapshot.val().firstTrain;

  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTrain);
  console.log(childSnapshot.val().frequency);

  var diffTime = moment().diff(moment.unix(firebaseFirstTrain), "minutes");
  var timeRemainder = moment().diff(moment.unix(firebaseFirstTrain), "minutes") % firebaseFrequency;
  var minutes = firebaseFrequency - timeRemainder;
  var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

  $("#addedTable > tbody").append("<tr><td>" + firebaseTrainName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td><td>");

});
