
// Firebase config object
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

// submit button to fire primary events
$("#submit-btn").click(function(){
	event.preventDefault();
		var named = $("#name-input").val().trim();
		var destination = $("#destination-input").val().trim();
		var arrival = $("#frequency-input").val().trim();
		var frequency = $("#arrival-input").val().trim();

// pushes form data into Firebase DB
	database.ref().push({
	name : named,
	dest : destination,
	time : arrival,
	freq : frequency 
	});

// resets the forms to be blank after submission
	$(".form-control").val("");

// DB is queried, latest entry is retrieved, times are beautified using Moment.js and appended into the DOM
database.ref().once("child_added", function(snapshot, prevChildKey) {
	var train = snapshot.val();

	var snapName = train.name;
	var snapDest = train.dest;
	var snapFreq = parseInt(train.freq);
	var firstTrain = train.time;

	var trainTime = moment().hours(firstTrain.slice(0, 2)).minutes(firstTrain.slice(2, -1));
	var maxMoment = moment.max(moment(), trainTime);
	var minsAway, nextArrival;

	//If the first train is later than the current time, sent arrival to the first train time
	if (maxMoment === trainTime) {
		nextArrival = trainTime.format("hh:mm A");
		minsAway = trainTime.diff(moment(), "minutes");
	} else {
		var differenceTimes = moment().diff(trainTime, "minutes");
		var tRemainder = differenceTimes % snapFreq;
		minsAway = snapFreq - tRemainder;
		// To calculate the arrival time, add the minsAway to the currrent time
		nextArrival = moment().add(minsAway, "m").format("hh:mm A");
	}

	$("#table-main > tbody").append("<tr><td>" + snapName + "</td><td>" + snapDest + "</td><td>"
		+ snapFreq + "</td><td>" + nextArrival + "</td><td>" + minsAway + "</td></tr>");
});
});








