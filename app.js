// App.js
// Citation for the following setup functions:
// Date 2/22/23
// Copied from https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Express
var express = require('express');                               // We are using the express library for the web server
var app     = express();                                        // We need to instantiate an express object to interact with the server in our code
PORT        = 2426;                                             // Set a port number at the top so it's easy to change in the future
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Database
var db = require("./database/db-connector");
// Handlebars
const { engine } = require("express-handlebars"); // Sets handlebars as the rendering engine
var exphbs = require("express-handlebars"); // Import express-handlebars
app.engine(".hbs", engine({ extname: ".hbs" })); // Create an instance of the handlebars engine to process templates
app.set("view engine", ".hbs"); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Main route to index paige
// Citation for the following function:
// Date 2/22/23
// copied from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
app.get("/", function (req, res) {
	res.render("index"); // Responds to GET request with a rendering of the Index.hbs page as part of Handlebars functionality
});

// Routes GET requests for Locations table page
// Citation for the following function:
// Date 2/22/23
// Addapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
app.get("/locations.hbs", function (req, res) {
	// Defines basic SQL queries to SELECT data from needed tables
	let query1 = "SELECT * FROM Locations;";
	let query2 = "SELECT * FROM Airports;";

	db.pool.query(query1, function (error, rows, fields) {
		// Execute the first query
		let locations = rows; // Creates object to hold the data from the rows of the first query

		db.pool.query(query2, (error, rows, fields) => {
			// Executes the second query
			let airports = rows; // Store data from second query rows

			// Return a render of the locations.hbs file in response to GET request, passes row data from both queries ran above
			return res.render("locations", { data: locations, airports: airports });
		});
	});
});

// Routes POST requests to INSERT row to Locations table
// Citation for the following function:
// Date 2/22/23
// Addapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

app.post("/add_location", function (req, res) {
	let data = req.body; // Retreives data from the body of the POST request, stores as object

	// Check for optional data, sets blank input to NULL value
	if (data["in-city"] == "") {
		data["in-city"] = "NULL";
	}

	// Defines SQL query to INSERT the passed in values to a new row int hte Locations table
	query1 = `INSERT INTO Locations(location_id, country, city, airport_id, vaccine_required) VALUES ('${data["in-location_id"]}', '${data["in-country"]}', '${data["in-city"]}', '${data["in-airport_id"]}', '${data["in-vaccine_required"]}');`;
	db.pool.query(query1, function (error, rows, fields) {
		// Executes defined SQL query
		// Error handler to log SQL query error to consonle and respond to POST request with error status
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
		// If SQL querry executes without error, returns a fresh rendering of locations.hbs in response to POST request displaying newly inserted row
		else {
			res.redirect("/locations.hbs");
		}
	});
});

// This function adapted from the above GET function
app.get("/airports.hbs", function (req, res) {
	let query1 = "SELECT * FROM Airports;";

	db.pool.query(query1, function (error, rows, fields) {
		res.render("airports", { data: rows });
	});
});

// This function adapted from the above POST function
app.post("/add_airport", function (req, res) {
	let data = req.body;

	if (isNaN(parseInt(data["in-shuttle_available"]))) {
		data["in-shuttle_available"] = "NULL";
	}

	if (isNaN(parseInt(data["in-premium_lounge"]))) {
		data["in-premium_lounge"] = "NULL";
	}

	query1 = `INSERT INTO Airports(airport_id, country, city, shuttle_available, premium_lounge) VALUES ('${data["in-airport_id"]}', '${data["in-country"]}', '${data["in-city"]}', '${data["in-shuttle_available"]}', '${data["in-premium_lounge"]}');`;
	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			res.redirect("/airports.hbs");
		}
	});
});

// This function adapted from the above GET function

app.get('/experience_packages.hbs', function(req, res){  
    let query1 = "SELECT * FROM Experience_packages ORDER BY cost desc;";

	db.pool.query(query1, function (error, rows, fields) {
		res.render("experience_packages", { data: rows });
	});
});

// This function adapted from the above POST function
app.post('/add_ep', function(req, res){
    let data = req.body;

    if(isNaN(parseInt(data['in-cost']))){
        data['in-cost'] = 'NULL'
    }

    query1 = `INSERT INTO Experience_packages(experience_id, cost, all_inclusive, ex_description) VALUES ('${data['in-experience_id']}', '${data['in-cost']}', '${data['in-all_inclusive']}', '${data['in-description']}');`;
    db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/experience_packages.hbs');
        }
    })
})

// This function adapted from the above GET function
app.get("/travelers.hbs", function (req, res) {
	let query1 = "SELECT * FROM Travelers;";

	db.pool.query(query1, function (error, rows, fields) {
		res.render("travelers", { data: rows });
	});
});

// This function adapted from the above POST function
app.post('/add_traveler', function(req, res){
    let data = req.body;

    if (data['in-preferred_airline'] ==''){
        data['in-preferred_airline'] = 'NULL'
    }

    query1 = `INSERT INTO Travelers(full_name, age, phone_number, email, passport_country, vaccines_updated, preferred_airline) VALUES ('${data['in-name']}', '${data['in-age']}', '${data['in-phone_number']}', '${data['in-email']}', '${data['in-passport_country']}', '${data['in-vaccines_updated']}', '${data['in-preferred_airline']}');`;
    db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/travelers.hbs');
        }
    })
})

// This function adapted from the above GET function
app.get("/trips.hbs", function (req, res) {
	let query1 = "SELECT * FROM Trips;";
	let query2 = "SELECT * FROM Experience_packages;";
	let query3 = "SELECT * FROM Locations;";

	db.pool.query(query1, function (error, rows, fields) {
		let trips = rows;

		db.pool.query(query2, (error, rows, fields) => {
			let experiences = rows;

			// Itterates through all SELECT queries to pass data from all three tables
			db.pool.query(query3, (error, rows, fields) => {
				let locations = rows;
				res.render("trips", {
					data: trips,
					experiences: experiences,
					locations: locations,
				});
			});
		});
	});
});

// This function adapted from the above POST function
app.post('/add_trip', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO Trips(date_of_arrival, date_of_departure, experience_id, location_id) VALUES ('${data['in-date_of_arrival']}', '${data['in-date_of_departure']}', '${data['in-experience_id']}', '${data['in-location_id']}');`;
    db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/trips.hbs');
        }
    })
});

// This function adapted from the above POST function
app.post('/update_trip', function(req, res){
    let data = req.body;

    if (data['in-experience_id'] ==''){
        query1 = `UPDATE Trips SET date_of_arrival = '${data['in-date_of_arrival']}', date_of_departure = '${data['in-date_of_departure']}', experience_id = ${data['in-experience_id']}, location_id = '${data['in-location_id']}' WHERE trip_id = '${data['in-trip_id']}';`;
    }
    else {
        query1 = `UPDATE Trips SET date_of_arrival = '${data['in-date_of_arrival']}', date_of_departure = '${data['in-date_of_departure']}', experience_id = '${data['in-experience_id']}', location_id = '${data['in-location_id']}' WHERE trip_id = '${data['in-trip_id']}';`;
    }

    db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/trips.hbs');
        }
    })
});

// This function adapted from the above POST function
app.post("/delete_trip", function (req, res) {
	let data = req.body;
	console.log(data);

	query1 = `DELETE FROM Trips WHERE trip_id = '${data["in-trip_id"]}';`;
	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			res.redirect("/trips.hbs");
		}
	});
});

// This function adapted from the above GET function
app.get("/trips_travelers.hbs", function (req, res) {
	let query1 =
		"SELECT Trips_Travelers.trips_travelers_id, Trips_Travelers.trip_id, Trips.date_of_arrival as arrival, Trips.date_of_departure as departure, Travelers.full_name as name FROM Trips_Travelers JOIN Travelers ON Travelers.traveler_id = Trips_Travelers.traveler_id JOIN Trips ON Trips.trip_id = Trips_Travelers.trip_id ORDER BY trips_travelers_id;";
	let query2 = "SELECT * FROM Trips;";
	let query3 = "SELECT * FROM Travelers;";

	db.pool.query(query1, function (error, rows, fields) {
		let trips_travelers = rows;

		db.pool.query(query2, (error, rows, fields) => {
			let trips = rows;

			db.pool.query(query3, (error, rows, fields) => {
				let travelers = rows;
				res.render("trips_travelers", {
					data: trips_travelers,
					trips: trips,
					travelers: travelers,
				});
			});
		});
	});
});

// This function adapted from the above POST function
app.post("/add_trip_traveler", function (req, res) {
	let data = req.body;

	query1 = `INSERT INTO Trips_Travelers(trip_id, traveler_id) VALUES ('${data["in-trip_id"]}', '${data["in-traveler_id"]}');`;
	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			res.redirect("/trips_travelers.hbs");
		}
	});
});

// This function adapted from the above POST function
app.post("/update_trip_traveler", function (req, res) {
	let data = req.body;

	query1 = `UPDATE Trips_Travelers SET trip_id = '${data["in-trip_id"]}', traveler_id = '${data["in-traveler_id"]}' WHERE Trips_Travelers_id = '${data["in-trips_travelers_id"]}';`;
	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			res.redirect("/trips_travelers.hbs");
		}
	});
});

// This function adapted from the above POST function
app.post("/delete_trip_traveler", function (req, res) {
	let data = req.body;
	console.log(data);

	query1 = `DELETE FROM Trips_Travelers WHERE trips_travelers_id = '${data["in-trips_traveler_id"]}';`;
	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			res.redirect("/trips_travelers.hbs");
		}
	});
});

// Citation for the following function:
// Date 2/20/23
// Copied from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
// Initiate the express listener on the PORT described earlier to handle incoming requests
app.listen(PORT, function () {
	console.log(
		"Express started on http://localhost:" +
			PORT +
			"; press Ctrl-C to terminate."
	);
});
