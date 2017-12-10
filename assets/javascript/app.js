// Function needed to add the train details of the form group.

// Form fields need to be calculated against first train start.

// Based on train start and frequency determine when the next
// train will arrive.

// Function should calculate when the next train will arrive, relative to current time.

// The data should be stored in a database(firebase) as admins and users will need to access it anywhere.
// Data should generate dynmaically on the pageload.

var config = {
    apiKey: "AIzaSyCtbDex0UVg_Y-qCz9qwrVv4BOsGhXQZuY",
    authDomain: "train-scheduler-4c082.firebaseapp.com",
    databaseURL: "https://train-scheduler-4c082.firebaseio.com",
    projectId: "train-scheduler-4c082",
    storageBucket: "",
    messagingSenderId: "292703910758"
  };
firebase.initializeApp(config);

var database = firebase.database();

var trainNameInput = $("#name-input");
var trainDestinationInput = $("#destination-input");
var trainFrequencyInput = $("#frequency-input");
var trainArrivalInput = $("#arrival-input");

function addTrainDeets(){
var named = trainNameInput.val().trim();
var destination = trainDestinationInput.val().trim();
var arrival = trainArrivalInput.val().trim();
var frequency = trainFrequencyInput.val().trim();

	event.preventDefault();

	var dataObject = {
	name : named,
	dest : destination,
	time : arrival,
	freq : frequency 
	};

	console.log(dataObject)

	database.ref().push(dataObject);

	$(".form-control").val("");

};

// submit button click function
$("#submit-btn").click(function(){
	addTrainDeets();
	childFunction();
});

var childFunction = function(){ 

	database.ref().on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());

	var snapName = childSnapshot.val().name;
	var snapDest = childSnapshot.val().dest;
	var snapArrival = childSnapshot.val().time;
	var snapFreq = childSnapshot.val().freq;

	var timePretty = moment.unix(snapArrival).format("hh:mm a");

	console.log(timePretty);

	$("#table-main > tbody").append("<tr><td>" + snapName + "</td><td>" + snapDest + "</td><td>"
	+ snapArrival + "</td><td>" + snapFreq + "</td></tr>");

});
};








