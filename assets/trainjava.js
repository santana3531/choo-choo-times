  var config = {
    apiKey: "AIzaSyCn5fo7xjeHUcPD4QmAlW5KtU7kAkd4uMw",
    authDomain: "train-48dcc.firebaseapp.com",
    databaseURL: "https://train-48dcc.firebaseio.com",
    projectId: "train-48dcc",
    storageBucket: "",
    messagingSenderId: "176731548998"
  };
  firebase.initializeApp(config);

    var database = firebase.database();




  var name = "";
  var destination = "";
  var firstTrain = 0;
  var frequency = 0;

  $('#add-train').on("click", function(event){
  	event.preventDefault();

  	//Grab Values for form
  	name = $('#train-name').val().trim();
  	destination = $('#train-destination').val().trim();
  	firstTrain = $('#train-first').val().trim();
  	frequency = $('#train-frequency').val().trim()

  	      // Code for handling the push
      database.ref().push({
          name: name,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      });

  });

  // Firebase watcher + initial loader HINT: .on("value")
  database.ref().on("value", function(snapshot) {

      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Getting an array of each key In the snapshot object
      var svArr = Object.keys(sv);

      // Finding the last user's key
      var lastIndex = svArr.length - 1;

      var lastKey = svArr[lastIndex];

      // Using the last user's key to access the last added user object
      var lastObj = sv[lastKey]

      // Console.loging the last user's data
      console.log(lastObj.name);
      console.log(lastObj.destination);
      console.log(lastObj.firstTrain);
      console.log(lastObj.frequency);

      // Change the HTML to reflect
      var tr = $("<tr>")
      $("tbody").append(tr);
      tr.append("<td>" + lastObj.name + "<td>" + lastObj.destination + "<td>" + lastObj.frequency);

      $("#train-name").val("");
      $("#train-destination").val("")
      $("#train-first").val("")
      $("#train-frequency").val("")


      // Handle the errors
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });

